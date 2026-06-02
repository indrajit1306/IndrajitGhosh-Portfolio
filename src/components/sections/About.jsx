import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const education = [
  {
    degree: "B.Tech, Computer Science",
    institution: "University of Engineering and Management, Kolkata",
    duration: "2019 - 2023",
    score: "8.40 CGPA",
    description: "Specialized in software engineering, database structures, and web technologies."
  },
  {
    degree: "Higher Secondary, Science (WBCHSE)",
    institution: "Dwarhatta Rajeswari Institution",
    duration: "2018",
    score: "65.50%",
    description: "Focused on physics, chemistry, mathematics, and computer science basics."
  },
  {
    degree: "Secondary Education (WBBSE)",
    institution: " Dwarhatta Rajeswari Institution",
    duration: "2016",
    score: "85.42%",
    description: "General science and mathematics foundation."
  }
];

export default function About() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 50%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 75,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-slate-100 dark:border-white/5 bg-white dark:bg-black/10">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Summary and Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <h3 className="text-2xl font-bold mb-6 text-foreground">Who I Am</h3>
              <p className="text-secondary leading-relaxed mb-6 font-light">
                Results-driven and detail-oriented Full Stack Developer with strong knowledge of web development,
                software engineering, database management, and responsive UI design.
              </p>
              <p className="text-secondary leading-relaxed mb-8 font-light">
                Skilled in Java, JavaScript, Python, SQL, and modern frontend frameworks, with deep problem-solving abilities
                and a passion for building interactive, scalable, and beautifully optimized digital applications.
              </p>

              {/* Quick Details List */}
              <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-white/10 text-sm">
                <div className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Kolkata, West Bengal, India</span>
                </div>
                <div className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:i64854054@gmail.com">i64854054@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+919705787037">+91 9705787037</a>
                </div>
                <div className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors">
                  <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Portfolio</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div ref={timelineRef} className="relative pl-6 space-y-10">
              {/* Unlit background timeline path line */}
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-slate-200 dark:bg-white/10" />

              {/* Glowing active animated timeline scroll line */}
              <motion.div
                style={{ scaleY }}
                className="absolute left-0 top-2 bottom-2 w-[1px] bg-accent origin-top shadow-[0_0_10px_var(--primary-glow)]"
              />

              {education.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="relative group"
                >
                  {/* Bullet node on timeline */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent transition-all duration-300 group-hover:scale-125 group-hover:bg-accent shadow-[0_0_12px_rgba(139,92,246,0.5)]" />

                  <div className="glass-card p-6 hover:border-accent/40 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.degree}
                        </h4>
                        <p className="text-sm text-secondary">{item.institution}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-sm text-secondary mb-3 leading-relaxed font-light">{item.description}</p>
                    <div className="text-xs text-primary font-medium tracking-wider uppercase">
                      Score: <span className="text-foreground">{item.score}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
