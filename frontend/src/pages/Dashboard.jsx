import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Debug: Check if user is logged in
  const token = localStorage.getItem('token');
  console.log('Token exists:', !!token);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-xl font-bold text-indigo-600">NexGen CareerForge</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">Welcome, {user.name || 'User'}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
        
        {/* Navigation Cards - Using anchor tags for testing */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: DSA Tracker - Using window.location for testing */}
          <div 
            onClick={() => window.location.href = '/dsa-tracker'}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">DSA Progress Tracker</h3>
            <p className="text-gray-600">Track your coding problems and monitor progress</p>
            <div className="mt-4 text-indigo-600 font-semibold">Click to View →</div>
          </div>
          
          {/* Card 2: Resume Analyzer */}
          <div 
            onClick={() => window.location.href = '/resume-analyzer'}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Resume Analyzer</h3>
            <p className="text-gray-600">AI-powered resume analysis and suggestions</p>
            <div className="mt-4 text-indigo-600 font-semibold">Click to View →</div>
          </div>
          
          {/* Card 3: Job Preparation */}
          <div 
            onClick={() => window.location.href = '/job-preparation'}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Job Preparation</h3>
            <p className="text-gray-600">Interview questions and career guidance</p>
            <div className="mt-4 text-indigo-600 font-semibold">Click to View →</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg mb-2">Problems Solved</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg mb-2">Resume Score</h3>
            <p className="text-3xl font-bold">0%</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg mb-2">Interview Prep</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;