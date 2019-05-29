import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import * as actions from './actions';
import {emailRegexTest} from './lib';
import ResetModal from './ResetModal';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }
  
  componentDidMount() {
    this.props.routeChange('/login');
  }

  handleChange = (e) => {
    this.setState({
      errorMessage: '',
      infoMessage: ''
    })
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }
    const {id, route} = this.props.match && this.props.match.params ? this.props.match.params : null;
    this.props.doLogin(user, () => {
      if (id) {
        this.props.history.push(`/game/join/${id}`);
      } else if (route) {
        this.props.history.push(`/${route}`);
      }
      else {
        this.props.history.push('/games');
      }
    }, () => this.setState({errorMessage: 'Hmm, we didn\'t recognize that info. Try again?'}));
  }
  
  passwordReset = (email) => {
    let infoMessage;
    // if (email.match(emailRegexTest)) {
      this.props.resetPassword(this.state.usernameOrEmail);
      infoMessage = 'We\'ve sent a reset email to the address you entered. Check it and follow the instructions therein!'
    // }
    // else infoMessage = 'Enter your email and click reset'
    this.setState({infoMessage, errorMessage: ''})
  }

  render() {
    const {errorMessage, infoMessage} = this.state;
    return (
      <div className='Login'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Login - Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/login' />
        </Helmet>
        {errorMessage && <div className='message red'>{this.state.errorMessage}</div>}
        {infoMessage && <div className='message orange'>{this.state.infoMessage}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='usernameOrEmail'>Username or Email: </label>
            <input className='form-control' type='text' name='usernameOrEmail' id='usernameOrEmail' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button type='submit' className='btn btn-primary'>Login</button>
            <div data-toggle='modal' data-target='#reset-modal' style={{marginLeft: '20px', cursor: 'pointer', color: 'rgb(25, 81, 139)'}}>Forgot your password?</div>
          </div>
        </form>
      <ResetModal passwordReset={this.passwordReset} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps, actions)(Login);
