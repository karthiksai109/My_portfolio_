'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Code, Zap, Trophy, Star, Target, Cpu, Database, Cloud, Coffee, Gamepad2, Heart, Calendar, Mail, Users, Briefcase } from 'lucide-react'
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
      color: "from-[#1d4ed8] to-[#0e7490]",
      hobby: "Adaptability"
    },
    {
      id: 2,
      title: "Python to MERN",
      question: "What&apos;s the advantage of using MERN stack over Python Django?",
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
      color: "from-[#15803d] to-[#0e7490]",
      hobby: "Problem Solving"
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
      color: "from-[#6d28d9] to-[#1d4ed8]",
      hobby: "Innovation"
    },
    {
      id: 4,
      title: "Cloud Architecture",
      question: "What&apos;s the benefit of serverless architecture?",
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
      color: "from-[#0e7490] to-[#1d4ed8]",
      hobby: "Hard Work"
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
      color: "from-[#a16207] to-[#c2410c]",
      hobby: "Dedication"
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
      color: "from-[#c2410c] to-[#a16207]",
      hobby: "Strategic Thinking"
    }
  ]

  const actions: GameAction[] = [
    {
      type: 'connect',
      title: "Connect on LinkedIn",
      description: "Open LinkedIn + email Karthik",
      icon: <Users className="w-6 h-6" />,
      color: "from-[#1d4ed8] to-[#0e7490]"
    },
    {
      type: 'schedule',
      title: "Schedule Interview",
      description: "Book a 30-minute interview slot",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-[#6d28d9] to-[#1d4ed8]"
    },
    {
      type: 'hire',
      title: "Hire Karthik Directly",
      description: "Send hiring inquiry directly",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-[#15803d] to-[#0e7490]"
    },
    {
      type: 'refer',
      title: "Refer Karthik",
      description: "Refer to your network",
      icon: <Target className="w-6 h-6" />,
      color: "from-[#c2410c] to-[#a16207]"
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
      setFeedback(`Correct! +${currentChallenge.points} points — ${currentChallenge.hobby} unlocked!`)
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
        setFeedback(`Game Over! You scored ${score} points`)
        setTimeout(() => setGameState('menu'), 3000)
      } else {
        setFeedback(`Wrong! ${lives - 1} lives remaining — try again`) 
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
      const emailBody = `Hi Karthik,\n\nI would like to schedule an interview.\n\nDate: ${selectedDate}\nTime: ${selectedSlot}\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\n\nLooking forward to speaking with you!`
      window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Interview Request - ${selectedDate} ${selectedSlot}&body=${encodeURIComponent(emailBody)}`
      setFeedback('Interview request sent! Check your email.')
      setShowCalendar(false)
      setSelectedDate('')
      setSelectedSlot('')
    }
  }

  const handleHireDirectly = () => {
    const emailBody = `Hi Karthik,\n\nI would like to hire you directly.\n\nCompany: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\n\nLooking forward to working with you!`
    window.location.href = `mailto:karthiksaidham2001@gmail.com?subject=Hiring Inquiry&body=${encodeURIComponent(emailBody)}`
    setFeedback('Hiring inquiry sent! Karthik will reach out shortly.')
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
    <div className="min-h-screen game-bg text-white">
      <div className="fixed inset-0 game-grid-bg pointer-events-none" />
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 game-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-jetbrains text-sm">
            <ArrowLeft className="w-4 h-4" />
            Portfolio
          </Link>
          <div className="flex items-center gap-5 font-jetbrains text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#a16207]" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Star className="w-4 h-4" />
              <span>{level}/{challenges.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#c2410c]" />
              <span>{lives}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU */}
      {gameState === 'menu' && (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-3xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#0e7490] mb-8"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-jetbrains mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Tech Journey Challenge
            </h1>
            
            <p className="text-base mb-10 text-white/50 max-w-xl mx-auto font-jetbrains leading-relaxed">
              Discover Karthik&apos;s adaptability, problem-solving skills, and innovative thinking 
              through 6 challenges spanning ECE to CS, Python to MERN, and beyond.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
              <div className="game-card p-5 rounded-xl">
                <Code className="w-7 h-7 mx-auto mb-3 text-[#2563eb]" />
                <h3 className="font-semibold text-sm mb-1 font-jetbrains">6 Challenges</h3>
                <p className="text-xs text-white/40">Test diverse tech knowledge</p>
              </div>
              <div className="game-card p-5 rounded-xl">
                <Zap className="w-7 h-7 mx-auto mb-3 text-[#a16207]" />
                <h3 className="font-semibold text-sm mb-1 font-jetbrains">1000 Points</h3>
                <p className="text-xs text-white/40">Maximum score achievable</p>
              </div>
              <div className="game-card p-5 rounded-xl">
                <Coffee className="w-7 h-7 mx-auto mb-3 text-[#c2410c]" />
                <h3 className="font-semibold text-sm mb-1 font-jetbrains">Personality Based</h3>
                <p className="text-xs text-white/40">Cricket & Coffee challenges</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={startGame}
              className="game-btn game-btn-primary text-base px-10 py-4"
            >
              Start Challenge
            </motion.button>

            <div className="mt-5">
              <button
                onClick={skipToFinal}
                className="text-xs text-white/30 hover:text-white/60 transition-colors font-jetbrains"
              >
                Skip to Final Options
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && currentChallenge && (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <div className="game-card p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentChallenge.color} text-sm`}>
                  {currentChallenge.icon}
                  <span className="font-semibold font-jetbrains">{currentChallenge.title}</span>
                </div>
                <div className="text-xs text-white/40 font-jetbrains">
                  {currentChallenge.points} pts &middot; {currentChallenge.hobby}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 font-jetbrains">Challenge {level}</h2>
                <p className="text-base text-white/70 mb-6 leading-relaxed">{currentChallenge.question}</p>
                
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="game-card p-4 rounded-xl mb-4"
                  >
                    <p className="text-sm text-white/50">
                      <span className="text-[#a16207] font-semibold">Hint:</span> {currentChallenge.hint}
                    </p>
                  </motion.div>
                )}
                
                <div className="space-y-3">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedOption(idx)}
                      className={`game-option ${selectedOption === idx ? 'game-option-active' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={checkAnswer}
                      disabled={selectedOption === null}
                      className="game-btn game-btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Lock Choice
                    </motion.button>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="game-btn game-btn-ghost justify-center"
                    >
                      {showHint ? 'Hide Hint' : 'Hint'}
                    </button>
                    <button
                      onClick={skipToFinal}
                      className="game-btn game-btn-ghost justify-center"
                    >
                      Skip
                    </button>
                  </div>
                </div>
                
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 p-4 rounded-xl text-sm font-jetbrains ${
                      feedback.includes('Correct') 
                        ? 'bg-[#15803d]/20 text-[#4ade80] border border-[#15803d]/30' 
                        : 'bg-[#c2410c]/20 text-[#fb923c] border border-[#c2410c]/30'
                    }`}
                  >
                    {feedback}
                  </motion.div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {challenges.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        completedLevels.includes(index + 1)
                          ? 'bg-[#15803d]'
                          : index + 1 === level
                          ? 'bg-[#2563eb]'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={resetGame}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors font-jetbrains"
                >
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* COMPLETED */}
      {gameState === 'completed' && (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-[#a16207] to-[#c2410c] mb-8"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-jetbrains mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Challenge Complete
            </h1>
            
            <p className="text-base mb-8 text-white/50 max-w-xl mx-auto font-jetbrains leading-relaxed">
              You&apos;ve experienced Karthik&apos;s versatility — from ECE to CS, 
              Python to MERN, and his problem-solving mindset. Ready to connect?
            </p>
            
            <div className="game-card p-8 rounded-2xl mb-10 max-w-sm mx-auto">
              <div className="text-4xl font-bold font-jetbrains bg-gradient-to-r from-[#a16207] to-[#c2410c] bg-clip-text text-transparent mb-2">{score}</div>
              <div className="text-white/40 text-sm font-jetbrains mb-4">Final Score</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold font-jetbrains">Challenges</div>
                  <div className="text-white/40">{completedLevels.length}/{challenges.length}</div>
                </div>
                <div>
                  <div className="font-semibold font-jetbrains">Accuracy</div>
                  <div className="text-white/40">{completedLevels.length > 0 ? '100%' : 'N/A'}</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
              {actions.map((action, index) => (
                <motion.button
                  key={action.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction(action)}
                  className="game-card p-6 rounded-xl text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 font-jetbrains">{action.title}</h3>
                  <p className="text-xs text-white/40">{action.description}</p>
                </motion.button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={resetGame}
                className="game-btn game-btn-ghost"
              >
                Play Again
              </motion.button>
              <Link href="/#contact" className="game-btn game-btn-primary text-center">
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* Schedule Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="game-card rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2 font-jetbrains">Schedule Interview</h3>
              <p className="text-white/40 text-sm mb-6 font-jetbrains">Select a 30-minute time slot</p>

              <div className="mb-4">
                <label className="block text-xs text-white/50 mb-2 font-jetbrains">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-lg text-xs font-jetbrains transition-all ${
                      selectedSlot === slot
                        ? 'bg-[#1d4ed8] text-white'
                        : 'bg-white/5 border border-white/8 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains transition-colors" />
                <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains transition-colors" />
                <textarea placeholder="Message (optional)" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains resize-none transition-colors" />
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowCalendar(false)} className="game-btn game-btn-ghost flex-1 justify-center text-sm">Cancel</button>
                <button onClick={handleScheduleInterview} disabled={!selectedDate || !selectedSlot || !formData.email}
                  className="game-btn game-btn-primary flex-1 justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed">Schedule</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="game-card rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2 font-jetbrains">Hire Karthik</h3>
              <p className="text-white/40 text-sm mb-6 font-jetbrains">Send your hiring inquiry directly</p>
              
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Company Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains transition-colors" />
                <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains transition-colors" />
                <textarea placeholder="Job Details / Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#2563eb] text-white text-sm font-jetbrains resize-none transition-colors" />
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setGameState('completed')} className="game-btn game-btn-ghost flex-1 justify-center text-sm">Cancel</button>
                <button onClick={handleHireDirectly} disabled={!formData.name || !formData.email}
                  className="flex-1 game-btn text-sm justify-center bg-gradient-to-r from-[#c2410c] to-[#ea580c] text-white disabled:opacity-40 disabled:cursor-not-allowed">Send Inquiry</button>
              </div>
              
              {feedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-xl text-sm font-jetbrains bg-[#15803d]/20 text-[#4ade80] border border-[#15803d]/30">
                  {feedback}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
