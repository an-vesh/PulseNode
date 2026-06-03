import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, HeartPulse, Activity, Droplet } from 'lucide-react';

export default function IntakeForm({ backendUrl, hospitalId }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    heartRate: '',
    bloodPressureSys: '',
    bloodPressureDia: '',
    symptomSeverity: 5,
    bloodGroup: 'Unknown',
    activeBloodLoss: false,
    medicalNotes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospitalId,
          ...formData,
          age: Number(formData.age),
          heartRate: Number(formData.heartRate),
          bloodPressureSys: Number(formData.bloodPressureSys),
          bloodPressureDia: Number(formData.bloodPressureDia),
          symptomSeverity: Number(formData.symptomSeverity)
        })
      });
      if (res.ok) {
        setFormData({
          name: '', age: '', heartRate: '', bloodPressureSys: '', bloodPressureDia: '', symptomSeverity: 5, bloodGroup: 'Unknown', activeBloodLoss: false, medicalNotes: ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center space-x-2 mb-6">
        <UserPlus className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Patient Intake</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Patient Name</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" 
            placeholder="Jane Doe" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Age</label>
            <input required type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              placeholder="34" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Heart Rate</label>
            <div className="relative">
              <input required type="number" value={formData.heartRate} onChange={e => setFormData({...formData, heartRate: e.target.value})} 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
                placeholder="80" />
              <HeartPulse className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">BP Systolic</label>
            <input required type="number" value={formData.bloodPressureSys} onChange={e => setFormData({...formData, bloodPressureSys: e.target.value})} 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              placeholder="120" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">BP Diastolic</label>
            <input required type="number" value={formData.bloodPressureDia} onChange={e => setFormData({...formData, bloodPressureDia: e.target.value})} 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              placeholder="80" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Symptom Severity (1-10)</label>
          <div className="flex items-center space-x-4">
            <input required type="range" min="1" max="10" value={formData.symptomSeverity} onChange={e => setFormData({...formData, symptomSeverity: e.target.value})} 
              className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
            <span className="text-xl font-bold text-white w-8 text-center">{formData.symptomSeverity}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Blood Group</label>
            <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
              <option value="Unknown">Unknown</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Active Blood Loss</label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 flex items-center justify-center rounded border ${formData.activeBloodLoss ? 'bg-red-500/20 border-red-500/50' : 'bg-slate-900/50 border-slate-700 group-hover:border-slate-500'} transition-all`}>
                {formData.activeBloodLoss && <Droplet className="w-4 h-4 text-red-500" />}
              </div>
              <span className={`text-sm font-medium ${formData.activeBloodLoss ? 'text-red-400' : 'text-slate-300'}`}>
                {formData.activeBloodLoss ? 'Critical Bleeding' : 'No Major Bleeding'}
              </span>
              <input type="checkbox" className="hidden" checked={formData.activeBloodLoss} onChange={e => setFormData({...formData, activeBloodLoss: e.target.checked})} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Other Medical Details</label>
          <textarea value={formData.medicalNotes} onChange={e => setFormData({...formData, medicalNotes: e.target.value})}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none" 
            placeholder="Allergies, pre-existing conditions, trauma details..." rows="3" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-medium py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex justify-center items-center space-x-2"
        >
          {loading ? (
            <Activity className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Admit to Triage</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
