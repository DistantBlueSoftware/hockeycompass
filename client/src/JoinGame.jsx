import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

const JoinGame = ({...props}) => {
  const {match, games, user, addPlayer} = props;
  const game = games.games.find(game => game._id === match.params.id);
  if (game.players.length < game.maxPlayers) {
    if (game.players.indexOf(user.username) === -1) {
      return (
        <div>
          <h5>Join {game.name}</h5>
          <p>Location: {game.location}</p>
          <p>Date: {moment(game.date).format('MM/DD/YYYY h:mmA')}</p>
          <h3>Cost: ${game.costPerPlayer + 1}</h3>
          <p>(${game.costPerPlayer} game fee + $1 convenience fee)</p>
          <button className='btn btn-success' onClick={e => addPlayer(game, user, () => props.history.push('/games'))}>Pay and Join</button>
          <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
        </div>
      )
    } else {
      return (
        <h1>You have already joined this game.</h1>
      )
    }
  } else {
    return (
      <h1>Sorry, this game is full.</h1>
    )
  }
}
export default connect(mapStateToProps, actions)(JoinGame);
