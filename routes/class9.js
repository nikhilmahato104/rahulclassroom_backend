import express from 'express';
const router = express.Router();
import Student9 from '../models/Student9.js'; // Note the .js extension

router.get('/', (req, res) => {
  res.render('class9/operations');
});

router.get('/view', async (req, res) => {
  const students = await Student9.find();
  res.render('class9/viewStudents', { students });
});

router.get('/add', (req, res) => {
  res.render('class9/addStudent');
});

router.post('/add', async (req, res) => {
  const { roll, name } = req.body;
  const student = new Student9({ roll, name });
  await student.save();
  res.redirect('/class9/view');
});

router.get('/delete/:id', async (req, res) => {
  await Student9.findByIdAndDelete(req.params.id);
  res.redirect('/class9/view');
});

export default router; // This is the crucial line!