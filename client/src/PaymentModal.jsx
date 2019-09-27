import React from "react";
// import {Elements} from 'react-stripe-elements';
import moment from "moment";
import { connect } from "react-redux";
import { PaypalCheckout } from "./PaypalCheckout";
// import StripePaymentForm from './StripePaymentForm'
import * as actions from "./actions";
import { RosterRink } from "./RosterRink";
import { HCFEE } from "./config";

const PaymentModal = ({
  game = {},
  user,
  handleAddPlayer,
  setLoadingState
}) => {
  const isGoalie = user.profile && user.profile.playerType === "goalie";
  const goalieSlots = game.players
    ? game.goalieCount - game.players.filter(p => p.type === "goalie").length
    : game.goalieCount;
  const showPaymentButton = game.hostID !== user.username;
  const showJoinButton =
    game.hostID === user.username ||
    (isGoalie && goalieSlots) ||
    game.payAtDoor;
  const costWithFee = isGoalie && goalieSlots ? 0 : game.costPerPlayer + HCFEE;
  return (
    <div className="modal fade" id="payment-modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Join {game.name}</h5>
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
            <RosterRink game={game} />
            <p>Location: {game.location}</p>
            <p>Date: {moment(game.date).format("MM/DD/YYYY h:mmA")}</p>
            {user.username !== game.host &&
              costWithFee > 0 && (
                <>
                  <h3>Cost: ${costWithFee}</h3>
                  {/*<Elements>
                  <StripePaymentForm game={game} user={user} costWithFee={costWithFee} setLoadingState={setLoadingState} />
                </Elements>*/}
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#19508B",
                      cursor: "pointer"
                    }}
                    data-toggle="modal"
                    data-target="#cancellation-modal"
                  >
                    Cancellation Policy
                  </div>
                </>
              )}
            {isGoalie &&
              !goalieSlots && (
                <div className="message blue">
                  Bummer... all the goalie slots are filled! <br />
                  But don't worry, you can join and skate out for ${costWithFee}
                  . Just click below.
                </div>
              )}
          </div>
          <div className="modal-footer" style={{ alignItems: "flex-start" }}>
            {showPaymentButton && (
              <PaypalCheckout
                costWithFee={costWithFee}
                handleAddPlayer={() =>
                  handleAddPlayer({ joiningAsPlayer: isGoalie && !goalieSlots })
                }
              />
            )}
            {showJoinButton && (
              <button
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => handleAddPlayer({ paid: !game.payAtDoor })}
              >
                {isGoalie
                  ? "Join as Goalie"
                  : game.payAtDoor
                    ? "Pay at the Door"
                    : "Join"}
              </button>
            )}
            <button className="btn btn-danger" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  actions
)(PaymentModal);
