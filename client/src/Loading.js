import React from 'react'

const style={backgroundColor: 'rgba(201, 48, 44, 0.6)', position: 'fixed', top: '0px', textAlign: 'center', left: '0px', color: '#fff', width: '100%', height: '100%', margin: '0 auto', paddingTop: '200px', transition: 'all 0.5s', zIndex: '999'}

const letterStyle = {animation: 'loading 1.6s infinite linear'}

export const Loading = () => (
  <div style={style}>
    <h1>
      <span style={{...letterStyle, animationDelay: '.48s'}}>L</span>
      <span style={{...letterStyle, animationDelay: '.6s'}}>o</span>
      <span style={{...letterStyle, animationDelay: '.72s'}}>a</span>
      <span style={{...letterStyle, animationDelay: '.84s'}}>d</span>
      <span style={{...letterStyle, animationDelay: '.96s'}}>i</span>
      <span style={{...letterStyle, animationDelay: '1.08s'}}>n</span>
      <span style={{...letterStyle, animationDelay: '1.2s'}}>g</span>
      <span style={{...letterStyle, animationDelay: '1.32s'}}>.</span>
      <span style={{...letterStyle, animationDelay: '1.44s'}}>.</span>
      <span style={{...letterStyle, animationDelay: '1.56s'}}>.</span></h1>
  </div>
)
