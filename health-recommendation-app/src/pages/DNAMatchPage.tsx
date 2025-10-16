import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Search, Mic, SlidersHorizontal, MessageCircle, UserPlus, Users, Inbox } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import { toast } from 'sonner'

interface DNAMatchData {
  id: string
  name: string
  match_percentage: number
  profile_image?: string
}

export default function DNAMatchPage() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<DNAMatchData[]>([
    { id: '1', name: 'Jimmy', match_percentage: 46 },
    { id: '2', name: 'Olivia', match_percentage: 12 },
    { id: '3', name: 'Bronx', match_percentage: 7 },
    { id: '4', name: 'Cynthia', match_percentage: 52 },
  ])
  const [searchQuery, setSearchQuery] = useState('')

  const handleMessage = (matchName: string) => {
    toast.info(`Messaging ${matchName} coming soon!`)
  }

  const handleAddFriend = (matchName: string) => {
    toast.success(`Friend request sent to ${matchName}!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">DNA Match</h1>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center relative">
              <Inbox className="w-5 h-5 text-gray-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Discover someone new"
                className="w-full pl-12 pr-12 py-4 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <button className="w-14 h-14 bg-slate-800/50 backdrop-blur rounded-2xl flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">{matches.length} Matches within 500 mi</p>

        {/* Match List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-purple-500/20 hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                    {match.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{match.name}</h3>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        style={{ width: `${match.match_percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-purple-400 font-bold">{match.match_percentage}%</span>
                  <button
                    onClick={() => handleMessage(match.name)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                  </button>
                  <button
                    onClick={() => handleAddFriend(match.name)}
                    className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                  >
                    <UserPlus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
