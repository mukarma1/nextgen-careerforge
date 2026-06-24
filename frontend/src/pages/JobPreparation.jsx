function JobPreparation() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button 
        onClick={() => window.location.href = '/dashboard'}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-6"
      >
        ← Back to Dashboard
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Job Preparation</h1>
        <p className="text-gray-600">This feature is coming soon!</p>
        <p className="text-gray-500 mt-2">You will get interview preparation resources here.</p>
      </div>
    </div>
  );
}

export default JobPreparation;