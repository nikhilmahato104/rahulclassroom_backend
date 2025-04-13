import express from 'express';
const router = express.Router();

import StudentSubmission from '../models/StudentSubmission.js';
import McqTest from '../models/McqTest.js';



// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/login');
};

// Admin dashboard
router.get('/', isAuthenticated, (req, res) => {
  res.render('admin'); // will render your styled admin panel
});




//see result
router.get('/viewresult', async (req, res) => {
  try {
    const submissions = await StudentSubmission.find()
      .populate('testId')
      .sort({ submittedAt: -1 });

    res.render('mcqTest/viewSubmissions', { submissions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching submissions");
  }
});
export default router;
