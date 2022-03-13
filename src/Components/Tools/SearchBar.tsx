import React from "react";

import { Button, IconButton, TextField } from "@mui/material";

const SearchBar = (props: {}) => {
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
          console.log("click");
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
        variant="outlined"
        style={{ width: 800 }}
        color="primary"
        InputProps={{ endAdornment: <SearchButton /> }}
      />
    </div>
  );
};

export default SearchBar;
