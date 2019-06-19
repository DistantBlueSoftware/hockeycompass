import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from './'

const RangeSliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
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
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 20px;
    border: 1px solid ${Colors.blue};
    border-radius: 50%;
    background: ${Colors.yellow};
  }
  &::-moz-range-thumb {
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid ${Colors.blue};
    background: ${Colors.yellow};
  }
  &::-ms-thumb {
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid ${Colors.blue};
    background: ${Colors.yellow};
  }
`

export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 30
    }
  }
  
  handleChange = (e) => {
      const value = e.target.value;
      this.setState({
        value
      });
  }
  
  render() {
    const { min = 0, max = 50, name = 'value', id = 'myslider' } = this.props;
    const { value } = this.state;

    return (
      <RangeSliderInput type="range" min="3" max="100" value={value} name={name} id={id} onChange={this.handleChange} />
    )
  }
}