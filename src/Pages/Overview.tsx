// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Button, dividerClasses } from "@mui/material";
import { useEffect, useState } from "react";

import { getPlayerByName } from "../Services/HttpService";

const Overview = (props: any) => {
  const [counter, setCounter] = useState(0);
  const [showUser, setShowUser] = useState(false);

  // Second Parameter tells the hook when to run e.g. the name changes
  useEffect(() => {
    (async () => {
      let player = await getPlayerByName("forevermates");

      console.log(player);
    })();
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
        <p>Hello World</p>
        <Button
          variant="contained"
          // variant="outlined"
          color="secondary"
          onClick={() => setCounter(counter + 1)}
        >
          {counter} + 2
        </Button>
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
