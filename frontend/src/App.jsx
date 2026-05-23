import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResumeAudit from './pages/ResumeAudit' // Hum ye page abhi banayein ge

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<ResumeAudit />} />
      </Routes>
    </Router>
  )
}

export default App