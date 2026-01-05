import React from "react";
import { Typography } from "@mui/material";

const EventDetails = () => {
  return (
    <div>
      <Typography
        variant="body1"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        <ul>
          <li>
            Player elimination begins end of the 4th day, August 6th at 11:59pm
            PST. The bottom three at the end of each day will be eliminated.
          </li>
          <li>
            All games must be played on any non-KR server. Any games on KR may
            result in immediate elimination.
          </li>
          <li>
            There will be rewards for Top 12 in each division in the form of
            cash or gift subs back to your community! For more detailed prizing
            information and eliminations, please click{" "}
            <a
              href="https://imgur.com/a/9jIdspu"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </li>
          <li>
            Players from both leagues are allowed to queue with each other and
            with friends if so desired.
          </li>
          <li>
            Teaming with outside players besides your in-game squad during
            matches is prohibited against Nimble Neuron’s player conduct and
            will result in immediate termination.
          </li>
          <li>At least 50% of a player's games must be done on stream.</li>
        </ul>
      </Typography>
    </div>
  );
};

export default EventDetails;
