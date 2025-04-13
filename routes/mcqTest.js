import express from 'express';
const router = express.Router();
import McqTest from '../models/McqTest.js'; // Import the MCQ test model

// Route to view all MCQ tests
router.get('/', (req, res) => {
  res.render('mcqTest/operations');  // Render an operations page for managing MCQ tests
});

// Route to view all MCQ tests in a list
router.get('/view', async (req, res) => {
  const tests = await McqTest.find();
  res.render('mcqTest/viewTests', { tests });  // Render the page that lists all MCQ tests
});

// Route to display the form for adding a new MCQ test
router.get('/add', (req, res) => {
  res.render('mcqTest/addTest');  // Render the form where teacher can add new MCQ test
});

// Route to handle the form submission for adding a new MCQ test
router.post('/add', async (req, res) => {
  const { testName, questions } = req.body;  // Extract test name and questions from the request body
  const newTest = new McqTest({ testName, questions });
  
  await newTest.save();  // Save the new MCQ test in the database
  res.redirect('/mcqTest/view');  // Redirect to the view page where all tests are listed
});

// Route to delete an MCQ test
router.get('/delete/:id', async (req, res) => {
  await McqTest.findByIdAndDelete(req.params.id);  // Delete the test by ID
  res.redirect('/mcqTest/view');  // Redirect to the view page after deletion
});

// Route to update an MCQ test (add or modify questions and options)
router.post('/update/:id', async (req, res) => {
  const { testName, questions } = req.body;  // Extract updated test data from the request body

  try {
    const test = await McqTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    test.testName = testName || test.testName;  // Update test name if provided
    test.questions = questions || test.questions;  // Update questions if provided
    await test.save();  // Save the updated test

    res.json({ success: true, message: 'Test updated successfully' });
  } catch (err) {
    console.error('Error updating test:', err);
    res.status(500).json({ success: false, message: 'Error updating test' });
  }
});

// API to fetch all MCQ tests for React frontend
router.get('/api/tests', async (req, res) => {
  try {
    const tests = await McqTest.find();
    res.json(tests);  // Return the list of MCQ tests in JSON format for the React frontend
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch MCQ tests" });
  }
});

// API to fetch a specific MCQ test by ID
router.get('/api/test/:id', async (req, res) => {
  try {
    const test = await McqTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);  // Return the specific MCQ test in JSON format
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch the MCQ test" });
  }
});

export default router;
