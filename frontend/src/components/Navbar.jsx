import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiLogOut, 
  FiHome, 
  FiGrid, 
  FiTrendingUp, 
  FiFileText, 
  FiBriefcase, 
  FiBookOpen 
} from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-yellow-400 font-semibold bg-white/10' 
      : 'text-white hover:text-yellow-400 hover:bg-white/5';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: <FiHome className="w-4 h-4" />, requiresAuth: false },
    { path: '/dashboard', label: 'Dashboard', icon: <FiGrid className="w-4 h-4" />, requiresAuth: true },
    { path: '/dsa-tracker', label: 'DSA Tracker', icon: <FiTrendingUp className="w-4 h-4" />, requiresAuth: true },
    { path: '/resume-analyzer', label: 'Resume Analyzer', icon: <FiFileText className="w-4 h-4" />, requiresAuth: true },
    { path: '/interview-prep', label: 'Interview Prep', icon: <FiBriefcase className="w-4 h-4" />, requiresAuth: true },
    { path: '/job-preparation', label: 'Job Prep', icon: <FiBookOpen className="w-4 h-4" />, requiresAuth: true },
  ];

  const visibleMenuItems = menuItems.filter(item => 
    !item.requiresAuth || token
  );

  return (
    <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/20 shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold text-white tracking-tighter hover:scale-105 transition-transform">
        Career<span className="text-yellow-400">Forge</span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-2 lg:space-x-4 font-medium">
        {visibleMenuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(item.path)}`}
            >
              {item.icon}
              <span className="text-sm lg:text-base">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex items-center gap-3">
        {token ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm"
          >
            <FiLogOut />
            Logout
          </button>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-white hover:text-yellow-400 transition font-medium px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-950/95 backdrop-blur-lg md:hidden border-t border-white/20 shadow-2xl">
          <ul className="flex flex-col p-6 space-y-2">
            {visibleMenuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(item.path)}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/20">
              {token ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-bold transition"
                >
                  <FiLogOut />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/login" 
                    className="text-center text-white hover:text-yellow-400 transition py-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;