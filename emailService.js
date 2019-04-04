const Email = require('email-templates');
const path = require('path');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
}

console.log(mailgunOptions)

const transport = mailgunTransport(mailgunOptions);

const email = new Email({
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(__dirname, 'client/build')
    }
  },
  message: {
    from: '"Hockey Compass" <no-reply@hockeycompass.com>'
  },
  // uncomment below to send emails in development/test env:
  //send: true,
  transport
});

module.exports = email;
