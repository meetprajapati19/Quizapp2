import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/facultyLogin/Login";
import Signup from "./components/facultySignup/Signup";
import Dashboard from "./components/facultyDash/Dashboard";
import StudentDashboard from "./components/students/StudentDashboard/StudentDashboard";
import QuizForm from "./components/QuizForm/QuizForm";
import QuestionForm from "./components/QuestionForm/QuestionForm";


function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const t = localStorage.getItem("token");
  //   setToken(t);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/api/student" element={<StudentDashboard />} />
        <Route path="/create" element={<QuizForm />} />
        <Route path="/create/questions" element={<QuestionForm />} />
        {/* {token ? ( */}
          <Route path="/dashboard" element={<Dashboard />} />
        {/* ) : ( */}
          <Route path="/dashboard" element={<Signup />} />
        {/* )} */}
      </Routes>
    </Router>
  );
}

export default App;
