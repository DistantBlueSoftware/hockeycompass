import React from 'react';
import ReactDOM from 'react-dom';
 
export const PaypalCheckout = ({costWithFee, handleAddPlayer}) => {
  const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX_ID || 'ARbjvXFuHi3sp9goJjLstHr6x8zHPTZoITMvivpDgD2fTg4pW09EGpbwFHiSmuaCQ8o7HZR-wLn6lFzx',
      production: process.env.REACT_APP_PAYPAL_PROD_ID || 'YOUR-PRODUCTION-APP-ID',
  };
  
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
      if (res.state === 'approved') {
        handleAddPlayer();
        window.$("#payment-modal").modal('hide');
      } else {
        alert('payment failed, please try again')
      }
      
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
      <PaypalButton env={'sandbox'} style={style} client={client} payment={payment} commit={true} onAuthorize={onAuthorize} />
  );
}