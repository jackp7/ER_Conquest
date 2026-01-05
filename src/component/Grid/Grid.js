import React from "react";
import { Grid, Link } from "@mui/material";
import TwitterLogo from "../../Images/twitter.png";
import TwitchLogo from "../../Images/twitch.png";
import PlayerRank from "../PlayerRank/PlayerRank";
import "./Grid.css";

const PlayersGrid = ({ players, showNumberBox }) => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.eliminated === b.eliminated) return b.mmr - a.mmr;
    return a.eliminated ? 1 : -1;
  });
  const getPaperStyleClass = (index) =>
    `paperStyle paperStyle${index % 2 === 0 ? "Even" : "Odd"}`;
  const nonEliminatedPlayerIndices = sortedPlayers
    .map((player, index) => (player.eliminated ? null : index))
    .filter((index) => index !== null);

  return (
    <Grid container spacing={2}>
      {sortedPlayers.map((player, index) => (
        <Grid
          item
          xs={12}
          key={index}
          container
          direction="row"
          alignItems="center"
          white-space="nowrap"
        >
          <div
            className={`numberBox ${
              index % 2 === 0 ? "numberBoxEven" : "numberBoxOdd"
            }`}
            style={{
              backgroundColor:
                index === 0
                  ? "gold"
                  : index === 1
                  ? "silver"
                  : index === 2
                  ? "#CD7F32" // RGB value for bronze color
                  : player.eliminated
                  ? "#707070" // grey for eliminated player
                  : nonEliminatedPlayerIndices.indexOf(index) >=
                      nonEliminatedPlayerIndices.length - 3 &&
                    !player.eliminated
                  ? "red"
                  : index % 2 === 0
                  ? "#add9ff"
                  : "#76a6f5",
            }}
          >
            <h2
              className={
                player.eliminated && index !== 0 && index !== 1 && index !== 2
                  ? "eliminated"
                  : ""
              }
            >
              {player.eliminated && index > 2 ? "Eliminated" : `#${index + 1}`}
            </h2>
          </div>

          <Grid
            item
            className={getPaperStyleClass(index)}
            style={{
              backgroundColor: player.eliminated
                ? "#707070"
                : index % 2 === 0
                ? "#add9ff"
                : "#76a6f5",
            }}
          >
            <Grid item xs={4}>
              <h1
                style={{
                  fontSize: "calc(1px + 1.2vw)",
                  color: "black",
                }}
              >
                <a
                  href={`https://dak.gg/er/players/${player.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {player.name}
                </a>
              </h1>
            </Grid>

            <Grid item xs={4} container justifyContent="center">
              <Grid item>
                <Link href={player.twitterurl} className="logoLink">
                  <img src={TwitterLogo} alt="Twitter" className="logoStyle" />
                </Link>
              </Grid>
              <Grid item>
                <Link href={player.twitchurl} className="logoLink">
                  <img src={TwitchLogo} alt="Twitch" className="logoStyle" />
                </Link>
              </Grid>
            </Grid>

            <Grid item xs={4} container justifyContent="flex-end">
              <PlayerRank mmr={player.mmr} rank={player.rank} />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayersGrid;
