import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
});

const mcqTestSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  questions: [questionSchema],
});

export default mongoose.model('McqTest', mcqTestSchema);
