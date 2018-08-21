import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { addPlayer } from './actions';

const mapStateToProps = state => {
  console.log(state)
  return {...state};
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: game => dispatch(addPlayer(game))
  }
}

const GamesList = ({games, user, addPlayer}) => (
  <div className='GamesList'>
    <Helmet>
    <meta charSet='utf-8' />
    <title>Find a Game - Hockey Compass - Navigate to Hockey</title>
    <link rel='canonical' href='https://hockeycompass.com/games' />
    </Helmet>
    <div className='table-responsive'>
      <table className='table table-striped table-bordered table-hover'>
        <tbody>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Location</th>
            <th>Name</th>
            <th>Host</th>
            <th>Players</th>
            <th>Openings</th>
            <th>Type</th>
          </tr>
          {games.map((game, index) => (
            <tr key={index}>
              <td style={{textAlign: 'center'}}>
                {user ?
                  game.players.indexOf(user.name) === -1 ?
                  <button className='btn btn-success' onClick={e => addPlayer(game)}>Play</button> :
                  <button disabled className='btn btn-disabled'>Joined</button> :
                  <span style={{color: 'green'}}>Open</span>  
                  }
              </td>
              <td>{game.date}</td>
              <td>{game.location}</td>
              <td>{game.name}</td>
              <td>{game.host}</td>
              <td>{game.players.length}</td>
              <td>{game.maxPlayers - game.players.length || 0}</td>
              <td>{game.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Link to='/newgame'><button className='btn btn-lg btn-primary'>Host a Game</button></Link>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
