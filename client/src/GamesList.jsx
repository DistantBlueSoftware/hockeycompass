import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import PaymentModal from './PaymentModal';

const mapStateToProps = state => {
  return {...state};
}

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalData: props.games.games[1]
    }
  }
  componentDidMount() {
    this.props.listGames();
  }

  //disabled actual adding of players while working on modal
  /*onClick={e => addPlayer(game, user)}*/

  setCurrentGame = game => {
    this.setState({
      modalData: game
    })
  }

  render() {
    const { games, user, sendEmails } = this.props;
    const { modalData, showModal } = this.state;
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
                    <button className='btn btn-success' data-toggle='modal' data-target='#payment-modal' onClick={e => this.setCurrentGame(game)}>Play</button> :
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
        <div className='text-center'>
          <Link to='/newgame'><button className='btn btn-lg btn-primary'>Host a Game</button></Link>
        </div>
      }
      <PaymentModal show={showModal} game={modalData} user={user} />
      <AdBanner />
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(GamesList);
