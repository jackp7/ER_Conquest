import "./App.css";
import React, { useState, useEffect } from "react";
import ERConquestLogo from "./Images/ERConquestLogo_1.webp";
import PlayersGrid from "./component/Grid/Grid";
import { Grid, Box, Typography } from "@mui/material";
import CountdownTimer from "./component/Timer";
import EventDetails from "./component/EventInfo";

function App() {
  const [casualPlayers, setCasualPlayers] = useState([]);
  const [proPlayers, setProPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const casualResponse = await fetch("/casualPlayers.json");
        const proResponse = await fetch("/proPlayers.json");

        const casualData = await casualResponse.json();
        const proData = await proResponse.json();

        setCasualPlayers(casualData);
        setProPlayers(proData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="appBackground">
      <Box className="centerBox">
        <img
          src={ERConquestLogo}
          className="fullSizeImage"
          alt="ER Conquest Logo"
        />
      </Box>
      <Box className="eventDetailsBox">
        <EventDetails />
      </Box>
      <div className="countdownText">
        <Typography
          style={{
            fontSize: "25px",
            fontWeight: 700,
            color: "white",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          Time Until Elimination
        </Typography>
      </div>
      <Box className="countdownBox">
        <div className="countdownBoxInner">
          <CountdownTimer />
        </div>
      </Box>

      <Box className="playersBox">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="centerBox titleBox casualLeague">
              <Typography
                variant="h2"
                style={{
                  fontSize: "calc(30px + 1.5vw)",
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                CADET
              </Typography>
            </Box>
            <PlayersGrid players={casualPlayers} showNumberBox={true} />
          </Grid>
          <Grid item xs={6}>
            <Box className="centerBox titleBox">
              <Typography
                variant="h2"
                style={{
                  fontSize: "calc(30px + 1.5vw)",
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                VETERAN
              </Typography>
            </Box>
            <PlayersGrid players={proPlayers} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
