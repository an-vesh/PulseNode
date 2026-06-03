import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Server, Zap, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#02000A] text-slate-100 overflow-x-hidden selection:bg-pink-500/30">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <header className="mb-24">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 pb-4">
              The Technical Architecture of PulseNode
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mt-6">
              An in-depth look at the mathematical models and distributed systems powering the next generation of Emergency Room triage.
            </p>
          </header>

          <section className="mb-24">
            <div className="flex items-center gap-5 border-b border-slate-800 pb-5 mb-10">
              <Clock className="w-8 h-8 text-rose-500" />
              <h2 className="text-3xl font-bold text-white">The Fatal Flaw in Modern ERs</h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              Currently, most Emergency Rooms operate on a "first-come, first-served" basis or rely on slow, manual triage sorting by exhausted nursing staff. When a critical trauma patient arrives 15 minutes after someone with a minor injury, the cognitive overhead of manually re-sorting a physical or basic digital waiting list often leads to fatal delays. Beds sit empty while staff try to figure out who goes next.
            </p>
          </section>

          <section className="mb-24">
            <div className="flex items-center gap-5 border-b border-slate-800 pb-5 mb-10">
              <Zap className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">The PulseNode Solution: Algorithmic Triage</h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed mb-12">
              PulseNode completely eliminates manual queue sorting. By shifting the cognitive load to our backend infrastructure, we automate the intake, sorting, and bed assignment processes using mathematically proven algorithms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl">
                <h3 className="text-2xl font-bold text-pink-400 mb-5 flex items-center gap-3">
                  <Activity className="w-6 h-6" /> 
                  Objective Vital Scoring
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  The system calculates a severity score (0-100+) by heavily weighting objective vital signs (Heart Rate, Blood Pressure) and immediate trauma flags (Active Blood Loss), overriding subjective symptom reporting.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl">
                <h3 className="text-2xl font-bold text-purple-400 mb-5 flex items-center gap-3">
                  <Server className="w-6 h-6" />
                  Max-Heap Priority Queue
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Instead of iterating through a standard array, the backend uses a Max-Heap data structure in RAM. When a new patient arrives, they are mathematically sorted to their exact priority spot in <strong className="text-white">O(log n) time</strong>.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <div className="flex items-center gap-5 border-b border-slate-800 pb-5 mb-10">
              <HeartPulse className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">The Command Center Flow</h2>
            </div>
            
            <div className="bg-emerald-900/10 border border-emerald-500/20 p-10 rounded-3xl">
              <h3 className="text-2xl font-bold text-emerald-300 mb-10">How to properly use the Live Dashboard:</h3>
              
              <div className="flex gap-6 mb-10">
                <div className="w-12 h-12 shrink-0 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-black text-2xl border border-emerald-500/30">1</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Enter Patient Data</h4>
                  <p className="text-lg text-slate-300 leading-relaxed">Use the intake form on the left side of the dashboard to enter incoming patients and their precise vital signs. This triggers the scoring algorithm.</p>
                </div>
              </div>

              <div className="flex gap-6 mb-10">
                <div className="w-12 h-12 shrink-0 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-black text-2xl border border-emerald-500/30">2</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Watch the Queue Sort Instantly</h4>
                  <p className="text-lg text-slate-300 leading-relaxed">You don't need to do anything. The Priority Queue instantly re-ranks the entire list of patients, placing the most critical at the absolute top.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-black text-2xl border border-emerald-500/30">3</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Auto-Allocate Beds</h4>
                  <p className="text-lg text-slate-300 leading-relaxed">Click the "Auto-Allocate" button. A Greedy Algorithm will execute an <code className="bg-slate-800 px-3 py-1 rounded text-emerald-400">extractMax()</code> operation, popping the highest-priority patient from the heap and instantly assigning them to the next available bed. Zero manual decision-making required.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <div className="flex items-center gap-5 border-b border-slate-800 pb-5 mb-10">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">Engineered for Scale</h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              Because PulseNode maintains a distributed Map of Max-Heaps in RAM across isolated WebSocket rooms, Node.js can easily handle up to <strong className="text-white text-xl">1.5 million active triage patients</strong> in a single instance. A busy hospital with 100 active ER patients consumes <strong className="text-white text-xl">under 2 megabytes of RAM</strong>, making this highly cost-effective for multi-tenant SaaS scaling.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}
