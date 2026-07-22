import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Camera, Cpu, Laptop, Check, RotateCcw, VideoOff, Terminal } from 'lucide-react';

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const EMOTIONS = {
  happy: { name: 'Happy', emoji: '😊', genre: 'Pop & Dance', color: '#fbbf24', youtubeQuery: 'Best Happy Songs Playlist' },
  sad: { name: 'Sad', emoji: '😢', genre: 'Soft Acoustic & Lo-fi', color: '#6366f1', youtubeQuery: 'Relaxing Sad Songs Playlist' },
  excited: { name: 'Excited', emoji: '🤩', genre: 'EDM & Party Hits', color: '#ec4899', youtubeQuery: 'EDM Party Playlist' },
  motivated: { name: 'Motivated', emoji: '💪', genre: 'Workout & Motivational', color: '#f97316', youtubeQuery: 'Motivational Workout Music' },
  relaxed: { name: 'Relaxed', emoji: '😌', genre: 'Chill Lo-fi', color: '#f43f5e', youtubeQuery: 'Chill Lo-fi' },
  neutral: { name: 'Neutral', emoji: '😐', genre: 'Trending Hits', color: '#9ca3af', youtubeQuery: 'Trending Songs' }
};

const projectRoles = {
  ml: {
    roleName: "Machine Learning Engineer",
    techStack: ["Python", "Jupyter Notebook", "OpenCV", "TensorFlow/Keras", "NumPy"],
    description: "Architected and optimized the predictive intelligence layer. Focused on real-time image processing, voice acoustic feature modeling, and text sentiment classification to translate human emotional states into standardized indices.",
    keyResponsibilities: [
      "Developed an emotion recognition model using facial expression analysis with deep convolutional networks.",
      "Engineered data pipelines for raw acoustic/text classification to capture multi-modal sentiment profiles.",
      "Conducted extensive model testing, validation, hyperparameter tuning, and system optimization."
    ]
  },
  frontend: {
    roleName: "Frontend Developer",
    techStack: ["React.js", "JavaScript (ES6)", "CSS3", "HTML5", "YouTube API"],
    description: "Crafted the visual presentation, user-engagement flows, and dynamic audio API layers. Built high-fidelity UI states, smooth motion aesthetics, and direct interfaces for real-time video feeds and client-side playlist generation.",
    keyResponsibilities: [
      "Built a modern, responsive, and intuitive dashboard interface utilizing React state paradigms.",
      "Integrated the YouTube Data API to dynamically fetch, filter, and queue playlists based on detected mood keys.",
      "Developed web-camera hooks and overlay filters to stream real-time facial feeds securely in the browser."
    ]
  }
};

