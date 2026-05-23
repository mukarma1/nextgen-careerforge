import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResumeAudit from './pages/ResumeAudit'
import DSATracker from './pages/DSATracker' // Naya page import kiya

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<ResumeAudit />} />
        <Route path="/dsa" element={<DSATracker />} />
      </Routes>
    </Router>
  )
}

export default App