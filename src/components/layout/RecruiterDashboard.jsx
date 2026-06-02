import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, GraduationCap, Briefcase, FolderDot, Code2, Download, Copy, Check } from 'lucide-react';

export default function RecruiterDashboard({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('your.email@example.com'); // Replace with actual email
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f172a] border-l border-white/5 z-[101] overflow-y-auto"
            data-lenis-prevent="true"
          >
            <div className="p-6 flex flex-col h-full text-white font-sans">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Sparkles className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Recruiter Dashboard</h2>
                    <p className="text-sm text-gray-400">Elevator pitch & core metrics</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold">B.Tech</div>
                    <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mt-1">Computer Science</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-2xl font-bold">6 Months</div>
                    <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mt-1">Internship Completed</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <FolderDot className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold">4 Major</div>
                    <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mt-1">Production Projects</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-2xl font-bold">15+ Core</div>
                    <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mt-1">Tech Competencies</div>
                  </div>
                </div>
              </div>

              {/* Pitch Box */}
              <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className="font-semibold text-blue-100">Why Indrajit?</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A high-velocity Full Stack Engineer who blends production-grade backend robustness (Java/Spring Boot/SQL) with state-of-the-art frontend fluid mechanics (React/Three.js/Tailwind). Experience in modern cloud native architectures (AWS EC2, S3, RDS) and AI systems integrations.
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-auto pb-8">
                <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">Core Stack Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Cloud', 'Docker', 'RESTful APIs'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                <a href="#" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#050505] hover:bg-black transition-colors font-semibold text-sm">
                  <Download className="w-4 h-4" />
                  Download ATS Resume
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#111] hover:bg-[#1a1a1a] border border-white/5 transition-colors font-semibold text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Email Address'}
                </button>
                <a href="#contact" onClick={onClose} className="text-center text-xs font-bold tracking-wider text-cyan-400 hover:text-cyan-300 uppercase mt-4 mb-4">
                  Or leave a quick message
                </a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
