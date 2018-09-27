import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import JoinButton from './JoinButton';
import PaymentModal from './PaymentModal';
import ContactModal from './ContactModal';
import RosterModal from './RosterModal';

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

  setCurrentGame = (game, needsAuth) => {
    this.setState({
      modalData: game
    });
    if (needsAuth && !this.props.user.authenticated) {
      this.props.history.push(`/login/${game._id}`);
    }
  }

  render() {
    const { games, user, sendEmail, cancelGame } = this.props;
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
              <th>Join</th>
              <th>Date</th>
              <th>Location</th>
              <th>Name</th>
              <th>Host</th>
              <th>Players</th>
              <th>Openings</th>
              <th>Type</th>
            </tr>
            {games.games.filter(game => moment(game.date) > moment())
              .sort((a,b) => moment(a.date) - moment(b.date))
              .map((game, index) => (
              <tr key={index} data-toggle='modal' data-target='#roster-modal' onClick={e => this.setCurrentGame(game)}>
                <td style={{textAlign: 'center'}}>
                  <JoinButton user={user} game={game} setCurrentGame={this.setCurrentGame} />
                </td>
                <td>{moment(game.date).format('MM/DD/YYYY h:mmA')}</td>
                <td>{game.location}</td>
                <td>{game.name}</td>
                <td>{game.host}</td>
                <td>{game.players.length}</td>
                <td>{game.maxPlayers - game.players.length || 0}</td>
                <td>{game.type}</td>
                {user.authenticated && game.type.toLowerCase() === 'public' && game.host === user.username ? <td><button className='btn btn-primary' onClick={e => sendEmail(game)}>Send Emails</button></td> : <td></td>}
                {user.authenticated &&
                  game.host === user.username &&
                  <td>
                    {moment(game.date).diff(moment(), 'hours') > 0 ?
                      <button className='btn btn-danger' onClick={e => cancelGame(game)}>
                        Cancel
                      </button> :
                      <button className='btn btn-danger disabled'>
                        Locked
                      </button>
                    }
                  </td>
                }
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
      <ContactModal show={showModal} game={modalData} user={user} />
      <RosterModal show={showModal} game={modalData} user={user} />
      <AdBanner />
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(GamesList);
