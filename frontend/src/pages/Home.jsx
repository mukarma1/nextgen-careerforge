import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-indigo-600">
              NexGen CareerForge
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-600">NexGen CareerForge</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-powered career development platform
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700">
              Get Started
            </Link>
            <Link to="/login" className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg hover:bg-indigo-50">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">DSA Progress Tracker</h3>
            <p className="text-gray-600">Track your coding journey and monitor improvement</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Resume Analyzer</h3>
            <p className="text-gray-600">AI-powered resume analysis and suggestions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Job Preparation</h3>
            <p className="text-gray-600">Interview prep and career guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;