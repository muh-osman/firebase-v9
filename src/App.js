import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Profile from "./Profile";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import GetStarted from './GetStarted';


function App() {
  return (
    <Router>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<GetStarted />} />

        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
      </Routes>

    </Router>
  );
}

export default App;
