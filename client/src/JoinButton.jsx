import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as actions from './actions';
import { HCFEE, LOCKOUT_THRESHOLD } from './config';

class JoinButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      shouldDoAction: moment(props.game.date).diff(moment(), 'hours') > LOCKOUT_THRESHOLD
    }
  }
  showDropButton = () => {
    const {hovering} = this.state;
    this.setState({
      hovering: !hovering
    })
  }
  
  addToWaitlist = (game, user) => {
    const { username, firstName, lastName, profile } = user;
    const name = `${firstName} ${lastName}`;
    if (!game.waitlist) game.waitlist = [];
    if (!game.waitlist.find(p => p.username === username)) {
      game.waitlist.push({username, name, type: profile.playerType});
      this.props.updateGame(game, () => {
        console.log(`${user.fullName} is on the wait list`)
      })
    }
  }
  
  dropFromWaitlist = (game, user) => {
    const { username } = user;
    const idx = game.waitlist.map(p => p.username).indexOf(username);
    const waitlist = game.waitlist.slice(0,idx).concat(game.waitlist.slice(idx+1))
    game.waitlist = waitlist;
    this.props.updateGame(game, () => {
      console.log(`${user.fullName} dropped from the wait list`)
    })
  }

  dropFromGame = (game, user) => {
    const isGoalie = user.profile && user.profile.playerType === 'goalie';
    const isHost = game.hostID === user.username;
    const needsRefund = !isGoalie && !isHost;
    const needsConfirm = (isGoalie || isHost) ? true : window.confirm(`Are you sure you want to drop from this game? You will receive a refund of $${game.costPerPlayer + HCFEE}.`);
    if (needsConfirm){
    this.props.removePlayer(game, user, () => {
      if (needsRefund) this.props.sendRefund(game, user);
      console.log(`${user.fullName} removed`);
    })}
  }

  render () {
    const {hovering, shouldDoAction} = this.state;
    const {loading, user, game, setCurrentGame} = this.props;
    const isLoading = loading ? <i className='fas fa-circle-notch fa-spin'></i> : '';
    const isDisabled = loading ? 'disabled' : '';
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    const buttonText = hovering ? 'Drop' : shouldDoAction ? 'Joined' : 'Locked';
    const buttonStyle = hovering ? {color: '#ffc107'} : {color: '#B2B2B2'};
    const doShowButton = shouldDoAction ? this.showDropButton : null
    const playerNames = game.players.map(p => p.name);
    
    const isJoined = ~playerNames.indexOf(user.username) || ~playerNames.indexOf(user.fullName);
    const isOnWaitlist = game.waitlist.find(p => p.username === user.username)
    let button;

    if (moment(game.date) < moment()) {
      button = <button className='btn btn-disabled' style={{...buttonStyle, width: '74px'}}>Past</button>
    }
    else if (user.authenticated) {
      //player has not joined, game is not full
      if (!isJoined && game.players.length < game.maxPlayers) {
        if (game.type.toLowerCase() === 'public') {
          button = <button className='btn btn-success' disabled={isDisabled} data-toggle='modal' data-target='#payment-modal' onClick={e => setCurrentGame(game)}>{isLoading || 'Join'}</button>
        } else {
          //game is private
          if (game.host === user.username) 
            button = <button className='btn btn-success' data-toggle='modal' data-target='#payment-modal' onClick={e => setCurrentGame(game)}>{isLoading || 'Rejoin'}</button> 
          else if (game.invited && game.invited.length > 0 && game.invited.find(email => email === user.email)) {
            button = <button className='btn btn-success' data-toggle='modal' data-target='#payment-modal' onClick={e => setCurrentGame(game)}>{isLoading || 'Join'}</button> 
          } else {
            button = <button className='btn btn-warning' data-toggle='modal' data-target='#game-request-modal' onClick={e => setCurrentGame(game)}>Private</button> 
          }
        }
      } else if (!isJoined) {
        //game is full, player not on waitlist
        if (!isOnWaitlist) button = <button className='btn btn-warning' onClick={() => shouldDoAction ? this.addToWaitlist(game, user) : null}>Waitlist ({game.waitlist.length})</button>
        else button = <button className='btn btn-warning' onClick={() => shouldDoAction ? this.dropFromWaitlist(game, user) : null}>On Waitlist ({game.waitlist.length})</button>
      } else {
        //player has joined
        if (isTouch) {
          button = <button className='btn btn-disabled' style={{color: 'red', width: '74px'}} onClick={() => shouldDoAction ? this.dropFromGame(game, user) : null}>Drop</button>
        } else {
          button = <button className='btn btn-disabled' style={{...buttonStyle, width: '74px'}} onMouseOver={doShowButton} onMouseOut={doShowButton} onClick={() => shouldDoAction ? this.dropFromGame(game, user) : null}>{buttonText}</button>
        }

      }
      //user is not logged in
    } else if (game.players.length < game.maxPlayers) {
      if (game.type.toLowerCase() === 'public') {
        button = <button className='btn btn-success' onClick={e => setCurrentGame(game, true)}>Join</button>
      } else {
        button = <Link to='/login'><button className='btn btn-warning' onClick={e => setCurrentGame(game, true)}>Private</button></Link>
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
