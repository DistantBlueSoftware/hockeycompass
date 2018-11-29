import React from 'react';


const InputField = (props) => {
  const handleChange = (event) => {
    props.handleChange(event);
  }
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{props.title} </label>
      <input className='form-control' type={props.type} name={props.name} defaultValue={props.defaultValue} onChange={handleChange} />
    </div>
  )
}

export default InputField;