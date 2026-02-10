'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Brain, Code, Zap, Trophy, Star, Target, Rocket, Cpu, Database, Cloud, Smartphone, Terminal, Coffee, Camera, Gamepad2, Award, Heart, Calendar, Mail, Users, Briefcase } from 'lucide-react'
import Link from 'next/link'

interface Challenge {
  id: number
  title: string
  question: string
  hint: string
  options: string[]
  correctIndex: number
  points: number
  icon: React.ReactNode
  color: string
  hobby: string
}

interface GameAction {
  type: 'connect' | 'schedule' | 'hire' | 'refer'
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function Game() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed' | 'actions'>('menu')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [lives, setLives] = useState(3)
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', message: '' })
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "ECE to CS Bridge",
      question: "How does understanding electronics help in software development?",
      hint: "Think about hardware-software interaction",
      options: [
        "It helps optimize performance and understand hardware limits",
        "It is only useful for making circuits",
        "It has no relation to software",
        "It replaces the need to learn programming"
      ],
      correctIndex: 0,
      points: 100,
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      hobby: "Problem Solving"
    },
    {
      id: 2,
      title: "Python to MERN",
      question: "What's the advantage of using MERN stack over Python Django?",
      hint: "Think about JavaScript ecosystem",
      options: [
        "Single language (JavaScript) across frontend and backend",
        "It automatically writes tests for you",
        "It works without the internet",
        "It makes databases unnecessary"
      ],
      correctIndex: 0,
      points: 150,
      icon: <Code className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      hobby: "Full-Stack Development"
    },
    {
      id: 3,
      title: "Database Design",
      question: "When would you choose MongoDB over SQL?",
      hint: "Think about data structure",
      options: [
        "When you need flexible schema and fast iteration",
        "When you must enforce strict relational constraints only",
        "When you want to avoid indexes completely",
        "When your data never changes"
      ],
      correctIndex: 0,
      points: 120,
      icon: <Database className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      hobby: "Data Management"
    },
    {
      id: 4,
      title: "Cloud Architecture",
      question: "What's the benefit of serverless architecture?",
      hint: "Think about resource management",
      options: [
        "Automatic scaling with minimal server management",
        "You must buy physical servers",
        "It only works on Windows",
        "It prevents deployment"
      ],
      correctIndex: 0,
      points: 180,
      icon: <Cloud className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      hobby: "Cloud Computing"
    },
    {
      id: 5,
      title: "Coffee Break Challenge",
      question: "Which coffee choice fits a long coding session best?",
      hint: "Think sustained energy + focus",
      options: [
        "French press / slow brew for steady caffeine",
        "10 energy drinks at once",
        "No water, only sugar",
        "Skip coffee and skip sleep"
      ],
      correctIndex: 0,
      points: 200,
      icon: <Coffee className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      hobby: "Coffee Enthusiast"
    },
    {
      id: 6,
      title: "Cricket Strategy",
      question: "How is cricket strategy similar to software development?",
      hint: "Think planning + adapting",
      options: [
        "Both need strategy, teamwork, and adapting to conditions",
        "Both are only about speed",
        "Both avoid planning",
        "They are unrelated"
      ],
      correctIndex: 0,
      points: 250,
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "from-red-500 to-rose-500",
      hobby: "Cricket & Strategy"
    }
  ]

  const actions: GameAction[] = [
    {
      type: 'connect',
      title: "Connect on LinkedIn",
      description: "Open LinkedIn + email Karthik",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700"
    },
    {
      type: 'schedule',
      title: "Schedule Interview",
      description: "Book a 30-minute interview slot",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700"
    },
    {
      type: 'hire',
      title: "Hire Karthik Directly",
      description: "Send hiring inquiry directly",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700"
    },
    {
      type: 'refer',
      title: "Refer Karthik",
      description: "Refer to your network",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700"
    }
  ]

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ]

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setLevel(1)
    setCompletedLevels([])
    setCurrentChallenge(challenges[0])
    setLives(3)
    setSelectedOption(null)
    setFeedback('')
    setShowHint(false)
  }

  const checkAnswer = () => {
    if (!currentChallenge || selectedOption === null) return

    if (selectedOption === currentChallenge.correctIndex) {
      setScore(score + currentChallenge.points)
      setFeedback(`✅ Correct! +${currentChallenge.points} points - ${currentChallenge.hobby} skill unlocked!`)
      setCompletedLevels([...completedLevels, currentChallenge.id])
      
      setTimeout(() => {
        if (level < challenges.length) {
          setLevel(level + 1)
          setCurrentChallenge(challenges[level])
          setSelectedOption(null)
          setFeedback('')
          setShowHint(false)
        } else {
          setGameState('completed')
        }
      }, 1200)
    } else {
      setLives(lives - 1)
      setSelectedOption(null)
      if (lives <= 1) {
        setFeedback(`❌ Game Over! You scored ${score} points`)
        setTimeout(() => setGameState('menu'), 3000)
      } else {
        setFeedback(`❌ Oops! ${lives - 1} lives remaining — try again`) 
      }
    }
  }

  const skipToFinal = () => {
    setGameState('completed')
  }

  const handleAction = (action: GameAction) => {
    setSelectedAction(action)
    
    switch (action.type) {
      case 'connect':
        window.open('https://www.linkedin.com/in/ramadugukarthik/', '_blank')
        window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Connection Request&body=Hi Karthik, I'd like to connect with you!`
        break
      case 'schedule':
        setShowCalendar(true)
        break
      case 'hire':
        setGameState('actions')
        break
      case 'refer':
        window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Referral Opportunity&body=Hi Karthik, I'd like to refer you for an opportunity!`
        break
    }
  }

  const handleScheduleInterview = () => {
    if (selectedSlot && selectedDate) {
      const emailBody = `Hi Karthik,

I would like to schedule an interview with you.

Selected Date: ${selectedDate}
Selected Time Slot: ${selectedSlot}
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Looking forward to speaking with you!`

      window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Interview Request - ${selectedDate} ${selectedSlot}&body=${encodeURIComponent(emailBody)}`
      setFeedback('✅ Interview request sent! Check your email for confirmation.')
      setShowCalendar(false)
      setSelectedDate('')
      setSelectedSlot('')
    }
  }

  const handleHireDirectly = () => {
    const emailBody = `Hi Karthik,

I would like to hire you directly.

Company: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Looking forward to working with you!`

    window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Hiring Inquiry&body=${encodeURIComponent(emailBody)}`
    setFeedback('✅ Hiring inquiry sent! Karthik will reach out to you shortly.')
    setFormData({ name: '', email: '', linkedin: '', message: '' })
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
    setLevel(1)
    setCurrentChallenge(null)
    setSelectedOption(null)
    setFeedback('')
    setShowHint(false)
    setCompletedLevels([])
    setLives(3)
    setSelectedAction(null)
    setShowCalendar(false)
    setSelectedDate('')
    setSelectedSlot('')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 grid-background opacity-20 pointer-events-none" />
      
      <nav className="fixed top-0 w-full z-50 glass-strong px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-400" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-400" />
              <span>Level {level}/{challenges.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-400" />
              <span>{lives}</span>
            </div>
          </div>
        </div>
      </nav>

      {gameState === 'menu' && (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 mb-8"
            >
              <Gamepad2 className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk mb-6 gradient-text">
              Karthik's Tech Journey Game
            </h1>
            
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Test your knowledge and discover Karthik's versatile journey from ECE to Computer Science, 
              Python to MERN stack, and his hobbies including Cricket and Coffee!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="glass-strong p-4 rounded-lg">
                <Code className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold mb-1">6 Challenges</h3>
                <p className="text-sm text-gray-400">Test diverse tech knowledge</p>
              </div>
              <div className="glass-strong p-4 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold mb-1">1000 Points</h3>
                <p className="text-sm text-gray-400">Maximum score achievable</p>
              </div>
              <div className="glass-strong p-4 rounded-lg">
                <Coffee className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold mb-1">Hobby Based</h3>
                <p className="text-sm text-gray-400">Cricket & Coffee challenges</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl font-bold text-lg hover-lift"
            >
              Start Challenge
            </motion.button>

            <div className="mt-4">
              <button
                onClick={skipToFinal}
                className="text-sm text-gray-300 hover:text-white transition-colors underline underline-offset-4"
              >
                Skip to Final Options
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {gameState === 'playing' && currentChallenge && (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <div className="glass-strong p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentChallenge.color}`}>
                  {currentChallenge.icon}
                  <span className="font-semibold text-white">{currentChallenge.title}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {currentChallenge.points} points • {currentChallenge.hobby}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Challenge {level}</h2>
                <p className="text-lg text-gray-300 mb-6">{currentChallenge.question}</p>
                
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass-strong p-4 rounded-lg mb-4"
                  >
                    <p className="text-sm text-gray-400">
                      <span className="text-yellow-400">💡 Hint:</span> {currentChallenge.hint}
                    </p>
                  </motion.div>
                )}
                
                <div className="space-y-3">
                  {currentChallenge.options.map((opt, idx) => {
                    const isActive = selectedOption === idx
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${
                          isActive
                            ? 'bg-blue-600/20 border-blue-500'
                            : 'bg-gray-900/40 border-white/10 hover:border-blue-500/60'
                        }`}
                      >
                        <span className="text-gray-100">{opt}</span>
                      </button>
                    )
                  })}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={checkAnswer}
                      disabled={selectedOption === null}
                      className="flex-1 px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Lock Choice
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowHint(!showHint)}
                      className="px-6 py-3 glass-strong rounded-lg font-semibold hover-lift"
                    >
                      {showHint ? 'Hide Hint' : 'Hint'}
                    </motion.button>
                    <button
                      onClick={skipToFinal}
                      className="px-6 py-3 glass-strong rounded-lg font-semibold hover-lift"
                    >
                      Final Options
                    </button>
                  </div>
                </div>
                
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-lg ${
                      feedback.includes('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}
                  >
                    <p className="font-semibold">{feedback}</p>
                  </motion.div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {challenges.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        completedLevels.includes(index + 1)
                          ? 'bg-green-500'
                          : index + 1 === level
                          ? 'bg-red-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={resetGame}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Exit Game
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-8"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk mb-6 gradient-text">
              Congratulations! 🎉
            </h1>
            
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              You've completed Karthik's Tech Journey Challenge! 
              You've seen his versatility from ECE to CS, Python to MERN, and even his Cricket & Coffee hobbies!
            </p>
            
            <div className="glass-strong p-8 rounded-2xl mb-8 max-w-md mx-auto">
              <div className="text-4xl font-bold gradient-text mb-2">{score}</div>
              <div className="text-gray-400 mb-4">Final Score</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Challenges</div>
                  <div className="text-gray-400">{completedLevels.length}/{challenges.length}</div>
                </div>
                <div>
                  <div className="font-semibold">Accuracy</div>
                  <div className="text-gray-400">100%</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              {actions.map((action, index) => (
                <motion.button
                  key={action.type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(action)}
                  className="glass-strong p-6 rounded-xl text-center hover-lift group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </motion.button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="px-8 py-3 glass-strong rounded-lg font-semibold hover-lift"
              >
                Play Again
              </motion.button>
              <Link href="/#contact"
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-green-500 rounded-lg font-semibold hover-lift text-center text-white"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-strong rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">Schedule Interview</h3>
              <p className="text-gray-300 mb-6">Select a 30-minute time slot</p>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedSlot === slot
                        ? 'bg-blue-600 text-white'
                        : 'glass-strong hover:bg-gray-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <textarea
                  placeholder="Message (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="flex-1 px-4 py-2 glass-strong rounded-lg font-semibold hover-lift"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleInterview}
                  disabled={!selectedDate || !selectedSlot || !formData.email}
                  className="flex-1 px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'actions' && selectedAction?.type === 'hire' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setGameState('completed')}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-strong rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">Hire Karthik Directly</h3>
              <p className="text-gray-300 mb-6">Send your hiring inquiry directly to Karthik</p>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <textarea
                  placeholder="Job Details / Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white resize-none"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setGameState('completed')}
                  className="flex-1 px-4 py-2 glass-strong rounded-lg font-semibold hover-lift"
                >
                  Cancel
                </button>
                <button
                  onClick={handleHireDirectly}
                  disabled={!formData.name || !formData.email}
                  className="flex-1 px-4 py-2 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Inquiry
                </button>
              </div>
              
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-900 text-green-200"
                >
                  <p className="font-semibold">{feedback}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
