import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-yellow-400 selection:text-slate-900">
      {/* Navbar sabse upar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
        {/* Background Decorative Blur */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30 -z-10"></div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
          Master Your Big Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"></span> Journey
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed">
          The ultimate job-prep cockpit. Scan your resume with AI, track your DSA progress, and secure your academic vault—all in one place.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
         <Link to="/audit">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
            Audit My Resume
          </button>
          </Link>
          <Link to="/dsa">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
            Track DSA Progress
          </button>
          </Link>
        </div>
      </section>

      {/* Features Cards Section */}
      <Features />

      {/* Simple Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-slate-800 mt-20">
        © 2026 NexGen CareerForge. Built with Courage by a Pakistani Developer.
      </footer>
    </div>
  )
}

export default Home