// import express from 'express';
// import StudentSubmission from '../models/StudentSubmission.js'; // You'll create this model
// const router = express.Router();

// router.post('/submit', async (req, res) => {
//   try {
//     const submission = new StudentSubmission(req.body);
//     await submission.save();
//     res.json({ success: true, message: "Submission recorded" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to save submission" });
//   }
// });

// export default router;








//morning work today 14 april 2025
// routes/student.js
// import express from 'express';
// import StudentSubmission from '../models/StudentSubmission.js';
// import McqTest from '../models/McqTest.js';

// const router = express.Router();

// router.post('/submit', async (req, res) => {
//   try {
//     const { studentName, rollNumber, testId, answers, copyAttempts, tabSwitches, submittedAt, timeTaken } = req.body;

//     const test = await McqTest.findById(testId);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     let marks = 0;

//     // ✅ Loop through test questions and compare with student answers
//     test.questions.forEach((question, index) => {
//       const studentAnswer = answers[index]; // this should be a number (0-3)
//       if (parseInt(studentAnswer) === question.correctAnswer) {
//         marks += 1;
//       }
//     });

//     const newSubmission = new StudentSubmission({
//       studentName,
//       rollNumber,
//       testId,
//       answers,
//       copyAttempts,
//       tabSwitches,
//       submittedAt,
//       timeTaken,
//       marks, // ✅ Save marks too
//     });

//     await newSubmission.save();
//     res.status(200).json({ message: "Submission saved successfully" });
//   } catch (err) {
//     console.error("Submission error:", err);
//     res.status(500).json({ message: "Error saving submission" });
//   }
// });

// export default router;




// import express from 'express';
// import StudentSubmission from '../models/StudentSubmission.js';
// import McqTest from '../models/McqTest.js';

// const router = express.Router();

// router.post('/submit', async (req, res) => {
//   try {
//     const {
//       studentName,
//       rollNumber,
//       testId,
//       answers,
//       copyAttempts,
//       tabSwitches,
//       submittedAt,
//       timeTaken
//     } = req.body;

//     const test = await McqTest.findById(testId);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     let marks = 0;

//     test.questions.forEach((question, index) => {
//       const studentAnswer = answers[index]; // should be a number (0-3)
//       if (parseInt(studentAnswer) === question.correctOption) {
//         marks += 1;
//       }
//     });

//     const newSubmission = new StudentSubmission({
//       studentName,
//       rollNumber,
//       testId,
//       answers,
//       copyAttempts,
//       tabSwitches,
//       submittedAt,
//       timeTaken,
//       marks
//     });

//     await newSubmission.save();
//     res.status(200).json({ message: "Submission saved successfully" });
//   } catch (err) {
//     console.error("Submission error:", err);
//     res.status(500).json({ message: "Error saving submission" });
//   }
// });

// export default router;

// routes/student.js
import express from 'express';
import Submission from '../models/StudentSubmission.js';
import McqTest from '../models/McqTest.js';

const router = express.Router();

// Submit test answers
router.post('/submit', async (req, res) => {
  try {
    const { studentName, rollNumber, testId, answers, timeTaken, copyAttempts, tabSwitches } = req.body;

    const test = await McqTest.findById(testId);
    if (!test) return res.status(404).json({ error: 'Test not found' });

    const correctAnswers = test.questions.map(q => q.correctOption);
    const score = answers.reduce((acc, ans, idx) => acc + (ans === correctAnswers[idx] ? 1 : 0), 0);

    const submission = new Submission({
      studentName,
      rollNumber,
      testId,
      answers,
      timeTaken,
      copyAttempts,
      tabSwitches,
    });

    await submission.save();

    res.json({ message: 'Submission successful', score, total: test.questions.length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
