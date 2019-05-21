const paypal = require('@paypal/checkout-server-sdk');

let clientId = process.env.REACT_APP_ENV === 'localhost' ? process.env.REACT_APP_PAYPAL_SANDBOX_ID : process.env.REACT_APP_PAYPAL_PROD_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
let environment = process.env.REACT_APP_ENV === 'localhost' ? new paypal.core.SandboxEnvironment(clientId, clientSecret) : new paypal.core.LiveEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = {environment, client};