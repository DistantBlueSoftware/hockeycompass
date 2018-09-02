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
  <div className='Home'>
    <Helmet>
    <meta charSet='utf-8' />
    <title>Hockey Compass - Navigate to Hockey</title>
    <link rel='canonical' href='https://hockeycompass.com/' />
    </Helmet>
    <div className='hero-image' style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.7)), url(${'hockey.jpg'})`}}>
      <h1 className='Home-intro'>
        Hockey Compass
      </h1>
      {!user.authenticated &&
        <React.Fragment>
          <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
          <Link to='/register'><button className='btn btn-success'>Register</button></Link>
        </React.Fragment>
      }
      <Link to='/games'><button className='btn btn-warning'>Games</button></Link>
    </div>

    <AdBanner />
  </div>
)

export default connect(mapStateToProps)(Home);
