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

import { Summoner } from "../Models/Summoner";

const Home = (props: any) => {
  const [summoner, setSummoner] = useState<Summoner>();

  // Second Parameter tells the hook when to run e.g. the name changes

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
