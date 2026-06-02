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
    <section id="home" className="relative min-h-screen flex items-center bg-[#020008] overflow-hidden">
      {/* 3D Background & Laptop */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl pointer-events-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
            Available for new opportunities
          </motion.div>

          <motion.h1 
            variants={titleVariants} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.1] text-white flex flex-wrap gap-x-[0.25em]"
            aria-label="Indrajit Ghosh"
            style={{ perspective: "1000px" }}
          >
            {"Indrajit Ghosh".split(' ').map((word, wordIndex, wordsArray) => {
              const prevWordsLength = wordsArray.slice(0, wordIndex).join(' ').length;
              const startIndex = wordIndex === 0 ? 0 : prevWordsLength + 1;
              const titleText = "Indrajit Ghosh";
              const centerIndex = (titleText.length - 1) / 2;

              return (
              <span key={wordIndex} className="inline-flex">
                {word.split('').map((char, charIndex) => {
                  const absoluteIndex = startIndex + charIndex;
                  const offset = absoluteIndex - centerIndex;
                  
                  // Arch calculation: center is 0, edges pushed down (positive Y)
                  const archY = Math.pow(offset, 2) * 1.5; 
                  // Scale calculation: center is slightly larger
                  const scale = 1 + (1 - Math.abs(offset) / centerIndex) * 0.15;
                  // Slight rotation to follow the curve
                  const rotate = offset * 1.5;

                  return (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      custom={{ y: archY, scale, rotate }}
                      variants={{
                        hidden: { opacity: 0, y: 50, rotateX: -45, scale: 0.8 },
                        visible: (custom) => ({
                          opacity: 1,
                          y: custom.y,
                          rotateZ: custom.rotate,
                          scale: custom.scale,
                          rotateX: 0,
                          transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
                        })
                      }}
                      className="text-3d inline-block"
                      style={{ transformOrigin: "bottom center" }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            )})}
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium text-gray-300 mb-8">
            Full Stack Developer & Software Engineer
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            I build exceptional, high-performance web applications and digital experiences using React, Spring Boot, and cloud architecture.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>

            <a href="#" className="px-6 py-3 bg-black border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Resume
            </a>

            <a href="#contact" className="px-4 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2 ml-2">
              <Send className="w-4 h-4" /> Contact
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Interact Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono pointer-events-none"
      >
        Interact: Drag to rotate camera
      </motion.div>
    </section>
  );
}
