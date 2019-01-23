import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }
    const id = this.props.match && this.props.match.params ? this.props.match.params.id : null;
    this.props.doLogin(user, () => {
      if (id) {
        this.props.history.push(`/game/join/${id}`);
      } else {
        this.props.history.push('/games');
      }
    });
  }

  render() {
    const {errorMessage} = this.props;
    return (
      <div className='Login'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Login - Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/login' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='usernameOrEmail'>Username or Email: </label>
            <input className='form-control' type='text' name='usernameOrEmail' id='usernameOrEmail' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
          {errorMessage && <span style={{marginLeft: '20px', fontSize: '20px', color: 'red'}}>{errorMessage}</span>}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps, actions)(Login);
