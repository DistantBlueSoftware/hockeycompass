import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export const PaypalExpressCheckout = ({costWithFee}) => {
  const client = {
      sandbox:    process.env.REACT_APP_PAYPAL_SANDBOX_ID || 'ARbjvXFuHi3sp9goJjLstHr6x8zHPTZoITMvivpDgD2fTg4pW09EGpbwFHiSmuaCQ8o7HZR-wLn6lFzx',
      production: process.env.REACT_APP_PAYPAL_PROD_ID || 'YOUR-PRODUCTION-APP-ID',
  }
  return (
      <PaypalExpressBtn client={client} currency={'USD'} total={+costWithFee.toFixed(2)} />
  )
}