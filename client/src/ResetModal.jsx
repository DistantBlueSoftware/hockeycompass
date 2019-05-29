import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import {emailRegexTest} from './lib';

const mapStateToProps = state => {
  return {...state};
}

class ResetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email || '',
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({message: ''})
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (!email) return this.setState({message: 'Enter an email!'})
    if (email.match(emailRegexTest)) {
      this.props.passwordReset(this.state.email);
      window.$("#reset-modal").modal('hide');
    } else this.setState({message: 'Check your email format -- emails must be of a valid type!'})
    
  }

  render() {
    const { email, message } = this.state;
    return (
      <div className='modal fade' id='reset-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Reset Password</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
          {message && <div className='message red'>{message}</div>}
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Your Email: </label>
                <input className='form-control' type='email' name='email' id='email' value={email} required onChange={this.handleChange} />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-success' onClick={this.handleSubmit}>Reset Password</button>
            <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, null)(ResetModal);
