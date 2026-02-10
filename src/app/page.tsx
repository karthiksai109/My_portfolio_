'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Code, 
  Terminal, 
  Cpu, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  Zap, 
  Brain, 
  Target, 
  Coffee,
  Sparkles,
  MessageSquare,
  Send,
  Bot,
  Layers,
  Swords,
  Loader2,
  ArrowRight
} from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const AI_KNOWLEDGE_BASE: Record<string, string> = {
  skills: "Karthik is proficient in React, Next.js, TypeScript, Node.js, Python, TensorFlow, MongoDB, AWS, Docker, and more. He specializes in full-stack development with AI/ML integration.",
  experience: "Karthik transitioned from Electronics & Communication Engineering (ECE) to Computer Science, earning his MS from the University of Dayton. He has expertise in MERN stack, Python AI/ML, and cloud technologies.",
  projects: "His key projects include an E-Commerce Analytics Platform (Next.js, TypeScript, Recharts) and this AI-powered portfolio itself. He builds real-time dashboards, intelligent systems, and modern web applications.",
  education: "MS in Computer Science from University of Dayton (2024-2025), with advanced studies in AI, Machine Learning, and Distributed Systems. BTech in ECE (2018-2022).",
  contact: "Email: karthiksaidham2001@gmail.com | LinkedIn: linkedin.com/in/ramadugukarthik | GitHub: github.com/karthiksai109",
  availability: "Karthik is immediately available for full-time positions. He is open to relocation anywhere in the US and excited about new challenges in AI and full-stack development.",
  strengths: "His unique strength is bridging hardware (ECE) and software (CS) perspectives. He combines AI/ML expertise with production-grade full-stack development skills.",
  hobbies: "Outside of coding, Karthik is a cricket enthusiast and a coffee connoisseur who loves exploring different brewing methods.",
  ai: "Karthik has hands-on experience with TensorFlow, PyTorch, NLP, computer vision, and building AI-powered applications. This portfolio itself features an AI assistant built from scratch.",
  hire: "Karthik is a perfect hire because he brings a rare combination: ECE hardware understanding + CS software mastery + AI/ML expertise + full-stack production skills. He learns fast, ships quality code, and is available immediately.",
}

