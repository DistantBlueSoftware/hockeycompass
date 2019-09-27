import React from "react";
import styled from "styled-components";

const RosterRinkStyled = styled.div`
  min-width: 280px;
  min-height: 250px;
  margin: 0 auto;
  border: 3px solid #2a5489;
  border-radius: 20px;
  display: flex;
  padding: 10px 20px;
`;

const RosterSubheader = styled.h6`
  text-decoration: underline;
`;

const VersusHeader = styled.h3`
  position: absolute;
  top: 17px;
  left: 45%;
`;

const TeamLabel = styled.span`
  font-size: 14px;
`;

const HostSymbol = styled.i`
  border-radius: 5px;
  padding: 5px;
  background: blue;
  color: white;
  position: absolute;
  left: -20px;
`;

const PaidSymbol = styled.i`
  border-radius: 5px;
  padding: 5px;
  background: green;
  color: white;
  position: absolute;
  left: -20px;
`;

export const RosterRink = ({ game, isGameOwner }) => {
  const homePlayers =
    game &&
    game.players &&
    game.players.filter(p => p.type !== "goalie").filter((p, i) => i % 2 === 0);
  const awayPlayers =
    game &&
    game.players &&
    game.players.filter(p => p.type !== "goalie").filter((p, i) => i % 2 > 0);
  const homeGoalies =
    game &&
    game.players &&
    game.players.filter(p => p.type === "goalie").filter((p, i) => i % 2 === 0);
  const awayGoalies =
    game &&
    game.players &&
    game.players.filter(p => p.type === "goalie").filter((p, i) => i % 2 > 0);
  return (
    <>
      <RosterRinkStyled>
        <VersusHeader>vs.</VersusHeader>
        {game.players &&
          game.players.length > 0 && (
            <>
              <div style={{ flex: "1 1 45%" }}>
                <h4>
                  Away <TeamLabel>(light)</TeamLabel>
                </h4>
                {awayPlayers.length > 0 && (
                  <>
                    <RosterSubheader>Players</RosterSubheader>
                    {awayPlayers.map((player, index) => (
                      <div style={{ position: "relative" }}>
                        {isGameOwner &&
                          player.paid && (
                            <PaidSymbol className="fas fa-dollar-sign" />
                          )}
                        <p style={{ margin: "10px" }} key={index}>
                          {index + 1}. {player.name}{" "}
                          {player.type === "goalie" && "[g]"}
                        </p>
                      </div>
                    ))}
                  </>
                )}
                {awayGoalies.length > 0 && (
                  <>
                    <RosterSubheader>Goalies</RosterSubheader>
                    {awayGoalies.map((player, index) => (
                      <p style={{ margin: "10px" }} key={index}>
                        {index + 1}. {player.name}{" "}
                        {player.type === "goalie" && "[g]"}
                      </p>
                    ))}
                  </>
                )}
              </div>
              <div>
                <h4>
                  Home <TeamLabel>(dark)</TeamLabel>
                </h4>
                {homePlayers.length > 0 && (
                  <>
                    <RosterSubheader>Players</RosterSubheader>
                    {homePlayers.map((player, index) => (
                      <div style={{ position: "relative" }}>
                        {isGameOwner &&
                          player.paid && (
                            <PaidSymbol className="fas fa-dollar-sign" />
                          )}
                        <p style={{ margin: "10px" }} key={index}>
                          {index + 1}. {player.name}{" "}
                          {player.type === "goalie" && "[g]"}
                        </p>
                      </div>
                    ))}
                  </>
                )}
                {homeGoalies.length > 0 && (
                  <>
                    <RosterSubheader>Goalies</RosterSubheader>
                    {homeGoalies.map((player, index) => (
                      <p style={{ margin: "10px" }} key={index}>
                        {index + 1}. {player.name}{" "}
                        {player.type === "goalie" && "[g]"}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
      </RosterRinkStyled>
      {game.comment && (
        <>
          <h5>Organizer Note:</h5>
          <p>{game.comment}</p>
        </>
      )}
    </>
  );
};
