import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, FileText } from 'lucide-react';
import ThankYou from './ThankYou';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // TODO: Get your free access key from https://web3forms.com/ and paste it below
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
    <section id="contact" className="min-h-[100dvh] pt-0 pb-0 relative overflow-hidden flex flex-col">
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center">
        {/* Main Background Card */}
        <div className="glass-card bg-background dark:bg-zinc-900 p-6 md:p-8 lg:p-12 border border-transparent dark:border-white/5 relative overflow-hidden shadow-xl flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="text-secondary mt-6 max-w-xl mx-auto font-light leading-relaxed">
              Let's collaborate! Feel free to reach out for new opportunities, project ideas, or software engineering queries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Left Column: Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="glass-card p-8 border border-slate-200/50 dark:border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                <h3 className="text-2xl font-bold mb-6">Contact Channels</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase font-semibold tracking-wider">Email Address</p>
                      <a href="mailto:ijghosh13@gmail.com" className="text-sm font-medium hover:underline text-foreground mt-1 block">
                        ijghosh13@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3.5 rounded-xl bg-accent/10 text-accent border border-accent/20 group-hover/item:bg-accent group-hover/item:text-white transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase font-semibold tracking-wider">Phone / Mobile</p>
                      <a href="tel:+919705787037" className="text-sm font-medium hover:underline text-foreground mt-1 block">
                        +91 8240657314
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase font-semibold tracking-wider">Address</p>
                      <span className="text-sm font-medium text-foreground mt-1 block">
                        Kolkata, West Bengal, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="glass-card p-8 border border-slate-200/50 dark:border-white/10">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
                    <p className="text-sm text-secondary max-w-sm mx-auto font-light leading-relaxed">
                      Thank you for reaching out. I will review your message and get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="form-name" className="text-xs font-semibold text-secondary uppercase tracking-widest">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="form-name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200/60 dark:border-white/10 focus:border-primary/50 rounded-xl outline-none text-sm text-foreground transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="form-email" className="text-xs font-semibold text-secondary uppercase tracking-widest">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form-email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200/60 dark:border-white/10 focus:border-primary/50 rounded-xl outline-none text-sm text-foreground transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-message" className="text-xs font-semibold text-secondary uppercase tracking-widest">
                        Your Message
                      </label>
                      <textarea
                        id="form-message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200/60 dark:border-white/10 focus:border-primary/50 rounded-xl outline-none text-sm text-foreground transition-all resize-none"
                        placeholder="Hi Indrajit, let's discuss..."
                      />
                    </div>

                    {isError && (
                      <div className="text-red-500 text-sm font-medium p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                        Something went wrong. Please check your connection or try again later.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative px-8 py-4 bg-primary text-white font-medium rounded-xl overflow-hidden transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 flex items-center gap-2 font-bold tracking-wider uppercase text-xs">
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

    {/* Thank You Section */}
    <section className="min-h-[100dvh] pt-0 pb-0 relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex-1 flex flex-col -mt-px relative z-20">
        <ThankYou />
      </div>
    </section>
    </>
  );
}
