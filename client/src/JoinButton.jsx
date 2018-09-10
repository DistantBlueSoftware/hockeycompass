import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';

class JoinButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      shouldDoAction: moment(props.game.date).diff(moment(), 'hours') > (this.props.lockoutThreshold || 24)
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
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    const buttonText = hovering ? 'Drop' : shouldDoAction ? 'Joined' : 'Locked';
    const buttonStyle = hovering ? {color: '#ffc107'} : {color: '#B2B2B2'};
    const doShowButton = shouldDoAction ? this.showDropButton : null
    let button;

    if (user.authenticated) {
      if (game.players.indexOf(user.username) === -1 && game.players.length < game.maxPlayers) {
        if (game.type.toLowerCase() === 'public') {
          button = <button className='btn btn-success' data-toggle='modal' data-target='#payment-modal' onClick={e => setCurrentGame(game)}>Join</button>
        } else {
          button = <button className='btn btn-warning' data-toggle='modal' data-target='#contact-modal' onClick={e => setCurrentGame(game)}>Private</button>
        }

      } else if (game.players.indexOf(user.username) === -1) {
        button = <span style={{color: 'red'}}>Full</span>
      } else {
        if (isTouch) {
          button = <button className='btn btn-disabled' style={{color: 'red', width: '74px'}} onClick={() => shouldDoAction ? this.dropFromGame(game, user) : null}>Drop</button>
        } else {
          button = <button className='btn btn-disabled' style={{...buttonStyle, width: '74px'}} onMouseOver={doShowButton} onMouseOut={doShowButton} onClick={() => shouldDoAction ? this.dropFromGame(game, user) : null}>{buttonText}</button>
        }

      }
    } else if (game.players.length < game.maxPlayers) {
      if (game.type.toLowerCase() === 'public') {
        button = <button className='btn btn-success' onClick={e => setCurrentGame(game)}>Join</button>
      } else {
        button = <button className='btn btn-warning' data-toggle='modal' data-target='#contact-modal' onClick={e => setCurrentGame(game)}>Private</button>
      }
    } else {
      button = <span style={{color: 'red'}}>Full</span>
    }
    return (
      button
    )
}
}

export default connect(null, actions)(JoinButton);
