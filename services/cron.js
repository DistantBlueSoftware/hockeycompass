const request = require('request');
const mongoose = require('mongoose');
const moment = require('moment');
const CronJob = require('cron').CronJob;
const Game = require('../models/Game');
const EmailQueue = require('../models/EmailQueue');

const EmailCheck = new CronJob('* */1 * * * *', function() {
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

module.exports = EmailCheck;