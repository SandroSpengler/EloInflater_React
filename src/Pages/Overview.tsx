import React from "react";
import { useEffect, useState } from "react";

// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  dividerClasses,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import SearchBar from "../Components/Tools/SearchBar";

import { LeaguePlayer } from "../Models/LeaguePlayer";
import { Summoner } from "../Models/Summoner";

import { getPlayerByLeague, getPlayerByName } from "../Services/HttpService";

const Home = (props: any) => {
  const [summoner, setSummoner] = useState<Summoner>();
  const [challengerPlayerList, setchallengerPlayerList] = useState<LeaguePlayer[]>();

  const fetchSummoner = async (summonerName: string) => {
    try {
      let fetchSummoner = await getPlayerByName(summonerName);
      console.log(fetchSummoner);

      setSummoner(fetchSummoner);
    } catch (error) {}
  };

  const fetchPlayersByLeague = async () => {
    try {
      let challengerPlayerList = await getPlayerByLeague("challenger", "rankedsolo");

      setchallengerPlayerList(challengerPlayerList);

      console.log(challengerPlayerList);
    } catch (error) {}
  };

  // Second Parameter tells the hook when to run e.g. the name changes
  useEffect(() => {
    fetchSummoner("forevermates");
  }, []);

  const renderExhaustAndTabiAbuser = () => {
    return challengerPlayerList?.map((player: LeaguePlayer, index) => {
      return (
        <ListItem
          key={index}
          alignItems="flex-start"
          style={{ backgroundColor: "#1a261d", borderRadius: "20px", margin: "10px" }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" />
          </ListItemAvatar>
          <ListItemText
            primary={`${player.summonerName} ${player.leaguePoints} LP`}
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  {`W: ${player.wins} L: ${player.losses}`}
                </Typography>
                {" " + player.summonerId}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  };

  const renderCleanSummoners = () => {
    return challengerPlayerList?.map((player: LeaguePlayer, index) => {
      return (
        <ListItem
          key={index}
          alignItems="flex-start"
          style={{ backgroundColor: "darkblue", borderRadius: "20px", margin: "10px" }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  };

  // <div>
  //   <Grid container spacing={2} columns={12} justifyContent="center">
  //     <Grid item xs={5}>

  //       {/* <List>{renderExhaustAndTabiAbuser()}</List> */}
  //     </Grid>
  //     <Grid item xs={5}>
  //       {/* <List>{renderExhaustAndTabiAbuser()}</List> */}
  //     </Grid>
  //   </Grid>
  // </div>

  return (
    <div>
      <div className="searchBarWrapper">
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
