import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AdBanner } from './AdBanner';
//import hockey from './hockey.jpg';

const mapStateToProps = state => {
  return {...state};
}


const Home = ({user}) => (
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
        <Link to='/games'><button className='landing-button btn btn-large'><i className='far fa-compass' style={{fontSize: '32px', marginRight: '10px'}}/>View Games</button></Link>
      </div>
      
      {/*!user.authenticated &&
        <React.Fragment>
          <Link to='/login'><button className='btn btn-lg btn-primary'>Login</button></Link>
          <Link to='/register'><button className='btn btn-lg btn-success'>Register</button></Link>
        </React.Fragment>
      */}
      
    </div>
  </div>
)

export default connect(mapStateToProps)(Home);
