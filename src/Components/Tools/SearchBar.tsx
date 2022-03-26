import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, IconButton, TextField } from "@mui/material";

import { getSummonerByName } from "../../Services/HttpService";
import axios, { AxiosError } from "axios";

const SearchBar = (props: {}) => {
  const [searchSummonerName, setSearchSummonerName] = useState("");

  const navigate = useNavigate();

  const validateSummonerAndNavigate = async () => {
    let path = `/data/summoner/euw/`;

    try {
      const summoner = await getSummonerByName(searchSummonerName);

      navigate(path + summoner.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
        color="secondary"
        size="small"
        onClick={() => {
          validateSummonerAndNavigate();
        }}
      >
        Search
      </Button>
    );
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <TextField
        id="summonerName"
        label="Summoner Name"
        value={searchSummonerName}
        variant="outlined"
        style={{ width: 800 }}
        color="primary"
        onChange={(e) => {
          setSearchSummonerName(e.target.value);
        }}
        InputProps={{ endAdornment: <SearchButton /> }}
      />
    </div>
  );
};

export default SearchBar;
