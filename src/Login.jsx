import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { doLogin } from './actions';

const mapDispatchToProps = dispatch => {
  return {
    doLogin: user => dispatch(doLogin(user))
  }
}

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
      name: 'Person 1',
      username: 'p1p1p1',
      email: this.state.email
    }
    this.props.doLogin(user);
  }

  render() {
    return (
      <div className='Login'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Login - Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/login' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input className='form-control' type='email' name='email' id='email' placeholder='email@address.com' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login);
