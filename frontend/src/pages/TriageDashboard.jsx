import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';
import { ActivitySquare, ArrowLeft } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';
import IntakeForm from '../components/IntakeForm';
import PatientQueue from '../components/PatientQueue';
import BedManagement from '../components/BedManagement';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function TriageDashboard() {
  const { id: hospitalId } = useParams();
  const navigate = useNavigate();

  const [isServerReady, setIsServerReady] = useState(false);
  const [socket, setSocket] = useState(null);
  const [appState, setAppState] = useState({ queue: [], beds: [] });

  useEffect(() => {
    let checkInterval;
    let socketInstance;

    const checkServerHealth = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`);
        if (res.ok) {
          setIsServerReady(true);
          clearInterval(checkInterval);

          socketInstance = io(BACKEND_URL);
          setSocket(socketInstance);
          
          // Request to join the specific hospital room
          socketInstance.emit('join_hospital', hospitalId);

          socketInstance.on('state_update', (newState) => {
            setAppState(newState);
          });
        }
      } catch (err) {
        console.log('Waiting for server spin-up...');
      }
    };

    checkServerHealth();
    
    if (!isServerReady) {
      checkInterval = setInterval(checkServerHealth, 3000);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (socketInstance) socketInstance.disconnect();
    };
  }, [isServerReady, hospitalId]);

  if (!isServerReady) {
    return <div className="p-8"><SkeletonLoader /></div>;
  }

  const { queue, beds } = appState;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-screen-2xl mx-auto p-4 md:p-8 space-y-8"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(`/hospital/${hospitalId}`)} className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-cyan-500/20 p-2 rounded-xl border border-cyan-500/30">
            <ActivitySquare className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">ER Command Center</h1>
            <p className="text-sm text-slate-400 font-medium">PulseNode Triage Engine</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Live Sync</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Intake Form (3 cols) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <IntakeForm backendUrl={BACKEND_URL} hospitalId={hospitalId} />
        </div>

        {/* Middle Column: Priority Queue (4 cols) */}
        <div className="lg:col-span-4 xl:col-span-5 h-[calc(100vh-200px)]">
          <PatientQueue queue={queue} />
        </div>

        {/* Right Column: Bed Management (4 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 h-[calc(100vh-200px)]">
          <BedManagement beds={beds} queueLength={queue.length} backendUrl={BACKEND_URL} hospitalId={hospitalId} />
        </div>

      </div>
    </motion.div>
  );
}
