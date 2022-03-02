// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Button, CircularProgress, dividerClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { Summoner } from "../Models/Summoner";

import { getPlayerByName } from "../Services/HttpService";

const Overview = (props: any) => {
  const queryName = "Forevermates";

  const [summoner, setSummoner] = useState<Summoner>();
  const [showUser, setShowUser] = useState(false);

  // Second Parameter tells the hook when to run e.g. the name changes
  useEffect(() => {
    const fetchSummoner = async () => {
      let fetchSummoner = await getPlayerByName(queryName);

      try {
        setSummoner(fetchSummoner);
      } catch (error) {}
    };

    fetchSummoner();
  }, []);

  const showUserComponent = () => {
    return (
      <div>
        <div>Name </div>
        <div>Age </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div>
          {queryName}'s PlayerID is: {summoner?.puuid}
        </div>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setShowUser(!showUser);
          }}
        >
          Show
        </Button>
        {showUser === true ? showUserComponent() : ""}
      </div>
    </div>
  );
};

export default Overview;
