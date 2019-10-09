import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import { RosterRink } from "./RosterRink";
import PrintPage from "./PrintPage";

const mapStateToProps = state => {
  return { ...state };
};

class RosterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printableRoster: {}
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendEmail(
      this.props.game,
      { ...this.state, privateContact: true },
      () => {
        console.log("Message Sent");
      }
    );
  };

  printRoster = () => {
    const headers = ["Username", "Name", "Paid"];
    const body = this.props.game.players.sort((a, b) => a.paid).map(p => {
      const { username, name, paid } = p;
      return { username, name, paid };
    });
    this.setState({
      printableRoster: { headers, body }
    });
  };

  render() {
    let { user, game, history } = this.props;
    if (!game) game = {};
    const isGameOwner =
      user.username === game.host || user.username === game.hostID;
    return (
      <div className="modal fade" id="roster-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Roster for {game.name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <RosterRink game={game} isGameOwner={isGameOwner} />
            </div>
            <div className="modal-footer">
              {user.authenticated &&
                isGameOwner && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={this.printRoster}
                    >
                      Print Roster
                    </button>
                    <button
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={e => history.push(`/game/${game._id}/edit`)}
                    >
                      Edit Game
                    </button>
                  </>
                )}
              <button className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
            <PrintPage data={this.state.printableRoster} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(RosterModal);
