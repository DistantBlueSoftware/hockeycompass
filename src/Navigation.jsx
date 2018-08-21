import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import { doLogout } from './actions';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(doLogout())
  }
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
    </ul>
    {user &&
      <button className='btn btn-outline-success' type='button' onClick={doLogout}>Logout</button>
    }
  </div>
  </nav>
)

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
