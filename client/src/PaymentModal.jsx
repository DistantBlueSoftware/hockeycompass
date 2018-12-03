import React from 'react';
import {Elements} from 'react-stripe-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { PaypalExpressCheckout } from './PaypalExpressCheckout';
import StripePaymentForm from './StripePaymentForm'
import * as actions from './actions';

const PaymentModal = ({game = {}, user, addPlayer, setLoadingState}) => {
  const handleAddPlayer = () => {
    setLoadingState(true);
    addPlayer(game, user, () => setLoadingState(false));
  }
  const showJoinButton = game.host === user.username;
  const costWithFee = game.costPerPlayer + 1;
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
            {user.username !== game.host && costWithFee > 0 &&  
              <React.Fragment>
                <h3>Cost: ${costWithFee}</h3>
                <PaypalExpressCheckout costWithFee={costWithFee} />
                <Elements>
                  <StripePaymentForm game={game} user={user} costWithFee={costWithFee} setLoadingState={setLoadingState} />
                </Elements>
              </React.Fragment>
            }
          </div>
          <div className='modal-footer'>
            {showJoinButton && <button className='btn btn-success' data-dismiss='modal' onClick={() => handleAddPlayer()} >Join</button>}
            <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
          </div>
        </div>
      </div>
    </div>
    )
}


export default connect(null, actions)(PaymentModal);
