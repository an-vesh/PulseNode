import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function SkeletonLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] space-y-8"
    >
      {/* Loading Indicator */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute w-full h-full border-4 border-cyan-500/20 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
          <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
        
        <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <p className="text-sm text-cyan-300 font-medium tracking-wide">
            Synchronizing with secure medical server (Free-tier spin-up, may take ~45s)...
          </p>
        </div>
      </div>

      {/* Dashboard Skeleton */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse opacity-50 mt-12">
        {/* Left Column (Intake) */}
        <div className="col-span-1 space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/3"></div>
          <div className="bg-slate-800 rounded-xl h-96 border border-slate-700/50"></div>
        </div>

        {/* Middle Column (Queue) */}
        <div className="col-span-1 lg:col-span-1 space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-slate-800 rounded-lg h-24 border border-slate-700/50"></div>
            ))}
          </div>
        </div>

        {/* Right Column (Beds) */}
        <div className="col-span-1 lg:col-span-1 space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-slate-800 rounded-lg h-32 border border-slate-700/50"></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