function getAIResponse(query: string): string {
  const q = query.toLowerCase()
  
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('language')) {
    return AI_KNOWLEDGE_BASE.skills
  }
  if (q.includes('experience') || q.includes('work') || q.includes('background') || q.includes('journey')) {
    return AI_KNOWLEDGE_BASE.experience
  }
  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('build')) {
    return AI_KNOWLEDGE_BASE.projects
  }
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('study') || q.includes('college')) {
    return AI_KNOWLEDGE_BASE.education
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('connect')) {
    return AI_KNOWLEDGE_BASE.contact
  }
  if (q.includes('available') || q.includes('hire') || q.includes('join') || q.includes('start') || q.includes('when')) {
    return AI_KNOWLEDGE_BASE.availability
  }
  if (q.includes('strength') || q.includes('unique') || q.includes('special') || q.includes('different') || q.includes('why')) {
    return AI_KNOWLEDGE_BASE.strengths
  }
  if (q.includes('hobby') || q.includes('hobbies') || q.includes('fun') || q.includes('cricket') || q.includes('coffee')) {
    return AI_KNOWLEDGE_BASE.hobbies
  }
  if (q.includes('ai') || q.includes('machine learning') || q.includes('ml') || q.includes('deep learning') || q.includes('tensorflow')) {
    return AI_KNOWLEDGE_BASE.ai
  }
  if (q.includes('hire') || q.includes('perfect') || q.includes('fit') || q.includes('candidate') || q.includes('recruit')) {
    return AI_KNOWLEDGE_BASE.hire
  }
  
  return `Karthik is a Full-Stack AI Engineer with an MS in CS from the University of Dayton. He bridges ECE hardware knowledge with cutting-edge software skills in React, Next.js, Python, and AI/ML. His adaptability and problem-solving mindset make him stand out. He's immediately available and open to relocation. Try asking about his skills, projects, experience, or why he'd be a great hire!`
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm Karthik's AI assistant. Ask me anything about his skills, projects, experience, or why he'd be a perfect hire!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })
  
  const roles = [
    "Full-Stack AI Engineer",
    "Innovation Architect", 
    "Solutions Developer",
    "Tech Problem Solver",
    "Digital Transformer",
    "Code Visionary"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getAIResponse(userMsg)
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  const projects = [
    {
      title: "E-Commerce Analytics Platform",
      description: "Real-time analytics dashboard with AI-powered insights for tracking sales, customer behavior, and inventory management. Features interactive charts, product tables, and customer segmentation.",
      tech: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "React"],
      link: "https://github.com/karthiksai109/E-Commerce-Analytics-Platform",
      live: null,
      featured: true,
      color: "from-[#1d4ed8] to-[#0e7490]"
    },
    {
      title: "AI-Powered Portfolio",
      description: "This portfolio itself - featuring an AI assistant, terminal-style UI, Framer Motion animations, and responsive design. Built to showcase full-stack + AI capabilities.",
      tech: ["Next.js 14", "Framer Motion", "Tailwind CSS", "AI/NLP", "TypeScript"],
      link: "https://github.com/karthiksai109/My_portfolio_",
      live: "https://karthikramadugu.vercel.app/",
      featured: true,
      color: "from-[#15803d] to-[#0e7490]"
    }
  ]

  const journey = [
    {
      title: "MS Computer Science",
      description: "University of Dayton - Advanced studies in AI, Machine Learning, and Distributed Systems",
      icon: <GraduationCap className="w-6 h-6" />,
      year: "2024-2025",
      type: "education"
    },
    {
      title: "Full-Stack Development",
      description: "MERN Stack Expertise - MongoDB, Express, React, Node.js with modern development practices",
      icon: <Code className="w-6 h-6" />,
      year: "2022-2024",
      type: "experience"
    },
    {
      title: "Python & AI/ML",
      description: "Machine Learning, Data Science, and AI development with cutting-edge technologies",
      icon: <Brain className="w-6 h-6" />,
      year: "2020-2022",
      type: "experience"
    },
    {
      title: "ECE Foundation",
      description: "Electronics and Communication Engineering - Hardware to Software transition",
      icon: <Cpu className="w-6 h-6" />,
      year: "2018-2022",
      type: "education"
    }
  ]

  const achievements = [
    { title: "LinkedIn Top Voice", description: "Technical Software Development", icon: <Award className="w-5 h-5" /> },
    { title: "10+ Projects Delivered", description: "Full-stack applications with modern tech", icon: <Target className="w-5 h-5" /> },
    { title: "Open Source Contributor", description: "Active GitHub community participant", icon: <Github className="w-5 h-5" /> }
  ]

  const navSections = ['home', 'journey', 'projects', 'achievements', 'contact']

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#1a1a2e] overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1d4ed8] via-[#6d28d9] to-[#0e7490] z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Mouse Follower */}
      <div 
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30" />
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-[#6d28d9]/5"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-[#2563eb] to-[#6d28d9] rounded-full opacity-15"
            style={{ left: `${10 + i * 12}%`, top: `${8 + i * 10}%` }}
            animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-[#e4e4ec]/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#home"
              className="text-xl font-bold font-jetbrains terminal-prompt cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              karthik@dev
            </motion.a>
            
            <div className="hidden md:flex items-center gap-1">
              {navSections.map((section, index) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="nav-link capitalize"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {section}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setIsChatOpen(true)}
                className="ml-2 nav-link flex items-center gap-2 text-[#6d28d9] hover:text-[#1d4ed8]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="w-4 h-4" />
                AI Assistant
              </motion.button>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl card-glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative min-h-screen flex items-center px-6 pt-24">
        <div className="absolute inset-0 opacity-8">
          <div className="absolute inset-0 bg-dots-pattern" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 3 cols */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badges */}
              <div className="mb-8 flex flex-wrap gap-3">
                <motion.div className="status-badge status-available" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <div className="w-2.5 h-2.5 bg-[#15803d] rounded-full animate-pulse" />
                  <span className="font-jetbrains">Available Now</span>
                </motion.div>
                <motion.div className="status-badge status-ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Zap className="w-3.5 h-3.5" />
                  <span className="font-jetbrains">Ready to Deploy</span>
                </motion.div>
                <motion.div className="status-badge status-open" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-jetbrains">Open to Relocation</span>
                </motion.div>
              </div>

              {/* Terminal Card */}
              <motion.div 
                className="card-gradient p-6 md:p-10 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#c2410c]" />
                  <div className="w-3 h-3 rounded-full bg-[#a16207]" />
                  <div className="w-3 h-3 rounded-full bg-[#15803d]" />
                  <span className="ml-3 text-xs font-jetbrains text-[#8888a4]">karthik@portfolio:~</span>
                </div>
                
                <div className="text-left space-y-3">
                  <div className="font-jetbrains text-sm text-[#8888a4]">
                    <span className="terminal-prompt">$</span> <span>whoami</span>
                  </div>
                  <h1 className="text-3xl md:text-6xl font-bold font-jetbrains">
                    <span className="terminal-text">Karthik Ramadugu</span>
                    <span className="terminal-cursor"></span>
                  </h1>
                  
                  <div className="font-jetbrains text-sm text-[#8888a4]">
                    <span className="terminal-prompt">$</span> <span>cat role.txt</span>
                  </div>
                  <motion.div 
                    className="text-2xl md:text-4xl font-bold font-jetbrains gradient-text-blue"
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.div>
                  
                  <p className="text-base md:text-lg text-[#4a4a68] font-jetbrains leading-relaxed pt-2">
                    From <span className="gradient-text-coffee font-semibold">ECE foundations</span> to 
                    <span className="gradient-text-blue font-semibold"> AI innovation</span>. 
                    Mastered <span className="gradient-text-cyan font-semibold">Python</span> to 
                    <span className="gradient-text-blue font-semibold"> MERN stack</span>. 
                    <span className="terminal-text font-semibold"> Adaptable, hardworking, always solving real problems.</span>
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.a href="#contact" className="btn-primary group" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Terminal className="w-5 h-5" />
                  <span>Deploy Karthik</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
                
                <motion.a href="#projects" className="btn-secondary group" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Layers className="w-5 h-5" />
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
                
                <motion.a href="/game" className="btn-challenge group" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Swords className="w-5 h-5" />
                  <span>Challenge Me</span>
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[
                  { href: "https://github.com/karthiksai109", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/ramadugukarthik/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:karthiksaidham2001@gmail.com", icon: Mail, label: "Email" }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl card-glass hover:border-[#2563eb]/30 transition-all group"
                    whileHover={{ scale: 1.1, y: -3 }}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 text-[#4a4a68] group-hover:text-[#2563eb] transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Photo + Personal Touch - 2 cols */}
            <motion.div 
              className="lg:col-span-2 flex flex-col items-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* Gradient Ring */}
                <div className="absolute -inset-3 bg-gradient-to-r from-[#1d4ed8] via-[#6d28d9] to-[#0e7490] rounded-full opacity-20 blur-lg animate-pulse" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/photos/karthik_2_.jpeg"
                    alt="Karthik Ramadugu"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Coffee badge */}
                <motion.div 
                  className="absolute -bottom-2 -left-2 p-3 rounded-full bg-white shadow-lg border border-[#a16207]/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Coffee className="w-6 h-6 text-[#a16207]" />
                </motion.div>
                {/* AI badge */}
                <motion.div 
                  className="absolute -bottom-2 -right-2 p-3 rounded-full bg-white shadow-lg border border-[#6d28d9]/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Brain className="w-6 h-6 text-[#6d28d9]" />
                </motion.div>
                {/* Sparkle badge */}
                <motion.div 
                  className="absolute -top-2 right-4 p-3 rounded-full bg-white shadow-lg border border-[#2563eb]/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                >
                  <Sparkles className="w-6 h-6 text-[#2563eb]" />
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-sm">
                {[
                  { label: "Projects", value: "10+" },
                  { label: "Tech Stack", value: "15+" },
                  { label: "Experience", value: "3+ yrs" }
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-white/80 border border-[#e4e4ec] shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <div className="text-xl font-bold font-jetbrains gradient-text-blue">{stat.value}</div>
                    <div className="text-xs text-[#8888a4] font-jetbrains">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#c8c8d8] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#c8c8d8] rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* ===== JOURNEY SECTION ===== */}
      <section id="journey" className="py-20 px-6 bg-[#f4f4f8]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-16 gradient-text"
          >
            Professional Journey
          </motion.h2>
          
          <div className="relative">
            <div className="timeline-line" />
            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-16"
                >
                  <div className="timeline-dot" />
                  <div className="card-glass p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#1d4ed8] to-[#0e7490] text-white shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span className="text-xs font-jetbrains px-2 py-1 rounded-full bg-[#2563eb]/8 text-[#1d4ed8]">{item.type}</span>
                        </div>
                        <p className="text-[#4a4a68] mb-2">{item.description}</p>
                        <span className="text-sm font-jetbrains gradient-text-blue font-semibold">{item.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-6 gradient-text"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[#8888a4] font-jetbrains mb-16 text-sm"
          >
            Only live & working projects — no placeholders
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card-glass p-8 group"
              >
                {/* Project Header */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-bold font-jetbrains mb-5`}>
                  <Zap className="w-3 h-3" />
                  FEATURED
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text-blue transition-all">{project.title}</h3>
                <p className="text-[#4a4a68] mb-5 leading-relaxed">{project.description}</p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1.5 bg-[#f4f4f8] text-[#2d2d44] rounded-lg text-xs font-jetbrains border border-[#e4e4ec]">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-jetbrains font-semibold text-[#4a4a68] hover:text-[#1d4ed8] transition-colors"
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-jetbrains font-semibold text-[#1d4ed8] hover:text-[#6d28d9] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS SECTION ===== */}
      <section id="achievements" className="py-20 px-6 bg-[#f4f4f8]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-16 gradient-text"
          >
            Achievements
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="card-glass p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#0e7490] text-white mb-5">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-[#8888a4]">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains mb-6 gradient-text"
          >
            Let&apos;s Build Something Amazing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-12 text-[#8888a4] max-w-2xl mx-auto"
          >
            Available immediately for full-time roles. Open to relocation and excited about new challenges in AI and full-stack development.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <a href="mailto:karthiksaidham2001@gmail.com" className="contact-card group">
              <Mail className="w-8 h-8 mb-3 mx-auto text-[#2563eb] group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Email</h3>
              <p className="text-[#8888a4] text-sm">karthiksaidham2001@gmail.com</p>
            </a>
            <a href="https://github.com/karthiksai109" target="_blank" rel="noopener noreferrer" className="contact-card group">
              <Github className="w-8 h-8 mb-3 mx-auto text-[#1a1a2e] group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">GitHub</h3>
              <p className="text-[#8888a4] text-sm">karthiksai109</p>
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer" className="contact-card group">
              <Linkedin className="w-8 h-8 mb-3 mx-auto text-[#2563eb] group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">LinkedIn</h3>
              <p className="text-[#8888a4] text-sm">Let&apos;s Connect</p>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://github.com/karthiksai109" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Github className="w-5 h-5" /> View GitHub
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-jetbrains text-sm">&copy; 2025 Karthik Ramadugu</p>
          <p className="text-[#8888a4] text-xs mt-2 font-jetbrains">Full-Stack AI Engineer | Built with Next.js, Framer Motion & AI</p>
        </div>
      </footer>

      {/* ===== AI ASSISTANT FLOATING BUTTON ===== */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#1d4ed8] text-white shadow-2xl hover:shadow-[#2563eb]/25"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity } }}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#15803d] rounded-full border-2 border-white" />
      </motion.button>

      {/* ===== AI CHAT MODAL ===== */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-[#e4e4ec] overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#1d4ed8] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-jetbrains text-sm">Karthik&apos;s AI Assistant</h3>
                  <p className="text-xs text-white/60">Powered by custom NLP</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#f4f4f8]">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-[#1a1a2e] to-[#1d4ed8] text-white rounded-br-md' 
                      : 'bg-white border border-[#e4e4ec] text-[#2d2d44] rounded-bl-md shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e4e4ec] p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-[#c8c8d8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#c8c8d8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#c8c8d8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-[#e4e4ec] bg-white">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['Skills?', 'Projects?', 'Why hire?', 'Contact?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setChatInput(q); }}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#f4f4f8] text-[#4a4a68] hover:bg-[#2563eb]/8 hover:text-[#1d4ed8] transition-colors font-jetbrains"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#e4e4ec] bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Karthik..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#f4f4f8] border border-[#e4e4ec] text-sm font-jetbrains focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#1d4ed8] text-white disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!chatInput.trim() || isTyping}
                >
                  {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold font-jetbrains gradient-text">KR</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-2">
                {navSections.map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className="block nav-link capitalize py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section}
                  </a>
                ))}
                <button
                  onClick={() => { setIsMenuOpen(false); setIsChatOpen(true); }}
                  className="w-full text-left nav-link py-3 flex items-center gap-2 text-[#6d28d9]"
                >
                  <Bot className="w-4 h-4" /> AI Assistant
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
