import React from "react";

const FootBallCard = ({ footy }) => {
  return (
    <div>
      <h2>{footy.name || "No Name is available"}</h2>
      <p>Team Name: {footy.teamName || "No Team Name Available"}</p>
      <p>Type: {footy.type}</p>
      <p>Score: {footy.score}</p>
    </div>
  );
};

export default FootBallCard;
