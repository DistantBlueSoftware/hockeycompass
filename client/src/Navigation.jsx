import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import logo from './logo.png';
import * as actions from './actions';

const navStyle = {
  backgroundColor: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6))',
  position: 'fixed',
  top: 0,
  width: '100vw',
  zIndex: 1000,
  height: '80px',
  borderBottom: '1px solid rgba(255,255,255,0.5)',
  transition: 'all 0.3s'
}

const mapStateToProps = state => {
  console.log(state)
  return state;
}


const Navigation = ({user, doLogout, location}) => {
  console.log(location.pathname)
  const navColor = location.pathname === '/' ? 'transparent' : 'rgb(25, 81, 139)';
  return (
    <nav style={{...navStyle, background: navColor}} className='navbar navbar-expand-lg navbar-light'>
      <NavLink className='navbar-brand' to='/' style={{paddingTop: '1rem'}}><img src={logo} width={'128px'} alt='Hockey Compass' /></NavLink>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon'></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul className='navbar-nav mr-auto'>
        <NavLink className='nav-link' to='/'><li className='nav-item'>Home</li></NavLink>
        <NavLink className='nav-link' to='/games'><li className='nav-item'>Games</li></NavLink>
        <NavLink className='nav-link' to='/venues'><li className='nav-item'>Venues</li></NavLink>
        {user.authenticated && 
          <React.Fragment>
          <NavLink className='nav-link' to='/profile'><li className='nav-item'>Profile</li></NavLink>
          {user.role === 1 && <NavLink className='nav-link' to='/admin'><li className='nav-item'>Admin</li></NavLink>}
          </React.Fragment>
        }
        
      </ul>
      {user.authenticated ?
        <React.Fragment>
          <span className='navbar-text' style={{marginRight: '20px', color: 'white'}}>Welcome, {user.username}</span>
          <button className='btn btn-primary' type='button' onClick={doLogout}>Logout</button>
        </React.Fragment> :
        <React.Fragment>
          <NavLink className='nav-link' to='/login'><span>Login</span></NavLink>
          <NavLink className='nav-link' to='/register'><span>Register</span></NavLink>
        </React.Fragment>
      }
    </div>
    </nav>
)
}
export default connect(mapStateToProps, actions)(withRouter(Navigation));
