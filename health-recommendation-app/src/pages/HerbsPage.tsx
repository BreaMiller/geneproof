import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, Herb } from '@/lib/supabase'
import { Search, Mic, SlidersHorizontal, ChevronLeft, Heart } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import { toast } from 'sonner'

export default function HerbsPage() {
  const navigate = useNavigate()
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHerbs() {
      const { data, error } = await supabase
        .from('herbs')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
      
      if (data) {
        setHerbs(data)
      } else if (error) {
        toast.error('Failed to load herbs')
      }
      setLoading(false)
    }
    loadHerbs()
  }, [])

  const groupedHerbs = herbs.reduce((acc, herb) => {
    const category = herb.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(herb)
    return acc
  }, {} as Record<string, Herb[]>)

  const featured = herbs[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-white">Herbs & Roots</h1>
            <p className="text-sm text-gray-400">Based on your biomarkers</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search herbs"
              className="w-full pl-12 pr-12 py-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <button className="w-12 h-12 bg-slate-800/50 backdrop-blur rounded-xl flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Featured Herb */}
        {featured && (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-500/20 mb-6">
            <div className="flex justify-end mb-3">
              <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                <Heart className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 overflow-hidden">
              {featured.image_url ? (
                <img src={featured.image_url} alt={featured.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-4xl">🌵</div>
              )}
            </div>
            <h2 className="text-xl font-bold text-white text-center mb-3">{featured.name}</h2>
            {featured.benefits && Array.isArray(featured.benefits) && (
              <div className="space-y-2 mb-3">
                {featured.benefits.slice(0, 2).map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-blue-400">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-gray-400 text-sm text-center mb-4">{featured.description}</p>
            <button className="w-full py-2 text-gray-300 hover:text-white transition-colors">View recipe</button>
          </div>
        )}

        {/* Herb Categories */}
        {Object.entries(groupedHerbs).map(([category, categoryHerbs]) => (
          <div key={category} className="mb-6">
            <h3 className="text-white font-bold text-lg mb-4">{category}</h3>
            <div className="grid grid-cols-2 gap-4">
              {categoryHerbs.map((herb) => (
                <div
                  key={herb.id}
                  className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-purple-500/20 hover:border-purple-400/40 transition-all"
                >
                  <div className="flex justify-end mb-2">
                    <button className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 overflow-hidden">
                    {herb.image_url ? (
                      <img src={herb.image_url} alt={herb.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl">🌵</div>
                    )}
                  </div>
                  <h4 className="text-white font-semibold text-sm text-center mb-2">{herb.name}</h4>
                  {herb.benefits && Array.isArray(herb.benefits) && herb.benefits[0] && (
                    <div className="flex items-center gap-1 justify-center mb-2">
                      <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-teal-400">{herb.benefits[0]}</span>
                    </div>
                  )}
                  <button className="w-full text-xs text-gray-400 hover:text-white transition-colors">View recipe</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
