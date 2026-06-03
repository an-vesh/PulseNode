import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, AlertTriangle, Droplet } from 'lucide-react';

export default function PatientQueue({ queue }) {
  
  // Helper to determine severity color based on triage score
  const getSeverityColor = (score) => {
    if (score >= 80) return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    if (score >= 50) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ListOrdered className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-white">Triage Priority Queue</h2>
        </div>
        <span className="bg-slate-900 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-700">
          Max-Heap Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {queue.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 pb-12">
            <ListOrdered className="w-12 h-12 opacity-20" />
            <p>Queue is currently empty</p>
          </div>
        ) : (
          <AnimatePresence>
            {queue.map((patient, index) => {
              const severityClasses = getSeverityColor(patient.triageScore);
              return (
                <motion.div
                  key={patient._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 flex items-center shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-sm mr-4 border border-slate-700">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{patient.name}</h3>
                      {patient.activeBloodLoss && <Droplet className="w-4 h-4 text-red-500 fill-red-500/20" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Age: {patient.age} | BP: {patient.bloodPressureSys}/{patient.bloodPressureDia} | HR: {patient.heartRate} | Type: {patient.bloodGroup || 'Unknown'}
                    </p>
                  </div>

                  <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border ${severityClasses}`}>
                    {patient.triageScore >= 80 && <AlertTriangle className="w-3 h-3 mb-1" />}
                    <span className="text-xs font-bold uppercase tracking-wider">Score</span>
                    <span className="text-lg font-black leading-none">{patient.triageScore}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
