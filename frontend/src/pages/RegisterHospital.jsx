import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Activity } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function RegisterHospital() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    adminEmail: '',
    password: '',
    employeeCount: '',
    privateBedsCount: '',
    generalBedsCount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/hospitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          employeeCount: Number(formData.employeeCount),
          privateBedsCount: Number(formData.privateBedsCount),
          generalBedsCount: Number(formData.generalBedsCount)
        })
      });
      if (res.ok) {
        const data = await res.json();
        navigate(`/hospital/${data.hospital._id}`);
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error || 'Failed to register hospital');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error: Could not reach the server or database. Ensure backend is running and MongoDB is accessible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
            <Building2 className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Register Hospital</h1>
            <p className="text-slate-400 text-sm">Join the PulseNode network</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/50 rounded-xl text-rose-400 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Hospital Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
              placeholder="e.g. Mercy General" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
            <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
              placeholder="City, State" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Admin Email</label>
              <input required type="email" value={formData.adminEmail} onChange={e => setFormData({...formData, adminEmail: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
                placeholder="admin@hospital.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Admin Password</label>
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
                placeholder="••••••••" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Total Employees</label>
              <input required type="number" value={formData.employeeCount} onChange={e => setFormData({...formData, employeeCount: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
                placeholder="500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Private Beds</label>
              <input required type="number" value={formData.privateBedsCount} onChange={e => setFormData({...formData, privateBedsCount: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
                placeholder="10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">General Beds</label>
              <input required type="number" value={formData.generalBedsCount} onChange={e => setFormData({...formData, generalBedsCount: e.target.value})} 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500" 
                placeholder="40" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex justify-center items-center"
          >
            {loading ? <Activity className="w-6 h-6 animate-spin" /> : 'Initialize Hospital ER'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
