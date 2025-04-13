import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema({
  testName: { type: String, required: true },  // Name of the MCQ test
  questions: [{
    questionText: { type: String, required: true },  // The MCQ question
    options: [{ 
      type: String, required: true  // Each option for the MCQ
    }],
    correctAnswer: { type: Number, required: true },  // Index of the correct option (0-based)
  }]
});

const McqTest = mongoose.model('McqTest', mcqSchema);

export default McqTest;
