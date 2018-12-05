import React from 'react';
import ReactDOM from 'react-dom';
 
export const PaypalCheckout = ({costWithFee}) => {
  const client = {
      sandbox:    process.env.REACT_APP_PAYPAL_SANDBOX_ID || 'ARbjvXFuHi3sp9goJjLstHr6x8zHPTZoITMvivpDgD2fTg4pW09EGpbwFHiSmuaCQ8o7HZR-wLn6lFzx-wLn6lFzx',
      production: process.env.REACT_APP_PAYPAL_PROD_ID || 'YOUR-PRODUCTION-APP-ID',
  };
  
  console.log(client)
  
  const payment = (data, actions) => {
    return actions.payment.create({
      transactions: [
        {
          amount: {
              total: +costWithFee.toFixed(2),
              currency: 'USD'
          }
        }
      ]
    });
  };
  
  const onAuthorize = (data, actions) => {
    return actions.payment.execute().then(res => {
      console.log('The payment was completed!');
    });
  };
  
  const style = {
        height: 38,
        color: 'blue',
        shape: 'rect',
        tagline: 'false'
        
    }
  
  let PaypalButton = window.paypal.Button.driver('react', { React, ReactDOM });
  return (
      <PaypalButton style={style} client={client} payment={payment}  commit={true} onAuthorize={onAuthorize} />
  );
}