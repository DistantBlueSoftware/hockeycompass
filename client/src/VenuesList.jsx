import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import VenueModal from './VenueModal';
import _ from 'underscore'

const mapStateToProps = state => {
  return {...state};
}

class VenuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      modalData: props.venues.all[1],
      currentSort: 'name',
      search: ''
    }
  }
  componentDidMount() {
    this.props.listVenues();
  }
  
  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }
  
  setLoadingState = bool => {
    this.setState({
      loading: bool
    })
  }
setCurrentVenue = (venue, needsAuth) => {
    this.setState({
      modalData: venue
    });
    if (needsAuth && !this.props.user.authenticated) {
      this.props.history.push(`/login`);
    }
  }
  
  filterVenues = venue => {
    return venue.name.toLowerCase().includes(this.state.search.toLowerCase())
  }

  render() {
    const { venues, user } = this.props;
    const { modalData, showModal, currentSort } = this.state;
    return (
    <div className='VenuesList container-fluid'>
      <Helmet>
      <meta charSet='utf-8' />
      <title>Hockey Arenas - Hockey Compass - Navigate to Hockey</title>
      <link rel='canonical' href='https://hockeycompass.com/venues' />
      </Helmet>
      <h1>Minnesota Ice Arenas</h1>
      <label htmlFor='search'>Search: </label>
      <input type='text' name='search' id='search' onChange={this.handleChange}></input>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered table-hover'>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
            {_.sortBy(venues.all, currentSort)
              .filter(venue => this.filterVenues(venue))
              .map((venue, index) => (
              <tr key={index} onClick={e => this.setCurrentVenue(venue)}>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.name}</td>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.address}</td>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.city}</td>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.state}</td>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.zip}</td>
                <td data-toggle='modal' data-target='#venue-modal'>{venue.phone}</td>
                <td><a href={venue.url} target='_blank' rel='noopener noreferrer'>Website</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdBanner />
      <VenueModal show={showModal} venue={modalData} user={user} />
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(VenuesList);
