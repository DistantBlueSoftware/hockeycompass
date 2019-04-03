import React from 'react'
import moment from 'moment'

export const Footer = () => (
  <div style={{fontSize: '10px'}}>&copy;{moment().format('YYYY')} hockeycompass all rights reserved</div>
)