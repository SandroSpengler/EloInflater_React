import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Summoner } from "../Models/Summoner";

import { getPlayerByName } from "../Services/HttpService";

function SummonerSummary(props: any) {
  let { region, summonerName } = useParams();

  const [summoner, setSummoner] = useState<Summoner>();
  const [summonerIsUpdating, setSummonerIsUpdating] = useState<Boolean>(false);
  const [summonerCanBeUpdated, setsummonerCanBeUpdated] = useState(true);

  const fetchSummoner = async (summonerName: string) => {
    try {
      let fetchSummoner = await getPlayerByName(summonerName);
      console.log(fetchSummoner);

      setSummoner(fetchSummoner);
    } catch (error) {}
  };

  useEffect(() => {
    if (summonerName) {
      fetchSummoner(summonerName);
    }
  }, []);

  const displayDate = (dateToDisplay: string | undefined) => {
    if (dateToDisplay) {
      let s = new Date(dateToDisplay).toISOString();

      return s;
    }

    return "";
  };

  const showUpdateButtonOrSpinner = () => {
    let elementToShow;

    if (summonerIsUpdating) {
      elementToShow = <CircularProgress color="secondary" />;
    } else {
      elementToShow = (
        <Button
          disabled={!summonerCanBeUpdated}
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginRight: "10px" }}
        >
          Update
        </Button>
      );
    }

    return <div>{elementToShow}</div>;
  };

  const renderExhaustAndTabiAbuser = () => {
    return (
      <ListItem alignItems="flex-start" style={{ backgroundColor: "#1a261d", borderRadius: "20px", margin: "10px" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
        <ListItemText
          primary={`${summoner?.name}`}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                {`W:  L: `}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  return (
    <div className="summonerPageWrapper">
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography component="div" variant="h5" color="text.primary">
                {summoner?.name}
              </Typography>
              <Typography component="p" variant="subtitle2" color="text.primary">
                Last Updated : {displayDate(summoner?.updatedAt)}
              </Typography>
            </div>

            <div>
              {showUpdateButtonOrSpinner()}
              {/* <Button variant="contained" color="secondary" size="small">
                XXX
              </Button> */}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: "10px", display: "flex", justifyContent: "space-around" }}>
            <Typography component="div" variant="h6" color="text.primary">
              Exhaust : {12}
            </Typography>
            <Typography component="div" variant="h6" color="text.primary">
              Tabis : {12}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SummonerSummary;
