import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import { blue, blueGrey, green, purple } from "@mui/material/colors";

import "./App.css";

import Overview from "./Pages/Overview";
import Header from "./Components/Layout/Header";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#25416e",
    // },
    primary: blueGrey,
    secondary: blue,
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
            <Route path="*" element={<Overview />}></Route>
            <Route path="/" element={<Overview />}></Route>
            <Route path="overview" element={<Overview />}></Route>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
