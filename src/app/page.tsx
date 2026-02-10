'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  Code, 
  Terminal, 
  Cpu, 
  Cloud, 
  Database, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  Zap, 
  Brain, 
  Rocket, 
  Target, 
  Gamepad2,
  Coffee,
  Sparkles
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })
  
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
      if (!isDeleting && currentRoleIndex < roles.length - 1) {
        setCurrentRoleIndex(prev => prev + 1)
      } else if (isDeleting && currentRoleIndex > 0) {
        setCurrentRoleIndex(prev => prev - 1)
      } else if (!isDeleting && currentRoleIndex === roles.length - 1) {
        setIsDeleting(true)
      } else if (isDeleting && currentRoleIndex === 0) {
        setIsDeleting(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentRoleIndex, isDeleting])

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

  const skills = [
    { name: 'React/Next.js', level: 95, icon: <Code className="w-5 h-5" />, category: 'Frontend' },
    { name: 'TypeScript', level: 90, icon: <Terminal className="w-5 h-5" />, category: 'Language' },
    { name: 'Node.js', level: 88, icon: <Cpu className="w-5 h-5" />, category: 'Backend' },
    { name: 'Python', level: 92, icon: <Brain className="w-5 h-5" />, category: 'AI/ML' },
    { name: 'AWS/Cloud', level: 85, icon: <Cloud className="w-5 h-5" />, category: 'Cloud' },
    { name: 'MongoDB', level: 87, icon: <Database className="w-5 h-5" />, category: 'Database' },
  ]

  const projects = [
    {
      title: "E-Commerce Analytics Platform",
      description: "Real-time analytics dashboard with AI-powered insights for tracking sales, customer behavior, and inventory management.",
      tech: ["Next.js", "TypeScript", "Recharts", "Tailwind"],
      link: "https://github.com/karthiksai109/E-Commerce-Analytics-Platform",
      featured: true
    },
    {
      title: "Premium Portfolio",
      description: "Professional portfolio website with modern design, smooth animations, and optimized performance.",
      tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
      link: "https://karthikramadugu.vercel.app/",
      featured: false
    },
    {
      title: "AI-Powered Chat Assistant",
      description: "Intelligent chatbot with natural language processing and context-aware responses.",
      tech: ["Python", "TensorFlow", "React", "Node.js"],
      link: "#",
      featured: false
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

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Advanced Mouse Follower */}
      <div 
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate(0, 0)',
        }}
      />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30" />
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold font-space-grotesk gradient-text-blue cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="terminal-prompt">karthik@dev</span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-2">
              {['home', 'journey', 'skills', 'projects', 'achievements', 'contact'].map((section, index) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="nav-link capitalize relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {section}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-dots-pattern" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-6xl relative"
        >
          {/* Floating Status Cards */}
          <motion.div 
            className="mb-12 flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="status-badge status-available floating"
              style={{ animationDelay: '0s' }}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-jetbrains">Available for Full-time</span>
            </motion.div>
            
            <motion.div 
              className="status-badge status-ready floating"
              style={{ animationDelay: '0.5s' }}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
            >
              <Zap className="w-4 h-4" />
              <span className="font-jetbrains">Ready to Deploy</span>
            </motion.div>
            
            <motion.div 
              className="status-badge status-open floating"
              style={{ animationDelay: '1s' }}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-jetbrains">Open to Relocation</span>
            </motion.div>
          </motion.div>

          {/* Main Terminal Display */}
          <motion.div 
            className="card-gradient p-8 md:p-12 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm font-jetbrains text-gray-500">karthik@portfolio:~</span>
            </div>
            
            {/* Terminal Content */}
            <motion.div className="text-left">
              <div className="font-jetbrains text-lg mb-4">
                <span className="terminal-prompt">$</span> 
                <span className="ml-2">whoami</span>
              </div>
              
              <motion.h1 
                className="text-4xl md:text-7xl font-bold font-jetbrains mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="terminal-text">Karthik Ramadugu</span>
                <span className="terminal-cursor"></span>
              </motion.h1>
              
              <div className="font-jetbrains text-lg mb-4">
                <span className="terminal-prompt">$</span> 
                <span className="ml-2">cat current_role.txt</span>
              </div>
              
              <motion.div 
                className="text-3xl md:text-5xl font-bold font-jetbrains gradient-text-blue mb-6"
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {roles[currentRoleIndex]}
                <span className="terminal-cursor"></span>
              </motion.div>
              
              <div className="font-jetbrains text-lg mb-6">
                <span className="terminal-prompt">$</span> 
                <span className="ml-2">echo "$description"</span>
              </div>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 font-jetbrains leading-relaxed max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                From <span className="gradient-text-coffee font-semibold">ECE foundations</span> to 
                <span className="gradient-text-blue font-semibold"> AI innovation excellence</span>. 
                Mastered <span className="gradient-text-cyan font-semibold">Python</span> to 
                <span className="gradient-text-blue font-semibold">MERN stack</span> development. 
                <span className="terminal-text font-semibold"> Always building cutting-edge solutions</span> 
                that transform ideas into reality!
              </motion.p>
            </motion.div>
            
            {/* Coffee & Cricket Personal Touch */}
            <div className="absolute top-4 right-4 flex gap-3">
              <motion.div 
                className="p-2 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Coffee className="w-5 h-5 text-amber-700" />
              </motion.div>
              <motion.div 
                className="p-2 rounded-lg bg-gradient-to-r from-green-100 to-green-200"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Target className="w-5 h-5 text-green-700" />
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Command Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <motion.a 
              href="#contact" 
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Deploy Karthik</span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a 
              href="#projects" 
              className="btn-secondary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span>View Projects</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.a>
            
            <motion.a 
              href="/game" 
              className="btn-ghost group border-2 border-dashed border-gray-300 hover:border-primary-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Challenge Me</span>
            </motion.a>
          </motion.div>

          {/* Social Links with Advanced Hover */}
          <motion.div 
            className="flex gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            {[
              { href: "https://github.com/karthiksai109", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/ramadugukarthik/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:karthiksaidham2001@gmail.com", icon: Mail, label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-4 rounded-2xl card-glass relative overflow-hidden">
                  <social.icon className="w-6 h-6 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <social.icon className="w-6 h-6 absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-300 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-20 px-6 bg-gray-50">
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
            <div className="timeline-line"></div>
            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-12"
                >
                  <div className="timeline-dot"></div>
                  <div className="pro-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <span className="text-sm font-jetbrains text-primary-blue">{item.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-16 gradient-text"
          >
            Technical Arsenal
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="pro-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{skill.name}</h3>
                      <span className="text-sm text-gray-500 font-jetbrains">{skill.category}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold font-jetbrains text-primary-blue">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`pro-card p-6 ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {project.featured && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold font-jetbrains mb-4">
                    <Zap className="w-3 h-3" />
                    FEATURED
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-jetbrains">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-blue hover:text-ninja-purple transition-colors font-jetbrains font-medium"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains text-center mb-16 gradient-text"
          >
            Achievements & Recognition
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-jetbrains mb-8 gradient-text"
          >
            Let&apos;s Build Something Amazing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 text-gray-500"
          >
            Ready to leverage my versatile background from ECE to Computer Science? 
            I&apos;m available to join immediately, open to learning new skills, and excited about relocation opportunities!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <a href="mailto:karthiksaidham2001@gmail.com" className="contact-card group">
              <Mail className="w-8 h-8 mb-3 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Email</h3>
              <p className="text-gray-500 text-sm">karthiksaidham2001@gmail.com</p>
            </a>
            
            <a href="tel:9375160692" className="contact-card group">
              <Phone className="w-8 h-8 mb-3 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Phone</h3>
              <p className="text-gray-500 text-sm">+1 (937) 516-0692</p>
            </a>

            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer" className="contact-card group">
              <Linkedin className="w-8 h-8 mb-3 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">LinkedIn</h3>
              <p className="text-gray-500 text-sm">Let&apos;s Connect</p>
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
              <Github className="w-5 h-5" />
              View GitHub
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-jetbrains text-sm">
            &copy; 2024 Karthik Ramadugu | Built with passion and cutting-edge technology
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Full-Stack AI Engineer | Innovation Architect | Problem Solver
          </p>
        </div>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 h-full w-64 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold font-jetbrains gradient-text">KR</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {['home', 'journey', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="block nav-link capitalize"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
