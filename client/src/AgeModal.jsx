import React, { Component } from 'react';
import styled from 'styled-components'

const ModalImage = styled.img`
  max-width: 200px;
  margin: 20px;
`

class AgeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendEmail(this.props.game, {...this.state, privateContact: true}, () => {
      console.log('Message Sent');
    });
  }

  render() {
    return (
      <div className='modal fade' id='age-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-body'>
            <h2>Heck Yes!</h2>
            <ModalImage src='skatestick.jpg' />
            <p>{this.props.selectedAge} is a great age for hockey!</p>
          </div>
          <div className='modal-footer' style={{justifyContent: 'center'}}>
            <button className='btn btn-primary' data-dismiss='modal'>Awesome!</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default AgeModal;
