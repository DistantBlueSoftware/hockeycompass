import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.fullName || '',
      email: this.props.user.email || '',
      phone: '',
      message: '',
      feedback: '',
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
    if (!this.state.name || !this.state.email || !this.state.message) {
      this.setState({errorMessage: 'Please fill out all required fields'});
      return;
    }
    this.props.sendContactEmail(this.state, () => {
      this.setState({feedback: 'Thanks for reaching out! We will be in touch ASAP!'})
    });
  }

  render() {
    const { name, email, phone, message, feedback, errorMessage } = this.state;
    return (
      <div className='modal fade' id='contact-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Contact Us</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {!feedback && <form onSubmit={this.handleSubmit}>
              {errorMessage && 
                <div className='message red'>
                  {errorMessage}
                </div>
              }
              <div className='form-group'>
                <label htmlFor='name'>Name:* </label>
                <input className='form-control' type='text' name='name' id='name' value={name} required onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email:* </label>
                <input className='form-control' type='email' name='email' id='email' value={email} required onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone: </label>
                <input className='form-control' type='tel' name='phone' id='phone' value={phone} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>What's on your mind?* </label>
                <textarea className='form-control' name='message' id='message' value={message} required onChange={this.handleChange} />
              </div>
            </form>}
            {feedback && <p>{feedback}</p>}
          </div>
          <div className='modal-footer' style={{justifyContent: 'center'}}>
            {!feedback ? <button className='btn btn-success' style={{minWidth: '150px'}} onClick={this.handleSubmit}>Send!</button>
              : <button className='btn btn-danger' style={{minWidth: '150px'}} data-dismiss='modal' >Close</button>
            }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(ContactModal);
