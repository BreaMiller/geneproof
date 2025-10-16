import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight, Activity, Brain, Heart, Dna, Pill, Leaf, Apple, Zap, Smile, Droplets } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [biometricData, setBiometricData] = useState({ physical_score: 82, emotional_score: 21, intellectual_score: 55 })

  const screens = [
    { title: 'Heart Health', icon: Heart, path: '/screening/heart-health' },
    { title: 'Brain Scans', icon: Brain, path: '/screening/brain-scans' },
    { title: 'DNA Results', icon: Dna, path: '/dna-match' },
    { title: 'Diabetes Screening', icon: Activity, path: '/screening/diabetes' },
    { title: 'Microbiome Test', icon: Droplets, path: '/screening/microbiome' },
  ]

  const categories = [
    { name: 'Exercise', icon: Activity, color: 'from-blue-400 to-cyan-400' },
    { name: 'Stress Management', icon: Smile, color: 'from-teal-400 to-emerald-400' },
    { name: 'Food Protocol', icon: Apple, color: 'from-purple-400 to-pink-400', onClick: () => navigate('/food-protocol') },
    { name: 'Herbs', icon: Leaf, color: 'from-green-400 to-lime-400', onClick: () => navigate('/herbs') },
    { name: 'Supplements', icon: Zap, color: 'from-cyan-400 to-blue-400' },
    { name: 'Rx', icon: Pill, color: 'from-purple-400 to-indigo-400' },
  ]

  useEffect(() => {
    async function loadBiometrics() {
      if (!user) return
      const { data } = await supabase
        .from('biometric_readings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      
      if (data) {
        setBiometricData(data)
      }
    }
    loadBiometrics()
  }, [user])

  const currentScreenData = screens[currentScreen]
  const CurrentIcon = currentScreenData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
        
        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between px-6 py-8">
          <button
            onClick={() => setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length)}
            className="w-12 h-12 rounded-full bg-purple-600/30 backdrop-blur flex items-center justify-center hover:bg-purple-600/50 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{currentScreenData.title}</h1>
          <button
            onClick={() => setCurrentScreen((prev) => (prev + 1) % screens.length)}
            className="w-12 h-12 rounded-full bg-purple-600/30 backdrop-blur flex items-center justify-center hover:bg-purple-600/50 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Feature Icon */}
        <div className="relative z-10 flex justify-center mt-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
            <CurrentIcon className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Biometric Reading Card */}
      <div className="px-6 -mt-16 relative z-20">
        <div className="max-w-1xl mx-auto bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Today's Biometric Reading</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Physical</span>
                <span className="text-white font-semibold">{biometricData.physical_score}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${biometricData.physical_score}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Emotional</span>
                <span className="text-white font-semibold">{biometricData.emotional_score}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${biometricData.emotional_score}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Intellectual</span>
                <span className="text-white font-semibold">{biometricData.intellectual_score}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" style={{ width: `${biometricData.intellectual_score}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Categories */}
      <div className="px-6 mt-6">
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/20">
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={category.onClick || (() => toast.info(`${category.name} coming soon!`))}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-300 text-center">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
