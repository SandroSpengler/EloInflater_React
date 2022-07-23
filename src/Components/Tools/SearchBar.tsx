import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, CircularProgress, IconButton, Paper, TextField } from "@mui/material";

import { getSummonerByName } from "../../Services/HttpService";
import axios, { AxiosError } from "axios";

const SearchBar = (props: {}) => {
  const [searchSummonerName, setSearchSummonerName] = useState<string>("");
  const [requestingSummoner, setRequestingSummoner] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateSummonerAndNavigate = async () => {
    let path = `/data/summoner/euw/`;

    setRequestingSummoner(true);

    try {
      const summoner = await getSummonerByName(searchSummonerName);

      navigate(path + summoner.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRequestingSummoner(false);
        let axiosError: AxiosError = error;

        if (axiosError.response?.status === 404) {
          alert("Summoner does not Exist");
          // navigate("/data/summoner/notFound");
        }
      }
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
    <div style={{ justifyContent: "center", display: "flex" }}>
      <TextField
        id="summonerName"
        label="Summoner Name"
        value={searchSummonerName}
        variant="outlined"
        style={{ width: 800 }}
        onKeyDown={(e) => {
          keyEvaluateBoardInputs(e);
        }}
        onChange={(e) => {
          setSearchSummonerName(e.target.value);
        }}
        InputProps={{
          endAdornment: requestingSummoner ? <CircularProgress color="secondary" /> : <SearchButton />,
          style: { color: "white" },
        }}
      />
    </div>
  );
};

export default SearchBar;
