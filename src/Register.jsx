import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { doRegister } from './actions';

const mapDispatchToProps = dispatch => {
  return {
    doRegister: user => dispatch(doRegister(user))
  }
}

class Register extends Component {
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
    this.props.doRegister(this.state);
    this.props.history.push('/games');
  }
  render() {
    return (
      <div>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Register - Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/register' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input className='form-control' type='email' name='email' id='email' placeholder='email@address.com' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Username: </label>
            <input className='form-control' type='text' name='username' id='username' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' onChange={this.handleChange} />
          </div>
          <button type='submit' className='btn btn-primary'>Register</button>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Register);
