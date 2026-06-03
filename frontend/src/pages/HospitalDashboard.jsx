import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Building, Users, Bed, ArrowRight } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function HospitalDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/hospitals/${id}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, [id]);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center"><Activity className="w-8 h-8 animate-spin text-cyan-500" /></div>;
  }

  const { hospital, totalBeds, availableBeds } = data;

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 mb-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{hospital.name}</h1>
              <p className="text-slate-400 flex items-center gap-2 font-medium">
                <Building className="w-4 h-4" /> {hospital.location}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate(`/hospital/${id}/triage`)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Enter ER as Doctor/Nurse
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-semibold"
            >
              Log Out of Admin
            </button>
            
            <button 
              onClick={async () => {
                if(window.confirm('Are you sure you want to completely delete this Hospital? This will delete all beds and patient data permanently.')) {
                  try {
                    await fetch(`${BACKEND_URL}/api/hospitals/${id}`, { method: 'DELETE' });
                    navigate('/');
                  } catch(e) { console.error(e) }
                }
              }}
              className="px-5 py-2.5 rounded-full border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors text-sm font-semibold ml-auto"
            >
              Delete Hospital Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Bed className="text-cyan-400" />} title="Total Capacity" value={totalBeds} sub={`Beds Registered`} />
          <StatCard icon={<Activity className="text-emerald-400" />} title="Available Beds" value={availableBeds} sub={`${totalBeds - availableBeds} currently occupied`} />
          <StatCard icon={<Users className="text-indigo-400" />} title="Staff Network" value={hospital.employeeCount} sub="Registered Employees" />
          
          <div className="md:col-span-3 bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mt-4 flex justify-around">
             <div className="text-center">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Private Beds</p>
                <p className="text-2xl font-bold text-white">{hospital.privateBedsCount}</p>
             </div>
             <div className="w-px bg-slate-700"></div>
             <div className="text-center">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">General Beds</p>
                <p className="text-2xl font-bold text-white">{hospital.generalBedsCount}</p>
             </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

function StatCard({ icon, title, value, sub }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
      <div className="bg-slate-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-slate-700/50">
        {icon}
      </div>
      <p className="text-slate-400 font-medium mb-1">{title}</p>
      <p className="text-3xl font-black text-white mb-2">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}
