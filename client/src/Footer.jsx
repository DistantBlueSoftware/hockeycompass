import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterLinks = styled.ul`
  list-style-type: none;
  font-size: 12px;
`

export const Footer = () => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', margin: '10px', width: '96vw'}}>
    <FooterLinks>
      <Link to='/privacy'><li>Privacy</li></Link>
      <Link to='/terms'><li>Terms & Conditions</li></Link>
    </FooterLinks>
    <div style={{fontSize: '10px'}}>&copy;{moment().format('YYYY')} Hockeycompass, LLC. All rights reserved.</div>
    <div style={{fontSize: '10px'}}>built by <a href='https://distantbluesoftware.com'>distantblue software</a></div>
  </div>
)