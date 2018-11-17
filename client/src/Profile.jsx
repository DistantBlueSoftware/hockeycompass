import React, { Component } from 'react';
import { connect } from 'react-redux';
import utils from '@distantbluesoftware/dbsutil';
import _ from 'underscore';
import * as actions from './actions';

const mapStateToProps = state => {
  return { ...state };
}

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      payoutsEmail: user.profile && user.profile.payoutsEmail ? user.profile.payoutsEmail : user.email,
      emailList: '',
      notify: user.profile && user.profile.notify
    }
  }
  
  togglePayoutsEmail = () => {
    const payoutsEmailField = document.getElementById('payoutsEmail');
    const payoutButton = document.getElementById('payoutsEmailButton');
    if (payoutButton.innerText === 'Update') {
      this.props.saveProfile(
        this.props.user.username, 
        {payoutsEmail: payoutsEmailField.value}, 
        () => {
          payoutsEmailField.style.display = 'none';
          payoutButton.innerText = 'Update your Payouts Email here';
        })
    } else {
      payoutsEmailField.style.display = 'block';
      payoutButton.innerText = 'Update';
    }
  }
  
  removeEmail = email => {
    const currentList = this.props.user.profile.emailList.filter(address => address !== email);
    this.props.saveProfile(this.props.user.username, {emailList: currentList}, () => {
      this.setState({
        errorMessage: ''
      })
    });
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
    const { notify } = this.state;
    let currentList = this.props.user.profile ? this.props.user.profile.emailList : [];
    let invalidEmails = [];
    const emailList = utils.removeWhitespace(this.state.emailList).split(',');
    emailList.filter(email => email.length > 0).forEach(email => {
      if (!utils.validateEmail(email) || email === '') {
        invalidEmails.push(email)
      }
    });
    if (invalidEmails.length) {
      this.setState({
        errorMessage: `The following emails are invalid: ${invalidEmails.join('\n ')} \nPlease correct and retry.`
      });
    } else {
      emailList.forEach(email => {
        if (currentList.indexOf(email) === -1) {
          currentList.push(email);
        }
      })
      this.props.saveProfile(this.props.user.username, {emailList: currentList, notify}, () => {
        this.setState({
          errorMessage: ''
        })
      });
    }
    
  }

  render() {
    const { user } = this.props;
    const { emailList, notify, errorMessage, payoutsEmail } = this.state;
    const EmailList = user.profile && user.profile.emailList.length && user.profile.emailList.map(email => <EmailPill email={email} removeEmail={this.removeEmail}></EmailPill>)
    let payoutsList, payoutsTotal, payoutGames;
    if (user.profile && user.profile.payments && user.profile.payments.length > 0) {      
      payoutGames = _.uniq(user.profile.payments, 'game').map(p => p.game);
      payoutsList = user.profile.payments.map(payment => <div>{payment.from} - ${payment.amount}</div>)
      payoutsTotal = user.profile.payments.reduce((acc, payment) => acc + payment.amount, 0)
    }
    const emailContainerStyle = {
      display: 'flex',
      flexFlow: 'row wrap'
    }
    return (
      <div className='container-fluid'>
        <h1>{user.username} - profile</h1>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        {user.profile && user.profile.emailList && user.profile.emailList.length > 0 &&
          <div style={{padding: '20px'}}>
            <h3>Email List:</h3>
            <div style={emailContainerStyle}>{EmailList}</div>
          </div>
        }
        {user.profile && user.profile.payments && user.profile.payments.length > 0 &&
          <div style={{padding: '20px'}}>
            <h3>Pending Payouts: <span style={{color: '#218838'}}>${payoutsTotal}</span></h3>
            <p>You'll receive ${payoutsTotal} from your players the next time we send payouts, usually less than 48 hours.</p>
            <div className='form-group'>
              <label className='form-label' htmlFor='payoutsEmail'>Payouts Email: {payoutsEmail}</label>
              <input style={{display: 'none'}} type='text' id='payoutsEmail' className='form-control' name='payoutsEmail' value={payoutsEmail} onChange={this.handleChange}></input>
            </div>
            <button className='btn btn-primary' id='payoutsEmailButton' onClick={this.togglePayoutsEmail}>Update your Payouts Email here</button>
            {payoutGames && payoutGames.map(g => {
              return (
              <div>
                <h3>{g}</h3>
                {user.profile.payments.filter(p => p.game === g).map(p => <div>{p.from} - ${p.amount}</div>)}
              </div>)
              })}
          </div>
        }
        <div style={{padding: '20px'}}>
          <h3>Preferences:</h3>
          <form onSubmit={this.handleSubmit}>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' name='notify' id='notify' checked={notify} onChange={this.handleChange} />
              <label className='form-check-label' htmlFor='notify'>Send me game notifications</label>
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='emailList'>Paste emails here (separated by commas):</label>
              <textarea className='form-control' name='emailList' value={emailList} onChange={this.handleChange}></textarea>
            </div>
            <button className='btn btn-success' type='submit'>Save Changes</button>
          </form>
        </div>
      </div>
    )
  }
} 

const EmailPill = ({email, removeEmail}) => {
  const containerStyle={
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '.2em',
    padding: '4px 8px',
    color: 'black',
    background: 'transparent',
    borderRadius: '5px',
    border: '1px solid #154B8B'
  }
  const xStyle = {
    marginLeft: '.5em',
    color: '#d53939'
  }
  return (
    <div style={containerStyle}>
          <span>{email}</span>
          <i style={xStyle} className='fas fa-times' onClick={() => removeEmail(email)}></i>
    </div>
  )
}

export default connect(mapStateToProps, actions)(Profile);