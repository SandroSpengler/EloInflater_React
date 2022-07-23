import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert, Button, CircularProgress, IconButton, Paper, Snackbar, TextField } from "@mui/material";

import { getSummonerByName } from "../../Services/HttpService";
import axios, { AxiosError } from "axios";

const SearchBar = (props: { styles: React.CSSProperties }) => {
  const [searchSummonerName, setSearchSummonerName] = useState<string>("");
  const [requestingSummoner, setRequestingSummoner] = useState<boolean>(false);

  const [displayError, setDisplayError] = useState<boolean>(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState<string>("");

  const navigate = useNavigate();

  const validateSummonerAndNavigate = async () => {
    if (searchSummonerName === "" || searchSummonerName === undefined) {
      setDisplayError(true);
      setErrorNotificationMessage("Please provide a Summoner Name");

      return;
    }

    let path = `/data/summoner/euw/`;

    setRequestingSummoner(true);

    try {
      const summoner = await getSummonerByName(searchSummonerName);

      await navigate(path + summoner.name);
      location.reload();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setRequestingSummoner(false);
        let axiosError: AxiosError = error;

        if (axiosError.response?.status === 404) {
          // navigate("/data/summoner/notFound");
          setDisplayError(true);
          setErrorNotificationMessage("No Summoner with that name was found");
          return;
        }

        setDisplayError(true);
        setErrorNotificationMessage("Server currently not reachable");
        return;
      }

      setDisplayError(true);
      setErrorNotificationMessage(`Error ${error.message}`);
    } finally {
      setRequestingSummoner(false);
    }
  };

  const SearchButton = () => {
    return (
      //   <IconButton
      //   >
      //     <SearchIcon />
      //   </IconButton>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          validateSummonerAndNavigate();
        }}
      >
        Search
      </Button>
    );
  };

  const keyEvaluateBoardInputs = async (e: any) => {
    if (e.keyCode !== 13) return;

    await validateSummonerAndNavigate();
  };

  return (
    <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
      <TextField
        id="summonerName"
        label="Summoner Name"
        value={searchSummonerName}
        variant="outlined"
        style={props.styles}
        onKeyDown={(e) => {
          keyEvaluateBoardInputs(e);
        }}
        onChange={(e) => {
          setSearchSummonerName(e.target.value);
        }}
        InputProps={{
          endAdornment: requestingSummoner ? <CircularProgress color="secondary" /> : <SearchButton />,
          style: { color: "white", alignItems: "center" },
        }}
      />
      <Snackbar open={displayError} autoHideDuration={6000} onClose={() => setDisplayError(false)}>
        <Alert onClose={() => setDisplayError(false)} severity="error">
          {errorNotificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchBar;
