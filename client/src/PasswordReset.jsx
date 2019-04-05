import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as actions from './actions'

const InvalidToken = () => (
  <p>Sorry, this token is invalid or has expired. <Link to='/login'>Try again?</Link></p>
)

const ResetForm = ({password, confirmPass, message, handleChange, handleSubmit}) => (
  <>
    <h1>Reset your password</h1>
    {message && <div className='message red'>{message}</div>}
    <form>
      <label htmlFor='password'>New Password: </label>
      <input className='form-control' type='password' id='password' name='password' value={password} onChange={handleChange}></input>
      <label htmlFor='confirmPass'>Confirm Password: </label>
      <input className='form-control' type='password' id='confirmPass' name='confirmPass' value={confirmPass} onChange={handleChange}></input>
      <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
    </form>
  </>
)

const Container = styled.div`
	display: flex;
  flex-flow: column;
	align-items: center;
	justify-content: center;
  margin: 110px auto 0 auto;
	padding: 10px;
  border-radius: 5px;
  border: 2px solid #154b8b;
  transition: all 0.3s;
	max-width: 800px;
`

class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirmPass: '',
      message: '',
      loggedIn: false
    }
  }
  
  componentDidMount() {
    this.props.getResetToken(this.props.match.params.token)
  }
  
  handleChange = (e) => {
    this.setState({
      message: ''
    })
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPass } = this.state;
    if (password === confirmPass) {
      let user = {
        usernameOrEmail: this.props.user.username,
        password
      }
      this.props.changePassword(
        this.props.match.params.token, 
        password, 
        () => this.props.doLogin(user, () => {
          this.setState({loggedIn: true})
      }));
    } else {
      this.setState({message: 'Passwords don\'t match, try again!'})
    }
  }
  
  render() {
    const {user} = this.props;
    const { password, confirmPass, message, loggedIn } = this.state;
    const tokenIsValid = user && (!user.errorMessage || !user.errorMessage.length);
    return (
      <Container className='container-fluid'>
        {loggedIn ? 
          <>
            <h1>Success!</h1>
            <p>Your password has been changed.</p>
          </>
          : tokenIsValid ? 
          <ResetForm 
            message={message} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} 
            password={password} 
            confirmPass={confirmPass} /> 
          : 
          <InvalidToken />
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {...state}
}

export default connect(mapStateToProps, actions)(PasswordReset);