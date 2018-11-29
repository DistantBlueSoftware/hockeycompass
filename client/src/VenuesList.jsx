import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import VenueModal from './VenueModal';
import { Redirect } from 'react-router-dom'
import './VenuesList.css'

const mapStateToProps = state => {
  return { ...state };
}

class VenuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      modalData: props.venues.all[1],
      redirectTo: null,
    }
  }
  componentDidMount() {
    this.props.listVenues();
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

  redirectTo = (path) => {
    this.setState({
      redirectTo: path
    })
  }

  render() {
    const { venues, user } = this.props;
    const { loading, modalData, showModal } = this.state;
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    } else {
      return (
        <div className='VenuesList'>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Hockey Arenas - Hockey Compass - Navigate to Hockey</title>
            <link rel='canonical' href='https://hockeycompass.com/venues' />
          </Helmet>
          {/*<button className='btn btn-warning'>View Past Games</button>*/}
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
                {venues.all
                  .map((venue, index) => (
                    <tr key={index} onClick={e => this.setCurrentVenue(venue)}>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.name}</td>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.address}</td>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.city}</td>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.state}</td>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.zip}</td>
                      <td data-toggle='modal' data-target='#venue-modal'>{venue.phone}</td>
                      <td><a href={venue.url} target='_blank'>Website</a></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <AdBanner />
          <VenueModal show={showModal} venue={modalData} user={user} redirectTo={this.redirectTo} />
        </div>
      )
    }
  }

}
export default connect(mapStateToProps, actions)(VenuesList);
