import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactTooltip from 'react-tooltip';
import * as actions from './actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerType: 'player',
      validationError: ''
    }
  }

  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        validationError: '',
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {password, passwordConfirm} = this.state;

    if (password !== passwordConfirm) {
      this.setState({
        validationError: 'Passwords do not match.'
      });
    } else {
      const newUser = {...this.state, profile: {emails: [], notify: true}, metrics: {loginCount: 1, joinDate: new Date()}}
      this.props.doRegister(newUser, () => {
        this.props.history.push('/games');
      });
    }
  }
  
  componentDidMount() {
    //phone number formatter
    // document.getElementById('phone').addEventListener('input', function (e) {
    //   var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    //   e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    // });
  }

  render() {
    const {errorMessage} = this.props;
    const {validationError, referralType, playerType} = this.state;
    return (
      <div>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Register - Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/register' />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='playerType'>Player Type: </label>
              <select className='form-control' value={playerType} name='playerType' id='playerType' onChange={this.handleChange} >
                <option value='player'>Player</option>
                <option value='goalie'>Goalie</option>
              </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>First Name: </label>
            <input className='form-control' type='text' name='firstName' id='firstName' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Last Name: </label>
            <input className='form-control' type='text' name='lastName' id='lastName' onChange={this.handleChange} />
          </div>
          {/*<div className='form-group'>
            <label htmlFor='phone'>Phone: </label>
            <input className='form-control' type='tel' name='phone' id='phone' onChange={this.handleChange} />
          </div>*/}
          
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input className='form-control' type='email' name='email' id='email' placeholder='email@address.com' required onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='zipCode'>Zip Code: <i className='fas fa-info-circle' style={{color: '#c0c0c0', marginLeft: '10px'}} data-tip='<h5 style="text-align:center;">Why do we ask for this?</h5><p>We use your zip code to alert you of open games near you!</p>'></i></label>
            <input className='form-control' type='text' name='zipCode' id='zipCode' maxLength={5} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='username'>Username: </label>
            <input className='form-control' type='text' name='username' id='username' required onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input className='form-control' type='password' name='password' id='password' required onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordConfirm'>Confirm Password: </label>
            <input className='form-control' type='password' name='passwordConfirm' id='passwordConfirm' required onChange={this.handleChange} />
          </div>
        
          <div className='form-group'>
            <label htmlFor='location'>How did you hear about Hockey Compass? </label>
            <select className='form-control' name='referralType' id='referralType' onChange={this.handleChange} >
              <option value='friend'>Word of Mouth</option>
              <option value='search'>Google / Search</option>
              <option value='other'>Other</option>
            </select>
          </div>
          {referralType === 'other' &&
            <div className='form-group'>
              <label htmlFor='referralTypeOther'>Please Describe: </label>
              <input className='form-control' type='text' name='referralTypeOther' id='referralTypeOther' onChange={this.handleChange} />
            </div>
          }
          {validationError && <div style={{fontSize: '20px', color: 'red'}}>{validationError}</div>}
          <button type='submit' className='btn btn-primary'>Register</button>
          {errorMessage && <span style={{marginLeft: '20px', fontSize: '20px', color: 'red'}}>{errorMessage}</span>}
        </form>
        <ReactTooltip html={true} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps, actions)(Register);
