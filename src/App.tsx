import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import { Navbar } from './components/Navbar'
import { Toasts } from './components/Toasts'
import { Dashboard } from './pages/Dashboard'
import { MapPage } from './pages/MapPage'
import { Predictions } from './pages/Predictions'
import { Inundation } from './pages/Inundation'
import { Simulator } from './pages/Simulator'
import { RoutePage } from './pages/RoutePage'
import { Alerts } from './pages/Alerts'
import { Infrastructure } from './pages/Infrastructure'
import { Evacuation } from './pages/Evacuation'
import { Analytics } from './pages/Analytics'
import { Command } from './pages/Command'
import { About } from './pages/About'
import { MobileNav } from './components/MobileNav'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/inundation" element={<Inundation />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/evacuation" element={<Evacuation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/command" element={<Command />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  )
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-navy-950">
          <Navbar />
          <Toasts />
          <main className="pb-20 lg:pb-0">
            <AnimatedRoutes />
          </main>
          <MobileNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
