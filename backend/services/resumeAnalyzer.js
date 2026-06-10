// Keywords to look for in resumes
const TECH_SKILLS = [
  'javascript', 'python', 'java', 'c++', 'typescript', 'react', 'node.js',
  'mongodb', 'sql', 'aws', 'docker', 'git', 'html', 'css', 'angular',
  'vue.js', 'express', 'django', 'flask', 'spring', 'machine learning',
  'data science', 'artificial intelligence', 'api', 'rest', 'graphql',
  'redux', 'next.js', 'tailwind', 'bootstrap', 'figma', 'postgresql'
];

const SECTIONS = {
  contact: ['email', 'phone', 'linkedin', 'github', 'portfolio'],
  summary: ['summary', 'objective', 'about me', 'profile'],
  experience: ['experience', 'work', 'employment', 'internship'],
  education: ['education', 'university', 'college', 'degree', 'bachelor', 'master'],
  skills: ['skills', 'technologies', 'technical skills'],
  projects: ['projects', 'personal projects', 'portfolio']
};

const analyzeResume = (text) => {
  const lowerText = text.toLowerCase();
  
  // Extract skills
  const foundSkills = TECH_SKILLS.filter(skill => 
    lowerText.includes(skill.toLowerCase())
  );
  
  // Find missing important skills
  const importantSkills = ['javascript', 'python', 'git', 'sql', 'html', 'css'];
  const missingSkills = importantSkills.filter(skill => 
    !foundSkills.find(fs => fs.toLowerCase() === skill.toLowerCase())
  );
  
  // Check sections
  const sections = {};
  for (const [section, keywords] of Object.entries(SECTIONS)) {
    sections[section] = keywords.some(keyword => lowerText.includes(keyword));
  }
  
  // Calculate score
  let score = 0;
  score += Math.min(foundSkills.length * 3, 30); // Max 30 for skills
  score += Object.values(sections).filter(Boolean).length * 10; // 10 per section
  score += Math.min(20, text.split(' ').length > 200 ? 20 : 0); // Length bonus
  score = Math.min(100, score);
  
  // Generate suggestions
  const suggestions = [];
  if (!sections.summary) suggestions.push('Add a professional summary');
  if (!sections.experience) suggestions.push('Include work experience or internships');
  if (foundSkills.length < 5) suggestions.push('Add more technical skills (aim for 8-10)');
  if (missingSkills.length > 0) suggestions.push(`Consider learning: ${missingSkills.join(', ')}`);
  if (!sections.projects) suggestions.push('Add personal projects with live demos');
  if (text.split(' ').length < 200) suggestions.push('Add more detail to your resume (200+ words recommended)');
  
  return {
    score,
    skills: foundSkills,
    missingSkills,
    sections,
    suggestions,
    wordCount: text.split(' ').length
  };
};

module.exports = { analyzeResume };