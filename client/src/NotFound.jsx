import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className='container-fluid' style={{height: '90vh', background: 'rgba(0,0,0,0.8)', color: 'white', textAlign: 'center'}}>
    <h1 style={{padding:'100px 0'}}>We've "checked" everywhere, but there's nothing at this address. Sorry!</h1>
    <Link to='/' style={{color: 'white'}}>Head Home</Link>
  </div>
  
)
