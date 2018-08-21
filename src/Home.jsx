import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
    <p className='Home-intro'>
      Welcome to Hockey Compass
    </p>
    {!user &&
      <React.Fragment>
        <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
        <Link to='/register'><button className='btn btn-success'>Register</button></Link>
      </React.Fragment>
    }
    <Link to='/games'><button className='btn btn-warning'>Games</button></Link>
  </div>
)

export default connect(mapStateToProps)(Home);
