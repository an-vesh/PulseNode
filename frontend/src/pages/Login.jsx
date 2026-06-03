import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Activity } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    adminEmail: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        navigate(`/hospital/${data.hospitalId}`);
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error || 'Failed to login');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error: Could not reach the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f0f11]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
            <LogIn className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm">Access your Command Center</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/50 rounded-xl text-rose-400 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Admin Email</label>
            <input required type="email" value={formData.adminEmail} onChange={e => setFormData({...formData, adminEmail: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
              placeholder="admin@hospital.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
              placeholder="••••••••" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex justify-center items-center"
          >
            {loading ? <Activity className="w-6 h-6 animate-spin" /> : 'Secure Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Don't have a hospital registered?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
