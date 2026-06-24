import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiTrendingUp, 
  FiFileText, 
  FiBriefcase, 
  FiCheckCircle, 
  FiStar, 
  FiBookOpen,
  FiArrowRight,
  FiActivity,
  FiLogOut,
  FiUser,
  FiGrid
} from 'react-icons/fi';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    problemsSolved: 0,
    resumeScore: 0,
    interviewPrep: 0,
    streak: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Get user from localStorage
  let user = { name: 'User' };
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (e) {
    console.error('Error parsing user:', e);
  }

  const token = localStorage.getItem('token');

  // Fetch real stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch interview questions count
        const interviewRes = await axios.get('http://localhost:5000/api/interview/questions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch DSA problems count (if you have this endpoint)
        // const dsaRes = await axios.get('http://localhost:5000/api/dsa/problems', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        // Fetch resume score (if you have this endpoint)
        // const resumeRes = await axios.get('http://localhost:5000/api/resume/score', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        setStats({
          problemsSolved: 42, // Replace with dsaRes.data.count when available
          resumeScore: 78, // Replace with resumeRes.data.score when available
          interviewPrep: interviewRes.data?.questions?.length || 0,
          streak: 7 // You can add streak tracking later
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep demo data if fetch fails
        setStats({
          problemsSolved: 42,
          resumeScore: 78,
          interviewPrep: 12,
          streak: 7
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Navigation cards data
  const cards = [
    {
      id: 1,
      title: "DSA Progress Tracker",
      description: "Track your coding problems and monitor progress",
      icon: <FiTrendingUp className="w-8 h-8 text-blue-500" />,
      link: "/dsa-tracker",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      stat: `${stats.problemsSolved} Solved`
    },
    {
      id: 2,
      title: "Resume Analyzer",
      description: "AI-powered resume analysis and suggestions",
      icon: <FiFileText className="w-8 h-8 text-purple-500" />,
      link: "/resume-analyzer",
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      stat: `${stats.resumeScore}% Score`
    },
    {
      id: 3,
      title: "Job Preparation",
      description: "Interview questions and career guidance",
      icon: <FiBriefcase className="w-8 h-8 text-green-500" />,
      link: "/job-preparation",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      stat: `${stats.interviewPrep} Questions`
    }
  ];

  const statCards = [
    {
      label: "Problems Solved",
      value: stats.problemsSolved,
      icon: <FiCheckCircle className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      label: "Resume Score",
      value: `${stats.resumeScore}%`,
      icon: <FiStar className="w-6 h-6 text-white" />,
      gradient: "from-green-500 to-green-600"
    },
    {
      label: "Interview Prep",
      value: stats.interviewPrep,
      icon: <FiBookOpen className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      label: "Day Streak",
      value: `${stats.streak} Days`,
      icon: <FiActivity className="w-6 h-6 text-white" />,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FiGrid className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-bold text-indigo-600">CareerForge</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
                <FiUser className="text-indigo-600" />
                <span className="text-gray-700 font-medium">{user.name || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            Welcome back, {user.name || 'User'}! 👋
          </h2>
          <p className="text-gray-500 mt-1">Here's your learning progress at a glance</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-r ${stat.gradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <p className="text-white text-2xl font-bold mt-1">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className={`${card.bgColor} border ${card.borderColor} rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                  {card.icon}
                </div>
                <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                  {card.stat}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {card.description}
              </p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-all">
                <span>Click to View</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Action - Ask Gemini */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FiStar className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
                <p className="text-gray-500 text-sm">Ask Gemini AI for personalized career guidance</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Ask Gemini AI →
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link to="/dsa-tracker" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-blue-200">
            <span className="text-2xl block mb-1">📊</span>
            <span className="text-sm text-gray-600">DSA Tracker</span>
          </Link>
          <Link to="/resume-analyzer" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-purple-200">
            <span className="text-2xl block mb-1">📄</span>
            <span className="text-sm text-gray-600">Resume Analyzer</span>
          </Link>
          <Link to="/interview-prep" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-green-200">
            <span className="text-2xl block mb-1">🎯</span>
            <span className="text-sm text-gray-600">Interview Prep</span>
          </Link>
          <Link to="/job-preparation" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-orange-200">
            <span className="text-2xl block mb-1">💼</span>
            <span className="text-sm text-gray-600">Job Prep</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;