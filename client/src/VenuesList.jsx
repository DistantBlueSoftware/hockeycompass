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
  background-image: linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), url('rink.jpg');
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  padding-top: 20px;
`

const VenueContainer = styled.div`
position: relative;
  background: rgba(255,255,255,0.95);
  max-width: 1000px;
  padding: 15px;
  border-radius: 5px;
  margin-top: 70px;
`

const VenuesListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
  input {
    min-width: 250px;
  }
`

const StyledInput = styled.input`
  border-radius: 5px;
  padding: 5px;
  border: 2px solid rgb(25, 81, 139);
  margin-left: 10px;
  margin-right: 10px;
`

const VenueCard = styled.div`
  width: 90vw;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px;
  margin: 5px;
  background: rgba(25, 81, 139, 0.7);
  color: white;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: black;
    background: rgba(255,255,255,0.1);
    border: 2px solid rgb(25, 81, 139);
  }
  @media (min-width: 801px) {
    width: 29%;
  }
`

const EmptyVenueState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  height: 50vh;
  width: 100vw;
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
    window.addEventListener('scroll', e => {
      console.log(window.pageYOffset)
      if (window.pageYOffset > 94) {
        this.searchBar.style.position = 'fixed';
        this.searchBar.style.top = '10px';
        this.searchBar.style.left = '-20px';
        this.searchBar.style.zIndex = '5000';
      } else {
        this.searchBar.style.position = 'relative';
        this.searchBar.style.top = 'inherit';
        this.searchBar.style.zIndex = 'inherit';
      }
    })
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll');
  }
  
  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
      window.scrollTo(0,0);
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
    window.$('#venue-modal').modal('hide');
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
          <SearchBarContainer ref={node => this.searchBar = node}>
            <div>
              <label htmlFor='search'></label>
              <StyledInput type='text' name='search' id='search' placeholder='Venue name or city' onChange={this.handleChange}></StyledInput>
            </div>
          </SearchBarContainer>
          <VenuesListContainer>
            {_.sortBy(venues.all, currentSort)
              .filter(venue => this.filterVenues(venue)).length ? 
              _.sortBy(venues.all, currentSort)
                .filter(venue => this.filterVenues(venue))
                .map((venue, index) => 
                <VenueCard 
                  onClick={e => this.setCurrentVenue(venue)} 
                  data-toggle='modal' 
                  data-target='#venue-modal'>
                    <h3>{venue.name} </h3>
                    <p>{venue.city}</p>
                </VenueCard>) : <EmptyVenueState>No Venues Found</EmptyVenueState>}
          </VenuesListContainer>
          <VenueModal show={showModal} venue={modalData} user={user} hostGame={this.hostGame} />
        </VenueContainer>
      </VenueBackground>
  )
  }

}
export default connect(mapStateToProps, actions)(VenuesList);
