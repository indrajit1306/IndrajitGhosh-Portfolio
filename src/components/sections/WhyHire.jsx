import { motion } from 'framer-motion';
import { Terminal, Flame, Sparkles, Zap, Compass, RefreshCw } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import Constellation from '../canvas/Constellation';

const reasons = [
  {
    id: 1,
    icon: <Terminal className="w-5 h-5 text-indigo-400" />,
    title: "Strong Full Stack Skills",
    desc: "Expertly bridges the gap between robust Enterprise Java (Spring Boot, Hibernate, SQL) and state-of-the-art interactive frontends (React, TypeScript, GSAP).",
  },
  {
    id: 2,
    icon: <Flame className="w-5 h-5 text-rose-400" />,
    title: "Hands-on Internship Experience",
    desc: "Spent 6 months at Labmentix Pvt. Ltd. actively debugging real-world systems, optimizing website metrics, and delivering responsive layouts.",
  },
  {
    id: 3,
    icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
    title: "AI & Cloud Integration Enthusiast",
    desc: "Skilled in orchestrating AWS cloud microservices (EC2, S3, RDS) and embedding advanced LLM features (OpenAI/Gemini APIs) into production platforms.",
  },
  {
    id: 4,
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: "High Velocity Fast Learner",
    desc: "Proven capabilities to upskill and deploy complex paradigms under strict timelines, actively transitioning theoretical CS into scalable web engineering.",
  },
  {
    id: 5,
    icon: <Compass className="w-5 h-5 text-emerald-400" />,
    title: "Systematic Problem Solver",
    desc: "CS Graduate grounded in object-oriented patterns, database normalization rules, and scalable REST API architectures.",
  },
  {
    id: 6,
    icon: <RefreshCw className="w-5 h-5 text-slate-300" />,
    title: "Scalable Application Builder",
    desc: "Engineers products with structured modularity, containerization readiness, strict compiler types, and responsive multi-device accessibility compliance.",
  }
];

export default function WhyHire() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="why-hire" className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Constellation />
          </Canvas>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Hire <span className="text-gradient">Indrajit</span>?
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
            A snapshot of core competencies, professional standards, and engineering values built to add immediate momentum to your tech squad.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
