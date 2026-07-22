import { motion } from 'framer-motion';
import { Code, Layout, Database, Layers } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-primary to-accent",
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 90 }
    ]
  },
  {
    title: "Frontend Technologies",
    icon: Layout,
    color: "from-accent to-primary",
    skills: [
      { name: "React", level: 85 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 90 }
    ]
  },
  {
    title: "Database Management",
    icon: Database,
    color: "from-primary to-orange-400",
    skills: [
      { name: "MySQL / PostgreSQL", level: 85 },
      { name: "Database Design", level: 80 },
      { name: "Query Optimization", level: 85 },
      { name: "Data Analytics", level: 75 }
    ]
  },
  {
    title: "Core Competencies",
    icon: Layers,
    color: "from-orange-400 to-primary",
    skills: [
      { name: "Software Engineering", level: 85 },
      { name: "UI/UX Design with AI", level: 90 },
      { name: "REST APIs", level: 85 },
      { name: "Git & Version Control", level: 85 }
    ]
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="min-h-[100dvh] pt-0 pb-0 relative overflow-hidden flex flex-col">
      {/* Visual background accents */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex-1 flex flex-col">
        {/* Main Background Card */}
        <div className="glass-card bg-background dark:bg-zinc-900 p-6 md:p-8 lg:p-12 border border-transparent dark:border-white/5 relative overflow-hidden shadow-xl flex-1 flex flex-col justify-center">

          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8 lg:mt-20 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Core <span className="text-primary">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-secondary mt-6 max-w-xl mx-auto font-light leading-relaxed">
            A comprehensive overview of my technical stack and engineering specialties developed through rigorous training and practice.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`glass-card p-8 transition-all duration-500 hover:-translate-y-1 relative group overflow-hidden hover:shadow-[0_0_40px_rgba(243,115,53,0.25)] hover:border-primary/30 text-foreground`}
              >
                {/* Visual hover border overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${category.color} rounded-2xl pointer-events-none z-0`} />
                <div className={`absolute top-0 left-0 w-full h-[3px] rounded-t-2xl bg-gradient-to-r ${category.color} z-10`} />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold tracking-wide">{category.title}</h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, sIndex) => (
                      <div key={sIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-secondary group-hover:text-foreground transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className="text-xs text-primary font-mono">{skill.level}%</span>
                        </div>

                        {/* Interactive visual progress bar */}
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: false }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
