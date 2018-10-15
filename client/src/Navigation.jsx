import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import * as actions from './actions';

const mapStateToProps = state => {
  return state;
}


const Navigation = ({user, doLogout}) => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <NavLink className='navbar-brand' to='/'><img src={logo} width={'128px'} alt='Hockey Compass' /></NavLink>
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
    <span className='navbar-toggler-icon'></span>
  </button>
  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    <ul className='navbar-nav mr-auto'>
      <NavLink className='nav-link' to='/'><li className='nav-item'>Home</li></NavLink>
      <NavLink className='nav-link' to='/games'><li className='nav-item'>Games</li></NavLink>
      <NavLink className='nav-link' to='/venues'><li className='nav-item'>Venues</li></NavLink>
      {user.authenticated && <NavLink className='nav-link' to='/profile'><li className='nav-item'>Profile</li></NavLink>}
      
    </ul>
    {user.authenticated ?
      <React.Fragment>
        <span className='navbar-text' style={{marginRight: '20px'}}>Welcome, {user.username}</span>
        <button className='btn btn-outline-success' type='button' onClick={doLogout}>Logout</button>
      </React.Fragment> :
      <React.Fragment>
        <NavLink className='nav-link' to='/login'><span>Login</span></NavLink>
        <NavLink className='nav-link' to='/register'><span>Register</span></NavLink>
      </React.Fragment>
    }
  </div>
  </nav>
)

export default connect(mapStateToProps, actions)(Navigation);
