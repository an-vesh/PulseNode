import { useState } from 'react';
import { motion } from 'framer-motion';
import { BedDouble, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';

export default function BedManagement({ beds, backendUrl, hospitalId }) {
  const [loadingBed, setLoadingBed] = useState(null);

  const handleDischarge = async (bedId) => {
    setLoadingBed(bedId);
    try {
      await fetch(`${backendUrl}/api/beds/discharge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bedId, hospitalId })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBed(null);
    }
  };

  const occupiedBeds = beds.filter(b => b.isOccupied).length;
  const totalBeds = beds.length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const sortedBeds = [...beds].sort((a, b) => {
    const numA = parseInt(a.bedNumber.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.bedNumber.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-xl h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BedDouble className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-semibold text-white">Resource Matcher</h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-slate-300">{occupiedBeds} / {totalBeds} Occupied</div>
          <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full ${occupancyRate > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-3">
        {sortedBeds.map((bed) => (
          <motion.div 
            layout
            key={bed._id} 
            className={`relative p-4 rounded-xl border flex flex-col justify-between transition-colors ${
              bed.isOccupied 
                ? 'bg-slate-900/80 border-slate-700' 
                : 'bg-emerald-900/10 border-emerald-500/20'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-slate-400">{bed.bedNumber}</span>
              {bed.isOccupied ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>

            {bed.isOccupied ? (
              <div className="mt-auto">
                <p className="text-sm font-medium text-white line-clamp-1">{bed.patientId?.name || 'Unknown'}</p>
                <p className="text-xs text-slate-400 mb-3">ID: {bed.patientId?._id?.slice(-4)}</p>
                <button 
                  onClick={() => handleDischarge(bed._id)}
                  disabled={loadingBed === bed._id}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-2 rounded border border-slate-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{loadingBed === bed._id ? 'Processing...' : 'Discharge'}</span>
                </button>
              </div>
            ) : (
              <div className="mt-auto">
                <button 
                  onClick={() => handleDischarge(bed._id)}
                  disabled={loadingBed === bed._id}
                  className="w-full bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-300 text-xs font-medium py-2 rounded border border-emerald-700/50 transition-colors flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{loadingBed === bed._id ? 'Assigning...' : 'Admit Patient'}</span>
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
