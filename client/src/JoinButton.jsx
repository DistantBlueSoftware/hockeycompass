import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';


class JoinButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      shouldDoAction: moment(props.game.date).diff(moment().subtract(24, 'hours'), 'hours') > 24
    }
  }
  showDropButton = () => {
    const {hovering} = this.state;
    this.setState({
      hovering: !hovering
    })
  }

  dropFromGame = (game, user) => {
    console.log('dropping...')
    this.props.removePlayer(game, user, () => {
      console.log(`${user.username} removed`);
    })
  }

  render () {
    const {hovering, shouldDoAction} = this.state;
    const {user, game, setCurrentGame} = this.props;
    const buttonText = hovering ? 'Drop' : shouldDoAction ? 'Joined' : 'Locked';
    const buttonStyle = hovering ? {color: '#ffc107'} : {color: '#B2B2B2'};
    const doShowButton = shouldDoAction ? this.showDropButton : null
    let button;

    if (user.authenticated) {
      if (game.players.indexOf(user.username) === -1 && game.players.length < game.maxPlayers) {
        button = <button className='btn btn-success' data-toggle='modal' data-target='#payment-modal' onClick={e => setCurrentGame(game)}>Play</button>
      } else if (game.players.indexOf(user.username) === -1) {
        button = <span style={{color: 'red'}}>Full</span>
      } else {
        button = <button className='btn btn-disabled' style={{...buttonStyle, width: '74px'}} onMouseOver={doShowButton} onMouseOut={doShowButton} onClick={() => shouldDoAction ? this.dropFromGame(game, user) : null}>{buttonText}</button>
      }
    } else if (game.players.length < game.maxPlayers) {
      button = <span style={{color: 'green'}}>Open</span>
    } else {
      button = <span style={{color: 'red'}}>Full</span>
    }
    return (
      button
    )
}
}

export default connect(null, actions)(JoinButton);
