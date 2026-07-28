import { motion } from 'framer-motion';
import { Fragment } from 'react';

export default function SectionHeading({ title1, title2 }) {
  return (
    <div 
      className="overflow-hidden whitespace-nowrap w-full mb-8 md:mb-12 py-3 md:py-4 bg-primary text-white rounded-full relative"
      style={{ perspective: '1200px' }}
    >
      {/* 3D curve fade overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none" 
        style={{ background: 'linear-gradient(to right, var(--primary) 0%, transparent 15%, transparent 85%, var(--primary) 100%)' }} 
      />
      
      {/* 3D Carousel Wrapper */}
      <div className="relative h-[40px] md:h-[50px] w-full z-10" style={{ transformStyle: 'preserve-3d' }}>
        {/* Pull carousel back to keep front surface at original scale */}
        <div 
          className="absolute inset-0"
          style={{ transform: 'translateZ(-1200px)', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {[...Array(12)].map((_, i) => (
              <Fragment key={i}>
                {/* Text Item */}
                <div 
                  className="absolute top-1/2 left-1/2 flex items-center justify-center whitespace-nowrap"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${i * 30}deg) translateZ(1200px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight py-1">
                    {title1} {title2 && <span>{title2}</span>}
                  </h2>
                </div>
                
                {/* Dot placed exactly halfway between texts */}
                <div 
                  className="absolute top-1/2 left-1/2 flex items-center justify-center"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${i * 30 + 15}deg) translateZ(1200px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
