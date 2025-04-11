import express from 'express';
const router = express.Router();
import Student10 from '../models/Student10.js'; // Note the .js extension

router.get('/', (req, res) => {
  res.render('class10/operations');
});

router.get('/view', async (req, res) => {
  const students = await Student10.find();
  res.render('class10/viewStudents', { students });
});

router.get('/add', (req, res) => {
  res.render('class10/addStudent');
});

router.post('/add', async (req, res) => {
  const { roll, name } = req.body;
  const student = new Student10({ roll, name });
  await student.save();
  res.redirect('/class10/view');
});

router.get('/delete/:id', async (req, res) => {
  await Student10.findByIdAndDelete(req.params.id);
  res.redirect('/class10/view');
});

export default router; // Use export default instead of module.exports