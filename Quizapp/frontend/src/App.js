import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Login from './components/facultyLogin/Login'
import Loginpage from './components/loginpage'
import Subject_box_wrapper from './components/subject_box_wrapper'
import Chapter from './components/Chapter'
import QuizeContainer from './components/Quize_container'

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/subjects" element={<Subject_box_wrapper />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/quiz" element={<QuizeContainer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
