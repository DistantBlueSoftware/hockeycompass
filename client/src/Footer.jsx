import React from 'react'
import moment from 'moment'

export const Footer = () => (
  <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px', width: '96vw'}}>
    <div style={{fontSize: '10px'}}>&copy;{moment().format('YYYY')} Hockeycompass, LLC. All rights reserved.</div>
    <div style={{fontSize: '10px'}}>built by <a href='https://distantbluesoftware.com'>distantblue software</a></div>
  </div>
)