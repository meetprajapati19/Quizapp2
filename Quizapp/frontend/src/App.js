import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Login from './components/facultyLogin/Login'
import Loginpage from './components/loginpage'
import Subject_box_wrapper from './components/subject_box_wrapper'
import Chapter from './components/Chapter'
import QuizeContainer from './components/Quize_container'
import Signup from './components/facultySignup/Signup'
import Dashboard from './components/facultyDash/Dashboard'



function App() {

  const [token,setToken]=useState(null);
  
  useEffect(()=>{
    const t=localStorage.getItem('token');
    setToken(t);
  },[localStorage.getItem('token')])

  return (


    <Router>
      <>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/subjects" element={<Subject_box_wrapper />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/quiz" element={<QuizeContainer />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/signup" element={<Signup />} />
          {token && <Route path="/dashboard" element={<Dashboard />} />}
          {!token && <Route path="/dashboard" element={<Signup />} />}
        </Routes>
      </>
    </Router>
  )
}

export default App
