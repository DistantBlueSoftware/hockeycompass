import React from 'react';
import ReactDOM from 'react-dom';
 
export const PaypalCheckout = ({costWithFee, handleAddPlayer}) => {
  const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX_ID || 'Afa5fLBdcZhi55M34PbRdljtPzp9inIJoCjKNsfaSDSB9OSNXvBs_EiSftTdumVevD4utHZ2axk0_ebK',
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
        console.log(res.id)
        handleAddPlayer({paymentID: res.id});
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
  let paypalEnv = process.env.REACT_APP_ENV === 'localhost' ? 'sandbox' : 'production';
  let PaypalButton = window.paypal.Button.driver('react', { React, ReactDOM });
  return (
      <PaypalButton env={paypalEnv} style={style} client={client} payment={payment} commit={true} onAuthorize={onAuthorize} />
  );
}