import { Avatar, Button, Grid, Paper, Typography, CircularProgress, Box } from "@mui/material";

import axios, { AxiosError } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Summoner } from "../Models/Summoner";

import { getMatchesBySummonerName, getSummonerByName } from "../Services/HttpService";

import "./SummonerSummary.css";

function SummonerSummary() {
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

        // await updateSummonerData(summoner.name);

        await fetchSummonerData(summoner.name);
      }
    } catch (error: any) {
      // updateSummonerInflationByPUUID(summoner!.puuid);

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
          color="primary"
          size="large"
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

  /**
   * Displays the SummonerInformation
   */
  const showSummonerInformation = () => {
    if (summoner)
      return (
        <Typography component="div" variant="h6" fontSize={14} padding={"3px"}>
          {summoner.rankSolo ? summoner.rankSolo : "Rank: n/a"}
          &nbsp;
          {summoner.rank ? summoner.rank : ""}
          <br />
          {summoner.leaguePoints ? `${summoner.leaguePoints} LP ` : "n/a"}
          <br />
          W: {summoner.wins ? summoner.wins : "n/a"}
          &nbsp; L: {summoner.losses ? summoner.losses : "n/a"}
        </Typography>
      );
  };

  const calculateSummonerMatches = (): string => {
    if (summoner === undefined) return "n/a";

    return `${summoner.uninflatedMatchList.length + summoner.inflatedMatchList.length}`;
  };

  const displayInflatedStats = (inflatedStat: number): string => {
    if (summoner === undefined) return "n/a";

    if (summoner.inflatedMatchList.length + summoner.uninflatedMatchList.length === 0) return "n/a";

    if (inflatedStat === undefined) return "n/a";

    return `${inflatedStat}`;
  };

  return (
    <div className="summonerPageWrapper">
      <Grid container spacing={1.1} columns={12}>
        <Grid item md={5} lg={4} style={{ backgroundColor: "#1D1D42" }}>
          <Paper className="InformationPaper">
            <div className={"SummonerIcon"}>
              <Avatar
                variant="square"
                src={` https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner?.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1648211565552`}
                style={{ width: 100, height: 100 }}
              ></Avatar>
            </div>
            <div className="InformationText">
              <Typography component="div" variant="h5" fontSize={22} padding={"3px"}>
                {summoner?.name}
              </Typography>

              <Typography component="div" variant="h6" fontSize={12} padding={"3px"}>
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
        <Grid item md={5} lg={4} style={{ backgroundColor: "#1D1D42" }}>
          <Paper className="InformationPaper">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography component="div" variant="h6" fontSize={20}>
                Matches Checked
              </Typography>
              <Typography component="div" variant="h6" fontSize={20}>
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
              <Typography component="div" variant="h6" fontSize={16}>
                Exhaust Picked
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16}>
                {displayInflatedStats(exhaustCount)}
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
              <Typography component="div" variant="h6" fontSize={16} paddingTop={2}>
                Casted
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} paddingTop={2}>
                {displayInflatedStats(exhaustCastedCount)}
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
              <Typography component="div" variant="h6" fontSize={16}>
                Tabis Abused
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16}>
                {displayInflatedStats(tabisCount)}
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
              <Typography component="div" variant="h6" fontSize={16} paddingTop={2}>
                ---
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} paddingTop={2}>
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
              <Typography component="div" variant="h6" fontSize={16}>
                {"Zhonya's bought"}
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16}>
                {displayInflatedStats(zhonaysCount)}
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
                
                paddingTop={2}
              >
                Casted
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                fontSize={16}
                
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
