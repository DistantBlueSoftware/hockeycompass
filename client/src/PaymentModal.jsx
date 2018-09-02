import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './actions'

const PaymentModal = ({game, user, addPlayer}) => (
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
        <h3>Cost: ${game.costPerPlayer + 1}</h3>
        <p>(${game.costPerPlayer} game fee + $1 convenience fee)</p>
      </div>
      <div className='modal-footer'>
        <button className='btn btn-success' onClick={e => addPlayer(game, user)}>Pay and Join</button>
        <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
      </div>
    </div>
  </div>
</div>
)

export default connect(null, actions)(PaymentModal);
