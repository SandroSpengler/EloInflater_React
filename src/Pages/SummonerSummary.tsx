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
import { width } from "@mui/system";
import axios, { AxiosError } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchData, Participant } from "../Models/MatchData";
import { Summoner } from "../Models/Summoner";

import {
  getMatchesBySummonerName,
  getSummonerByName,
  updateSummonerData,
  updateSummonerInflationByPUUID,
} from "../Services/HttpService";

import "./SummonerSummary.css";

function SummonerSummary(props: any) {
  let { region, summonerName } = useParams();

  // Data
  const [summoner, setSummoner] = useState<Summoner>();
  const [summonerMatchList, setsummonerMatchList] = useState();

  // Interface
  const [summonerIsUpdating, setSummonerIsUpdating] = useState<Boolean>(false);
  const [summonerCanBeUpdated, setsummonerCanBeUpdated] = useState(true);

  // Counters
  const [exhaustCount, setexhaustCount] = useState<number>(0);
  const [exhaustCastedCount, setexhaustCastedCount] = useState<number>(0);
  const [tabisCount, setTabisCount] = useState<number>(0);
  const [zhonaysCount, setzhonaysCount] = useState<number>(0);

  const fetchSummonerData = async (summonerName: string) => {
    let summoner: Summoner;

    try {
      summoner = await getSummonerByName(summonerName);

      await setSummoner(summoner);

      await setexhaustCount(summoner.exhaustCount);
      await setexhaustCastedCount(summoner.exhaustCastCount);
      await setTabisCount(summoner.tabisCount);
      await setzhonaysCount(summoner.zhonaysCount);
    } catch (error) {}
  };

  useEffect(() => {
    if (summonerName) {
      fetchSummonerData(summonerName);
    }
  }, []);

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
      }
    } catch (error: any) {
      updateSummonerInflationByPUUID(summoner!.puuid);

      await fetchSummonerData(summoner!.name);

      setSummonerIsUpdating(false);

      if (axios.isAxiosError(error)) {
        let axiosError: AxiosError = error;

        if (axiosError.response?.status === 409) {
          // Add Summoner to list of summoners that need updating

          alert("Summoner already updated recently");
        }

        if (axiosError.response?.status === 429) {
          // Add Summoner to list of summoners that need updating

          alert("Rate limit exceed please try again in 2 Minutes");
        }
      } else {
        alert("Update failed");
      }
    } finally {
      await setSummonerIsUpdating(false);
    }
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

  const showSummonerInformation = () => {
    if (summoner)
      return (
        <Typography
          component="div"
          variant="h6"
          fontSize={14}
          padding={"3px"}
          color="text.primary"
        >
          {summoner.rankSolo ? summoner.rankSolo : "Rank: n/a"}
          &nbsp;
          {summoner.rank ? summoner.rank : ""}
          <br />
          W: {summoner.wins ? summoner.wins : "n/a"}
          &nbsp; L: {summoner.losses ? summoner.losses : "n/a"}
        </Typography>
      );
  };

  const calculateSummonerMatches = (): string => {
    if (summoner === undefined) return "n/a";

    console.log(summoner);

    return `${
      summoner.uninflatedMatchList.length + summoner.inflatedMatchList.length
    }`;
  };

  return (
    <div className="summonerPageWrapper">
      <Grid container spacing={1} columns={12}>
        <Grid item md={5} lg={4}>
          <Paper className="InformationPaper">
            <div className={"SummonerIcon"}>
              <Avatar
                variant="square"
                src={` https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner?.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1648211565552`}
                style={{ width: 100, height: 100 }}
              ></Avatar>
            </div>
            <div className="InformationText">
              <Typography
                component="div"
                variant="h5"
                fontSize={22}
                padding={"3px"}
                color="text.primary"
              >
                {summoner?.name}
              </Typography>

              <Typography
                component="div"
                variant="h6"
                fontSize={12}
                padding={"3px"}
                color="text.primary"
              >
                Last Updated: {displayDate(summoner?.lastMatchUpdate)}
              </Typography>

              {showSummonerInformation()}

              <div>{showUpdateButtonOrSpinner()}</div>
            </div>
          </Paper>
        </Grid>

        <Grid item md={7} lg={8}>
          <Paper></Paper>
        </Grid>
        <Box width="100%" />

        <Grid item md={5} lg={4}>
          <Paper className="InformationPaper">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={20}
                color="text.primary"
              >
                Matches Checked
              </Typography>
              <Typography
                component="div"
                variant="h6"
                fontSize={20}
                color="text.primary"
              >
                {calculateSummonerMatches()}
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
              >
                Exhaust Picked
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
              >
                {exhaustCount ? exhaustCount : "n/a"}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                Casted
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                {exhaustCastedCount ? exhaustCastedCount : "n/a"}
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
              >
                Tabis Abused
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
              >
                {tabisCount ? tabisCount : "n/a"}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                ---
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                --
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
              >
                {"Zhonya's bought"}
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
              >
                {zhonaysCount ? zhonaysCount : "n/a"}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              {/* <Typography
                component="div"
                variant="h6"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                Casted
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                color="text.primary"
                paddingTop={2}
              >
                {summoner?.matchList ? "n/a" : "n/a"}
              </Typography> */}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SummonerSummary;
