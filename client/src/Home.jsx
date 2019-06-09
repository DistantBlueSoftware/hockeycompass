import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AdBanner } from './AdBanner';
import * as actions from './actions'
import styled from 'styled-components'
import { Colors } from './framework'

const HeroImage = styled.div`
  min-height: 100vh;
  background: no-repeat fixed;
  background-size: cover;
`

const HomepageSection = styled.div`
  display:flex;
  flex-flow: row wrap;
  @media (min-width: 801px) {
    margin: 10px 0;
  }
`

const SectionTextElement = styled.div`
  
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background: no-repeat center center;
  background-size: cover;
  @media (min-width: 801px) {
    flex: 0 49%;
    border-radius: 5px;
    padding: 20px;
  }
`
const SectionImageElement = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: no-repeat center center;
  background-size: cover;
  @media (min-width: 801px) {
    flex: 0 45%;
    border-radius: 5px;
  }
`

const mapStateToProps = state => {
  return {...state};
}


class Home extends React.Component {
  componentDidMount() {
    this.props.routeChange('/');
  }
  render() {
    const isMobile = window.innerWidth < 600;
    const homepageSection = <HomepageSection>
      <SectionTextElement>
        <p>We maintain an up-to-date database of local venues and intuitive search to easily find what you're looking for.</p>
        <p>Start here to find the perfect location for your next pickup skate.</p>
      </SectionTextElement>
      <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.25)), url(${'venue.jpg'})`}}>
      <Link to='/venues'><button className='landing-button btn btn-large'><i className='fas fa-bullseye' style={{fontSize: '32px', marginRight: '10px'}} />Pick a Venue</button></Link>
      </SectionImageElement>
    </HomepageSection>
    const swappedHomepageSection = <HomepageSection>
      <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.25)), url(${'venue.jpg'})`}}>
      <Link to='/venues'><button className='landing-button btn btn-large'><i className='fas fa-bullseye' style={{fontSize: '32px', marginRight: '10px'}} />Pick a Venue</button></Link>
      </SectionImageElement>
      <SectionTextElement>
        <p>We maintain an up-to-date database of local venues and intuitive search to easily find what you're looking for.</p>
        <p>Start here to find the perfect location for your next pickup skate.</p>
      </SectionTextElement>
    </HomepageSection>
    return (
      <div className='container-fluid Home'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/' />
        </Helmet>
        <HeroImage style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.7), rgba(25, 81, 139, 0.25)), url(${'hcherorink.jpg'})`}}>
          <div className='hero-text'>
            <h1 className='Home-intro'>
             Navigate to hockey.
            </h1>
            <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
              <Link to='/games' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='far fa-compass' style={{fontSize: '32px', marginRight: '10px'}}/>View Games</button></Link>
              <Link to='/newgame' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
            </div>
          </div>
          
        </HeroImage>
        <HomepageSection>
          <SectionTextElement>
            <p>Hockey Compass is a community of like-minded hockey lovers from around your area.</p>
            <p>Browse public games near you and meet new skaters with a click!</p>
          </SectionTextElement>
          <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(125, 81, 139,0.7), rgba(125, 81, 139, 0.45)), url(${'skatestick.jpg'})`}}>
            <p style={{color:'white'}}>Can't find a game you like! Start your own!</p>
            <Link to='/newgame'><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
          </SectionImageElement>
        </HomepageSection>
        {isMobile ? homepageSection : swappedHomepageSection}
        {isMobile && <HomepageSection>
          <SectionTextElement>
            <p>Sign up today! It takes just a second, and you'll be navigating your way to hockey!</p>
            <Link to='/register'><button className='btn btn-large btn-primary'>Register</button></Link>
          </SectionTextElement>
        </HomepageSection>}
        <div className='contact-container' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.5), rgba(25, 81, 139, 0.25)), url(${'contact.jpg'})`}}>
          <a href='mailto:info@hockeycompass.com'><button className='landing-button btn btn-large'><i className='fas fa-envelope' style={{fontSize: '32px', marginRight: '10px'}} />Contact Us</button></a>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
