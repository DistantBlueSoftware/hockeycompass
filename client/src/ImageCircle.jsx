import React from 'react';
import styled from 'styled-components';
import { Colors } from './framework';

const ImageCircleStyled = styled.div`
  border-radius: 100%;
  border: 2px solid ${Colors.blue};
  background: no-repeat center center;
  background-size: cover;
  &.yellow-border {
    border: 2px solid ${Colors.yellow};
  }
  &.orange-border {
    border: 2px solid ${Colors.orange};
  }
`

export const ImageCircle = ({image, width=200, height=200, className}) => (
  <ImageCircleStyled className={className} style={{width, height, backgroundImage: `url(${image})`}} />
)
