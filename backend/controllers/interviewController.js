const InterviewQuestion = require('../models/InterviewQuestion');

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    console.log('📥 Fetching all interview questions...');
    
    const questions = await InterviewQuestion.find({});
    
    console.log(`✅ Found ${questions.length} questions`);
    
    if (questions.length === 0) {
      console.log('⚠️ No questions found in database');
      return res.status(200).json({ 
        success: true, 
        count: 0,
        questions: [],
        message: 'No questions available. Please run seed script.'
      });
    }
    
    res.status(200).json({ 
      success: true, 
      count: questions.length,
      questions 
    });
    
  } catch (error) {
    console.error('❌ Error fetching questions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching questions',
      error: error.message 
    });
  }
};

// Get questions by category
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`📥 Fetching ${category} questions...`);
    
    const questions = await InterviewQuestion.find({ category });
    
    console.log(`✅ Found ${questions.length} ${category} questions`);
    
    res.status(200).json({ 
      success: true, 
      count: questions.length,
      questions 
    });
    
  } catch (error) {
    console.error('❌ Error fetching questions by category:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching questions',
      error: error.message 
    });
  }
};

// Get single question
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Fetching question with ID: ${id}`);
    
    const question = await InterviewQuestion.findById(id);
    
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Question not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      question 
    });
    
  } catch (error) {
    console.error('❌ Error fetching question:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching question',
      error: error.message 
    });
  }
};

// Create new question
exports.createQuestion = async (req, res) => {
  try {
    console.log('📥 Creating new question...');
    
    const question = await InterviewQuestion.create(req.body);
    
    console.log('✅ Question created successfully');
    
    res.status(201).json({ 
      success: true, 
      question 
    });
    
  } catch (error) {
    console.error('❌ Error creating question:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating question',
      error: error.message 
    });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Updating question with ID: ${id}`);
    
    const question = await InterviewQuestion.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Question not found' 
      });
    }
    
    console.log('✅ Question updated successfully');
    
    res.status(200).json({ 
      success: true, 
      question 
    });
    
  } catch (error) {
    console.error('❌ Error updating question:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating question',
      error: error.message 
    });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Deleting question with ID: ${id}`);
    
    const question = await InterviewQuestion.findByIdAndDelete(id);
    
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Question not found' 
      });
    }
    
    console.log('✅ Question deleted successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Question deleted successfully' 
    });
    
  } catch (error) {
    console.error('❌ Error deleting question:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting question',
      error: error.message 
    });
  }
};