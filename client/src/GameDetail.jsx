import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import utils from "@distantbluesoftware/dbsutil";
import * as actions from "./actions";
import requireAuth from "./requireAuth";
import { emailRegexTest, skillLevels } from "./lib";
import Datetime from "react-datetime";
import styled from "styled-components";
import { HCFEE } from "./config";
import ReactTooltip from "react-tooltip";

import "./react-datetime.css";
import "./GameDetail.css";

const mapStateToProps = state => {
  return { ...state };
};

const Icon = styled.i`
  position: absolute;
  top: 43px;
  left: 24px;
  color: rgba(25, 81, 139, 0.7);
`;

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().add(1, "days"),
      endDate: moment()
        .add(1, "days")
        .add(2, "hours"),
      type: "",
      emailList: this.props.user.profile && this.props.user.profile.emailList,
      infoMessage: "",
      messageColor: "green",
      errorMessage: ""
    };
  }

  handleChange = (e, field) => {
    if (moment.isMoment(e)) {
      if (field === "startDate" && !this.state.endDateHasBeenChanged) {
        const endDate = e.clone().add(2, "hours");
        this.setState({
          [field]: e,
          endDate
        });
      } else
        this.setState({
          [field]: e,
          endDateHasBeenChanged: true
        });
    } else if (!e.target) {
      this.setState({
        startDate: moment(e),
        endDate: moment(e).add(2, "hours")
      });
    } else {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
        infoMessage: "",
        [name]: value
      });
    }
  };

  handleGameUpdate = (e, params) => {
    e.preventDefault();
    let game = this.state;
    if (params) {
      for (let param in params) {
        game[param] = params[param];
      }
    }
    if (!moment(game.date).isValid()) {
      this.setState({
        errorMessage: "Error: You must specify a date"
      });
      return;
    }
    if (game.maxPlayers < game.players.length) {
      this.setState({
        errorMessage: `There are already ${
          game.players.length
        } players in the game!`
      });
      return;
    }
    this.checkForValidDates();
    this.props.updateGame(game, () => {
      this.props.history.push("/games");
    });
  };

  handleNewGameSubmit = e => {
    e.preventDefault();
    const { user } = this.props;
    let game = this.state;
    let needsConfirmation = false;
    let confirmText = "";
    game.duration = +game.duration;
    game.host = user.fullName || user.username;
    game.hostID = user.username;
    game.currentPlayer = {
      name: user.fullName,
      type: user.profile && user.profile.playerType,
      username: user.username
    };
    // if (!this.checkForValidDates()) {
    // const hour = game.endDate.get('hour')
    // const minute = game.endDate.get('minute')
    //   game.endDate = game.startDate.clone();
    //   game.endDate.set('hour', hour).set('minute', minute);
    //   console.log(game.endDate.format('MM/DD/YYYY hh:mmA'))
    // }
    if (game.costPerPlayer > 30) {
      needsConfirmation = true;
      confirmText =
        "Cost per player is higher than average ($" +
        game.costPerPlayer +
        "). Continue?";
    }
    if (game.maxPlayers > 30) {
      needsConfirmation = true;
      confirmText =
        "Maximum capacity of " +
        game.maxPlayers +
        " players is higher than average. Continue?";
    }
    if (game.type === "private") {
      let currentList = [];
      let emails,
        invalidEmails = [];
      if (typeof this.state.emailList === "string")
        emails = this.state.emailList.match(emailRegexTest);
      else emails = this.state.emailList;
      emails.filter(email => email.length > 0).forEach(email => {
        if (!utils.validateEmail(email) || email === "") {
          invalidEmails.push(email);
        }
      });
      if (invalidEmails.length) {
        this.setState({
          errorMessage: `The following emails are invalid: ${invalidEmails.join(
            "\n "
          )} \nPlease correct and retry.`
        });
        return;
      } else {
        emails.forEach(email => {
          if (currentList.indexOf(email) === -1) {
            currentList.push(email);
          }
        });
        game.emailList = currentList;

        //save email list to user profile
        this.props.saveProfile(user.username, { emailList: emails }, () => {
          this.setState({
            errorMessage: "",
            emailList: user.profile.emailList
          });
        });
      }
    }
    // store game settings locally for next time
    localStorage.setItem("gameSettings", JSON.stringify(game));
    localStorage.setItem("returningHost", true);
    //create the game
    if (needsConfirmation && window.confirm(confirmText)) {
      this.props.newGame(game, () => {
        this.props.history.push("/games");
      });
    } else {
      this.props.newGame(game, () => {
        this.props.history.push("/games");
      });
    }
  };

  showSkillLevels = () => {
    console.log("hi");
  };

  cancelGame = e => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel this game?")) {
      this.setState({
        active: false
      });
      this.handleGameUpdate(e, { active: false });
    }
  };

  checkForValidDates = () => {
    const { startDate, endDate } = this.state;
    return startDate.isBefore(endDate);
  };

  componentDidMount() {
    this.props.routeChange("/newgame");
    const { venues, match, game } = this.props;
    if (venues && venues.all.length === 0) this.props.listVenues();
    if (!game && match && match.params.id) {
      this.props.getGameDetails(match.params.id, () => {
        this.setState({
          ...this.props.games.current,
          date: moment(this.props.games.current.date)
        });
      });
    } else if (!localStorage.getItem("returningHost")) {
      this.setState({
        infoMessage:
          "We will use the email address you have on file for payouts. If this is not a valid PayPal email, you won't be able to get paid! \n Check it in your profile.",
        messageType: "orange"
      });
    } else if (localStorage.getItem("gameSettings")) {
      const storedGameSettings = JSON.parse(
        localStorage.getItem("gameSettings")
      );
      this.setState({
        ...storedGameSettings,
        startDate: moment(storedGameSettings.startDate).add(1, "days"),
        endDate: moment(storedGameSettings.endDate).add(1, "days"),
        infoMessage:
          "We pre-filled this form using data from your last game. Change what you need, then it's Hockey Time!"
      });
    }
    if (match.params.venue) this.setState({ location: match.params.venue });
  }

  render() {
    const { user, venues, match } = this.props;
    const game = this.state;
    const { infoMessage, errorMessage, messageColor } = this.state;
    const messageClass = `message ${messageColor}`;
    const isNew = match && !match.params.id;
    const buttonText = isNew ? "Hockey Time!" : "Update Game";
    const costMessage = game.costPerPlayer ? (
      <div>
        cost per player will be{" "}
        <span style={{ fontSize: "16px", color: "green" }}>
          ${+game.costPerPlayer + HCFEE}
        </span>{" "}
        <br /> &emsp; ${game.costPerPlayer} game cost + <br /> &emsp; ${HCFEE}{" "}
        HC fee
      </div>
    ) : (
      ""
    );
    const arenaNames =
      venues.all && venues.all.map((v, i) => <option key={i}>{v.name}</option>);
    return (
      <div className="game-detail container-fluid">
        <h1>{isNew ? "My New Game" : this.state.name}</h1>
        {infoMessage && <div className={messageClass}>{infoMessage}</div>}
        {errorMessage && <div className="message red">{errorMessage}</div>}
        <form
          onSubmit={isNew ? this.handleNewGameSubmit : this.handleGameUpdate}
        >
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="date">Date:</label>
              <Datetime
                value={game.startDate}
                onChange={e => this.handleChange(e, "startDate")}
                timeFormat={false}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="startTime">Start Time: </label>
              <Datetime
                value={game.startDate}
                onChange={e => this.handleChange(e, "startDate")}
                dateFormat={false}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="duration">Duration: </label>
              <select
                className="form-control"
                name="duration"
                id="duration"
                required
                value={game.duration}
                onChange={this.handleChange}
              >
                <option value={0.5}>30 Minutes</option>
                <option value={1}>1 Hour</option>
                <option value={1.5}>1.5 Hours</option>
                <option value={2}>2 Hours</option>
                <option value={2.5}>2.5 Hours</option>
                <option value={3}>3 Hours</option>
                <option value={3.5}>3.5 Hours</option>
                <option value={4}>4 Hours</option>
              </select>
              {/* <label htmlFor='endTime'>End Time: </label>
                <Datetime 
                  value={game.endDate} 
                  onChange={(e) => this.handleChange(e,'endDate')} 
                  dateFormat={false}
                />             */}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="location">Location: </label>
              <select
                className="form-control"
                name="location"
                id="location"
                required
                value={game.location}
                onChange={this.handleChange}
              >
                <option />
                {arenaNames}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Game Name: </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                required
                value={game.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="maxPlayers">Player Cap: </label>
              <input
                className="form-control"
                type="number"
                name="maxPlayers"
                id="maxPlayers"
                min={1}
                value={game.maxPlayers}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="maxPlayers">Goalie Cap: </label>
              <input
                className="form-control"
                type="number"
                name="goalieCount"
                id="goalieCount"
                min={0}
                value={game.goalieCount}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="costPerPlayer">Cost Per Player: </label>
              <div>
                <Icon className="fas fa-dollar-sign" />
                <input
                  style={{ maxWidth: "100px", paddingLeft: "20px" }}
                  className="form-control"
                  type="number"
                  name="costPerPlayer"
                  id="costPerPlayer"
                  min={0}
                  value={game.costPerPlayer}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {costMessage}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="type">
                Type:{" "}
                <i
                  className="fas fa-info-circle"
                  style={{ color: "#c0c0c0", marginLeft: "10px" }}
                  data-tip="<h5 style=&quot;text-align:center;&quot;>What&apos;s the difference between public and private?</h5><p>Public games can be viewed and joined by the entire HC community; private games are invite-only.</p>"
                />
              </label>
              <select
                className="form-control"
                name="type"
                id="type"
                value={game.type}
                onChange={this.handleChange}
                required
              >
                <option value="" />
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="type">
                Skill Level:{" "}
                <i
                  className="fas fa-info-circle"
                  style={{ color: "#c0c0c0", marginLeft: "10px" }}
                  data-tip="Hover over each option to see what it means."
                  onClick={this.showSkillLevels}
                />
              </label>
              <select
                className="form-control"
                name="skillLevel"
                id="skillLevel"
                value={game.skillLevel}
                onChange={this.handleChange}
                required
              >
                <option value="" />
                {skillLevels.map((l, i) => (
                  <option
                    value={i + 1}
                    title={l.description}
                    data-tip={l.description}
                  >
                    {l.level}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="payAtDoor"
                  id="payAtDoor"
                  checked={game.payAtDoor}
                  onChange={this.handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="payAtDoor"
                >
                  Allow Pay at the Door{" "}
                  <i
                    className="fas fa-info-circle"
                    style={{ color: "#c0c0c0", marginLeft: "10px" }}
                    data-tip="Allow players to pay when they show up."
                  />
                </label>
              </div>
            </div>
            {this.state.type === "private" && (
              <>
                <div className="form-group col-md-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="privateNotifyAll"
                      id="privateNotifyAll"
                      checked={game.privateNotifyAll}
                      onChange={this.handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="privateNotifyAll"
                    >
                      Convert to Public if Not Full{" "}
                      <i
                        className="fas fa-info-circle"
                        style={{ color: "#c0c0c0", marginLeft: "10px" }}
                        data-tip="If this is checked and the game is not full 24 hours before skate time, we will send an invite to local skaters to come fill out your roster."
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="emailList">
                    Paste your friends' emails here. Don't worry if there are
                    duplicates or extra stuff in there; we'll figure it out for
                    you.
                  </label>
                  <textarea
                    rows={6}
                    className="form-control"
                    name="emailList"
                    id="emailList"
                    onChange={this.handleChange}
                    defaultValue={this.props.user.profile.emailList}
                  />
                </div>
                <ReactTooltip html={true} />
              </>
            )}
            <div className="form-group col-md-12">
              <label htmlFor="comment">Organizer Note: </label>
              <textarea
                rows={6}
                className="form-control"
                name="comment"
                id="comment"
                onChange={this.handleChange}
                value={game.comment}
              />
            </div>
          </div>
          <div className="buttons-section" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
            {!isNew && (
              <button className="btn btn-danger" onClick={this.cancelGame}>
                Cancel Game
              </button>
            )}
          </div>
        </form>

        <ReactTooltip html={true} />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  actions
)(requireAuth(GameDetail));
