import React from "react";
import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import SearchBar from "../Components/Tools/SearchBar";

const Home = (props: any) => {
  const searchBarStyles: React.CSSProperties = {
    width: "800px",
  };

  return (
    <div>
      <div className="searchBarWrapper">
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <SearchBar styles={searchBarStyles} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
