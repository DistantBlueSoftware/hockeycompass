import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import VenueModal from './VenueModal';
import _ from 'underscore'
import styled from 'styled-components'

const mapStateToProps = state => {
  return {...state};
}

const VenueBackground = styled.div`
  background: center center;
  background-image: url('rink.jpg');
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  padding-top: 20px;
`

const VenueContainer = styled.div`
position: relative;
  background: rgba(255,255,255,0.9);
  max-width: 1000px;
  padding: 15px;
  border-radius: 5px;
  margin-top: 70px;
`

const TitleWithSearch = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`

const ClickableRow = styled.tr`
  cursor: pointer;
`

const StyledInput = styled.input`
  border-radius: 5px;
  padding: 5px;
  border: 2px solid rgb(25, 81, 139);
  margin-left: 10px;
  margin-right: 10px;
`

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
    this.props.routeChange('/venues');
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
    return venue.name.toLowerCase().includes(this.state.search.toLowerCase()) || venue.city.toLowerCase().includes(this.state.search.toLowerCase())
  }
  
  hostGame = venue => {
    const modal = document.getElementById('venue-modal');
    modal.style.display = 'none';
    const bg = document.querySelector('.modal-backdrop')
    bg.classList.remove('show');
    bg.style.display = 'none';
    this.props.history.push(`/newgame/${venue.name}`)
  }

  render() {
    const { venues, user } = this.props;
    const { modalData, showModal, currentSort } = this.state;
    return (
      <VenueBackground>
        <VenueContainer className='container-fluid VenuesList'>
          <Helmet>
          <meta charSet='utf-8' />
          <title>Hockey Arenas - Hockey Compass - Navigate to Hockey</title>
          <link rel='canonical' href='https://hockeycompass.com/venues' />
          </Helmet>
          <TitleWithSearch>
            <h1>Minnesota Ice Arenas</h1>
            <div>
              <label htmlFor='search'>Search: </label>
              <StyledInput type='text' name='search' id='search' onChange={this.handleChange}></StyledInput>
            </div>
          </TitleWithSearch>
          <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover' style={{marginTop: '10px'}}>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                  <th>Phone</th>
                </tr>
                {_.sortBy(venues.all, currentSort)
                  .filter(venue => this.filterVenues(venue))
                  .map((venue, index) => (
                  <ClickableRow key={index} onClick={e => this.setCurrentVenue(venue)}>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.name}</td>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.address}</td>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.city}</td>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.state}</td>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.zip}</td>
                    <td data-toggle='modal' data-target='#venue-modal'>{venue.phone}</td>
                  </ClickableRow>
                ))}
              </tbody>
            </table>
          </div>
          <VenueModal show={showModal} venue={modalData} user={user} hostGame={this.hostGame} />
        </VenueContainer>
      </VenueBackground>
  )
  }

}
export default connect(mapStateToProps, actions)(VenuesList);
