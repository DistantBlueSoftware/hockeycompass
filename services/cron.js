const request = require('request');
const mongoose = require('mongoose');
const moment = require('moment');
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

const PayoutSchedule = new CronJob('0 */8 * * *', function() {
  console.log('every eight hours');
  Payment.find({})
    .then(async payments => {
      //first create a list of all games that have scheduled payouts
      const gameIDs = [];
      const payouts = [];
      const activePayments = payments.filter(payment => !payment.paid)
      for (const payment of activePayments) {
        await Game.findById(payment.gameID)
          .exec()
          .then(game => {
            if (gameIDs.indexOf(game._id) === -1) {
              gameIDs.push(game._id);
              User.findOne({username: game.host})
                .exec()
                .then(user => payouts.push({gameID: game._id, payee: user.email, amount: 0}))
                .catch(err => console.log(err))
            }
          })
          .catch(err => console.log(err))
      }
      //then organize activePayments by gameID and pay the host of each game that amount
      gameIDs.forEach(gameID => {
        const currentPayout = payouts.find(p => p.gameID === gameID);
        
        if (currentPayout) {
          console.log(currentPayout)
          for (const payment of activePayments) {
            if (payment.gameID === gameID) {
              currentPayout.amount += payment.amount;
            }
          }
          console.log(currentPayout.amount)
          
        }
      })
      // console.log(payouts)
      request.post({
        url: `http://${process.env.ROOT_URL}/api/payouts`,
        json: true,
        body: payouts
      }, (err, res, body) => {
        if (err) console.log(err);
        console.log('Email sent');
        //TODO: mark payments paid
      })
    })
}, null, true, 'America/Chicago');

module.exports = {EmailCheck, PayoutSchedule};