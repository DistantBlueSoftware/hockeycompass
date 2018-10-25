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
      loading: false,
      showModal: false,
      modalData: props.games.games[1]
    }
  }
  componentDidMount() {
    this.props.listGames();
  }
  
  setLoadingState = bool => {
    this.setState({
      loading: bool
    })
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
    const { games, user, cancelGame } = this.props;
    const { loading, modalData, showModal } = this.state;
    return (
    <div className='GamesList container-fluid'>
      <Helmet>
      <meta charSet='utf-8' />
      <title>Find a Game - Hockey Compass - Navigate to Hockey</title>
      <link rel='canonical' href='https://hockeycompass.com/games' />
      </Helmet>
      {/*<button className='btn btn-warning'>View Past Games</button>*/}
      <h1>Upcoming Games <span style={{fontSize: '16px'}}>(click a row to view roster)</span> </h1>
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
            {games.games.filter(game => game.active && moment(game.date) > moment())
              .sort((a,b) => moment(a.date) - moment(b.date))
              .map((game, index) => (
              <tr key={index} onClick={e => this.setCurrentGame(game)}>
                <td style={{textAlign: 'center'}}>
                {/* loading is set to the game id in PaymentModal when payment is in process */}
                  <JoinButton loading={game._id === loading} user={user} game={game} setCurrentGame={this.setCurrentGame} />
                </td>
                <td data-toggle='modal' data-target='#roster-modal'>{moment(game.date).format('MM/DD/YYYY h:mmA')}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.location}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.name}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.host}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.players.length}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.maxPlayers - game.players.length || 0}</td>
                <td data-toggle='modal' data-target='#roster-modal'>{game.type}</td>
                {/*user.authenticated &&
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
                */}
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
      <PaymentModal show={showModal} game={modalData} user={user} setLoadingState={this.setLoadingState} />
      <ContactModal show={showModal} game={modalData} user={user} />
      <RosterModal show={showModal} game={modalData} user={user} />
      <AdBanner />
    </div>
  )
  }

}
export default connect(mapStateToProps, actions)(GamesList);
