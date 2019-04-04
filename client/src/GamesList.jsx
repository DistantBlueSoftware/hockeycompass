import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import moment from 'moment';
import * as actions from './actions';
import { AdBanner } from './AdBanner';
import JoinButton from './JoinButton';
import PaymentModal from './PaymentModal';
import ContactModal from './ContactModal';
import RosterModal from './RosterModal';
import styled from 'styled-components';

const mapStateToProps = state => {
  return {...state};
}

const EmptyGamesState = styled.div`
  height: 60vh;
  max-width: 500px;
  display:flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageLoading: true,
      showModal: false,
      modalData: props.games.games[1]
    }
  }
  componentDidMount() {
    const { games, venues, match } = this.props;
    if (match && match.params.id) 
      this.props.getGameDetails(match.params.id, () => {
      this.setCurrentGame(this.props.games.current, true);
      //TODO: logic check that the game can be joined (is not locked)
      window.$("#payment-modal").modal();
    })
    if (games && games.games.length === 0) {
      this.props.listGames(() => {
        if (venues && venues.all.length === 0) this.props.listVenues();
        this.setState({pageLoading: false})
      })
    } else {
      this.setState({pageLoading: false})
    }
    
    
  }
  
  setLoadingState = bool => {
    this.setState({
      loading: bool
    })
  }
  
  handleAddPlayer = args => {
    this.setLoadingState(true);
    // we want a copy of the user object so we don't accidentally modify their profile!
    let currentUser = JSON.parse(JSON.stringify(this.props.user));
    if (args) {
      if (args.joiningAsPlayer) currentUser.profile.playerType = 'player';
      if (args.paymentID) currentUser.paymentID = args.paymentID;
    }
    
    this.props.addPlayer(this.state.modalData, currentUser, () => {
      this.setLoadingState(false);
    });
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
    const { games, user, history } = this.props;
    const { loading, pageLoading, modalData, showModal } = this.state;
    const newGameLink = user && user.authenticated ? '/newgame' : '/login?route=newgame';
    if (pageLoading) {
      return (
        <div style={{padding: '20px', marginTop: '70px'}}>
          <Skeleton width={'450px'} height={'40px'} />
          <Skeleton width={'100vw'} height={'500px'} />
        </div>
      )
    } else {
      if (!games.games.length) return (
        <EmptyGamesState className='container-fluid'>
          <h3>Nobody's skating right now. Make everyone's day, host a game!</h3>
          <Link to={newGameLink}><button className='btn btn-lg btn-primary'>Host a Game</button></Link>
        </EmptyGamesState>
        )
      else 
      return (
        <div className='GamesList container-fluid'>
          <Helmet>
          <meta charSet='utf-8' />
          <title>Find a Game - Hockey Compass - Navigate to Hockey</title>
          <link rel='canonical' href='https://hockeycompass.com/games' />
          </Helmet>
          {/*<button className='btn btn-warning'>View Past Games</button>*/}
          <div className='text-center'>
            <Link to={newGameLink}><button className='btn btn-lg btn-primary'>Host a Game</button></Link>
          </div>
          <h1>Upcoming Games <span style={{fontSize: '16px'}}>(click a row to view roster)</span> </h1>
          <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover'>
              <tbody>
                <tr>
                  <th>Join</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Location</th>
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
                    <td data-toggle='modal' data-target='#roster-modal'>{game.name}</td>
                    <td data-toggle='modal' data-target='#roster-modal'>{game.location}</td>
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
          <PaymentModal show={showModal} game={modalData} user={user} handleAddPlayer={this.handleAddPlayer} setLoadingState={this.setLoadingState} />
          <ContactModal show={showModal} game={modalData} user={user} />
          <RosterModal show={showModal} game={modalData} user={user} history={history} />
        </div>
      )
    }
  }

}
export default connect(mapStateToProps, actions)(withRouter(GamesList));
