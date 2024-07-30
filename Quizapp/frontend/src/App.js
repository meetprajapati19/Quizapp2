import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/facultyLogin/Login";

import Signup from "./components/facultySignup/Signup";
import Dashboard from "./components/facultyDash/Dashboard";
import StudentDashboard from "./components/students/StudentDashboard/StudentDashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, [localStorage.getItem("token")]);

  return (
    <Router>
      <>
        
        <Routes>
          <Route path="/" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/sdashboard" element={<StudentDashboard />} />
          {token && <Route path="/dashboard" element={<Dashboard />} />}
          {!token && <Route path="/dashboard" element={<Signup />} />}
        </Routes>
      </>
    </Router>
  );
}

export default App;
