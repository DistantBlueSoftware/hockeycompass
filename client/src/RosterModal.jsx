import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import * as actions from './actions';
import './RosterModal.css';

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
  
  componentDidMount() {
    ReactTooltip.rebuild();
  }

  render() {
    let {user, game, history} = this.props;
    if (!game) game = {};
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
            <div className='roster-rink'>
              <div className='goal'></div>
            {game.players && game.players.length && 
              game.players.map(
                (player, index) => 
                <div 
                  className='player' 
                  data-tip={player}
                  key={index}>
                  {player.slice(0,2)}
                </div>
              )
            }
              <div className='goal'></div>
            </div>
          </div>
          <div className='modal-footer'>
            {user.authenticated && user.username === game.host && 
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
