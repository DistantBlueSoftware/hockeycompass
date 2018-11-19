import React, { Component } from 'react';
import { connect } from 'react-redux';
import utils from '@distantbluesoftware/dbsutil';
import moment from 'moment';
import * as actions from './actions';
import requireAuth from './requireAuth';
import './GameDetail.css';

const mapStateToProps = state => {
  return {...state};
}

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().add('days', 1).format('YYYY-MM-DD'),
      time: '19:00',
      type: 'public',
      emailList: this.props.user.profile.emailList,
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
  
  handleGameUpdate = e => {
    e.preventDefault();
    let game = this.state;
    game.date = moment(game.date + ' ' + game.time);
    if (!moment(game.date).isValid()) {
      this.setState({
        errorMessage: 'Error: You must specify a date'
      })
      return;
    }
    if (game.maxPlayers < game.players.length) {
      this.setState({errorMessage: `There are already ${game.players.length} players in the game!`})
      return;
    }
    this.props.updateGame(game, () => {
      this.props.history.push('/games');
    })
  }

  handleNewGameSubmit = (e) => {
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
    if (game.type === 'private') {
      let currentList = [];
      let emails, invalidEmails = [];
      if (typeof this.state.emailList === 'string') emails = utils.removeWhitespace(this.state.emailList).split(',');
      else emails = this.state.emailList;
      emails.filter(email => email.length > 0).forEach(email => {
        if (!utils.validateEmail(email) || email === '') {
          invalidEmails.push(email)
        }
      });
      if (invalidEmails.length) {
        this.setState({
          errorMessage: `The following emails are invalid: ${invalidEmails.join('\n ')} \nPlease correct and retry.`
        });
        return;
      } else {
        emails.forEach(email => {
          if (currentList.indexOf(email) === -1) {
            currentList.push(email);
          }
        })
        game.emailList = currentList;
      } 
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
    const { venues, match, game } = this.props;
    if (venues && venues.all.length === 0) this.props.listVenues();
    if (!game && match && match.params.id) {
      this.props.getGameDetails(match.params.id, () => {
        const currentGame = {...this.props.games.current};
        currentGame.date = moment(this.props.games.current.date).format('YYYY-MM-DD');
        currentGame.time = moment(this.props.games.current.date).format('HH:mm');
        this.setState({...currentGame})
      });
    }
  }

  render() {
    console.log(this.state)
    const { user, venues, match } = this.props;
    const game = this.state;
    const { errorMessage } = this.state;
    const isNew = match && !match.params.id;
    const buttonText = isNew ? 'Create Game' : 'Update Game';
    const costMessage = game.costPerPlayer ? <div>cost per player will be <span style={{fontSize: '16px', color: 'green'}}>${+game.costPerPlayer+1}</span> <br /> &emsp; ${game.costPerPlayer} game cost + <br /> &emsp; $1 HC fee</div> : '';
    const arenaNames = venues.all && venues.all.map((v, i) => <option key={i}>{v.name}</option>);
   return (
      <div className='game-detail'>
        <h1>{isNew ? 'New Game' : this.state.name}</h1>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <form onSubmit={isNew ? this.handleNewGameSubmit : this.handleGameUpdate}>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='date'>Date: </label>
              <input className='form-control' type='date' name='date' id='date' required value={game.date} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='time'>Time: </label>
              <input className='form-control' type='time' name='time' id='time' required value={game.time} onChange={this.handleChange} />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='location'>Location: </label>
              <select className='form-control' name='location' id='location' required value={game.location} onChange={this.handleChange} >
                <option></option>
                {arenaNames}
              </select>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='name'>Game Name: </label>
              <input className='form-control' type='text' name='name' id='name' required value={game.name} onChange={this.handleChange} />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='creator'>Game Host: </label>
              <input className='form-control' type='text' name='host' id='host' value={game.host || user.username} readOnly />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='maxPlayers'>Player Cap: </label>
              <input className='form-control' type='number' name='maxPlayers' id='maxPlayers' min={1} value={game.maxPlayers} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='costPerPlayer'>Cost Per Player: </label>
              <input className='form-control' type='number' name='costPerPlayer' id='costPerPlayer' min={0} step='.01' value={game.costPerPlayer} onChange={this.handleChange} />
              {costMessage}
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='type'>Type: </label>
              <select className='form-control' name='type' id='type' value={game.type} onChange={this.handleChange} >
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
            {this.state.type === 'private' &&
              <div className='form-group col-md-12'>
                <label htmlFor='emailList'>Email List: </label>
                <textarea rows={6} className='form-control' name='emailList' id='emailList' onChange={this.handleChange} defaultValue={this.props.user.profile.emailList}></textarea>
              </div>
            }
          </div>
          <button type='submit' className='btn btn-primary'>{buttonText}</button>
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps, actions)(requireAuth(GameDetail));
