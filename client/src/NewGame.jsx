import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import requireAuth from './requireAuth';
import * as arenas from './arenas.json';

const mapStateToProps = state => {
  return {...state};
}

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      time: '19:00',
      type: 'public',
      // if directed from VenueModal, the venue is set as props.selectedVenue
      location: this.props.selectedVenue.name ? this.props.selectedVenue.name : '',
      errorMessage: ''
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
    let game = this.state;

    console.log('game');
    console.log(game)
    let needsConfirmation = false;
    let confirmText = '';
    game.host = this.props.user.username;
    game.date = moment(game.date + ' ' + game.time);
    if (moment(game.date).diff(moment()) < 0) {
      this.setState({
        errorMessage: 'This game is scheduled in the past. Please check the start time.'
      });
      return;
    }
    if (game.costPerPlayer > 30) {
      needsConfirmation = true;
      confirmText = 'Cost per player is higher than average ($' + game.costPerPlayer + '). Continue?';
    }
    if (game.maxPlayers > 30) {
      needsConfirmation = true;
      confirmText = 'Maximum capacity of ' + game.maxPlayers + ' players is higher than average. Continue?';
    }
    if (needsConfirmation && window.confirm(confirmText)) {
      this.props.newGame(game, () => {
        this.props.history.push('/games');
      });
    } else {
      this.props.newGame(game, () => {
        this.props.history.push('/games');
      });
    }
  }

  render() {
    const { user, venues } = this.props;
    const { errorMessage } = this.state;
    const arenaNames = venues.all && venues.all.map((v, i) => <option key={i.toString()}>{v.name}</option>);
   return (
      <div>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='date'>Date: </label>
            <input className='form-control' type='date' name='date' id='date' defaultValue={this.state.date} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='time'>Time: </label>
            <input className='form-control' type='time' name='time' id='time' defaultValue={this.state.time} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location: </label>
            <select className='form-control' name='location' id='location' defaultValue={this.props.selectedVenue.name} onChange={this.handleChange} >
              <option></option>
              {arenaNames}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Game Name: </label>
            <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='creator'>Game Host: </label>
            <input className='form-control' type='text' name='host' id='host' value={user.username} readOnly />
          </div>
          <div className='form-group'>
            <label htmlFor='maxPlayers'>Player Cap: </label>
            <input className='form-control' type='number' name='maxPlayers' id='maxPlayers' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='costPerPlayer'>Cost Per Player: </label>
            <input className='form-control' type='number' name='costPerPlayer' id='costPerPlayer' step='.01' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Type: </label>
            <select className='form-control' name='type' id='type' onChange={this.handleChange} >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Create Game</button>
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps, actions)(requireAuth(NewGame));
