import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class GamesList extends Component {
  componentDidMount() {
    this.props.listGames();
  }
  render() {
    const { games, user, addPlayer, sendEmails } = this.props;
    return (
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
            {games.games.filter(game => (game.type.toLowerCase() === 'public'))
              .filter(game => moment(game.date) > moment())
              .sort((a,b) => moment(a.date) - moment(b.date))
              .map((game, index) => (
              <tr key={index}>
                <td style={{textAlign: 'center'}}>
                  {user.authenticated ?
                    game.players.indexOf(user.username) === -1 && game.players.length < game.maxPlayers ?
                    <button className='btn btn-success' onClick={e => addPlayer(game, user)}>Play</button> :
                    game.players.indexOf(user.username) === -1 ? <span style={{color: 'red'}}>Full</span> : <button disabled className='btn btn-disabled'>Joined</button> :
                    game.players.length < game.maxPlayers ? <span style={{color: 'green'}}>Open</span> : <span style={{color: 'red'}}>Full</span>
                    }
                </td>
                <td>{moment(game.date).format('MM/DD/YYYY h:mmA')}</td>
                <td>{game.location}</td>
                <td>{game.name}</td>
                <td>{game.host}</td>
                <td>{game.players.length}</td>
                <td>{game.maxPlayers - game.players.length || 0}</td>
                <td>{game.type}</td>
                {user.authenticated && game.host === user.username ? <td><button className='btn btn-primary' onClick={e => sendEmails(game)}>Send Emails</button></td> : <td></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      { user.authenticated &&
        <Link to='/newgame'><button className='btn btn-lg btn-primary'>Host a Game</button></Link>
      }
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(GamesList);
