import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'sonner'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'

// Get the base URL for GitHub Pages in production
const baseUrl = import.meta.env.BASE_URL
import DNAMatchPage from './pages/DNAMatchPage'
import FoodProtocolPage from './pages/FoodProtocolPage'
import HerbsPage from './pages/HerbsPage'
import HealthScreeningPage from './pages/HealthScreeningPage'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router basename={baseUrl}>
          <Routes>
            <Route path="auth" element={<AuthPage />} />
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dna-match"
              element={
                <ProtectedRoute>
                  <DNAMatchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/food-protocol"
              element={
                <ProtectedRoute>
                  <FoodProtocolPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/herbs"
              element={
                <ProtectedRoute>
                  <HerbsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/screening/:type"
              element={
                <ProtectedRoute>
                  <HealthScreeningPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
