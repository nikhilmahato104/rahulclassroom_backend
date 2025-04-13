import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentName: String,
  rollNumber: String,
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'McqTest' },
  answers: Object,
  copyAttempts: Number,
  tabSwitches: Number,
  submittedAt: Date,
  timeTaken: Number // in seconds
});

export default mongoose.model('StudentSubmission', submissionSchema);
