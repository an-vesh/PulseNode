import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ActivitySquare, ArrowRight, ShieldCheck, Zap, Server, Clock, HeartPulse, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] text-slate-300 font-sans overflow-x-hidden relative cursor-default">
      
      {/* Magic Cursor Invert Spotlight */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <div className="flex items-center gap-3">
          <div className="bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <ActivitySquare className="w-6 h-6 text-pink-400" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">PulseNode</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
          >
            Admin Login
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 rounded-full hover:scale-105 transition-all shadow-lg shadow-pink-500/25"
          >
            Partner With Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto z-10"
        >
          <div className="inline-block bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-semibold text-pink-300 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            The Next Generation SaaS Platform for Hospitals
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Stop waiting. Start saving lives with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Algorithmic Triage.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            PulseNode is a real-time, multi-tenant SaaS application that mathematically optimizes Emergency Room resource allocation, ensuring the most critical patients get beds instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 group shadow-[0_0_30px_rgba(236,72,153,0.4)]"
            >
              Initialize Your ER Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-full font-bold text-lg text-white bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              Admin Login
            </button>
            <button 
              onClick={() => {
                document.getElementById('problem').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full font-bold text-lg text-slate-400 hover:text-white transition-colors"
            >
              Learn How It Works
            </button>
          </div>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="relative py-32 px-6 bg-[#050214] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              The Fatal Flaw in Modern ERs
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Currently, most Emergency Rooms operate on a "first-come, first-served" basis or rely on slow, manual triage sorting by exhausted nursing staff. 
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              When a critical patient arrives 15 minutes after someone with a minor injury, the cognitive overhead of manually re-sorting the waiting list often leads to fatal delays. Beds sit empty while staff try to figure out who goes next.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="bg-pink-900/10 border border-pink-500/20 p-10 rounded-3xl backdrop-blur-md hover:-translate-y-1 transition-transform">
              <Clock className="w-10 h-10 text-pink-400 mb-6" />
              <h4 className="text-white font-bold text-3xl mb-3">4+ Hour Waits</h4>
              <p className="text-lg text-slate-300">The average wait time in major urban ERs due to inefficient resource allocation.</p>
            </div>
            <div className="bg-purple-900/10 border border-purple-500/20 p-10 rounded-3xl backdrop-blur-md hover:-translate-y-1 transition-transform">
              <HeartPulse className="w-10 h-10 text-purple-400 mb-6" />
              <h4 className="text-white font-bold text-3xl mb-3">Human Error</h4>
              <p className="text-lg text-slate-300">Manual vital-sign sorting leads to a 20% misprioritization rate during surges.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              The PulseNode Solution
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              By shifting the cognitive load to our backend infrastructure, we completely automate the intake, sorting, and bed assignment processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-pink-400" />}
              title="Max-Heap Sorting"
              desc="Instead of a standard array, our backend uses a Priority Queue (Max-Heap) in RAM. When a new patient arrives, they are mathematically sorted to their exact priority spot in O(log n) milliseconds based on vital severity."
              color="pink"
            />
            <FeatureCard 
              icon={<Server className="w-8 h-8 text-purple-400" />}
              title="Greedy Resource Matcher"
              desc="When a doctor discharges a patient, our Greedy Algorithm instantly pops the highest-priority patient from the heap and assigns them to the newly available bed. Zero manual work required."
              color="purple"
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-pink-400" />}
              title="Multi-Tenant SaaS"
              desc="Multiple hospitals can use PulseNode simultaneously. Our isolated WebSocket rooms guarantee that Hospital A's live updates never bleed into Hospital B's dashboard."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6 bg-[#050214] border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">Let's create something together.</h2>
          <p className="text-slate-300 mb-10 text-lg">
            Join the network of cutting-edge medical facilities using PulseNode to reduce wait times and save lives.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Create Free SaaS Account
          </button>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  const bgClass = color === 'pink' ? 'bg-pink-900/10 border-pink-500/20' : 'bg-purple-900/10 border-purple-500/20';
  const innerBgClass = color === 'pink' ? 'bg-pink-500/10 border-pink-500/20' : 'bg-purple-500/10 border-purple-500/20';
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${bgClass} border p-10 rounded-3xl backdrop-blur-md transition-all hover:shadow-lg`}
    >
      <div className={`${innerBgClass} border w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-lg text-slate-300 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
