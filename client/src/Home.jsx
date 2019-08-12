import React from 'react';
import { connect } from 'react-redux';
import {Spring} from 'react-spring/renderprops'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './Home.css';
import { AdBanner } from './AdBanner';
import * as actions from './actions'
import styled from 'styled-components'
import { Colors } from './framework'
import RangeSlider from './framework/RangeSlider'
import AgeModal from './AgeModal';
import ContactModal from './ContactModal';
import {ImageCircle} from './ImageCircle';

const HeroImage = styled.div`
  min-height: 100vh;
  background: no-repeat fixed;
  background-size: cover;
`

const StartOwnImage = styled.div`
  position: absolute;
  z-index: -1;
  background: no-repeat center center url('cavehockey.jpg');
  background-size: cover;
  height: 350px;
  width: 350px;
  border-radius: 100%;
`

const RinksImage = styled.div`
position: absolute;
z-index: -1;
background: no-repeat center center url('overheadrinks.jpg');
background-size: cover;
height: 70vh;
width: 100%;

`

const DidYouKnowImage = styled.div`
  width: 300px;
  max-width: 100vw;
  padding: 10px;
  height: auto;
  min-height: 200px;
  background: no-repeat center center;
  background-size: cover;
  margin: 10px;
  background-image: ${({ image }) => `url(${image})`};
`

const DYKImageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

const HeroSubheader = styled.p`
  color: rgba(255,255,255,0.9);
`

const HeroLogo = styled.img`
  position: absolute;
  top: 16%;
  left: 0;
  right: 0;
  margin: 0 auto;
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

const SliderContainer = styled.div`
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


