// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Avatar from "./Avatar";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CreateRoom />} />
      <Route path="/room/:roomId" element={<JoinRoom />} />
      <Route path="/avatar" element={<Avatar />} />
    </Routes>
  </Router>
);

export default App;
