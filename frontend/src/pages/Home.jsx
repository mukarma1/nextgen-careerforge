import React from 'react'
import Navbar from '../components/Navbar' // Navbar ko import kiya

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-yellow-400 selection:text-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        {/* Decorative Background Blob */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30 -z-10"></div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Big Tech</span> Journey
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed">
          The ultimate job-prep cockpit. Scan your resume with AI, track your DSA progress, and secure your academic vault—all in one place.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
            Audit My Resume
          </button>
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold text-lg transition-all">
            Track DSA Progress
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home