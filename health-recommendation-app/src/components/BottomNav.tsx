import { useNavigate, useLocation } from 'react-router-dom'
import { User, Dna, Home, MessageSquare } from 'lucide-react'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Dna, label: 'DNA Match', path: '/dna-match' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
