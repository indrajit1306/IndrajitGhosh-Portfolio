import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "Fullstack Web Development Intern",
    company: "Labmentix Pvt.",
    duration: "Nov 2025 - May 2026",
    description: "Worked on the design, development, testing, and maintenance of responsive web applications and websites using front-end and back-end technologies. Collaborated with the development team to build user-friendly, functional, and scalable web solutions while following industry-standard coding practices.",
    highlights: [
      "Developed responsive and user-friendly web applications using HTML, CSS, JavaScript, and modern web development practices.",
      "Assisted in front-end and back-end development, implementing features and optimizing application performance.",
      "Collaborated with team members to design, test, debug, and maintain web applications and websites.",
      "Managed database operations and ensured efficient data storage, retrieval, and integration within applications."
    ]
  }
];

const trainings = [
  {
    title: "Frontend Web Development with AI",
    provider: "Internshala Trainings",
    duration: "Nov 2024 - Jun 2025",
    description: "Rigorous, project-based engineering program specializing in responsive design & modern web practices.",
    bulletPoints: [
      "Completed intensive hands-on development using HTML5, CSS3, JavaScript, and ES6+ standards.",
      "Created dynamic, mobile-first pages with seamless fluid layouts and custom micro-interactions.",
      "Integrated AI tools to speed up debugging, refactoring, and CSS custom theme generations."
    ]
  },
  {
    title: "SQL for Data Analytics",
    provider: "Internshala Trainings",
    duration: "Jun 2025 - Dec 2025",
    description: "Advanced analytics program focused on large-scale dataset manipulation and insights generation.",
    bulletPoints: [
      "Mastered core SQL concepts: complex multi-table joins, subqueries, grouping, and aggregations.",
      "Handled database system schemas, table normalization, and analytical execution plans.",
      "Conducted exploratory data analysis (EDA) to translate raw transactional data into dashboards."
    ]
  },
  {
    title: "UI/UX Design with AI",
    provider: "Internshala Trainings",
    duration: "Nov 2023 - Mar 2024",
    description: "Design-thinking certification centered on human-centric layouts and advanced wireframing.",
    bulletPoints: [
      "Acquired end-to-end understanding of user research, user personas, and visual hierarchies.",
      "Built interactive wireframes, detailed functional prototypes, and user flows.",
      "Leveraged state-of-the-art generative AI systems to speed up mood-boarding and visual UI asset design."
    ]
  }
];

export default function Experience() {
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-t border-slate-100 dark:border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Main Background Card */}
        <div className="glass-card bg-blue-50/80 dark:bg-blue-900/20 p-6 md:p-8 lg:p-12 border border-blue-200/50 dark:border-blue-500/20 relative overflow-hidden shadow-2xl shadow-blue-500/10">
          {/* Top accent line for the card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Experience & <span className="text-gradient">Training</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Work Experience */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Professional Experience</h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-8 border border-slate-200/50 dark:border-white/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-primary" />

                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-sm text-secondary font-medium mt-1">{exp.company}</p>
                    </div>
                    <div className="text-xs space-y-1">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Calendar className="w-3 h-3" />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5 text-secondary pl-1 pt-1 justify-end">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-secondary mb-6 font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-3.5 text-sm text-secondary">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="font-light">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Training & Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Training & Certifications</h3>
            </div>

            <div ref={timelineRef} className="relative pl-6 space-y-8">
              {/* Unlit background timeline path line */}
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-slate-200 dark:bg-white/10" />

              {/* Glowing active animated timeline scroll line */}
              <motion.div
                style={{ scaleY }}
                className="absolute left-0 top-2 bottom-2 w-[1px] bg-accent origin-top shadow-[0_0_10px_var(--primary-glow)]"
              />

              {trainings.map((train, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline bullet node */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent transition-all duration-300 group-hover:scale-125 group-hover:bg-accent shadow-[0_0_12px_rgba(139,92,246,0.5)]" />

                  <div className="glass-card p-6 border border-slate-200/50 dark:border-white/10 hover:border-accent/40 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                          {train.title}
                        </h4>
                        <p className="text-sm text-secondary">{train.provider}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {train.duration}
                      </span>
                    </div>

                    <p className="text-xs text-secondary/80 mb-4 font-light italic leading-relaxed">
                      {train.description}
                    </p>

                    <ul className="space-y-2 text-xs text-secondary">
                      {train.bulletPoints.map((point, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span className="font-light">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
