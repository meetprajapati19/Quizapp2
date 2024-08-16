import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/facultyLogin/Login';
import Signup from './components/facultySignup/Signup';
import Dashboard from './components/facultyDash/Dashboard';
import StudentDashboard from './components/students/StudentDashboard/StudentDashboard';
import QuizForm from './components/QuizForm/QuizForm';
import QuestionForm from './components/QuestionForm/QuestionForm';
import QuestionComponent from './components/students/questionlist/QuestionComponent';
import ProtectedRoute from './components/protectRoute/protectRoute';
import FacultyChapter from './components/facultyChapter/FacultyChapter';
import Results from './components/studentResult/StudentResult';
import PerResult from './components/yourResult/perResult';

function App() {
  // const [role, setRole] = useState(null)
  // const[isActive,setIsActive]=useState(0)

  // useEffect(() => {
  //   const storedRole = localStorage.getItem('role');

    
  //   setRole(storedRole);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      
        <Route
          path="/studentdash"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentdash/:subject"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentdash/:subject/:chapter/questions"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <QuestionComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentdash/:subject/:chapter/results"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PerResult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:subject/chapters"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyChapter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:subject/:chapter/answer"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Results />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <QuizForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/questions"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <QuestionForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
