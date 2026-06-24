const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const InterviewQuestion = require('../models/InterviewQuestion');

// DNS fix from your server
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const questions = [
  {
    title: "What is the difference between let, const, and var in JavaScript?",
    description: "Explain the scope, hoisting, and reassignment rules for each declaration type.",
    category: "technical",
    difficulty: "medium",
    company: "Google",
    sampleAnswer: "var is function-scoped and can be redeclared, let and const are block-scoped. const cannot be reassigned. let and const are hoisted but not initialized (temporal dead zone).",
    hints: ["Consider ES6 features", "Think about block scope"]
  },
  {
    title: "Explain the concept of closures in JavaScript",
    description: "Define closures and provide a practical example of their use.",
    category: "technical",
    difficulty: "medium",
    company: "Meta",
    sampleAnswer: "A closure is a function that has access to its outer function's scope even after the outer function has returned. This is created when a function is defined inside another function.",
    hints: ["Think about function scope", "Consider practical uses like data privacy"]
  },
  {
    title: "What is the event loop in JavaScript?",
    description: "Explain how the event loop works in JavaScript and its importance.",
    category: "technical",
    difficulty: "hard",
    company: "Amazon",
    sampleAnswer: "The event loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel whenever possible. It manages the execution of asynchronous callbacks.",
    hints: ["Think about call stack", "Consider callback queue"]
  },
  {
    title: "Tell me about a time you faced a conflict at work and how you resolved it",
    description: "Describe a specific situation, your approach, and the outcome.",
    category: "behavioral",
    difficulty: "easy",
    company: "Microsoft",
    sampleAnswer: "In my previous role, two team members had conflicting approaches to a project. I organized a meeting, allowed both to present their views, and facilitated a compromise that incorporated elements from both approaches.",
    hints: ["Use STAR method", "Focus on collaboration"]
  },
  {
    title: "Design a URL shortening service like Bitly",
    description: "Explain how you would design a scalable URL shortening system.",
    category: "system-design",
    difficulty: "hard",
    company: "Twitter",
    sampleAnswer: "Use a hash function to generate short codes, store mappings in a database with a distributed key-value store like Redis for caching, and implement load balancing and sharding for scalability.",
    hints: ["Consider scale", "Think about caching"]
  },
  {
    title: "What are React hooks and why were they introduced?",
    description: "Explain the purpose of React hooks and give examples of common hooks.",
    category: "technical",
    difficulty: "medium",
    company: "Netflix",
    sampleAnswer: "React hooks were introduced to allow state and lifecycle features in functional components. Common hooks include useState for state management, useEffect for side effects, and useContext for context API.",
    hints: ["Think about class components", "Consider code reuse"]
  },
  {
    title: "What is the virtual DOM and how does React use it?",
    description: "Explain the concept of virtual DOM and its role in React's performance optimization.",
    category: "technical",
    difficulty: "medium",
    company: "Meta",
    sampleAnswer: "The virtual DOM is a lightweight copy of the actual DOM. React uses it to minimize direct DOM manipulations by comparing the virtual DOM with the real DOM and updating only the changed elements (reconciliation).",
    hints: ["Think about performance", "Consider React's rendering process"]
  },
  {
    title: "How do you handle authentication in a React application?",
    description: "Describe the approach for implementing authentication including token management and protected routes.",
    category: "technical",
    difficulty: "medium",
    company: "Amazon",
    sampleAnswer: "Use JWT tokens stored in httpOnly cookies or localStorage. Implement protected routes with authentication checks, interceptors for attaching tokens to requests, and refresh token mechanisms for maintaining sessions.",
    hints: ["Consider security", "Think about token storage"]
  },
  {
    title: "Describe a challenging project you worked on and how you overcame obstacles",
    description: "Share a specific project, the challenges faced, and your problem-solving approach.",
    category: "behavioral",
    difficulty: "medium",
    company: "Google",
    sampleAnswer: "I worked on a real-time collaboration tool where we faced sync issues. I implemented CRDT (Conflict-free Replicated Data Type) for conflict resolution, which resulted in seamless collaboration for users.",
    hints: ["Use STAR method", "Focus on technical challenges"]
  },
  {
    title: "Design a notification system for a social media platform",
    description: "How would you design a scalable notification system that handles millions of users?",
    category: "system-design",
    difficulty: "hard",
    company: "Meta",
    sampleAnswer: "Use a message queue like Kafka for event processing, store notifications in Redis for quick access, and use WebSockets for real-time delivery. Implement user preferences for notification types and batch processing for efficiency.",
    hints: ["Consider real-time delivery", "Think about scalability"]
  },
  {
    title: "What are the key principles of RESTful API design?",
    description: "Explain the core principles and best practices for designing REST APIs.",
    category: "technical",
    difficulty: "easy",
    company: "Amazon",
    sampleAnswer: "REST APIs should be stateless, use standard HTTP methods (GET, POST, PUT, DELETE), utilize resource-based URLs, include proper status codes, and support versioning. They should also be cacheable and have a uniform interface.",
    hints: ["Think about HTTP methods", "Consider resource naming"]
  },
  {
    title: "How do you handle state management in large React applications?",
    description: "Discuss different state management solutions and when to use each.",
    category: "technical",
    difficulty: "hard",
    company: "Netflix",
    sampleAnswer: "Use Context API for simple state, Redux or MobX for complex applications, React Query for server state, and Zustand for medium-sized apps. Implement proper state organization with actions, reducers, and selectors.",
    hints: ["Consider different approaches", "Think about scalability"]
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log(`📡 DNS Servers: ${dns.getServers().join(', ')}`);
    
    // ✅ No options needed
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing questions
    const deleteResult = await InterviewQuestion.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing questions`);

    // Insert new questions
    const inserted = await InterviewQuestion.insertMany(questions);
    console.log(`✅ Inserted ${inserted.length} interview questions`);

    console.log('\n📋 Sample Questions:');
    inserted.slice(0, 3).forEach((q, index) => {
      console.log(`  ${index + 1}. ${q.title} (${q.category})`);
    });

    console.log('\n🎯 Seeding completed successfully!');
    
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.error('⚠️  Authentication failed - check your username and password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('⚠️  Network error - check your internet connection');
    } else if (error.message.includes('timed out')) {
      console.error('⚠️  Connection timeout - check your network access and firewall');
    } else if (error.message.includes('not allowed')) {
      console.error('⚠️  IP not whitelisted - add your IP to MongoDB Atlas');
    } else if (error.message.includes('queryTxt')) {
      console.error('⚠️  DNS resolution failed - verify your cluster name');
    }
    
    process.exit(1);
  }
};

// Run seed
console.log('🚀 Starting database seeding...\n');
seedDatabase();