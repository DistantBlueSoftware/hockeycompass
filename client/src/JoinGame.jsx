import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

const JoinGame = ({...props}) => {
  const {match, games, user, addPlayer, processPayment} = props;
  const game = games.games.find(game => game._id === match.params.id);
  if (game.players.length < game.maxPlayers) {
    if (game.players.indexOf(user.username) === -1) {
      const costWithFee = game.costPerPlayer + 1;
      const onToken = token => {
        processPayment(token, costWithFee, game, user, addPlayer, () => this.props.router.push('/games'));
        }
      return (
        <div>
          <h5>Join {game.name}</h5>
          <p>Location: {game.location}</p>
          <p>Date: {moment(game.date).format('MM/DD/YYYY h:mmA')}</p>
          <h3>Cost: ${game.costPerPlayer + 1}</h3>
          <button className='btn btn-success'>Pay and Join</button>
          <button className='btn btn-danger' onClick={e => this.props.router.push('/games')} >Cancel</button>
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
