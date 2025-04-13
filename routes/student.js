import express from 'express';
import StudentSubmission from '../models/StudentSubmission.js'; // You'll create this model
const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const submission = new StudentSubmission(req.body);
    await submission.save();
    res.json({ success: true, message: "Submission recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save submission" });
  }
});

export default router;
