import React, {useEffect} from "react";

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

import "./App.css";

import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import SummonerSummary from "./Pages/SummonerSummary";

const primary = "#1D1D42";
const secondary = "#373767";
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
          background: secondary,
          borderRadius: "8px",
          color: "white",
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            color: "white",
          },
        },
        InputLabelProps: {
          style: {
            color: "white",
          },
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
    MuiMenuItem: {
      styleOverrides: {
        gutters: {
          backgroundColor: primary,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "white",
          fontSize: "1em",
          backgroundColor: secondary,
          borderRadius: "10px",
        },
        iconOutlined: {
          backgroundColor: ternary,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        text: {
          color: "white",
        },
        root: {
          color: "white",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          fontSize: ".75em",
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

/**
 * Creates the routes for the App-Routing
 *
 * @returns ReactRoutingElement
 */
export const routes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />}></Route>
      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="/data/summoner/:region/:summonerName" element={<SummonerSummary />}></Route>
      <Route path="/leaderboard/:region/:rankmode" element={<Leaderboard />}></Route>
    </Routes>
  );
};

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      document.title = "DEV | Eloinflater";
    }
    if (process.env.NODE_ENV === "test") {
      document.title = "TEST | Eloinflater";
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="headerWrapper">
          <Header />
        </div>
        <main>{routes()}</main>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
