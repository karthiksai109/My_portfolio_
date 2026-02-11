'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, Trophy, Star, Target, Coffee, Gamepad2, Heart, Calendar, Users, Briefcase, Shuffle } from 'lucide-react'
import Link from 'next/link'

interface Challenge {
  id: number
  question: string
  options: string[]
  correctIndex: number
  points: number
  emoji: string
  tag: string
}

interface GameAction {
  type: 'connect' | 'schedule' | 'hire' | 'refer'
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const QUESTION_POOL: Omit<Challenge, 'id'>[] = [
  { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Mode Link"], correctIndex: 0, points: 50, emoji: "🌐", tag: "Web Basics" },
  { question: "Which language runs in the browser?", options: ["JavaScript", "Python", "Java", "C++"], correctIndex: 0, points: 50, emoji: "⚡", tag: "Quick Fire" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Styling Syntax", "Code Style Sheets"], correctIndex: 0, points: 50, emoji: "🎨", tag: "Styling" },
  { question: "React is made by?", options: ["Facebook / Meta", "Google", "Amazon", "Microsoft"], correctIndex: 0, points: 75, emoji: "⚛️", tag: "React" },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Input", "App Protocol Index"], correctIndex: 0, points: 50, emoji: "🔌", tag: "Backend" },
  { question: "Which is a NoSQL database?", options: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"], correctIndex: 0, points: 75, emoji: "🗄️", tag: "Database" },
  { question: "Git is used for?", options: ["Version control", "Graphic design", "Email hosting", "Video editing"], correctIndex: 0, points: 50, emoji: "🔀", tag: "Tools" },
  { question: "Next.js is built on top of?", options: ["React", "Angular", "Vue", "Svelte"], correctIndex: 0, points: 75, emoji: "🚀", tag: "Frameworks" },
  { question: "What does npm stand for?", options: ["Node Package Manager", "New Program Module", "Network Protocol Manager", "Node Process Monitor"], correctIndex: 0, points: 50, emoji: "📦", tag: "Tools" },
  { question: "TypeScript adds what to JavaScript?", options: ["Static types", "Faster runtime", "Better graphics", "Database support"], correctIndex: 0, points: 75, emoji: "🔷", tag: "TypeScript" },
  { question: "Which HTTP method fetches data?", options: ["GET", "POST", "DELETE", "PATCH"], correctIndex: 0, points: 50, emoji: "📡", tag: "HTTP" },
  { question: "JSON stands for?", options: ["JavaScript Object Notation", "Java System Output Network", "Joint Standard Object Name", "JavaScript Online Node"], correctIndex: 0, points: 50, emoji: "📋", tag: "Data" },
  { question: "Best coffee for a coding marathon?", options: ["Cold brew ☕", "10 espresso shots 💀", "Just water 💧", "No sleep needed 😴"], correctIndex: 0, points: 100, emoji: "☕", tag: "Fun" },
  { question: "Python is named after?", options: ["Monty Python (comedy show)", "A snake species", "A Greek god", "A math formula"], correctIndex: 0, points: 75, emoji: "🐍", tag: "Fun Fact" },
  { question: "What does the 'M' in MERN stand for?", options: ["MongoDB", "MySQL", "Machine Learning", "Middleware"], correctIndex: 0, points: 75, emoji: "🍃", tag: "MERN" },
  { question: "Which is NOT a JS framework?", options: ["Django", "React", "Angular", "Vue"], correctIndex: 0, points: 100, emoji: "🧩", tag: "Tricky" },
  { question: "What is Docker used for?", options: ["Containerization", "Photo editing", "Email sending", "Game development"], correctIndex: 0, points: 75, emoji: "🐳", tag: "DevOps" },
  { question: "AWS stands for?", options: ["Amazon Web Services", "Advanced Web System", "Automated Work Server", "App Web Stack"], correctIndex: 0, points: 50, emoji: "☁️", tag: "Cloud" },
  { question: "Best debugging tool?", options: ["console.log() 😂", "Pray and refresh", "Delete everything", "Blame the intern"], correctIndex: 0, points: 100, emoji: "🐛", tag: "Fun" },
  { question: "What is Tailwind CSS?", options: ["Utility-first CSS framework", "A JavaScript library", "A database tool", "A testing framework"], correctIndex: 0, points: 75, emoji: "💨", tag: "CSS" },
  { question: "REST API uses which protocol?", options: ["HTTP", "FTP", "SMTP", "SSH"], correctIndex: 0, points: 75, emoji: "🌍", tag: "API" },
  { question: "Karthik switched from ECE to CS. That shows?", options: ["Adaptability 💪", "Confusion", "Luck", "Nothing special"], correctIndex: 0, points: 100, emoji: "🔄", tag: "About Me" },
  { question: "What makes a great developer?", options: ["Curiosity + persistence", "Memorizing syntax", "Never asking for help", "Only working alone"], correctIndex: 0, points: 100, emoji: "⭐", tag: "Wisdom" },
  { question: "Framer Motion is used for?", options: ["React animations", "Database queries", "Server hosting", "File compression"], correctIndex: 0, points: 75, emoji: "✨", tag: "Animation" },
  { question: "How many bits in a byte?", options: ["8", "4", "16", "32"], correctIndex: 0, points: 50, emoji: "💾", tag: "CS Basics" },
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function shuffleOptions(q: Omit<Challenge, 'id'>): Omit<Challenge, 'id'> {
  const correctAnswer = q.options[q.correctIndex]
  const shuffledOpts = shuffleArray(q.options)
  return { ...q, options: shuffledOpts, correctIndex: shuffledOpts.indexOf(correctAnswer) }
}

export default function Game() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed' | 'actions'>('menu')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameChallenges, setGameChallenges] = useState<Challenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', message: '' })
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')

  const ROUNDS = 6

  const generateChallenges = useCallback((): Challenge[] => {
    const picked = shuffleArray(QUESTION_POOL).slice(0, ROUNDS)
    return picked.map((q, i) => ({ ...shuffleOptions(q), id: i + 1 }))
  }, [])

  const actions: GameAction[] = [
    {
      type: 'connect',
      title: "Connect on LinkedIn",
      description: "Open LinkedIn + email Karthik",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#1d4ed8] to-[#0e7490]"
    },
    {
      type: 'schedule',
      title: "Schedule Interview",
      description: "Book a 30-min slot",
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#6d28d9] to-[#1d4ed8]"
    },
    {
      type: 'hire',
      title: "Hire Karthik",
      description: "Send hiring inquiry",
      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#15803d] to-[#0e7490]"
    },
    {
      type: 'refer',
      title: "Refer Karthik",
      description: "Refer to your network",
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-[#c2410c] to-[#a16207]"
    }
  ]

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ]

  const startGame = () => {
    const newChallenges = generateChallenges()
    setGameChallenges(newChallenges)
    setGameState('playing')
    setScore(0)
    setLevel(1)
    setCompletedLevels([])
    setCurrentChallenge(newChallenges[0])
    setLives(3)
    setStreak(0)
    setSelectedOption(null)
    setFeedback('')
  }

  const checkAnswer = () => {
    if (!currentChallenge || selectedOption === null) return

    if (selectedOption === currentChallenge.correctIndex) {
      const bonus = streak >= 2 ? 25 : 0
      const earned = currentChallenge.points + bonus
      setScore(prev => prev + earned)
      setStreak(prev => prev + 1)
      const streakMsg = streak >= 2 ? ` 🔥 ${streak + 1}x streak bonus!` : ''
      setFeedback(`✅ +${earned} pts!${streakMsg}`)
      setCompletedLevels(prev => [...prev, currentChallenge.id])
      
      setTimeout(() => {
        if (level < gameChallenges.length) {
          setLevel(prev => prev + 1)
          setCurrentChallenge(gameChallenges[level])
          setSelectedOption(null)
          setFeedback('')
        } else {
          setGameState('completed')
        }
      }, 1000)
    } else {
      setLives(prev => prev - 1)
      setStreak(0)
      setSelectedOption(null)
      if (lives <= 1) {
        setFeedback(`💀 Game Over! Score: ${score}`)
        setTimeout(() => setGameState('menu'), 2500)
      } else {
        setFeedback(`❌ Nope! ${lives - 1} ${lives - 1 === 1 ? 'life' : 'lives'} left`) 
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
    setGameChallenges([])
    setSelectedOption(null)
    setFeedback('')
    setCompletedLevels([])
    setLives(3)
    setStreak(0)
    setSelectedAction(null)
    setShowCalendar(false)
    setSelectedDate('')
    setSelectedSlot('')
  }

  return (
    <div className="min-h-screen game-bg text-white">
      <div className="fixed inset-0 game-grid-bg pointer-events-none" />
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 game-nav px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors font-jetbrains text-xs sm:text-sm">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3 sm:gap-5 font-jetbrains text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a16207]" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{level}/{ROUNDS}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c2410c]" />
              <span>{lives}</span>
            </div>
            {streak >= 2 && (
              <div className="flex items-center gap-1 text-[#a16207]">
                <span>🔥{streak}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MENU */}
      {gameState === 'menu' && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg sm:max-w-3xl w-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#0e7490] mb-6 sm:mb-8"
            >
              <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-jetbrains mb-3 sm:mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Quick Tech Quiz
            </h1>
            
            <p className="text-sm sm:text-base mb-8 sm:mb-10 text-white/50 max-w-md sm:max-w-xl mx-auto font-jetbrains leading-relaxed px-2">
              6 random questions from a pool of 25+. Different every time you play!
              Fun, fast, and full of surprises.
            </p>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-sm sm:max-w-2xl mx-auto">
              <div className="game-card p-3 sm:p-5 rounded-xl">
                <Shuffle className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 sm:mb-3 text-[#2563eb]" />
                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 font-jetbrains">Random</h3>
                <p className="text-[10px] sm:text-xs text-white/40">New questions each game</p>
              </div>
              <div className="game-card p-3 sm:p-5 rounded-xl">
                <Zap className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 sm:mb-3 text-[#a16207]" />
                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 font-jetbrains">Streaks</h3>
                <p className="text-[10px] sm:text-xs text-white/40">Bonus for combos</p>
              </div>
              <div className="game-card p-3 sm:p-5 rounded-xl">
                <Coffee className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 sm:mb-3 text-[#c2410c]" />
                <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 font-jetbrains">Fun</h3>
                <p className="text-[10px] sm:text-xs text-white/40">Easy & entertaining</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={startGame}
              className="game-btn game-btn-primary text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4"
            >
              🎮 Start Quiz
            </motion.button>

            <div className="mt-4 sm:mt-5">
              <button
                onClick={skipToFinal}
                className="text-[10px] sm:text-xs text-white/30 hover:text-white/60 transition-colors font-jetbrains"
              >
                Skip to Contact Options →
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && currentChallenge && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 pb-6 relative z-10">
          <motion.div
            key={currentChallenge.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-lg sm:max-w-2xl w-full"
          >
            <div className="game-card p-5 sm:p-8 rounded-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm">
                  <span>{currentChallenge.emoji}</span>
                  <span className="font-semibold font-jetbrains">{currentChallenge.tag}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-white/40 font-jetbrains">
                  +{currentChallenge.points} pts
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 font-jetbrains text-white/40">Q{level} of {ROUNDS}</h2>
                <p className="text-lg sm:text-xl font-semibold leading-snug">{currentChallenge.question}</p>
              </div>
              
              {/* Options */}
              <div className="space-y-2.5 sm:space-y-3">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`game-option text-sm sm:text-base ${selectedOption === idx ? 'game-option-active' : ''}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 text-xs sm:text-sm font-bold font-jetbrains mr-3 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-left">{opt}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className="game-btn game-btn-primary flex-1 justify-center text-sm sm:text-base py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Lock It In
                </motion.button>
                <button
                  onClick={skipToFinal}
                  className="game-btn game-btn-ghost justify-center text-sm sm:text-base px-4"
                >
                  Skip
                </button>
              </div>
              
              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 sm:mt-5 p-3 sm:p-4 rounded-xl text-sm font-jetbrains ${
                      feedback.includes('✅') 
                        ? 'bg-[#15803d]/20 text-[#4ade80] border border-[#15803d]/30' 
                        : 'bg-[#c2410c]/20 text-[#fb923c] border border-[#c2410c]/30'
                    }`}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Progress dots */}
              <div className="flex justify-between items-center mt-5 sm:mt-6">
                <div className="flex gap-1.5 sm:gap-2">
                  {gameChallenges.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
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
                  className="text-[10px] sm:text-xs text-white/30 hover:text-white/60 transition-colors font-jetbrains"
                >
                  Quit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* COMPLETED */}
      {gameState === 'completed' && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 pb-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg sm:max-w-4xl w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-[#a16207] to-[#c2410c] mb-6 sm:mb-8"
            >
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-jetbrains mb-3 sm:mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {score >= 400 ? '🎉 Amazing!' : score >= 200 ? '👏 Well Done!' : '🏁 Finished!'}
            </h1>
            
            <p className="text-sm sm:text-base mb-6 sm:mb-8 text-white/50 max-w-md sm:max-w-xl mx-auto font-jetbrains leading-relaxed px-2">
              You scored <span className="text-white font-bold">{score}</span> points! 
              Karthik builds real-world apps with the same tech you just quizzed on. Ready to connect?
            </p>
            
            <div className="game-card p-5 sm:p-8 rounded-2xl mb-8 sm:mb-10 max-w-xs sm:max-w-sm mx-auto">
              <div className="text-3xl sm:text-4xl font-bold font-jetbrains bg-gradient-to-r from-[#a16207] to-[#c2410c] bg-clip-text text-transparent mb-2">{score}</div>
              <div className="text-white/40 text-xs sm:text-sm font-jetbrains mb-3 sm:mb-4">Final Score</div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="font-semibold font-jetbrains">Correct</div>
                  <div className="text-white/40">{completedLevels.length}/{ROUNDS}</div>
                </div>
                <div>
                  <div className="font-semibold font-jetbrains">Accuracy</div>
                  <div className="text-white/40">{ROUNDS > 0 ? Math.round((completedLevels.length / ROUNDS) * 100) : 0}%</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-lg sm:max-w-4xl mx-auto">
              {actions.map((action, index) => (
                <motion.button
                  key={action.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction(action)}
                  className="game-card p-4 sm:p-6 rounded-xl text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${action.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 font-jetbrains">{action.title}</h3>
                  <p className="text-[10px] sm:text-xs text-white/40 hidden sm:block">{action.description}</p>
                </motion.button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startGame}
                className="game-btn game-btn-ghost text-sm sm:text-base"
              >
                🔄 Play Again (New Questions)
              </motion.button>
              <Link href="/#contact" className="game-btn game-btn-primary text-center text-sm sm:text-base">
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
            className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="game-card rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-jetbrains">Schedule Interview</h3>
              <p className="text-white/40 text-xs sm:text-sm mb-4 sm:mb-6 font-jetbrains">Select a 30-minute time slot</p>

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
            className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setGameState('completed')}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="game-card rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-jetbrains">Hire Karthik</h3>
              <p className="text-white/40 text-xs sm:text-sm mb-4 sm:mb-6 font-jetbrains">Send your hiring inquiry directly</p>
              
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
