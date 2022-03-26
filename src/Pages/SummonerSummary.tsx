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
  const [exhaustCastedCount, setexhastCastedCount] = useState(0);
  const [tabisCount, setTabisCount] = useState(0);
  const [zhonaysCount, setzhonaysCount] = useState(0);
  const [zhonaysCastedCount, setzhonaysCastedCount] = useState(0);

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
      }
    } catch (error: any) {
      console.log(error);
      setSummonerIsUpdating(false);

      if (axios.isAxiosError(error)) {
        let axiosError: AxiosError = error;

        if (axiosError.response?.status === 409) {
          // Add Summoner to list of summoners that need updating

          alert("Summoner already updated within the last 2 Minutes");
        }

        if (axiosError.response?.status === 429) {
          // Add Summoner to list of summoners that need updating

          alert("Rate limit exceed please try again in 2 Minutes");
        }
      } else {
        alert("Update failed");
      }
    } finally {
      //   calcualteTabisAndExhaust();

      await setSummonerIsUpdating(false);
    }
  };

  const calcualteTabisAndExhaust = async () => {
    try {
      let exhaustCount: number = 0;
      let exhaustUsedCount: number = 0;
      let tabisCount: number = 0;
      let zhonaysCount: number = 0;

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
        if (participant?.summoner1Id === 3) {
          // summonerMatchDetails.exhaustAbused = true;

          exhaustCount += 1;
          exhaustUsedCount = participant.summoner1Casts;
        }

        if (participant?.summoner2Id === 3) {
          // summonerMatchDetails.exhaustAbused = true;

          exhaustCount += 1;
          exhaustUsedCount = participant.summoner2Casts;
        }

        // Items === Tabis (Id: 3047)
        // Items === Zhonay's (Id: 3157)

        if (participant?.item0 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item0 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item1 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item1 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item2 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item2 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item3 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item3 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item4 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item4 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item5 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item5 === 3157) {
          zhonaysCount += 1;
        }

        if (participant?.item6 === 3047) {
          tabisCount += 1;
        }
        if (participant?.item6 === 3157) {
          zhonaysCount += 1;
        }

        console.log("match");
      });

      await setexhaustCount(exhaustCount);
      await setexhastCastedCount(exhaustUsedCount);
      await setTabisCount(tabisCount);
      await setzhonaysCount(zhonaysCount);
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

  const showSummonerInformation = () => {
    if (summoner) {
      let SummonerInformationString: string = "";

      SummonerInformationString = `${summoner.rankSolo ? summoner.rankSolo : "Rank: n/a"} ${
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
                src={` https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner?.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1648211565552`}
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

              <Typography component="div" variant="h6" fontSize={14} padding={"3px"} color="text.primary">
                {showSummonerInformation()}
              </Typography>

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
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={20} color="text.primary">
                Matches Checked
              </Typography>
              <Typography component="div" variant="h6" fontSize={20} color="text.primary">
                {summonerMatches ? summonerMatches?.length : "n/a"}
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary">
                Exhaust Picked
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary">
                {summonerMatches ? exhaustCount : "n/a"}
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary" paddingTop={2}>
                Casted
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary" paddingTop={2}>
                {summonerMatches ? exhaustCastedCount : "n/a"}
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary">
                Tabis Abused
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary">
                {summonerMatches ? tabisCount : "n/a"}
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary" paddingTop={2}>
                ---
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary" paddingTop={2}>
                --
              </Typography>
            </div>
          </Paper>
          <Paper className="InflationStats">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary">
                {"Zhonya's bought"}
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary">
                {summonerMatches ? zhonaysCount : "n/a"}
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Typography component="div" variant="h6" fontSize={16} color="text.primary" paddingTop={2}>
                Casted
              </Typography>
              <Typography component="div" variant="subtitle1" fontSize={16} color="text.primary" paddingTop={2}>
                {summonerMatches ? "n/a" : "n/a"}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SummonerSummary;
