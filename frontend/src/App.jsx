import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DSATracker from './pages/DSATracker';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JobPreparation from './pages/JobPreparation';
import InterviewPrepPage from './pages/InterviewPrepPage';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/dsa-tracker" element={
          <PrivateRoute><DSATracker /></PrivateRoute>
        } />
        <Route path="/resume-analyzer" element={
          <PrivateRoute><ResumeAnalyzer /></PrivateRoute>
        } />
        <Route path="/job-preparation" element={
          <PrivateRoute><JobPreparation /></PrivateRoute>
        } />
        {/* Interview Prep - public access (matching navbar) */}
        <Route path="/interview-prep" element={<InterviewPrepPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;