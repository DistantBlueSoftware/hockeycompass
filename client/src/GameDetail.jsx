import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import utils from '@distantbluesoftware/dbsutil';
import * as actions from './actions';
import requireAuth from './requireAuth';
import { emailRegexTest, skillLevels } from './lib';
// import DatePicker from "react-datepicker";
import Datetime from "react-datetime";
import styled from 'styled-components'
import { HCFEE } from './config';
import ReactTooltip from 'react-tooltip';
 
// import "react-datepicker/dist/react-datepicker.css";
import "./react-datetime.css";
import './GameDetail.css';

const mapStateToProps = state => {
  return {...state};
}

const Icon = styled.i`
  position: absolute;
  top: 43px;
  left: 24px;
  color: rgba(25, 81, 139,0.7);
`

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().add(1, 'days'),
      type: '',
      emailList: this.props.user.profile && this.props.user.profile.emailList,
      infoMessage: '',
      messageColor: 'green',
      errorMessage: '',
    }
  }

  handleChange = (e) => {
    if (moment.isMoment(e)) {
      this.setState({
        date: e
      })
    } else if (!e.target) {
      this.setState({
        date: moment(e)
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
  
  handleGameUpdate = (e, params) => {
    e.preventDefault();
    let game = this.state;
    if (params) {
      for (let param in params) {
        game[param] = params[param];
      }
    }
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
    const { user } = this.props;
    let game = this.state;
    let needsConfirmation = false;
    let confirmText = '';
    game.host = user.fullName || user.username;
    game.hostID = user.username;
    game.currentPlayer = {name: user.fullName, type: user.profile && user.profile.playerType}
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
        this.props.saveProfile(user.username, {emailList: emails}, () => {
          this.setState({
            errorMessage: '',
            emailList: user.profile.emailList
          })
        });
      } 
    }
    // store game settings locally for next time
    localStorage.setItem('gameSettings', JSON.stringify(game));
    localStorage.setItem('returningHost', true);
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
  
  showSkillLevels = () => {
    console.log('hi')
  }
  
  cancelGame = e => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to cancel this game?')) {
      this.setState({
        active: false
      })
      this.handleGameUpdate(e, {active: false})
    }
  }
  
  componentDidMount() {
    this.props.routeChange('/newgame');
    const { venues, match, game } = this.props;
    if (venues && venues.all.length === 0) this.props.listVenues();
    if (!game && match && match.params.id) {
      this.props.getGameDetails(match.params.id, () => {
        this.setState({...this.props.games.current, date: moment(this.props.games.current.date)})
      });
    } else if (!localStorage.getItem('returningHost')) {
      this.setState({infoMessage: 'We will use the email address you have on file for payouts. If this is not a valid PayPal email, you won\'t be able to get paid! \n Check it in your profile.', messageType: 'orange'})
    } else if (localStorage.getItem('gameSettings')) {
      const storedGameSettings = JSON.parse(localStorage.getItem('gameSettings'));
      console.log(storedGameSettings)
      this.setState(storedGameSettings)
      this.setState({
        date: moment(storedGameSettings.date).add(1, 'days').format('MM/DD/YYYY hh:mm A'), 
        infoMessage: 'We pre-filled this form using data from your last game. Change what you need, then it\'s Hockey Time!'})
    }
  }

  render() {
    const { user, venues, match } = this.props;
    const game = this.state;
    console.log(game)
    const { infoMessage, errorMessage, messageColor } = this.state;
    const messageClass = `message ${messageColor}`;
    const isNew = match && !match.params.id;
    const buttonText = isNew ? 'Hockey Time!' : 'Update Game';
    const costMessage = game.costPerPlayer ? <div>cost per player will be <span style={{fontSize: '16px', color: 'green'}}>${+game.costPerPlayer+HCFEE}</span> <br /> &emsp; ${game.costPerPlayer} game cost + <br /> &emsp; ${HCFEE} HC fee</div> : '';
    const arenaNames = venues.all && venues.all.map((v, i) => <option key={i}>{v.name}</option>);
   return (
      <div className='game-detail container-fluid'>
        <h1>{isNew ? 'My New Game' : this.state.name}</h1>
        {infoMessage && <div className={messageClass}>{infoMessage}</div>}
        {errorMessage && <div className='message red'>{errorMessage}</div>}
        <form onSubmit={isNew ? this.handleNewGameSubmit : this.handleGameUpdate}>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='date'>Date:</label>
                <Datetime 
                  value={game.date} 
                  onChange={this.handleChange} 
                />
              {/*<DatePicker className='form-control date-picker' selected={game.date}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={15}
                  dateFormat="MM/DD/YYYY h:mm aa"
                  timeCaption="time"
                />*/}
              {/*<input className='form-control' type='date' name='date' id='date' required value={game.date} onChange={this.handleChange} />*/}
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor='startTime'>Start Time: </label>
              <input className='form-control' type='time' name='startTime' id='startTime' required value={game.startTime} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor='endTime'>End Time: </label>
              <input className='form-control' type='time' name='endTime' id='endTime' required value={game.endTime} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='location'>Location: </label>
              <select className='form-control' name='location' id='location' required value={match.params.venue || game.location} onChange={this.handleChange} >
                <option></option>
                {arenaNames}
              </select>
            </div>
            {/*<div className='form-group col-md-6'>
              <label htmlFor='time'>Time: </label>
              <input className='form-control' type='time' name='time' id='time' required value={game.time} onChange={this.handleChange} />
            </div>*/}
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='name'>Game Name: </label>
              <input className='form-control' type='text' name='name' id='name' required value={game.name} onChange={this.handleChange} />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor='maxPlayers'>Player Cap: </label>
              <input className='form-control' type='number' name='maxPlayers' id='maxPlayers' min={1} value={game.maxPlayers} onChange={this.handleChange} required />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor='maxPlayers'>Goalie Cap: </label>
              <input className='form-control' type='number' name='goalieCount' id='goalieCount' min={0} value={game.goalieCount} onChange={this.handleChange} required  />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='costPerPlayer'>Cost Per Player: </label>
              <div>
                <Icon className='fas fa-dollar-sign'></Icon>
                <input style={{maxWidth: '100px', paddingLeft: '20px'}} className='form-control' type='number' name='costPerPlayer' id='costPerPlayer' min={0} value={game.costPerPlayer} onChange={this.handleChange} required />
              </div>
              {costMessage}
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='type'>Type: <i className='fas fa-info-circle' style={{color: '#c0c0c0', marginLeft: '10px'}} data-tip='<h5 style="text-align:center;">What&apos;s the difference between public and private?</h5><p>Public games can be viewed and joined by the entire HC community; private games are invite-only.</p>'></i></label>
              <select className='form-control' name='type' id='type' value={game.type} onChange={this.handleChange} required >
                <option value=''></option>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-4'>
              <label htmlFor='type'>Skill Level: <i className='fas fa-info-circle' style={{color: '#c0c0c0', marginLeft: '10px'}} data-tip='Hover over each option to see what it means.' onClick={this.showSkillLevels}></i></label>
              <select className='form-control' name='skillLevel' id='skillLevel' value={game.skillLevel} onChange={this.handleChange} required >
                <option value=''></option>
                {skillLevels.map((l,i) => <option value={i+1} title={l.description} data-tip={l.description}>{l.level}</option>)}
              </select>
            </div>
            {this.state.type === 'private' &&
              <>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' name='privateNotifyAll' id='privateNotifyAll' checked={game.privateNotifyAll} onChange={this.handleChange} />
                  <label className='form-check-label' htmlFor='privateNotifyAll'>Convert to Public if Not Full <i className='fas fa-info-circle' style={{color: '#c0c0c0', marginLeft: '10px'}} data-tip='If this is checked and the game is not full 24 hours before skate time, we will send an invite to local skaters to come fill out your roster.'></i></label>
                </div>
                <div className='form-group col-md-12'>
                  <label htmlFor='emailList'>Paste your friends' emails here. Don't worry if there are duplicates or extra stuff in there; we'll figure it out for you.</label>
                  <textarea rows={6} className='form-control' name='emailList' id='emailList' onChange={this.handleChange} defaultValue={this.props.user.profile.emailList}></textarea>
                </div>
              </>
            }
            <div className='form-group col-md-12'>
              <label htmlFor='comment'>Organizer Note: </label>
              <textarea rows={6} className='form-control' name='comment' id='comment' onChange={this.handleChange} value={game.comment}></textarea>
            </div>
          </div>
          <div className='buttons-section' style={{textAlign: 'center'}}>
            <button type='submit' className='btn btn-primary'>{buttonText}</button>
            {!isNew && <button className='btn btn-danger' onClick={this.cancelGame}>Cancel Game</button>}
          </div>
        </form>
        
        <ReactTooltip html={true} />
      </div>
    )
  }
}
export default connect(mapStateToProps, actions)(requireAuth(GameDetail));
