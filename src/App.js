import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
