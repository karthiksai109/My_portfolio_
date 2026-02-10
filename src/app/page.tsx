'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Menu, X, Code, Terminal, Cpu, Cloud, Database, Smartphone, ExternalLink, MapPin, Briefcase, GraduationCap, Award, ChevronRight, Zap, Brain, Rocket, Target, Gamepad2, ArrowRight } from 'lucide-react'


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = [
    "Karthik Ramadugu",
    "Full-Stack AI Ninja",
    "Innovation Architect", 
    "Code Warrior",
    "AI Solutions Engineer",
    "Digital Transformer",
    "Tech Visionary"
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
    }, 2000)

    return () => clearInterval(interval)
  }, [currentRoleIndex, isDeleting])

  const skills = [
    { name: 'React/Next.js', level: 95, icon: <Code className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Frontend' },
    { name: 'Node.js/Express', level: 90, icon: <Terminal className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Backend' },
    { name: 'Python/Django', level: 85, icon: <Cpu className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Backend' },
    { name: 'AWS/Cloud', level: 80, icon: <Cloud className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Cloud' },
    { name: 'MongoDB/SQL', level: 88, icon: <Database className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Database' },
    { name: 'Mobile Dev', level: 75, icon: <Smartphone className="w-5 h-5" />, color: 'from-blue-500 to-blue-700', category: 'Mobile' },
  ]

  const projects = [
    {
      title: 'E-Commerce Analytics Platform',
      description: 'Advanced analytics dashboard for tracking sales, customer behavior, and inventory management with real-time data visualization.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      link: '#',
      github: '#',
      featured: true,
      category: 'Full-Stack'
    },
    {
      title: 'AI-Powered Code Assistant',
      description: 'Intelligent code completion and suggestion tool using machine learning to improve developer productivity.',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      link: '#',
      github: '#',
      featured: true,
      category: 'AI/ML'
    },
    {
      title: 'Real-Time Collaboration Platform',
      description: 'Seamless team collaboration platform with live editing, video conferencing, and project management features.',
      tech: ['WebRTC', 'Socket.io', 'Next.js', 'PostgreSQL'],
      link: '#',
      github: '#',
      featured: false,
      category: 'WebRTC'
    },
    {
      title: 'Cloud Infrastructure Manager',
      description: 'Automated cloud resource management system with cost optimization and security monitoring.',
      tech: ['AWS', 'Terraform', 'Python', 'Docker'],
      link: '#',
      github: '#',
      featured: false,
      category: 'DevOps'
    }
  ]

  const journey = [
    {
      title: "ECE Foundation",
      description: "Built strong foundation in electronics, circuits, and hardware systems",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      year: "2018-2022",
      photo: "/photos/WhatsApp Image 2026-02-09 at 5.19.27 PM.jpeg"
    },
    {
      title: "Python Programming",
      description: "Discovered passion for coding through Python and data structures",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      year: "2020-2022",
      photo: "/photos/WhatsApp Image 2026-02-09 at 5.58.14 PM.jpeg"
    },
    {
      title: "MERN Stack at FunctionUp",
      description: "Mastered full-stack development with MongoDB, Express, React, Node.js at FunctionUp",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      year: "2022-2024",
      photo: "/photos/WhatsApp Image 2026-02-09 at 5.21.31 PM.jpeg"
    },
    {
      title: "MS Computer Science",
      description: "Advanced to Master's in Computer Science at University of Dayton",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      year: "Jan 2024 - Dec 2025",
      photo: "/photos/grad.jpeg"
    }
  ]

  
  const achievements = [
    { title: "LinkedIn Top Voice", description: "Recognized for technical contributions", icon: <Award className="w-5 h-5" /> },
    { title: "5+ Projects Delivered", description: "Successfully completed client projects", icon: <Target className="w-5 h-5" /> },
    { title: "Open Source Contributor", description: "Active in GitHub community", icon: <Github className="w-5 h-5" /> }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `
               linear-gradient(45deg, #0066ff 25%, transparent 25%),
               linear-gradient(-45deg, #0066ff 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, #0066ff 75%),
               linear-gradient(-45deg, transparent 75%, #0066ff 75%)`,
             backgroundSize: '20px 20px',
             backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
           }} />
      
      <nav className="fixed top-0 w-full z-50 glass-strong px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-jetbrains gradient-text"
          >
            <span className="terminal-text">KR</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {['home', 'journey', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="capitalize text-gray-600 hover:text-primary-blue transition-colors font-medium font-jetbrains text-sm"
              >
                {section}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg ninja-card"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ninja-card">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              <span className="text-sm font-medium font-jetbrains">Available for Full-time & Contract</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ninja-card">
              <MapPin className="w-4 h-4 text-primary-blue" />
              <span className="text-sm font-medium font-jetbrains">Open to Relocation</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ninja-card">
              <Zap className="w-4 h-4 text-ninja-purple" />
              <span className="text-sm font-medium font-jetbrains">Ready to Deploy</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold font-jetbrains mb-6"
          >
            <span className="terminal-text">&gt;</span> <span className="gradient-text">{roles[currentRoleIndex]}</span><span className="terminal-cursor"></span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed font-jetbrains"
          >
            From <span className="coffee-accent font-semibold">ECE foundations</span> to <span className="text-primary-blue font-semibold">AI innovation excellence</span>. 
            Mastered <span className="text-ninja-purple font-semibold">Python</span> to <span className="text-primary-blue font-semibold">MERN stack</span> development. 
            <span className="text-terminal-green font-semibold"> Always learning new tech</span> for any project!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a href="#contact" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
              <Terminal className="w-5 h-5" />
              Deploy Karthik
            </a>
            <a href="#journey" className="px-8 py-4 ninja-card rounded-xl font-semibold hover-lift flex items-center justify-center gap-2 text-lg border border-gray-200">
              <Rocket className="w-5 h-5" />
              View Journey
            </a>
            <a href="/game" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold hover-lift flex items-center justify-center gap-2 text-lg">
              <Gamepad2 className="w-5 h-5" />
              Play My Game
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 justify-center mb-8"
          >
            <a href="https://github.com/karthiksai109" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full glass hover-glow">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ramadugukarthik/" target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full glass hover-glow">
              <Linkedin size={24} />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-2xl font-bold gradient-text">2+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-2xl font-bold gradient-text">15+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="glass-strong p-4 rounded-lg">
              <div className="text-2xl font-bold gradient-text">10+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="journey" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16 gradient-text"
          >
            My Versatile Journey
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600"></div>
            
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 pr-8">
                  <div className={`glass-strong p-6 rounded-xl ${index % 2 === 0 ? 'text-right' : ''}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold mb-3 ${index % 2 === 0 ? 'float-right' : ''}`}>
                      {item.icon}
                      {item.year}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={item.photo} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center z-10">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16 gradient-text"
          >
            Technical Versatility
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong p-6 rounded-xl hover-lift group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <span className="text-xs text-gray-400">{skill.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-medium">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 glass-strong p-8 rounded-xl text-center"
          >
            <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold mb-4 gradient-text">Open to Learning New Skills</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I'm passionate about continuous learning and ready to acquire any new skills required for your projects. 
              From emerging technologies to domain-specific tools, I adapt quickly and thrive on challenges.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`glass-strong rounded-xl overflow-hidden hover-lift group ${
                  project.featured ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {project.featured && (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold text-center">
                    Featured Project
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.link} className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a href={project.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Github size={16} />
                      Source Code
                    </a>
                  </div>
                </div>
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
