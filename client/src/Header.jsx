import React from 'react';
import './Header.css';
import logo from './logo.png';

export const Header = () => (
  <header className='Header-header'>
    <img src={logo} className='Header-logo' alt='logo' />
    <h1 className='Header-title'>Hockey Compass</h1>
  </header>
)
