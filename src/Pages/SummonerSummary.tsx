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
  Box,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchData, Participant } from "../Models/MatchData";
import { Summoner } from "../Models/Summoner";

import { getMatchesBySummonerName, getSummonerByName, updateSummonerData } from "../Services/HttpService";

import "./SummonerSummary.css";

function SummonerSummary(props: any) {
  let { region, summonerName } = useParams();

  // Data
  const [summoner, setSummoner] = useState<Summoner>();
  const [summonerMatches, setsummonerMatches] = useState<MatchData[]>();

  // Interface
  const [summonerIsUpdating, setSummonerIsUpdating] = useState<Boolean>(false);
  const [summonerCanBeUpdated, setsummonerCanBeUpdated] = useState(true);

  // Counters
  const [exhaustCount, setexhaustCount] = useState(0);
  const [tabisCount, setTabisCount] = useState(0);

  const fetchSummonerData = async (summonerName: string) => {
    let summoner: Summoner;

    let summonerMatches: MatchData[];

    try {
      summoner = await getSummonerByName(summonerName);
      console.log(summoner);

      await setSummoner(summoner);

      summonerMatches = await getMatchesBySummonerName(summoner.name);

      await setsummonerMatches(summonerMatches);
    } catch (error) {}
  };

  useEffect(() => {
    if (summonerName) {
      fetchSummonerData(summonerName);
      calcualteTabisAndExhaust();
    }
  }, []);

  useEffect(() => {
    calcualteTabisAndExhaust();
  }, [summoner, summonerMatches]);

  const displayDate = (dateToDisplay: number | undefined) => {
    if (dateToDisplay) {
      let s = moment(dateToDisplay).fromNow();

      return s;
    }

    return "n/a";
  };

  const updateSummoner = async () => {
    try {
      if (summoner) {
        await setSummonerIsUpdating(true);

        await updateSummonerData(summoner.name);

        await fetchSummonerData(summoner.name);

        await setSummonerIsUpdating(false);
      }
    } catch (error) {
      console.log(error);
      setSummonerIsUpdating(false);
      alert("Summoner could not be updated");
    } finally {
      //   calcualteTabisAndExhaust();
    }
  };

  const calcualteTabisAndExhaust = async () => {
    try {
      let exhaustAbused: number = 0;
      let tabisAbused: number = 0;

      if (summonerMatches === undefined) return;

      // summoner.matchList.forEach(async (match) => {
      //   if (match.exhaustAbused === true) {
      //     exhaustAbused += 1;
      //   }

      //   if (match.tabisAbused === true) {
      //     tabisAbused += 1;
      //   }
      // });

      let matchesForSummonerPUUID: Participant[] = [];

      for (const [index, match] of summonerMatches.entries()) {
        let summonerMatch: Participant | undefined = match.info[0].participants.find((participant) => {
          return participant.puuid === summoner?.puuid;
        });

        if (summonerMatch === undefined) {
          continue;
        }

        matchesForSummonerPUUID.push(summonerMatch);
      }

      matchesForSummonerPUUID.forEach((participant: Participant) => {
        exhaustAbused += participant.assists;

        console.log("match");
      });

      await setexhaustCount(exhaustAbused);
      await setTabisCount(tabisAbused);
    } catch (error) {}
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
          size="medium"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={() => {
            updateSummoner();
          }}
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
  const showSummonerInformation = () => {
    if (summoner) {
      let SummonerInformationString: string = "";

      SummonerInformationString = `${summoner.rankSolo ? summoner.rankSolo : "rank n/a"} ${
        summoner.rank ? summoner.rank : ""
      } W: ${summoner.wins ? summoner.wins : "n/a"} L: ${summoner.losses ? summoner.losses : "n/a"}`;

      return SummonerInformationString;
    }

    return "wow";
  };

  return (
    <div className="summonerPageWrapper">
      <Grid container spacing={1} columns={12}>
        <Grid item md={5} lg={4}>
          <Paper className="InformationPaper">
            <div className={"SummonerIcon"}>
              <Avatar
                variant="square"
                src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon948.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1648211565552"
                style={{ width: 100, height: 100 }}
              ></Avatar>
            </div>
            <div className="InformationText">
              <Typography component="div" variant="h5" fontSize={22} padding={"3px"} color="text.primary">
                {summoner?.name}
              </Typography>

              <Typography component="div" variant="h6" fontSize={12} padding={"3px"} color="text.primary">
                Last Updated: {displayDate(summoner?.lastMatchUpdate)}
              </Typography>

              <Typography component="div" variant="h6" fontSize={16} padding={"3px"} color="text.primary">
                {showSummonerInformation()}
              </Typography>

              <div>{showUpdateButtonOrSpinner()}</div>
            </div>
          </Paper>
        </Grid>

        <Grid item md={7} lg={8}>
          <Paper style={{ padding: "10px", display: "flex", justifyContent: "space-around" }}>
            <Typography component="div" variant="h6" color="text.primary">
              Exhaust : {summonerMatches?.length! > 0 ? exhaustCount : "X"}
            </Typography>
            <Typography component="div" variant="h6" color="text.primary">
              Tabis : {summonerMatches?.length! > 0 ? tabisCount : "X"}
            </Typography>
          </Paper>
        </Grid>
        <Box width="100%" />

        <Grid item md={5} lg={4}>
          <Paper className="InformationPaper">
            <div>
              <Typography component="div" variant="h5" color="text.primary">
                Matches Checked
              </Typography>
              <Typography component="p" variant="subtitle2" color="text.primary"></Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SummonerSummary;
