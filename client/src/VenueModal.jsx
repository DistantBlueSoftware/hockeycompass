import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class VenueModal extends Component {
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
  }

  selectVenue = (e) => {
    // select the venue in redux so it can be used in EditVenue.js
    this.props.selectVenue(this.props.venue);
    this.props.redirectToEditVenue();
  }

  render() {
    let {venue, user} = this.props;
    if (!venue) venue = {};
    return (
      <div className='modal fade' id='venue-modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{venue.name}</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='venue-info'>
              <h5>Address:</h5> 
              {venue.address}<br />
              {venue.city}, {venue.state} {venue.zip}
              <br />
              <h5>Phone:</h5>
              {venue.phone}
              <br />
              <h5>Website: </h5>
              <a href={venue.url} target='_blank'>{venue.url}</a>
            </div>
          </div>
          <div className='modal-footer'>
            {user.authenticated && 
            // What is best practice here.  Should I use <Redirect> instead of <Link> since I'm also calling a function?
              <button className='btn btn-primary' data-dismiss='modal' onClick={this.selectVenue}>Edit Venue</button>
            }
            <button className='btn btn-danger' data-dismiss='modal' >Close</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(VenueModal);
