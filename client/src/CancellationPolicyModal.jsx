import React from 'react';
import { LOCKOUT_THRESHOLD } from './config';

export const CancellationPolicyModal = () => (
  <div className='modal fade' id='cancellation-modal' tabIndex='-1' role='dialog'>
  <div className='modal-dialog' role='document' style={{minWidth: '50vw'}}>
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title'>Cancellation Policy</h5>
        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body'>
        <h3>Cancellation &amp; Refund Policy</h3>
          <p>You will receive a full refund if you cancel {LOCKOUT_THRESHOLD} hours before the start of the game. Any cancellations
          made within the {LOCKOUT_THRESHOLD} hours of game time will not be refunded unless the game is full at start time.</p>
      </div>
      <div className='modal-footer'>
        <button className='btn btn-danger' data-dismiss='modal'>Close</button>
      </div>
    </div>
  </div>
</div>
)
