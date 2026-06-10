import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DSATracker() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    platform: 'LeetCode',
    difficulty: 'Medium',
    link: '',
    notes: ''
  });

  const token = localStorage.getItem('token');
  
  // Debug: Check token
  console.log('Token exists:', !!token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProblems();
    fetchStats();
  }, []);

  const fetchProblems = async () => {
    try {
      console.log('🔄 Fetching problems...');
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/dsa/problems', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Problems data:', data);
      
      if (data.success) {
        setProblems(data.problems || []);
        console.log(`✅ Loaded ${data.problems?.length || 0} problems`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('❌ Error fetching problems:', error);
      setError('Failed to fetch problems: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching stats...');
      const response = await fetch('http://localhost:5000/api/dsa/stats', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      console.log('Stats data:', data);
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (!formData.title) {
      setError('Problem title is required');
      return;
    }
    
    console.log('📤 Submitting problem:', formData);
    
    try {
      const response = await fetch('http://localhost:5000/api/dsa/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log('Submit response:', data);
      
      if (response.ok) {
        setSuccessMsg('Problem added successfully! ✅');
        setFormData({ title: '', platform: 'LeetCode', difficulty: 'Medium', link: '', notes: '' });
        setShowForm(false);
        
        // Refresh both lists
        await fetchProblems();
        await fetchStats();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setError(data.message || 'Failed to add problem');
      }
    } catch (error) {
      console.error('❌ Error adding problem:', error);
      setError('Network error: ' + error.message);
    }
  };

  const deleteProblem = async (id) => {
    if (window.confirm('Delete this problem?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/dsa/problems/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          await fetchProblems();
          await fetchStats();
        }
      } catch (error) {
        console.error('Error deleting problem:', error);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-700';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl font-bold text-indigo-600">DSA Progress Tracker</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Success Message */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {successMsg}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.total || 0}</div>
            <div className="text-sm">Total Solved</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.easy || 0}</div>
            <div className="text-sm">Easy</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.medium || 0}</div>
            <div className="text-sm">Medium</div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{stats.hard || 0}</div>
            <div className="text-sm">Hard</div>
          </div>
        </div>

        {/* Add Problem Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setError('');
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 mb-6"
        >
          {showForm ? '✖ Cancel' : '+ Add Problem'}
        </button>

        {/* Add Problem Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Problem</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Problem Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="p-2 border rounded"
                >
                  <option>LeetCode</option>
                  <option>CodeChef</option>
                  <option>Codeforces</option>
                  <option>HackerRank</option>
                  <option>Other</option>
                </select>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="p-2 border rounded"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                <input
                  type="url"
                  placeholder="Problem Link (optional)"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="p-2 border rounded"
                />
                <textarea
                  placeholder="Notes (optional)"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="p-2 border rounded md:col-span-2"
                  rows="2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save Problem
              </button>
            </form>
          </div>
        )}

        {/* Problems List */}
        <h2 className="text-xl font-bold mb-4">
          Solved Problems 
          <span className="text-sm text-gray-500 ml-2">({problems.length} total)</span>
        </h2>
        
        {loading ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p>Loading problems...</p>
          </div>
        ) : problems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">No problems added yet.</p>
            <p className="text-gray-400 text-sm mt-2">Click "Add Problem" to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <div key={problem._id || index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="font-semibold text-lg">{problem.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {problem.platform}
                      </span>
                    </div>
                    {problem.link && (
                      <a href={problem.link} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 text-sm hover:underline">
                        🔗 View Problem →
                      </a>
                    )}
                    {problem.notes && (
                      <p className="text-gray-600 text-sm mt-2">📝 {problem.notes}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Solved: {new Date(problem.solvedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProblem(problem._id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                    title="Delete problem"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DSATracker;