import { motion } from 'framer-motion';
import { ActivitySquare } from 'lucide-react';
import IntakeForm from './IntakeForm';
import PatientQueue from './PatientQueue';
import BedManagement from './BedManagement';

export default function Dashboard({ socket, appState, backendUrl }) {
  const { queue, beds } = appState;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/20 p-2 rounded-xl border border-cyan-500/30">
            <ActivitySquare className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">AcuityFlow</h1>
            <p className="text-sm text-slate-400 font-medium">Real-Time ER Triage & Resource Allocation</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-slate-300 font-medium">System Live</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Intake Form (3 cols) */}
        <div className="lg:col-span-4">
          <IntakeForm backendUrl={backendUrl} />
        </div>

        {/* Middle Column: Priority Queue (4 cols) */}
        <div className="lg:col-span-4">
          <PatientQueue queue={queue} />
        </div>

        {/* Right Column: Bed Management (4 cols) */}
        <div className="lg:col-span-4">
          <BedManagement beds={beds} backendUrl={backendUrl} />
        </div>

      </div>
    </motion.div>
  );
}
