// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Button, dividerClasses } from "@mui/material";
import { useState } from "react";

import { getUsers } from "../Services/HttpService";

const Overview = (props: any) => {
  const [counter, setCounter] = useState(0);
  const [showUser, setShowUser] = useState(false);

  const showUserComponent = () => {
    let users = getUsers();

    return (
      <div>
        <div>Name {users.name}</div>
        <div>Age {users.age}</div>
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
