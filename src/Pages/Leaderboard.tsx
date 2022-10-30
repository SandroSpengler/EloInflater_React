import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React from "react";

import "./Leaderboard.css";

function Leaderboard() {
  return (
    <React.Fragment>
      <div className="leaderboardPageWrapper">
        <Grid container spacing={1.1} columns={12}>
          <Grid item xs={6} sm={6} md={2} lg={2.25}>
            <FormControl fullWidth>
              <TextField style={{color: "white"}} label="Summoner Name"></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
          <Grid item xs={6} sm={6} md={4} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
    </React.Fragment>
  );
}

export default Leaderboard;
