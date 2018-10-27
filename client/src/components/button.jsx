import React, { Component } from 'react';

const Button = (props) => {
  const handleClick = () => {
    props.handleClick(props.data)
  }
  return (
    <button 
      className={props.className}
      data-dismiss={props.dataDismiss}
      onClick={handleClick}
    >{props.text}</button>

  )
}

export default Button;