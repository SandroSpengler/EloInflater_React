import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";

import axios, {AxiosError} from "axios";
import moment from "moment";
import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {JsxElement} from "typescript";

import {Summoner} from "../Models/Summoner";

import {putUpdateMatchesBySummonerId, getSummonerByName} from "../Services/HttpService";

import "./SummonerSummary.css";

function SummonerSummary() {
  let {region, summonerName} = useParams();

  const location = useLocation();

  // Data
  const [summoner, setSummoner] = useState<Summoner>();
  const [summonerMatchList, setsummonerMatchList] = useState();

  // Interface
  const [summonerIsUpdating, setSummonerIsUpdating] = useState<Boolean>(false);
  const [summonerCanBeUpdated, setsummonerCanBeUpdated] = useState(true);

  const [displayNotification, setDisplayNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor>();

  // Counters
  const [exhaustCount, setexhaustCount] = useState<number>(0);
  const [exhaustCastedCount, setexhaustCastedCount] = useState<number>(0);
  const [tabisCount, setTabisCount] = useState<number>(0);
  const [zhonaysCount, setzhonaysCount] = useState<number>(0);

  const fetchSummonerData = async (summonerName: string) => {
    let summoner: Summoner;

    try {
      summoner = await getSummonerByName(summonerName);

      await setStateBasedOnSummoner(summoner);
    } catch (error: any) {
      // ToDo
      // Handle generic HTTP errors
      setDisplayNotification(true);
      setNotificationMessage(`Could not load summoner: ${error.message}`);
      setNotificationSeverity("error");
    }
  };

  /**
   * Updates all State that relates to the Summoner
   *
   * @param summoner used for the state update
   *
   * @void
   * @throws error if summoner is undefined
   */
  const setStateBasedOnSummoner = async (summoner: Summoner): Promise<void> => {
    if (summoner === undefined || summoner === null) {
      throw new Error("No SummonerData to display/refresh ");
    }

    try {
      await setSummoner(summoner);
      await setexhaustCount(summoner.exhaustCount);
      await setexhaustCastedCount(summoner.exhaustCastCount);
      await setTabisCount(summoner.tabisCount);
      await setzhonaysCount(summoner.zhonaysCount);
    } catch (error: any) {
      throw error();
    }
  };

  useEffect(() => {
    if (summonerName !== undefined) {
      fetchSummonerData(summonerName);
    }
  }, [location.pathname]);

  const displayDate = (dateToDisplay: number | undefined) => {
    if (dateToDisplay) {
      let s = moment(dateToDisplay).fromNow();

      return s;
    }

    return "n/a";
  };

  const updateSummoner = async () => {
    try {
      if (summoner === undefined) {
        setDisplayNotification(true);
        setNotificationMessage("Summoner not valid");
        setNotificationSeverity("error");
        return;
      }

      await setSummonerIsUpdating(true);

      const updatedSummoner = await putUpdateMatchesBySummonerId(summoner.summonerId);

      if (summoner === null) {
        setDisplayNotification(true);
        setNotificationMessage("An unexpected error has occurred");
        setNotificationSeverity("error");
        return;
      }

      await setSummoner(updatedSummoner!);

      try {
        await setStateBasedOnSummoner(updatedSummoner);
      } catch (error: any) {
        setDisplayNotification(true);
        setNotificationMessage(`Could not Update Summoner State: ${error.message}`);
        setNotificationSeverity("error");
      }
    } catch (error: any) {
      setSummonerIsUpdating(false);

      if (axios.isAxiosError(error)) {
        let axiosError: AxiosError = error;

        if (axiosError.response?.status === 409) {
          // Add Summoner to list of summoners that need updating

          setDisplayNotification(true);
          setNotificationMessage("Summoner already updated recently");
          setNotificationSeverity("error");
        }

        if (axiosError.response?.status === 429) {
          // Add Summoner to list of summoners that need updating

          setDisplayNotification(true);
          setNotificationMessage("Rate limit has been reached, please try again later");
          setNotificationSeverity("error");
        }
      } else {
        setDisplayNotification(true);
        setNotificationMessage(`An unknown error has occured: ${error.message}`);
        setNotificationSeverity("error");
      }
    } finally {
      await setSummonerIsUpdating(false);
    }
  };

  const showUpdateButtonOrSpinner = () => {
    let elementToShow;

    if (summonerIsUpdating) {
      elementToShow = <CircularProgress color="success" />;
    } else {
      elementToShow = (
        <Button
          disabled={!summonerCanBeUpdated}
          variant="contained"
          color="primary"
          size="large"
          style={{marginTop: "10px", marginBottom: "10px"}}
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
   *
   * @returns The SummonerInformation to render OR undefined
   */
  const showSummonerInformation = (): ReactElement | undefined => {
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
    <React.Fragment>
      <div className="summonerPageWrapper">
        <Grid container spacing={1.1} columns={12}>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={4}
            style={{backgroundColor: "#1D1D42", maxWidth: "400px"}}
          >
            <Paper className="InformationPaper">
              <div className={"SummonerIcon"}>
                <Avatar
                  variant="square"
                  src={` https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner?.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1648211565552`}
                  style={{width: 100, height: 100}}
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

          <Box width="100%" />
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={4}
            style={{backgroundColor: "#1D1D42", maxWidth: "400px"}}
          >
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
                  Matches checked
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
                  Exhaust picked
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
                <Typography
                  title="exhaustCastCount"
                  component="div"
                  variant="subtitle1"
                  fontSize={16}
                  paddingTop={2}
                >
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
                  Tabis bought
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
        <div>
          <Snackbar
            open={displayNotification}
            autoHideDuration={6000}
            onClose={() => setDisplayNotification(false)}
          >
            <Alert onClose={() => setDisplayNotification(false)} severity="error">
              {notificationMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SummonerSummary;
