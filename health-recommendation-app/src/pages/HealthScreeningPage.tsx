import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import BottomNav from '@/components/BottomNav'

export default function HealthScreeningPage() {
  const { type } = useParams()
  const navigate = useNavigate()

  const screeningInfo = {
    'heart-health': {
      title: 'Heart Health',
      description: 'Monitor your cardiovascular wellness and track key heart health metrics.',
      icon: '❤️',
    },
    'brain-scans': {
      title: 'Brain Scans',
      description: 'Analyze cognitive function and brain health indicators.',
      icon: '🧠',
    },
    'diabetes': {
      title: 'Diabetes Screening',
      description: 'Track blood sugar levels and diabetes risk factors.',
      icon: '💉',
    },
    'microbiome': {
      title: 'Microbiome Test',
      description: 'Understand your gut health and microbiome composition.',
      icon: '🧬',
    },
  }

  const info = screeningInfo[type as keyof typeof screeningInfo] || screeningInfo['heart-health']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1 text-center">{info.title}</h1>
          <div className="w-10" />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl shadow-2xl">
            {info.icon}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-500/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">About This Screening</h2>
          <p className="text-gray-300 leading-relaxed">{info.description}</p>
        </div>

        {/* Placeholder for test results */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Recent Results</h2>
          <div className="text-center py-12">
            <p className="text-gray-400">No test results available yet.</p>
            <button className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
              Schedule Test
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
