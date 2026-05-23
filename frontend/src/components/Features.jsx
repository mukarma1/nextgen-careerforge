import React from 'react'

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-3xl hover:border-blue-500 transition-all group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
)

function Features() {
  const data = [
    {
      icon: "🤖",
      title: "AI Resume Audit",
      desc: "Upload your resume and let our Gemini-powered AI find gaps in your skills compared to Big Tech requirements."
    },
    {
      icon: "📈",
      title: "DSA Progress Tracker",
      desc: "Stop wandering. Sync your LeetCode and track your consistency through Striver's A-Z roadmap."
    },
    {
      icon: "🔐",
      title: "Secure Academic Vault",
      desc: "Your data is yours. We use AES-256 encryption to secure your transcripts and professional records."
    }
  ]

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Features