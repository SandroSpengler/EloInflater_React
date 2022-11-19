import {Image} from "@mui/icons-material";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import "./Leaderboard.css";

function Leaderboard() {
  return (
    <React.Fragment>
      <div className="leaderboardPageWrapper">
        <Typography component="p" fontSize={14} fontWeight={100} padding={"3px"} display="inline">
          Region
        </Typography>
        <Typography component="p" fontSize={16} fontWeight={900} padding={"3px"} display="inline">
          EUW - Ranked Solo -
        </Typography>
        <Typography component="p" fontSize={14} fontWeight={100} padding={"3px"} display="inline">
          Total Summoners Analyzed
        </Typography>
        <Typography component="p" fontSize={16} fontWeight={900} padding={"3px"} display="inline">
          10978
        </Typography>
        <Typography component="p" fontSize={14} fontWeight={100} padding={"3px"} display="inline">
          Last Updated:
        </Typography>
        <Typography component="p" fontSize={16} fontWeight={900} padding={"3px"} display="inline">
          3 hours ago
        </Typography>
      </div>
      <div className="leaderboardPageWrapper">
        <Grid container spacing={1.1} columns={12}>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <FormControl fullWidth>
              <TextField style={{color: "white"}} label="Summoner Name"></TextField>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={1.5}
            lg={2}
            sx={{display: {xs: "none", sm: "block", md: "block"}}}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age1</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={""}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Ten</MenuItem>
                <MenuItem value={50}>Twenty</MenuItem>
                <MenuItem value={60}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={1.5}
            lg={2}
            sx={{display: {xs: "none", sm: "block", md: "block"}}}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Ten</MenuItem>
                <MenuItem value={50}>Twenty</MenuItem>
                <MenuItem value={60}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={1.5}
            lg={2}
            sx={{display: {xs: "none", sm: "none", md: "block"}}}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age3</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Ten</MenuItem>
                <MenuItem value={50}>Twenty</MenuItem>
                <MenuItem value={60}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={1.5}
            lg={2}
            sx={{display: {xs: "none", sm: "none", md: "block"}}}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age4</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Ten</MenuItem>
                <MenuItem value={50}>Twenty</MenuItem>
                <MenuItem value={60}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <div className="leaderboardPageWrapper">
        <Grid container spacing={1.1} columns={12} padding={"10px"} marginBottom={"15px"}>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5}>
            Rank
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5}>
            Summoner
          </Grid>
          <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5}>
            Tier
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5}>
            Inflated Ratio
          </Grid>
        </Grid>
        <Paper>
          <Grid container spacing={1.1} columns={12} padding={"10px"}>
            <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5}>
              10394
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              This is a long Summoner Name to just to be annoying
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5}>
              <Image style={{width: 35, height: 35}}></Image>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <div style={{width: "100%", backgroundColor: "red"}}> &nbsp;</div>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <div className="leaderboardPageWrapper">
        <Pagination
          count={10}
          color="secondary"
          style={{display: "flex", justifyContent: "space-around"}}
        />
      </div>
    </React.Fragment>
  );
}

export default Leaderboard;
