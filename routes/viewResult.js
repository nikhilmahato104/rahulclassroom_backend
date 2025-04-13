// // routes/viewResult.js
// import express from 'express';
// import StudentSubmission from '../models/StudentSubmission.js';
// import McqTest from '../models/McqTest.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const submissions = await StudentSubmission.find()
//       .populate('testId')
//       .sort({ submittedAt: -1 });

//     res.render('mcqTest/viewSubmissions', { submissions });
//   } catch (err) {
//     console.error("Error fetching submissions:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export default router;





// routes/viewResult.js
import express from 'express';
import StudentSubmission from '../models/StudentSubmission.js';
import McqTest from '../models/McqTest.js';

const router = express.Router();

// ✅ Middleware to check admin login
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/login'); // Redirect to your login page if not authenticated
};

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const submissions = await StudentSubmission.find()
      .populate('testId')
      .sort({ submittedAt: -1 });

    res.render('mcqTest/viewSubmissions', { submissions });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
