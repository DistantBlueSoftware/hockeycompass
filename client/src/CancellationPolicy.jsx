import React from 'react';
import { LOCKOUT_THRESHOLD } from './config';

export const CancellationPolicy = () => (
  <div className='container-fluid'>
    <h3>Cancellation &amp; Refund Policy</h3>
      <p>You will receive a full refund if you cancel {LOCKOUT_THRESHOLD} hours before the start of the game. Any cancellations
      made within the {LOCKOUT_THRESHOLD} hours of game time will not be refunded unless the game is full at start time.</p>
  </div>
)