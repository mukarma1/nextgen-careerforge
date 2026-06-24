import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadResume, getMyResumes, deleteResume } from '../services/api';
import { toast } from 'react-hot-toast';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [resumes, setResumes] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data } = await uploadResume(formData);
      setAnalysis(data.resume.analysis);
      toast.success('Resume analyzed successfully!');
      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const fetchResumes = async () => {
    try {
      const { data } = await getMyResumes();
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      toast.success('Resume deleted');
      fetchResumes();
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Resume Analyzer</h1>
      
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {file ? (
            <div className="mt-2">
              <p className="text-sm text-gray-600">{file.name}</p>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Drag & drop your resume PDF here, or click to select</p>
              <p className="text-sm text-gray-500 mt-1">PDF files only (max 5MB)</p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Score Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Resume Score</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="64" cy="64" r="56"
                    stroke={analysis.score >= 70 ? '#10B981' : analysis.score >= 40 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="8" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - analysis.score / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                  {analysis.score}/100
                </span>
              </div>
              <div>
                <p className={`text-lg font-semibold ${
                  analysis.score >= 70 ? 'text-green-600' : 
                  analysis.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysis.score >= 70 ? 'Great Resume!' : 
                   analysis.score >= 40 ? 'Needs Improvement' : 'Needs Major Work'}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Word count: {analysis.wordCount} words
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Skills Found</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            {analysis.missingSkills.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-red-600 mb-2">Recommended to Add:</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map(skill => (
                    <span key={skill} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section Check */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sections Check</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(analysis.sections).map(([section, present]) => (
                <div key={section} className="flex items-center gap-2">
                  <span className={present ? 'text-green-500' : 'text-red-500'}>
                    {present ? '✅' : '❌'}
                  </span>
                  <span className="capitalize font-medium">{section}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Improvement Suggestions</h2>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">💡</span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;