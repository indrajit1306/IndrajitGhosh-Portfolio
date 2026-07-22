import { motion } from 'framer-motion';

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-[#060907] border border-slate-200 dark:border-white/5 pt-8 pb-0 md:pt-16 md:pb-16 px-6 md:px-0 md:pl-16 md:min-h-[450px] flex flex-col md:flex-row items-center md:items-center transition-colors duration-300 flex-1 w-full"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full md:w-3/5 h-full bg-gradient-to-b md:bg-gradient-to-r from-emerald-100/80 via-emerald-50/50 dark:from-emerald-900/60 dark:via-emerald-900/20 to-transparent pointer-events-none transition-colors duration-300" />

      <div className="relative z-10 w-full max-w-4xl pt-4 md:pt-0">
        <div className="relative inline-block mb-2 md:mb-12">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none m-0 relative z-0 drop-shadow-xl transition-colors duration-300" style={{ textShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}>
            THANK YOU
          </h2>
          <div className="absolute -bottom-6 md:-bottom-8 left-2 md:left-24 text-3xl md:text-6xl font-serif italic text-emerald-600 dark:text-[#84cc16] z-30 whitespace-nowrap transform -rotate-3 drop-shadow-md transition-colors duration-300" style={{ fontFamily: '"Brush Script MT", cursive' }}>
            For Your Attention
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-300 max-w-md font-light leading-relaxed text-left relative z-10 mt-10 md:mt-12">
        </p>
      </div>

      {/* Photo and Decorative Stars */}
      <div className="relative md:absolute bottom-0 right-0 z-20 flex items-end justify-center md:justify-end w-full pointer-events-none -mt-4 md:mt-0 mix-blend-normal dark:mix-blend-lighten">
        <img
          src="/thank_you_person.png"
          alt="Thank You Person"
          className="h-[350px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-auto object-cover object-bottom relative z-20 md:mr-16 rounded-full dark:rounded-none shadow-2xl dark:shadow-none bg-[#fdb813] dark:bg-transparent aspect-square"
        />
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 dark:text-[#84cc16] absolute bottom-6 right-6 md:right-12 z-10 hidden md:block transition-colors duration-300" style={{ filter: 'drop-shadow(0 0 10px rgba(132, 204, 22, 0.4))' }}>
          <path d="M60 0L65.5 45.5L110 50L65.5 54.5L60 100L54.5 54.5L10 50L54.5 45.5L60 0Z" fill="currentColor" />
          <path d="M100 80L102.5 92.5L115 95L102.5 97.5L100 110L97.5 97.5L85 95L97.5 92.5L100 80Z" fill="currentColor" opacity="0.6" />
          <path d="M20 90L21.5 98.5L30 100L21.5 101.5L20 110L18.5 101.5L10 100L18.5 98.5L20 90Z" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
    </motion.div>
  );
}
