import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'McqTest', required: true },
  answers: [{ type: Number, required: true }], // an array where each index corresponds to a question answer
  timeTaken: { type: Number, required: true },
  copyAttempts: { type: Number, default: 0 },
  tabSwitches: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model('StudentSubmission', submissionSchema);
