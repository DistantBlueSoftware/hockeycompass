import React, { Component } from 'react';
import { connect } from 'react-redux';
import utils from '@distantbluesoftware/dbsutil';
import * as actions from './actions';

const mapStateToProps = state => {
  return { ...state };
}

class Profile extends Component {
  constructor(props) {
    super(props);
    const { profile } = this.props.user;
    this.state = {
      emails: '',
      notify: profile && profile.notify
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
    const { notify } = this.state;
    let currentList = this.props.user.profile && this.props.user.profile.emails || [];
    let invalidEmails = [];
    const emails = utils.removeWhitespace(this.state.emails).split(',');
    emails.filter(email => email.length > 0).forEach(email => {
      if (!utils.validateEmail(email)) {
        invalidEmails.push(email)
      }
    });
    if (invalidEmails.length) {
      this.setState({
        errorMessage: `The following emails are invalid: ${invalidEmails.join('\n ')} \nPlease correct and retry.`
      });
    } else {
      emails.forEach(email => {
        if (currentList.indexOf(email) === -1) {
          currentList.push(email);
        }
      })
      this.props.saveProfile(this.props.user.username, {emails: currentList, notify}, () => {
        this.setState({
          errorMessage: ''
        })
      });
    }
    
  }

  render() {
    const { user } = this.props;
    const { emails, notify, errorMessage } = this.state;
    const EmailList = user.profile && user.profile.emails.length && user.profile.emails.map(email => <li>{email}</li>)
    return (
      <div>
        <h1>{user.username} - profile</h1>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        {user.profile && user.profile.emails && user.profile.emails.length > 0 && <ul>{EmailList}</ul>}
        <form onSubmit={this.handleSubmit}>
          <div className='form-check'>
            <input type='checkbox' className='form-check-input' name='notify' id='notify' checked={notify} onChange={this.handleChange} />
            <label className='form-check-label' htmlFor='notify'>Send me game notifications</label>
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='emails'>Paste emails here (separated by commas):</label>
            <textarea className='form-control' name='emails' value={emails} onChange={this.handleChange}></textarea>
          </div>
          <button className='btn btn-success' type='submit'>Save Changes</button>
        </form>
      </div>
    )
  }
} 

export default connect(mapStateToProps, actions)(Profile);