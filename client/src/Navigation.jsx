import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo-nav.png';
import * as actions from './actions';

const Navbar = styled.nav`
  background-color: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6));
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  transition: all 0.3s;
`

const NavResponsive = styled.div`
  width: 100vw;
  height: 100vh;
  -webkit-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  position: absolute;
  top: -1000px;
  left: 0;
  &.active {
    top: 0;
    background: rgba(25, 81, 139, 0.75);
  }
  @media (min-width: 801px) {
    top: 0;
  }
`

const NavList = styled.ul`
  list-style-type: none;
  position: absolute;
  top: -1000px;
  left: 0;
  display: flex;
  &.active {
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    top: 0;
  }
  @media (min-width: 801px) {
    top: 12px;
    left: 36px;
  }
`

const Hamburger = styled.div`
  z-index: 1000;
  cursor: pointer;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &.active{
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:before {
    content: "";
    position: absolute;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border: 3px solid transparent;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    border-radius: 100%;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  &.active:before{
    border: 2px solid #ecf0f1;
  }
  
  @media (min-width: 801px) {
    display: none;
  }
`

const HamburgerLine = styled.div`
  width: 30px;
  height: 3px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &.active:nth-child(2){
    opacity: 0;
  }
  &.active:nth-child(1) {
    -webkit-transform: translateY(11px);
    -ms-transform: translateY(11px);
    -o-transform: translateY(11px);
    transform: translateY(11px);
  }
  &.active:nth-child(3){
    -webkit-transform: translateY(-11px) rotate(90deg);
    -ms-transform: translateY(-11px) rotate(90deg);
    -o-transform: translateY(-11px) rotate(90deg);
    transform: translateY(-11px) rotate(90deg);
  }
`

const LoginSection = styled.div`
  position: absolute;
  right: 0;
  margin: 10px;
  z-index: 100;
`

const mapStateToProps = state => {
  return state;
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navColor: this.props.location.pathname === '/' ? 'transparent' : 'rgb(25, 81, 139)',
      navOpen: false
    }
  }
  
  componentDidMount() {
    document.addEventListener('scroll', () => {
      const navColor = window.scrollY < window.innerHeight - 200 ? 'transparent' : 'rgb(25, 81, 139)';
      if (this.props.location.pathname === '/' && navColor !== this.state.navColor) this.setState({navColor}) 
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname){
    this.setState({
      navColor: this.props.location.pathname === '/' ? 'transparent' : 'rgb(25, 81, 139)',
      navOpen: false
    })}
  }
  
  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }
  
  render() {
    const {user, doLogout, location} = this.props;
    const { navColor, navOpen } = this.state;
    const navActive = navOpen ? 'active' : '';
    return (
      <Navbar style={{background: navColor}}>
        <Hamburger className={navActive} onClick={this.toggleNav}>
          <HamburgerLine className={navActive}/>
          <HamburgerLine className={navActive}/>
          <HamburgerLine className={navActive}/>
        </Hamburger>
        <NavLink to='/' style={{paddingTop: '1rem'}}>
          <img src={logo} alt='Hockey Compass' />
        </NavLink>
      <NavResponsive className={navActive}>
        <NavList className={navActive}>
          <NavLink className='nav-link' to='/'><li className='nav-item'>Home</li></NavLink>
          <NavLink className='nav-link' to='/games'><li className='nav-item'>Games</li></NavLink>
          <NavLink className='nav-link' to='/venues'><li className='nav-item'>Venues</li></NavLink>
          {user.authenticated && 
            <React.Fragment>
            <NavLink className='nav-link' to='/profile'><li className='nav-item'>Profile</li></NavLink>
            {user.role === 1 && <NavLink className='nav-link' to='/admin'><li className='nav-item'>Admin</li></NavLink>}
            </React.Fragment>
          }
          
        </NavList>
        {user.authenticated ?
          <LoginSection>
            <span style={{marginRight: '20px', color: 'white'}}>Welcome, {user.username}</span>
            <button className='btn btn-primary' type='button' onClick={doLogout}>Logout</button>
          </LoginSection> :
          <LoginSection>
            <NavLink className='nav-link' to='/login'><span>Login</span></NavLink>
            <NavLink className='nav-link' to='/register'><span>Register</span></NavLink>
          </LoginSection>
        }
      </NavResponsive>
      </Navbar>
    )
  }
}
export default connect(mapStateToProps, actions)(withRouter(Navigation));
