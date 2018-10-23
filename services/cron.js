const CronJob = require('cron').CronJob;

const EmailCheck = new CronJob('0 */1 * * * *', function() {
  const d = new Date();
	console.log('Every minute:', d);
  //TODO: check EmailQueue, send emails
  
}, null, true, 'America/Chicago');

module.exports = EmailCheck;