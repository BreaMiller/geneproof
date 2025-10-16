import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Profile } from '@/lib/supabase'
import { Mail, Settings, Check, ChevronRight } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (data) {
        setProfile(data)
      } else if (!error) {
        // Create profile if doesn't exist
        const newProfile = {
          user_id: user.id,
          email: user.email,
          full_name: user.email?.split('@')[0] || 'User',
          profile_complete_percentage: 23,
          wellness_score: 0,
          blood_type: 'AB+',
        }
        const { data: created } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single()
        
        if (created) setProfile(created)
      }
      setLoading(false)
    }
    loadProfile()
  }, [user])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Sign out failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 pb-24">
      {/* Header */}
      <div className="relative px-6 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{profile?.full_name || 'User'}</h1>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center hover:bg-slate-700/50 transition-all">
              <Mail className="w-5 h-5 text-gray-300" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur flex items-center justify-center hover:bg-slate-700/50 transition-all">
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/20">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-white font-semibold">{profile?.blood_type || '--'}</span>
              </div>
              <span className="text-xs text-gray-400">Blood Type</span>
            </div>
            <div className="text-center border-x border-slate-700">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-white font-semibold">{profile?.mutation_data || '--'}</span>
              </div>
              <span className="text-xs text-gray-400">Mutation</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-white font-semibold">{profile?.wellness_score || '--'}</span>
              </div>
              <span className="text-xs text-gray-400">Wellness Score</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">Complete profile setup to unlock more features</p>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-6 space-y-4">
        {/* Profile Complete */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Profile Complete</h3>
            <span className="text-purple-400 font-semibold">{profile?.profile_complete_percentage || 0}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${profile?.profile_complete_percentage || 0}%` }}
            />
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Medical History</h3>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">Update</button>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Healthy Habits Questionnaire */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Healthy Habits Questionnaire</h3>
                <p className="text-sm text-gray-400">50% Complete</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Behavior Assessment */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Behavior Assessment</h3>
                <p className="text-sm text-gray-400">Not started</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-4 rounded-xl transition-all border border-red-500/20"
        >
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
