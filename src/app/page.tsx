'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  Briefcase, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  Zap, 
  Brain, 
  Rocket, 
  Target, 
  Gamepad2 
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold font-jetbrains gradient-text"
            >
              KR
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              {['home', 'journey', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="nav-link capitalize"
                >
                  {section}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg pro-card"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{
               backgroundImage: `
                 linear-gradient(45deg, #0066ff 25%, transparent 25%),
                 linear-gradient(-45deg, #0066ff 25%, transparent 25%),
                 linear-gradient(45deg, transparent 75%, #0066ff 75%),
                 linear-gradient(-45deg, transparent 75%, #0066ff 75%)`,
               backgroundSize: '20px 20px',
               backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
             }} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 max-w-5xl"
        >
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="status-badge status-available">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Available for Full-time & Contract
            </div>
            <div className="status-badge status-ready">
              <Zap className="w-4 h-4" />
              Ready to Deploy
            </div>
            <div className="status-badge status-open">
              <MapPin className="w-4 h-4" />
              Open to Relocation
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-jetbrains mb-6"
          >
            <span className="terminal-text">karthik@portfolio:~$</span> <span className="gradient-text">{roles[currentRoleIndex]}</span>
            <span className="terminal-cursor"></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed font-jetbrains"
          >
            From <span className="coffee-text font-semibold">ECE foundations</span> to <span className="text-primary-blue font-semibold">AI innovation excellence</span>. 
            Mastered <span className="text-ninja-purple font-semibold">Python</span> to <span className="text-primary-blue font-semibold">MERN stack</span> development. 
            <span className="text-terminal-green font-semibold"> Always learning cutting-edge tech</span> for transformative solutions!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a href="#contact" className="btn-primary">
              <Terminal className="w-5 h-5" />
              Deploy Karthik
            </a>
            <a href="#projects" className="btn-secondary">
              <Rocket className="w-5 h-5" />
              View Projects
            </a>
            <a href="/game" className="btn-secondary">
              <Gamepad2 className="w-5 h-5" />
              Challenge Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <a href="https://github.com/karthiksai109" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full pro-card hover:scale-110 transition-transform">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full pro-card hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:karthiksaidham2001@gmail.com" 
               className="p-3 rounded-full pro-card hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
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

      
      <section id="achievements" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16 gradient-text"
          >
            Achievements & Recognition
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong p-6 rounded-xl text-center hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8 gradient-text"
          >
            Let's Build Something Amazing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 text-gray-400"
          >
            Ready to leverage my versatile background from ECE to Computer Science? 
            I'm available to join immediately, open to learning new skills, and excited about relocation opportunities!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <a href="mailto:karthiksaidham2001@gmail.com" 
               className="glass-strong p-6 rounded-xl hover-lift group">
              <Mail className="w-8 h-8 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">karthiksaidham2001@gmail.com</p>
            </a>
            
            <a href="tel:9375160692"
               className="glass-strong p-6 rounded-xl hover-lift group">
              <Phone className="w-8 h-8 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">+1 (937) 516-0692</p>
            </a>

            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer"
               className="glass-strong p-6 rounded-xl hover-lift group">
              <Linkedin className="w-8 h-8 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400">Let's Connect</p>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://github.com/karthiksai109" target="_blank" rel="noopener noreferrer" 
               className="btn-primary flex items-center justify-center gap-2">
              <Github size={20} />
              View GitHub
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer"
               className="px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Linkedin size={20} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

          </div>
  )
}
