import React from 'react'
import Navbar from '../components/Navbar'

function ResumeAudit() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="pt-32 px-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Resume Auditor
        </h2>
        <p className="text-gray-400 mb-10 text-center max-w-xl">
          Upload your resume in PDF format. Our Gemini AI will analyze it against industry standards and suggest improvements.
        </p>

        {/* Upload Box */}
        <div className="w-full max-w-2xl p-10 border-2 border-dashed border-slate-700 rounded-3xl bg-slate-800/30 flex flex-col items-center hover:border-blue-500 transition-all cursor-pointer">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg font-medium text-gray-300">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mt-2">PDF (Max 5MB)</p>
          <input type="file" className="hidden" id="resumeUpload" accept=".pdf" />
          <label htmlFor="resumeUpload" className="mt-6 px-6 py-2 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition cursor-pointer">
            Select File
          </label>
        </div>
      </div>
    </div>
  )
}

export default ResumeAudit