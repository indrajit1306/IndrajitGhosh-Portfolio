import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';

export default function Hero() {
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

  return (
    <section id="home" className="relative w-full h-[100dvh] min-h-[600px] md:min-h-[700px] pt-28 md:pt-32 pb-0 overflow-hidden flex flex-col items-center bg-background transition-colors duration-300 font-sans">
      <div className="container mx-auto px-4 relative z-10 w-full max-w-[1100px] flex flex-col items-center flex-1 min-h-0">
        
        {/* Top Text Section */}
        <div className="flex flex-col items-center text-center w-full relative z-20 mt-2 md:mt-4 shrink-0">
          
          {/* Hello Badge */}
          <div className="relative inline-flex items-center justify-center mb-4 md:mb-6">
            {/* Decorative strokes Top Right */}
            <svg className="absolute -top-6 -right-6 w-8 h-8 text-primary" viewBox="0 0 50 50" fill="none">
              <path d="M5 45 L25 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 50 L40 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="px-5 py-1.5 rounded-[30px] border border-slate-800 dark:border-white/20 bg-white dark:bg-zinc-800 text-[15px] font-medium text-foreground z-10 transition-colors">
              Hello!
            </div>
          </div>

          {/* Headline */}
          <div className="relative mb-0 w-full max-w-3xl mx-auto z-20">
            {/* Decorative strokes Bottom Left */}
            <svg className="absolute bottom-4 -left-8 md:-left-16 w-12 h-12 text-primary" viewBox="0 0 50 50" fill="none">
              <path d="M45 10 L20 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 25 L25 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            
            <h1 className="text-[3.8rem] sm:text-[5rem] md:text-[6.5rem] font-medium tracking-tight leading-[1.05] text-foreground transition-colors">
              I'm <span className="text-primary font-semibold">Indrajit</span>,<br />
              Product Designer
            </h1>
          </div>
        </div>

        {/* Center Content: Portrait & Background Arch */}
        <div className="relative w-full flex justify-center mt-auto pt-6 flex-1 min-h-0">
          
          {/* Orange Arch Background - Flush with bottom */}
          <div className="absolute bottom-0 w-[95%] sm:w-[600px] md:w-[800px] h-[80%] max-h-[450px] bg-accent rounded-t-full z-0 transition-colors" />
          
          {/* Portrait Image */}
          <div className="relative z-10 w-full max-w-[450px] md:max-w-[550px] h-full flex items-end justify-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
              alt="Indrajit Ghosh" 
              className="w-auto h-full object-cover object-top drop-shadow-xl relative z-10" 
              style={{
                  maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
              }}
            />
          </div>

          {/* Left Testimonial Block */}
          <div className="absolute left-0 top-[20%] w-[260px] text-left hidden lg:block z-20">
            {/* Quote Icon */}
            <div className="text-[5rem] font-serif text-foreground leading-none h-12 mb-2 font-black opacity-40 dark:opacity-20 transition-colors">
              “
            </div>
            <p className="text-[15px] font-medium text-secondary mb-1 leading-relaxed transition-colors">
              Indrajit's Exceptional product design ensure our website's success.
            </p>
            <p className="text-[15px] font-bold text-foreground transition-colors">
              Highly Recommended
            </p>
          </div>

          {/* Right Experience Block */}
          <div className="absolute right-0 top-[30%] w-48 text-right hidden lg:block z-20">
            <div className="flex justify-end gap-1 text-primary mb-2 transition-colors">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-[22px] h-[22px] fill-current" />
              ))}
            </div>
            <p className="text-[34px] font-bold text-foreground leading-none mb-1 transition-colors">
              10 Years
            </p>
            <p className="text-[15px] font-medium text-secondary transition-colors">
              Experince
            </p>
          </div>

          {/* Bottom Action Pill */}
          <div className="absolute bottom-8 md:bottom-12 z-30 left-1/2 -translate-x-1/2 bg-white/25 dark:bg-black/25 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-[40px] p-[6px] flex items-center shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-colors">
            <a href="#projects" className="px-8 py-3.5 bg-primary text-white rounded-full font-medium text-[16px] flex items-center gap-2 transition-transform hover:scale-105 shadow-md">
              Portfolio <ArrowUpRight className="w-[18px] h-[18px] opacity-90" />
            </a>
            <a href="#contact" className="px-8 py-3.5 text-foreground rounded-full font-medium text-[16px] hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
              Hire me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
