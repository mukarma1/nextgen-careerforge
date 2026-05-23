import React from 'react'
import Navbar from '../components/Navbar'

function DSATracker() {
  const topics = [
    { name: "Step 1: Basics", status: "80%", color: "bg-green-500" },
    { name: "Step 2: Sorting", status: "50%", color: "bg-yellow-500" },
    { name: "Step 3: Arrays", status: "20%", color: "bg-blue-500" },
    { name: "Step 4: Binary Search", status: "0%", color: "bg-slate-700" },
    { name: "Step 5: Strings", status: "0%", color: "bg-slate-700" },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">DSA Progress Tracker</h2>
        <p className="text-gray-400 mb-10">Sync with Striver's A-Z Playlist & LeetCode</p>

        <div className="grid gap-6">
          {topics.map((topic, index) => (
            <div key={index} className="p-6 bg-slate-800 border border-slate-700 rounded-2xl flex flex-col md:flex-row justify-between items-center hover:border-blue-500 transition-all">
              <span className="text-xl font-bold mb-4 md:mb-0">{topic.name}</span>
              
              {/* Progress Bar */}
              <div className="w-full md:w-1/2 bg-slate-900 h-4 rounded-full overflow-hidden">
                <div className={`${topic.color} h-full transition-all`} style={{ width: topic.status }}></div>
              </div>
              
              <span className="mt-4 md:mt-0 font-mono text-blue-400">{topic.status} Done</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DSATracker