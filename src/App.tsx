import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";

import "./App.css";

import Overview from "./Pages/Overview";
import { blue, green, purple } from "@mui/material/colors";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#25416e",
    // },
    primary: blue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
