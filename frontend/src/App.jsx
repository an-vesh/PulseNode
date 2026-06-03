import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterHospital from './pages/RegisterHospital';
import Login from './pages/Login';
import HospitalDashboard from './pages/HospitalDashboard';
import TriageDashboard from './pages/TriageDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterHospital />} />
          <Route path="/hospital/:id" element={<HospitalDashboard />} />
          <Route path="/hospital/:id/triage" element={<TriageDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
