const request = require('request');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('underscore');
const CronJob = require('cron').CronJob;
const Game = require('../models/Game');
const User = require('../models/User');
const EmailQueue = require('../models/EmailQueue');
const Payment = require('../models/Payment');

const EmailCheck = new CronJob('* * * * *', function() {
  EmailQueue.find({})
    .then(queue => {
      for (const k in queue) {
        if (moment(queue[k].sendDate).isBefore(moment())) {
          Game.findById(queue[k].gameID)
            .exec()
            .then(game => {
              request.post({
                url: `http://${process.env.ROOT_URL}/api/games/${game._id}/notification`,
                json: true,
                body: game
              }, (err, res, body) => {
                if (err) console.log(err);
                console.log('Email sent');
                queue[k].remove();
              })
            })
            .catch(err => console.log(err))
          
        }
      }
    })
    .catch(err => console.log(err))
}, null, true, 'America/Chicago');

//payouts run every night at midnight
const PayoutSchedule = new CronJob('0 0 * * *', function() {
  console.log('checking payments logs');
  Payment.find({})
    .then(async payments => {
      //first create a list of all games that have scheduled payouts
      let gameIDs = [];
      let payouts = [];
      const activePayments = payments.filter(payment => !payment.paid);
      for (const payment of activePayments) {
        await Game.findById(payment.gameID)
          .exec()
          .then(game => {
            const gameID = game._id.toString()
            if (gameIDs.indexOf(gameID) === -1) {
              gameIDs.push(gameID);
              User.findOne({username: game.host})
                .exec()
                .then(user => {
                  if (user) {
                    payouts.push({gameID: game._id.toString(), payee: user.email, amount: 0})
                  }
                })
                .catch(err => console.log(err))
            }
          })
          .catch(err => console.log(err))
      }
      //then organize activePayments by gameID and pay the host of each game that amount
      gameIDs.forEach(gameID => {
        let currentPayout = payouts.find(p => p.gameID === gameID);
        if (currentPayout) {
          for (const payment of activePayments) {
            if (payment.gameID.toString() === gameID) {
              currentPayout.amount += payment.amount;
            }
          }
          
        }
      })
      request.post({
        url: `http://${process.env.ROOT_URL}/api/payouts`,
        json: true,
        body: payouts
      }, (err, res, body) => {
        if (err) console.log(err);
        console.log('Payouts sent!');
        //TODO: mark payments paid
      })
    })
}, null, true, 'America/Chicago');

module.exports = {EmailCheck, PayoutSchedule};