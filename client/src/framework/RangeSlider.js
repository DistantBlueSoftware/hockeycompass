import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from './'

const RangeSliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;   
  background: ${Colors.blue};
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`

export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0
    }
  }
  
  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }
  
  render() {
    const { min = 0, max = 50, value = (max - min) / 2, id = 'myslider' } = this.props;

    return (
      <RangeSliderInput type="range" min="3" max="100" value={value} id={id} onChange={this.handleChange} />
    )
  }
}