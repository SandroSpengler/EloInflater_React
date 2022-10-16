import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider, TextField } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import {
  amber,
  blue,
  blueGrey,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  purple,
} from "@mui/material/colors";

import "./App.css";

import Home from "./Pages/Home";
import Header from "./Components/Layout/Header";
import SummonerSummary from "./Pages/SummonerSummary";
import { ColorPartial } from "@mui/material/styles/createPalette";

const primary = "#1D1D42";
const secondary = "#19857b";
const background = "#161616";
const ternary = "#373767";
const accent = "0A0A2B";

const theme = createTheme({
  palette: {
    background: {
      default: background,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: ternary,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: ternary,
          borderRadius: "8px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          fontSize: "1.1em",
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("DEV");
      document.title = "DEV | Eloinflater";
    }
    if (process.env.NODE_ENV === "test") {
      console.log("TEST");
      document.title = "TEST | Eloinflater";
    }
  });

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
            <Route
              path="/data/summoner/:region/:summonerName"
              element={<SummonerSummary />}
            ></Route>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
