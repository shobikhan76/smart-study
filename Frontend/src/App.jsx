import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import LMSLogin from "./pages/LMSLogin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import News from "./pages/News";
import Lecturers from "./pages/Lecturers";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard.jsx";
// import LMSLogin from "./pages/LMSLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Apply" element={<Signup />} />
        <Route path="/LMS" element={<LMSLogin />} />
        <Route path="/about" element={< About/>} />
        <Route path="/news" element={<News />} />
        <Route path="/lecturers" element={<Lecturers />} />
          
        {/* LMS Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
