import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Overview from "./Pages/Overview";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="*" element={<Overview />}></Route>
          <Route path="/" element={<Overview />}></Route>
          <Route path="overview" element={<Overview />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
