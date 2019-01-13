import React, { Component } from 'react';
import { connect } from 'react-redux';
import utils from '@distantbluesoftware/dbsutil';
import * as actions from './actions';
import requireAuth from './requireAuth';
import {emailRegexTest} from './lib';
import DatePicker from "react-datepicker";
import { HCFEE } from './config';
 
import "react-datepicker/dist/react-datepicker.css";
import './GameDetail.css';

const mapStateToProps = state => {
  return {...state};
}

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      type: 'public',
      emailList: this.props.user.profile.emailList,
      infoMessage: '',
      errorMessage: ''
    }
  }

  handleChange = (e) => {
    if (e instanceof Date) {
      this.setState({
        date: e
      })
    } else {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        infoMessage: '',
        [name]: value
      });
    }
    
  }
  
  handleGameUpdate = e => {
    e.preventDefault();
    let game = this.state;
    // game.date = moment(game.date + ' ' + game.time);
    // if (!moment(game.date).isValid()) {
    //   this.setState({
    //     errorMessage: 'Error: You must specify a date'
    //   })
    //   return;
    // }
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
    const { user } = this.props;
    let game = this.state;
    let needsConfirmation = false;
    let confirmText = '';
    game.host = this.props.user.username;
    game.currentPlayer = {fullName: user.fullName, type: user.profile && user.profile.playerType}
    // game.date = moment(game.date + ' ' + game.time);
    // if (moment(game.date).diff(moment()) < 0) {
    //   this.setState({
    //     errorMessage: 'This game is scheduled in the past. Please check the start time.'
    //   });
    //   return;
    // }
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
      if (typeof this.state.emailList === 'string') emails = this.state.emailList.match(emailRegexTest);
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
        
        //save email list to user profile
        this.props.saveProfile(this.props.user.username, {emailList: emails}, () => {
          this.setState({
            errorMessage: '',
            emailList: this.props.user.profile.emailList
          })
        });
      } 
    }
    // store game settings locally for next time
    localStorage.setItem('gameSettings', JSON.stringify(game));
    
    //create the game
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
        this.setState({...this.props.games.current})
      });
    } else if (localStorage.getItem('gameSettings')) {
      this.setState(JSON.parse(localStorage.getItem('gameSettings')))
      this.setState({infoMessage: 'We pre-filled this form using data from your last game. Change what you need and hit Create!'})
    }
  }

  render() {
    console.log(this.state)
    const { user, venues, match } = this.props;
    const game = this.state;
    const { infoMessage, errorMessage } = this.state;
    const isNew = match && !match.params.id;
    const buttonText = isNew ? 'Create Game' : 'Update Game';
    const costMessage = game.costPerPlayer ? <div>cost per player will be <span style={{fontSize: '16px', color: 'green'}}>${+game.costPerPlayer+HCFEE}</span> <br /> &emsp; ${game.costPerPlayer} game cost + <br /> &emsp; ${HCFEE} HC fee</div> : '';
    const arenaNames = venues.all && venues.all.map((v, i) => <option key={i}>{v.name}</option>);
   return (
      <div className='game-detail'>
        <h1>{isNew ? 'New Game' : this.state.name}</h1>
        {infoMessage && <div className='message green'>{infoMessage}</div>}
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <form onSubmit={isNew ? this.handleNewGameSubmit : this.handleGameUpdate}>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='date'>Date: </label>
                <DatePicker className='form-control date-picker' selected={game.date}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  dateFormat="MM/DD/YYYY h:mm aa"
                  timeCaption="time"
                />
              {/*<input className='form-control' type='date' name='date' id='date' required value={game.date} onChange={this.handleChange} />*/}
            </div>
            {/*<div className='form-group col-md-6'>
              <label htmlFor='time'>Time: </label>
              <input className='form-control' type='time' name='time' id='time' required value={game.time} onChange={this.handleChange} />
            </div>*/}
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
              <label htmlFor='maxPlayers'>Goalie Cap: </label>
              <input className='form-control' type='number' name='goalieCount' id='goalieCount' min={0} value={game.goalieCount} onChange={this.handleChange} />
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
                <label htmlFor='emailList'>Paste an email list here. Don't worry if there are duplicates or extra stuff in there; we'll find the emails for you.</label>
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