const HockeyAgeSlider = ({buttonText, doAgeCalculation, sliderValue, handleChange}) => (
  <SliderContainer>
    <h4 style={{color: 'rgba(0,0,0,0.8)'}}>Should I be playing hockey at my age?</h4>
    <p style={{color: 'rgba(0,0,0,0.8)'}}>Use our handy calculator to find out!</p>
    <div style={{width: '100%'}}>
      <RangeSlider 
        name='age' 
        min={3} 
        max={100} 
        sliderValue={sliderValue}
        handleChange={handleChange} 
        />
    </div>
    <p style={{color: 'rgba(0,0,0,0.8)', marginTop: '20px'}}>My Age: <span>{sliderValue}</span></p>
    <AgeCalcButton className='btn btn-large' onClick={doAgeCalculation}>{buttonText}</AgeCalcButton>
  </SliderContainer>
)

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSpinner: false,
      age: 30,
      heroImage: 'hcherorink.jpg'
    }
  }
  componentDidMount() {
    const isMobile = window.outerWidth < 600;
    if (isMobile) {
      this.setState({
        heroImage: 'hcherorink_mobile.jpg'
      });
    }
    this.props.routeChange('/');
    window.ScrollReveal && window.ScrollReveal().reveal('.scrollreveal', {
      delay: 500
    });
  }
  
  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }
  
  doAgeCalculation = () => {
    this.setState({
      buttonSpinner: true
    })
    setTimeout(() => {
      window.$("#age-modal").modal();
      this.setState({buttonSpinner:false})
    }, 1000)
  }
  
  render() {
    const { heroImage } = this.state;
    const buttonText = this.state.buttonSpinner ? <i className="fas fa-circle-notch fa-spin"></i> : 'Calculate';
    
    return (
      <>
      <div className='container-fluid Home'>
        <Helmet>
        <meta charSet='utf-8' />
        <title>Hockey Compass - Navigate to Hockey</title>
        <link rel='canonical' href='https://hockeycompass.com/' />
        </Helmet>
        <HeroImage style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.7), rgba(25, 81, 139, 0.25)), url(${heroImage})`}}>
          {/*<Spring config={{duration: 2000}} from={{ opacity: 0 }} to={{ opacity: 0.7 }}>
            {props => <HeroLogo id='logo' src='logo.png' width='300px' style={props} />}</Spring>*/}
          <div className='hero-text'>
          
            <h1 className='Home-intro'>
              <Spring config={{delay: 500}} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {props => <span style={{...props, color: 'rgba(255,255,255,0.95)'}}>Fitness. </span>}
              </Spring> 
              <Spring config={{delay: 1000}} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {props => <span style={{...props, color: 'rgba(255,255,255,0.95)'}}>Fun. </span>}
              </Spring>
              <Spring config={{delay: 1500}} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {props => <span style={{...props, color: 'rgba(255,255,255,0.95)'}}>Hockey.</span>}
              </Spring>
            </h1>
            <HeroSubheader className='scrollreveal'>We'll help you navigate to the right game or start your own.</HeroSubheader>
            <div className='scrollreveal' style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
              <Link to='/games' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='far fa-compass' style={{fontSize: '32px', marginRight: '10px'}}/>View Games</button></Link>
              <Link to='/newgame' style={{margin:'10px'}}><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
            </div>
          </div>
        </HeroImage>
        <HomepageSection>
          <SectionTextElement style={{ height: '70vh', borderRadius: '0px', backgroundImage: `url(${'ice.jpg'})`}}>
            <img className='slideRight scrollreveal' src='logo.png' width='300px' style={{marginBottom: '20px'}} />
            <p>Hockeycompass.com provides a fast and simple way for you to stay physically active by playing hockey. We bring communities together through fitness and sports.</p>
          </SectionTextElement>
          <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(125, 81, 139,0.75), rgba(125, 81, 139, 0.95))`}}>
            <h4>Take Control</h4>
            <p>Can't find a game you like? Start your own!</p>
            <StartOwnImage className='scrollreveal' />
            <Link to='/newgame' style={{marginTop:'20px'}}><button className='landing-button btn btn-large'><i className='fas fa-hockey-puck' style={{fontSize: '32px', marginRight: '10px'}} />Host a Game</button></Link>
          </SectionImageElement>
        </HomepageSection>
        <HomepageSection>
          <HockeyAgeSlider buttonText={buttonText} doAgeCalculation={this.doAgeCalculation} sliderValue={this.state.age} handleChange={this.handleChange} />
        </HomepageSection>
        <HomepageSection>
          <SectionImageElement className='host-game-landing' style={{backgroundImage: `linear-gradient(rgba(25, 81, 139,0.95), rgba(25, 81, 139, 0.75))`}}>
            <h4>Find a Rink</h4>
            <p>Start here to find the perfect location for your next pickup skate.</p>
            <RinksImage className='scrollreveal' />
          <Link to='/venues' style={{marginTop: '20px'}}><button className='landing-button btn btn-large'><i className='fas fa-bullseye' style={{fontSize: '32px', marginRight: '10px'}} />Pick a Venue</button></Link>
          </SectionImageElement>
        </HomepageSection>
        <HomepageSection style={{padding: '15px'}}>
          <h3>Did you know?</h3>
          <p style={{maxWidth: '100vw'}}>Ice hockey has its roots in Ball-and-stick games.  Ball-and-stick games are almost as old as civilization itself. Its earliest origins may be from Persia, Egypt or China, while archaeological evidence shows an early ball-and-stick game played in Greece in the 400s BCE. As civilization spread, so did the games. And eventually, as the civilized world went north, ball-and-stick moved onto the ice. Paintings in the Netherlands in the 1500s and 1600s showed the Dutch playing a version of golf on the ice; Scotland's Edinburgh Skating Club, formed in 1642, is considered the oldest in the world, and records from Ireland's Dublin Evening Post have a report of men playing hurling on ice. When the Europeans made their way across the Atlantic to North America, they discovered Native Americans had their own games, the forerunners of lacrosse, and some Native Americans in South Dakota essentially played lacrosse on ice. The modern idea of field hockey sprouted out of these traditions, and the modern sport of ice hockey was relegated primarily to small towns, and in no organized setting, until the late 1800s. </p>
          <DYKImageContainer>
            <DidYouKnowImage image='goyen.jpg' />
            <DidYouKnowImage image='avercamp.jpg' />
          </DYKImageContainer>
          <p style={{fontSize: '12px'}}>Source: <a href='http://www.thepeoplehistory.com/icehockeyhistory.html'>http://www.thepeoplehistory.com/icehockeyhistory.html</a></p>
        </HomepageSection>
        <HomepageSection style={{background: Colors.orange}}>
          <SectionImageElement>
            <h4>Drop a Line</h4>
            <p>We'd love to hear from you!</p>
            <button data-toggle='modal' data-target='#contact-modal' className='landing-button btn btn-large'><i className='fas fa-envelope' style={{fontSize: '32px', marginRight: '10px'}} />Contact Us</button>
          </SectionImageElement>
        </HomepageSection>
        <AgeModal selectedAge={this.state.age}/>
      </div>
      <ContactModal />
      </>
    )
  }
}

export default connect(mapStateToProps, actions)(Home);
