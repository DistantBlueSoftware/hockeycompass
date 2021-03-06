import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Skeleton from "react-skeleton-loader";
import moment from "moment";
import * as actions from "./actions";
import { AdBanner } from "./AdBanner";
import JoinButton from "./JoinButton";
import PaymentModal from "./PaymentModal";
import GameRequestModal from "./GameRequestModal";
import RosterModal from "./RosterModal";
import { CancellationPolicyModal } from "./CancellationPolicyModal";
import styled from "styled-components";
import { skillLevels } from "./lib";

const mapStateToProps = state => {
  return { ...state };
};

const EmptyGamesState = styled.div`
  display: flex;
  margin-top: 56px !important;
  min-height: 100vh;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  background: no-repeat center center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 0.75)
    ),
    url("hockeygods.jpeg");
  background-size: cover;
  border-radius: 5px;
  @media (min-width: 801px) {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.75),
        rgba(255, 255, 255, 0.75)
      ),
      url("hockey-gods.jpg");
  }

  h3 {
    max-width: 500px;
  }
`;

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageLoading: true,
      showModal: false,
      modalData: props.games.games[1]
    };
  }
  componentDidMount() {
    this.props.routeChange("/games");
    const { games, venues, match } = this.props;
    if (match && match.params.id)
      this.props.getGameDetails(match.params.id, () => {
        this.setCurrentGame(this.props.games.current, true);
        //TODO: logic check that the game can be joined (is not locked)
        setTimeout(() => window.$("#payment-modal").modal(), 1500);
      });
    if (games && games.games.length === 0) {
      this.props.listGames(() => {
        if (venues && venues.all.length === 0) this.props.listVenues();
        this.setState({ pageLoading: false });
      });
    } else {
      this.setState({ pageLoading: false });
    }
  }

  setLoadingState = bool => {
    this.setState({
      loading: bool
    });
  };

  handleAddPlayer = args => {
    this.setLoadingState(true);
    // we want a copy of the user object so we don't accidentally modify their profile!
    let currentUser = JSON.parse(JSON.stringify(this.props.user));
    if (args) {
      if (args.joiningAsPlayer) currentUser.profile.playerType = "player";
      if (args.paymentID) {
        currentUser.paymentID = args.paymentID;
        currentUser.paid = true;
      }
      if (args.paid) currentUser.paid = true;
    }

    this.props.addPlayer(this.state.modalData, currentUser, () => {
      this.setLoadingState(false);
    });
  };

  setCurrentGame = (game, needsAuth) => {
    this.setState({
      modalData: game
    });
    if (needsAuth && !this.props.user.authenticated) {
      this.props.history.push(`/login/${game._id}`);
    }
  };

  render() {
    const { games, user, history } = this.props;
    const { loading, pageLoading, modalData, showModal } = this.state;
    const newGameLink =
      user && user.authenticated ? "/newgame" : "/login?route=newgame";
    const activeGames = games.games.filter(
      game => game.active && moment(game.startDate).isAfter(moment())
    );
    if (pageLoading) {
      return (
        <div style={{ padding: "20px", marginTop: "70px" }}>
          <Skeleton width={"450px"} height={"40px"} />
          <Skeleton width={"100vw"} height={"500px"} />
        </div>
      );
    } else {
      if (!activeGames.length)
        return (
          <EmptyGamesState className="container-fluid">
            <h3>
              What, nobody’s skating right now?! Quick, start your own game
              before the hockey gods notice!
            </h3>
            <Link to={newGameLink}>
              <button className="btn btn-lg btn-primary">Let's go!</button>
            </Link>
          </EmptyGamesState>
        );
      else
        return (
          <div className="GamesList container-fluid">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Find a Game - Hockey Compass - Navigate to Hockey</title>
              <link rel="canonical" href="https://hockeycompass.com/games" />
            </Helmet>
            {/*<button className='btn btn-warning'>View Past Games</button>*/}
            <div className="text-center">
              <Link to={newGameLink}>
                <button className="btn btn-lg btn-primary">Host a Game</button>
              </Link>
            </div>
            <h1>
              Upcoming Games{" "}
              <span style={{ fontSize: "16px" }}>
                (click a game to view roster)
              </span>{" "}
            </h1>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <tbody>
                  <tr>
                    <th />
                    <th>Date</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Host</th>
                    <th>Players</th>
                    <th>Openings</th>
                    <th>Type</th>
                    <th>Skill Level</th>
                  </tr>
                  {activeGames
                    .sort((a, b) => moment(a.startDate) - moment(b.startDate))
                    .map((game, index) => (
                      <tr key={index} onClick={e => this.setCurrentGame(game)}>
                        <td style={{ textAlign: "center" }}>
                          {/* loading is set to the game id in PaymentModal when payment is in process */}
                          <JoinButton
                            loading={game._id === loading}
                            user={user}
                            game={game}
                            setCurrentGame={this.setCurrentGame}
                          />
                        </td>
                        <td
                          data-toggle="modal"
                          data-target="#roster-modal"
                        >{`${moment(game.startDate).format(
                          "MM/DD/YYYY hh:mmA"
                        )}`}</td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.name}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.location}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.duration
                            ? `${game.duration}h`
                            : `${moment(game.endDate).diff(
                                moment(game.startDate),
                                "hours"
                              )}h`}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.host}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.players.length}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.maxPlayers - game.players.length || 0}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.type}
                        </td>
                        <td data-toggle="modal" data-target="#roster-modal">
                          {game.skillLevel &&
                            skillLevels[game.skillLevel - 1].level}
                        </td>
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
            <PaymentModal
              show={showModal}
              game={modalData}
              user={user}
              handleAddPlayer={this.handleAddPlayer}
              setLoadingState={this.setLoadingState}
            />
            <GameRequestModal show={showModal} game={modalData} user={user} />
            <RosterModal
              show={showModal}
              game={modalData}
              user={user}
              history={history}
            />
            <CancellationPolicyModal />
          </div>
        );
    }
  }
}
export default connect(
  mapStateToProps,
  actions
)(withRouter(GamesList));
