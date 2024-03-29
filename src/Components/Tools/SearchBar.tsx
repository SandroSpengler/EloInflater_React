import React, {useState} from "react";
import {useNavigate} from "react-router";

import {Alert, Button, CircularProgress, Snackbar, TextField, useMediaQuery} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import axios, {AxiosError} from "axios";
import {getSummonerByName} from "../../Services/HttpService";

import "./SearchBar.css";

const SearchBar = (props: {styles: React.CSSProperties}) => {
  const [searchSummonerName, setSearchSummonerName] = useState<string>("");
  const [requestingSummoner, setRequestingSummoner] = useState<boolean>(false);

  const [displayError, setDisplayError] = useState<boolean>(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState<string>("");

  const navigate = useNavigate();

  /**
   * Requests the summoner from the server and navigates to the SummonerSummaryPage
   * @async
   *
   * @void
   */
  const validateSummonerAndNavigate = async (): Promise<void> => {
    const path = `/data/summoner/euw/`;

    if (searchSummonerName === "" || searchSummonerName === undefined) {
      setDisplayError(true);
      setErrorNotificationMessage("Please provide a Summoner Name");

      return;
    }

    setRequestingSummoner(true);

    try {
      const summoner = await getSummonerByName(searchSummonerName);

      setRequestingSummoner(false);

      setSearchSummonerName("");
      navigate(path + summoner.name, {replace: true});
    } catch (error: any) {
      setRequestingSummoner(false);

      if (!axios.isAxiosError(error)) {
        setDisplayError(true);
        setRequestingSummoner(false);
        setErrorNotificationMessage(`Error ${error.message}`);
      }

      const axiosError: AxiosError = error;

      if (axiosError.response?.status === 404) {
        setDisplayError(true);
        setErrorNotificationMessage("No Summoner with that name was found");
        return;
      }

      setDisplayError(true);
      setErrorNotificationMessage("Server currently not reachable");
      return;
    } finally {
    }
  };

  /**
   * SearchBar UI Element
   *
   * @returns The Searchbar
   */
  const SearchButton = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button
          aria-label="searchButton"
          variant="contained"
          color="primary"
          size="small"
          disabled={searchSummonerName === "" ? true : false}
          onClick={() => {
            validateSummonerAndNavigate();
          }}
        >
          <SearchIcon />
        </Button>
      </React.Fragment>
    );
  };

  /**
   * Allows user to trigger the search with the keyboard
   * @async
   *
   * @param event Keyboard Event
   * @void
   */
  const keyEvaluateBoardInputs = async (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    if (event.key !== "Enter") return;

    await validateSummonerAndNavigate();
  };

  // Hide text on small device
  return (
    <div style={{justifyContent: "center", display: "flex", alignItems: "center"}}>
      <TextField
        aria-label="test"
        // label={useMediaQuery("(min-width:600px)") ? "Summoner Name" : ""}
        label="Summoner Name"
        variant="outlined"
        value={searchSummonerName}
        // style={props.styles}
        className="SearchBarWrapper"
        onKeyDown={(event) => {
          keyEvaluateBoardInputs(event);
        }}
        onChange={(event) => {
          setSearchSummonerName(event.target.value);
        }}
        InputProps={{
          endAdornment: requestingSummoner ? (
            <CircularProgress color="secondary" />
          ) : (
            <SearchButton />
          ),
          style: {color: "white", alignItems: "center"},
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
