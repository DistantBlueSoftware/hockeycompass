import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './actions'

const PaymentModal = ({game = {}, user, addPlayer, processPayment, setLoadingState}) => {
const costWithFee = game.costPerPlayer + 1;
  const onToken = token => {
    processPayment(token, costWithFee, game, user, addPlayer, () => setLoadingState(false));
    }
  return (
    <div className='modal fade' id='payment-modal' tabIndex='-1' role='dialog'>
    <div className='modal-dialog' role='document'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>Join {game.name}</h5>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          <p>Location: {game.location}</p>
          <p>Date: {moment(game.date).format('MM/DD/YYYY h:mmA')}</p>
          <h3>Cost: ${user.username === game.host ? 0 : costWithFee}</h3>
        </div>
        <div className='modal-footer'>
          <StripeCheckout token={onToken} stripeKey="pk_test_feHScO25l9pXUPP5opXgkoKY">
            <button className='btn btn-success' data-dismiss='modal' onClick={() => setLoadingState(true)}>{user.username !== game.host && 'Pay and '}Join</button>
          </StripeCheckout>
          <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
        </div>
      </div>
    </div>
  </div>
  )
}


export default connect(null, actions)(PaymentModal);
