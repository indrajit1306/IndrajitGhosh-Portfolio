import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';
import RecruiterDashboard from './RecruiterDashboard';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [theme, setTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-8 left-0 right-0 mx-auto z-50 w-[92%] max-w-[1100px] transition-all duration-300"
      >
        <div className="bg-[#1C1C1C] text-white rounded-[40px] px-2 py-2 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full">
          
          {/* Desktop Nav */}
          <nav className="hidden md:grid grid-cols-3 items-center w-full">
            
            {/* Left side links */}
            <div className="flex items-center justify-start gap-4 lg:gap-10 pl-2">
              <a href="#home" className="px-8 py-2.5 rounded-full text-[15px] font-medium bg-[#F37335] text-white shadow-sm">
                Home
              </a>
              <a href="#about" className="text-[15px] font-medium text-[#E0E0E0] hover:text-white transition-all">
                About
              </a>
              <a href="#skills" className="text-[15px] font-medium text-[#E0E0E0] hover:text-white transition-all">
                Skills
              </a>
            </div>

            {/* Logo Center */}
            <div className="flex items-center justify-center">
              <a href="#" className="flex items-center gap-2">
                <span className="bg-[#F37335] text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-[15px]">IG</span>
                <span className="text-[18px] font-bold tracking-wider">INDRAJIT</span>
              </a>
            </div>

            {/* Right side links */}
            <div className="flex items-center justify-end gap-4 lg:gap-8 pr-6">
              <a href="#projects" className="text-[15px] font-medium text-[#E0E0E0] hover:text-white transition-all">
                Projects
              </a>
              <a href="#experience" className="text-[15px] font-medium text-[#E0E0E0] hover:text-white transition-all">
                Experience
              </a>
              <a href="#contact" className="text-[15px] font-medium text-[#E0E0E0] hover:text-white transition-all">
                Contact
              </a>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#E0E0E0] hover:text-white flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden pr-4 w-full justify-between">
             <a href="#" className="flex items-center gap-2 ml-4">
                <span className="bg-[#F37335] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px]">IG</span>
                <span className="text-[16px] font-bold tracking-wider">INDRAJIT</span>
              </a>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-2xl mx-auto w-full"
            >
              <div className="flex flex-col px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-[#A0A0A0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hidden recruiter dashboard, can be accessed elsewhere if needed */}
      <RecruiterDashboard 
        isOpen={recruiterOpen} 
        onClose={() => setRecruiterOpen(false)} 
      />
    </>
  );
}
