import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import { blue, blueGrey, deepPurple, green, purple } from "@mui/material/colors";

import "./App.css";

import Home from "./Pages/Home";
import Header from "./Components/Layout/Header";
import SummonerSummary from "./Pages/SummonerSummary";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#25416e",
    // },
    primary: blueGrey,
    secondary: deepPurple,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="headerWrapper">
          <Header />
        </div>

        <main>
          <Routes>
            <Route path="*" element={<Home />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="/data/summoner/notFound" element={<Home />}></Route>
            <Route path="/data/summoner/:region/:summonerName" element={<SummonerSummary />}></Route>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
