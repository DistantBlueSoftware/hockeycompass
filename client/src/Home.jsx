import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AdBanner } from './AdBanner';
import * as actions from './actions'

const mapStateToProps = state => {
  return {...state};
}


class Home extends React.Component {
  componentDidMount() {
    this.props.routeChange('/');
  }
  render() {
    return (
      <div className='container-fluid Home'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/' />
        </Helmet>
        <div className='hero-image' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.05)), url(${'hchero.jpg'})`}}>
          <div className='hero-text'>
            <h1 className='Home-intro'>
             Navigate to hockey.
            </h1>
            <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
              <Link to='/games' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='far fa-compass' style={{fontSize: '32px', marginRight: '10px'}}/>View Games</button></Link>
              <Link to='/newgame' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
            </div>
          </div>
          
        </div>
        <div className='game-venue-section'>
          <div className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.7), rgba(25, 81, 139, 0.45)), url(${'host_game.jpg'})`}}>
          <Link to='/newgame'><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
          </div>
          <div className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.25)), url(${'venue.jpg'})`}}>
          <Link to='/venues'><button className='landing-button btn btn-large'><i className='fas fa-bullseye' style={{fontSize: '32px', marginRight: '10px'}} />Pick a Venue</button></Link>
          </div>
          <div className='contact-container' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.25)), url(${'contact.jpg'})`}}>
            <Link to='/contact'><button className='landing-button btn btn-large'><i className='fas fa-envelope' style={{fontSize: '32px', marginRight: '10px'}} />Contact Us</button></Link>
          </div>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
