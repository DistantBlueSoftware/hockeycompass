import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import styled from 'styled-components'

const RosterRink = styled.div`
  min-width: 280px; 
  min-height: 250px; 
  margin: 0 auto; 
  border: 3px solid #2A5489; 
  border-radius: 20px; 
  display: flex;
  padding: 10px;
`

const mapStateToProps = state => {
  return {...state};
}

class RosterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendEmail(this.props.game, this.state, () => {
      console.log('Message Sent');
    });
  }

  render() {
    let {user, game, history} = this.props;
    if (!game) game = {};
    const isGameOwner = user.username === game.host || user.username === game.hostID;
    return (
      <div className='modal fade' id='roster-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Roster for {game.name}</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <RosterRink>
              {game.players && game.players.length > 0 && 
                <>
                <div style={{flex: '0 1 45%'}}>
                <h4>Home</h4>
                {game.players.filter((p,i) => i % 2 === 0).map((player, index) => <p style={{margin: '10px'}} key={index}>{player.name} {player.type === 'goalie' && '[g]'}</p>)}
                </div>
                <div>
                <h4>Away</h4>
                {game.players.filter((p,i) => i % 2 > 0).map((player, index) => <p style={{margin: '10px'}} key={index}>{player.name} {player.type === 'goalie' && '[g]'}</p>)}
                </div>
                </>
              }
            </RosterRink>
          </div>
          <div className='modal-footer'>
            {user.authenticated && isGameOwner && 
              <button className='btn btn-primary' data-dismiss='modal' onClick={e => history.push(`/game/${game._id}/edit`)}>Edit Game</button>
            }
            <button className='btn btn-danger' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(RosterModal);
