import { motion } from 'framer-motion';
import { ArrowRight, Download, Send } from 'lucide-react';
import HeroCanvas from '../canvas/HeroCanvas';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden transition-colors duration-300">
      {/* 3D Background & Laptop */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none min-h-[100dvh] flex flex-col justify-end md:justify-center pt-[45vh] sm:pt-[40vh] md:pt-0 pb-28 md:pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl pointer-events-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 text-xs font-medium text-slate-700 dark:text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            variants={titleVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 md:mb-8 leading-[1.1] md:leading-[1.2]"
          >
            <span className="text-gradient drop-shadow-[0_0_25px_rgba(139,92,246,0.4)] pb-2 md:pb-4 block">
              Indrajit Ghosh
            </span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium text-slate-700 dark:text-gray-300 mb-8">
            Full Stack Developer & Software Engineer
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
            I build exceptional, high-performance web applications and digital experiences using React, Spring Boot, and cloud architecture.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a href="#projects" className="px-6 py-3.5 sm:py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg sm:shadow-none">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="flex-1 sm:flex-auto px-6 py-3.5 sm:py-3 bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 shadow-sm sm:shadow-none">
                <Download className="w-4 h-4" /> Resume
              </a>

              <a href="#contact" className="flex-1 sm:flex-auto px-4 py-3.5 sm:py-3 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Contact
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interact Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] font-mono pointer-events-none"
      >
        Interact: Drag to rotate camera
      </motion.div>
    </section>
  );
}
