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
      playerName: this.props.user.fullName || '',
      email: this.props.user.email || '',
      message: 'Hello, I\'d like to join your game please.'
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
    this.props.sendEmail(this.props.game, this.state, () => {
      console.log('Message Sent');
    });
  }

  render() {
    let {game} = this.props;
    if (!game) game = {};
    const { playerName, email, message } = this.state;
    return (
      <div className='modal fade' id='contact-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Contact {game.host}</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='message blue'>
              <strong style={{fontSize:'18px'}}>{game.name}</strong> is a private game. You can use this form to send an email to the host requesting permission to join.
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Your Name: </label>
                <input className='form-control' type='text' name='playerName' id='playerName' value={playerName} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Your Email: </label>
                <input className='form-control' type='email' name='email' id='email' value={email} onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message for {game.host}: </label>
                <textarea className='form-control' name='message' id='message' value={message} onChange={this.handleChange} />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-success' onClick={this.handleSubmit} data-dismiss='modal'>Send Email</button>
            <button className='btn btn-danger' data-dismiss='modal' >Cancel</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(ContactModal);