export default function Projects() {
  const [selectedRole, setSelectedRole] = useState('ml');
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'requesting' | 'scanning' | 'locked'
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stability, setStability] = useState(0);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [activeThemeColor, setActiveThemeColor] = useState('#F37335'); // Dynamic glowing accent
  const [hudMessage, setHudMessage] = useState('BIOMETRIC HUD LAUNCHING');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const stabilityIntervalRef = useRef(null);

  const currentDetails = projectRoles[selectedRole];

  // Stop camera feed and clear hooks
  const stopCamera = () => {
    if (stabilityIntervalRef.current) {
      clearInterval(stabilityIntervalRef.current);
      stabilityIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Launch camera stream
  const startCamera = async () => {
    stopCamera();
    setScanState('requesting');
    setStability(0);
    setDetectedEmotion(null);
    setConfidence(0);
    setActiveThemeColor('#F37335');
    setHudMessage('ACQUIRING MEDIA INTERFACES');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setScanState('scanning');
      startStabilityLoop();
    } catch (err) {
      console.warn("Webcam blocked or not available. Starting simulated digital lock-in instead.", err);
      // Fallback: simulated holographic scan
      setIsCameraActive(false);
      setScanState('scanning');
      startStabilityLoop();
    }
  };

  // Stability progress counter
  const startStabilityLoop = () => {
    const messages = [
      'ACQUIRING TARGET COORDS',
      'ALIGNING BIOMETRIC MESH',
      'COMPUTING MOUTH CURVATURE',
      'ANALYZING EYE GLINT FREQ',
      'EXTRACTING SPECTRAL RATIO',
      'DECRYPTING EMOTION INDICES'
    ];

    stabilityIntervalRef.current = setInterval(() => {
      setStability(prev => {
        if (prev >= 100) {
          clearInterval(stabilityIntervalRef.current);
          handleLockIn();
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 6;
        const next = Math.min(100, prev + delta);
        const msgIdx = Math.floor((next / 100) * messages.length);
        setHudMessage(messages[msgIdx] || 'BIOMETRIC INDEX MATCHED');
        return next;
      });
    }, 200);
  };

  // Complete scanning lock-in
  const handleLockIn = () => {
    stopCamera();
    setScanState('locked');

    // Choose a random emotion
    const keys = Object.keys(EMOTIONS);
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const emotion = EMOTIONS[chosenKey];

    setDetectedEmotion(emotion);
    setConfidence(Math.floor(Math.random() * 11) + 89); // 89% - 99%
    setActiveThemeColor(emotion.color);
  };

  // Drawing Biometric Overlay Telemetry
  useEffect(() => {
    if (scanState !== 'scanning') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frame = 0;
    let animationId;

    // Simulated tracking nodes
    const points = Array.from({ length: 22 }).map(() => ({
      x: 0.35 + Math.random() * 0.3,
      y: 0.35 + Math.random() * 0.3,
      targetX: 0.35 + Math.random() * 0.3,
      targetY: 0.35 + Math.random() * 0.3,
      speed: 0.015 + Math.random() * 0.015
    }));

    const drawHUD = () => {
      if (!canvas) return;
      frame++;

      const w = (canvas.width = canvas.offsetWidth || 320);
      const h = (canvas.height = canvas.offsetHeight || 180);
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;
      const boxSize = Math.min(w, h) * 0.55;

      // Draw neon HUD corner guide anchors
      ctx.strokeStyle = activeThemeColor;
      ctx.lineWidth = 2.5;
      const edge = 18;

      // Top Left corner
      ctx.beginPath();
      ctx.moveTo(centerX - boxSize / 2, centerY - boxSize / 2 + edge);
      ctx.lineTo(centerX - boxSize / 2, centerY - boxSize / 2);
      ctx.lineTo(centerX - boxSize / 2 + edge, centerY - boxSize / 2);
      ctx.stroke();

      // Top Right corner
      ctx.beginPath();
      ctx.moveTo(centerX + boxSize / 2, centerY - boxSize / 2 + edge);
      ctx.lineTo(centerX + boxSize / 2, centerY - boxSize / 2);
      ctx.lineTo(centerX + boxSize / 2 - edge, centerY - boxSize / 2);
      ctx.stroke();

      // Bottom Left corner
      ctx.beginPath();
      ctx.moveTo(centerX - boxSize / 2, centerY + boxSize / 2 - edge);
      ctx.lineTo(centerX - boxSize / 2, centerY + boxSize / 2);
      ctx.lineTo(centerX - boxSize / 2 + edge, centerY + boxSize / 2);
      ctx.stroke();

      // Bottom Right corner
      ctx.beginPath();
      ctx.moveTo(centerX + boxSize / 2, centerY + boxSize / 2 - edge);
      ctx.lineTo(centerX + boxSize / 2, centerY + boxSize / 2);
      ctx.lineTo(centerX + boxSize / 2 - edge, centerY + boxSize / 2);
      ctx.stroke();

      // Translucent scanning zone
      ctx.fillStyle = activeThemeColor;
      ctx.globalAlpha = 0.05 + Math.sin(frame * 0.08) * 0.02;
      ctx.fillRect(centerX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize);
      ctx.globalAlpha = 1.0;

      // Glowing scan line sweep
      const lineY = centerY - boxSize / 2 + ((frame * 2.5) % boxSize);
      ctx.strokeStyle = activeThemeColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = activeThemeColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX - boxSize / 2 - 6, lineY);
      ctx.lineTo(centerX + boxSize / 2 + 6, lineY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Face tracking nodes overlay
      ctx.fillStyle = isCameraActive ? '#10b981' : activeThemeColor;
      points.forEach(pt => {
        pt.x += (pt.targetX - pt.x) * pt.speed;
        pt.y += (pt.targetY - pt.y) * pt.speed;

        if (Math.abs(pt.x - pt.targetX) < 0.03) pt.targetX = 0.35 + Math.random() * 0.3;
        if (Math.abs(pt.y - pt.targetY) < 0.03) pt.targetY = 0.35 + Math.random() * 0.3;

        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isCameraActive ? 'rgba(16,185,129,0.08)' : 'rgba(243,115,53,0.08)';
        ctx.lineWidth = 0.5;
        points.forEach(otherPt => {
          const dist = Math.hypot(pt.x - otherPt.x, pt.y - otherPt.y);
          if (dist < 0.12) {
            ctx.beginPath();
            ctx.moveTo(pt.x * w, pt.y * h);
            ctx.lineTo(otherPt.x * w, otherPt.y * h);
            ctx.stroke();
          }
        });
      });

      // HUD log metrics
      ctx.fillStyle = '#fff';
      ctx.font = '8px monospace';
      ctx.globalAlpha = 0.65;
      ctx.fillText(`LOCK: ${Math.round(stability)}%`, w - 85, 20);
      ctx.fillText(`FREQ: 60Hz`, w - 85, 30);
      ctx.fillText(`STATUS: ONLINE`, 15, 20);
      ctx.fillText(`LINK: ${isCameraActive ? 'HW WEBCAM' : 'EMULATOR'}`, 15, 30);
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(drawHUD);
    };

    drawHUD();
    return () => cancelAnimationFrame(animationId);
  }, [scanState, isCameraActive, stability, activeThemeColor]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <section id="projects" className="min-h-[100dvh] pt-0 pb-0 relative overflow-hidden flex flex-col">
      {/* Dynamic colored background light matching scanning accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: `${activeThemeColor}10` }}
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex-1 flex flex-col">
        {/* Main Background Card */}
        <div className="glass-card bg-white dark:bg-zinc-900 p-6 md:p-8 lg:p-12 border border-transparent dark:border-white/5 relative overflow-hidden shadow-xl flex-1 flex flex-col justify-center">

          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-8 lg:mt-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-secondary mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Deep dive into my major software engineering achievements, interactive features, and technical architecture.
          </p>
        </motion.div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Live Webcam Scanner Module */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="glass-card flex-1 p-6 flex flex-col justify-between border border-slate-200/50 dark:border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Music className="w-48 h-48 text-white" />
              </div>

              {/* Title & Badge */}
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  Featured Product
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-3">
                  Emotion-Based Music Recommender
                </h3>
                <p className="text-xs text-secondary mt-1">January 2023 - May 2023</p>
              </div>

              {/* Dynamic Interactive Scanner Box */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/5 flex flex-col items-center justify-center p-4 min-h-[220px]">

                {/* IDLE state */}
                {scanState === 'idle' && (
                  <div className="text-center space-y-4 max-w-[280px]">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Launch Biometric Scan</h4>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">
                        Links local webcam feeds to scan real-time facial expressions or falls back to holographic simulation!
                      </p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="px-6 py-2.5 bg-primary text-white hover:bg-primary/80 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-[0_0_15px_var(--primary-glow)] cursor-pointer"
                    >
                      Start Camera Link
                    </button>
                  </div>
                )}

                {/* REQUESTING permissions state */}
                {scanState === 'requesting' && (
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <h4 className="text-sm font-semibold text-foreground">Authorizing Hardware</h4>
                    <p className="text-xs text-secondary max-w-[220px] mx-auto">
                      Please allow camera access pop-up in your URL address bar.
                    </p>
                  </div>
                )}

                {/* SCANNING face state */}
                {scanState === 'scanning' && (
                  <div className="absolute inset-0 w-full h-full">
                    {/* Live Mirror Video */}
                    {isCameraActive ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center text-secondary/40">
                        <VideoOff className="w-12 h-12 mb-2" />
                        <span className="text-[10px] font-mono tracking-widest uppercase">WEBCAM BLOCKED / OFFLINE</span>
                      </div>
                    )}

                    {/* Overlaid drawing HUD canvas */}
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

                    {/* HUD Status Bar overlay */}
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-center bg-black/75 px-3 py-1.5 rounded-lg border border-white/5 font-mono text-[9px] text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-emerald-400 font-semibold">{hudMessage}</span>
                      </div>
                      <span className="text-secondary">{stability}% LOCK</span>
                    </div>
                  </div>
                )}

                {/* LOCKED & DETECTED MOOD state */}
                {scanState === 'locked' && detectedEmotion && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-2xl relative"
                      style={{
                        backgroundColor: `${detectedEmotion.color}15`,
                        border: `2px solid ${detectedEmotion.color}`,
                        boxShadow: `0 0 20px ${detectedEmotion.color}35`
                      }}
                    >
                      {detectedEmotion.emoji}
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-secondary font-semibold font-mono">Biometric Match Locked</span>
                      <h4 className="text-2xl font-black mt-1" style={{ color: detectedEmotion.color }}>
                        {detectedEmotion.name} ({confidence}%)
                      </h4>
                      <p className="text-[11px] text-secondary mt-1 max-w-[240px] mx-auto font-light leading-relaxed">
                        Recommended soundscapes: <strong className="text-foreground">{detectedEmotion.genre}</strong>
                      </p>
                    </div>

                    <div className="flex gap-3 w-full max-w-[280px]">
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(detectedEmotion.youtubeQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                      >
                        <YoutubeIcon className="w-4 h-4" />
                        Play Playlist
                      </a>

                      <button
                        onClick={startCamera}
                        className="py-2.5 px-3.5 glass hover:bg-white/10 text-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                <a
                  href="https://github.com/IndrajitGhosh-EG/Emotion-based-music-recomender-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 glass rounded-xl text-center text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                >
                  <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Project Details & Role Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="glass-card flex-1 p-8 border border-slate-200/50 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div>
                {/* Role Switcher Tabs */}
                <div className="flex bg-slate-100 dark:bg-black/40 p-1.5 rounded-xl border border-slate-200/60 dark:border-white/5 mb-8 font-mono">
                  <button
                    onClick={() => setSelectedRole('ml')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${selectedRole === 'ml'
                      ? 'bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]'
                      : 'text-secondary hover:text-foreground'
                      }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    Machine Learning Engineer
                  </button>
                  <button
                    onClick={() => setSelectedRole('frontend')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${selectedRole === 'frontend'
                      ? 'bg-accent text-white shadow-[0_0_15px_rgba(255,181,115,0.5)]'
                      : 'text-secondary hover:text-foreground'
                      }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    Frontend Developer
                  </button>
                </div>

                {/* Role Specific details with Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedRole}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
                        Active Perspective Role
                      </h4>
                      <h3 className={`text-2xl font-extrabold ${selectedRole === 'ml' ? 'text-primary' : 'text-accent'
                        }`}>
                        {currentDetails.roleName}
                      </h3>
                    </div>

                    <p className="text-sm text-secondary font-light leading-relaxed">
                      {currentDetails.description}
                    </p>

                    {/* Dynamic Tech Stack Tags */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                        Technologies Deployed
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {currentDetails.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className={`text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 ${selectedRole === 'ml' ? 'hover:border-primary/40' : 'hover:border-accent/40'
                              } transition-colors`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                        Key Responsibilities & Tasks
                      </h5>
                      <ul className="space-y-3">
                        {currentDetails.keyResponsibilities.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${selectedRole === 'ml' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                              }`}>
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm text-secondary font-light leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}
