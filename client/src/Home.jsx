import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AdBanner } from './AdBanner';
import * as actions from './actions'
import styled from 'styled-components'
import { Colors } from './framework'
import RangeSlider from './framework/RangeSlider'

const HeroImage = styled.div`
  min-height: 100vh;
  background: no-repeat fixed;
  background-size: cover;
`

const HeroSubheader = styled.p`
  color: rgba(255,255,255,0.8);
`

const HomepageSection = styled.div`
  display:flex;
  flex-flow: row wrap;
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
  height: 70vh;
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: no-repeat center center;
  background-size: cover;
  padding: 20px;
  color: rgba(255,255,255,0.8);
`

const AgeCalcButton = styled.button`
  background: ${Colors.blue};
  color: rgba(255,255,255,0.9);
  margin-top: 10px;
  transition: background 0.3s;
  &:hover {
    background: #123d69;
  }
`


const mapStateToProps = state => {
  return {...state};
}


const HockeyAgeSlider = ({buttonText, doAgeCalculation}) => (
  <SectionImageElement>
    <h4 style={{color: 'rgba(0,0,0,0.8)'}}>Should I be playing hockey at my age?</h4>
    <p style={{color: 'rgba(0,0,0,0.8)'}}>Use our handy calculator to find out!</p>
    <div style={{width: '100%'}}>
      <RangeSlider />
    </div>
    <AgeCalcButton className='btn btn-large' onClick={doAgeCalculation}>{buttonText}</AgeCalcButton>
  </SectionImageElement>
)

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSpinner: false
    }
  }
  componentDidMount() {
    this.props.routeChange('/');
  }
  
  doAgeCalculation = () => {
    this.setState({
      buttonSpinner: true
    })
    setTimeout(() => {
      alert('Yes!');
      this.setState({buttonSpinner:false})
    }, 1000)
  }
  
  render() {
    const isMobile = window.innerWidth < 600;
    const buttonText = this.state.buttonSpinner ? <i className="fas fa-circle-notch fa-spin"></i> : 'Calculate';
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
             Fitness. Fun. Hockey. 
            </h1>
            <HeroSubheader>We'll help you navigate to the right game or start your own.</HeroSubheader>
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
          <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(125, 81, 139,0.75), rgba(125, 81, 139, 0.95))`}}>
            <h4>Take Control</h4>
            <p>Can't find a game you like! Start your own!</p>
            <Link to='/newgame' style={{marginTop:'20px'}}><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
          </SectionImageElement>
        </HomepageSection>
        <HomepageSection>
          <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.95), rgba(25, 81, 139, 0.75))`}}>
            <h4>Find a Rink</h4>
            <p>Start here to find the perfect location for your next pickup skate.</p>
          <Link to='/venues' style={{marginTop: '20px'}}><button className='landing-button btn btn-large'><i className='fas fa-bullseye' style={{fontSize: '32px', marginRight: '10px'}} />Pick a Venue</button></Link>
          </SectionImageElement>
        </HomepageSection>
        <HomepageSection>
          <HockeyAgeSlider buttonText={buttonText} doAgeCalculation={this.doAgeCalculation} />
        </HomepageSection>
        {isMobile && <HomepageSection>
          <SectionTextElement>
            <p>Sign up today! It takes just a second, and you'll be navigating your way to hockey!</p>
            <Link to='/register'><button className='btn btn-large btn-primary'>Register</button></Link>
          </SectionTextElement>
        </HomepageSection>}
        <HomepageSection style={{background: Colors.orange}}>
          <SectionImageElement>
            <h4>Drop a Line</h4>
            <p>We'd love to hear from you!</p>
            <a href='mailto:info@hockeycompass.com'><button className='landing-button btn btn-large'><i className='fas fa-envelope' style={{fontSize: '32px', marginRight: '10px'}} />Contact Us</button></a>
          </SectionImageElement>
        </HomepageSection>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
