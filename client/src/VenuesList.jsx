import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';
import { AdBanner } from './AdBanner';

const mapStateToProps = state => {
  return {...state};
}

class VenuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      modalData: props.venues.all[1]
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

  setCurrentGame = (game, needsAuth) => {
    this.setState({
      modalData: game
    });
    if (needsAuth && !this.props.user.authenticated) {
      this.props.history.push(`/login/${game._id}`);
    }
  }

  render() {
    const { venues, user } = this.props;
    const { loading, modalData, showModal } = this.state;
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
              <tr key={index}>
                <td>{venue.name}</td>
                <td>{venue.address}</td>
                <td>{venue.city}</td>
                <td>{venue.state}</td>
                <td>{venue.zip}</td>
                <td>{venue.phone}</td>
                <td><a href={venue.url} target='_blank'>Website</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdBanner />
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(VenuesList);
