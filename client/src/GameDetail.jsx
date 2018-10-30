import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import requireAuth from './requireAuth';
import * as arenas from './arenas.json';
import './GameDetail.css';

const mapStateToProps = state => {
  return {...state};
}

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      time: '19:00',
      type: 'public',
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
  
  componentDidMount() {
    const { venues } = this.props;
    if (venues && venues.all.length === 0) this.props.listVenues();
  }

  render() {
    const { user, venues, isNew = true, game = {} } = this.props;
    const { errorMessage } = this.state;
    const arenaNames = venues.all && venues.all.map((v, i) => <option key={i}>{v.name}</option>);
   return (
      <div className='game-detail'>
        <h1>{isNew ? 'New Game' : game.name}</h1>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='date'>Date: </label>
              <input className='form-control' type='date' name='date' id='date' defaultValue={this.state.date} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='time'>Time: </label>
              <input className='form-control' type='time' name='time' id='time' defaultValue={this.state.time} onChange={this.handleChange} />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='location'>Location: </label>
              <select className='form-control' name='location' id='location' onChange={this.handleChange} >
                <option></option>
                {arenaNames}
              </select>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='name'>Game Name: </label>
              <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='creator'>Game Host: </label>
              <input className='form-control' type='text' name='host' id='host' value={user.username} readOnly />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='maxPlayers'>Player Cap: </label>
              <input className='form-control' type='number' name='maxPlayers' id='maxPlayers' onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='costPerPlayer'>Cost Per Player: </label>
              <input className='form-control' type='number' name='costPerPlayer' id='costPerPlayer' step='.01' onChange={this.handleChange} />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='type'>Type: </label>
              <select className='form-control' name='type' id='type' onChange={this.handleChange} >
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
            {this.state.type === 'private' &&
              <div className='form-group col-md-12'>
                <label htmlFor='emailList'>Email List: </label>
                <textarea rows={6} className='form-control' name='emailList' id='emailList' onChange={this.handleChange} defaultValue={this.props.user.profile.emails}></textarea>
              </div>
            }
          </div>
          <button type='submit' className='btn btn-primary'>Create Game</button>
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps, actions)(requireAuth(GameDetail));
