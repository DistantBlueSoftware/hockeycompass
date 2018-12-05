import React from 'react';

export const AdminPayouts = ({games}) => (
  <React.Fragment>
    <div>Admin Payouts</div>
    {games.map(game => <h2>{game.name}</h2>)}
  </React.Fragment>
)