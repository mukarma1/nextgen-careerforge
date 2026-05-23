import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white/10 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/20">
      {/* Logo */}
      <div className="text-2xl font-bold text-white tracking-tighter">
        Career<span className="text-yellow-400">Forge</span>
      </div>

      {/* Menu Links */}
      <ul className="hidden md:flex space-x-8 text-white font-medium">
        <li className="hover:text-yellow-400 cursor-pointer transition">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Roadmap</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">DSA Tracker</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">AI Audit</li>
      </ul>

      {/* Action Button */}
      <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-white transition shadow-lg">
        Get Started
      </button>
    </nav>
  )
}

export default Navbar