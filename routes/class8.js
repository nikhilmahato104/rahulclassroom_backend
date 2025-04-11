import express from 'express';
const router = express.Router();
import Student8 from '../models/Student8.js'; // Note the .js extension

router.get('/', (req, res) => {
  res.render('class8/operations');
});

router.get('/view', async (req, res) => {
  const students = await Student8.find();
  res.render('class8/viewStudents', { students });
});

router.get('/add', (req, res) => {
  res.render('class8/addStudent');
});

router.post('/add', async (req, res) => {
  const { roll, name } = req.body;
  const student = new Student8({ roll, name });
  await student.save();
  res.redirect('/class8/view');
});

router.get('/delete/:id', async (req, res) => {
  await Student8.findByIdAndDelete(req.params.id);
  res.redirect('/class8/view');
});





//fee 

router.post('/update-fee/:id', async (req, res) => {
  const { month, status } = req.body;

  console.log('POST /update-fee/:id');
  console.log('Student ID:', req.params.id);
  console.log('Month:', month);
  console.log('Status:', status);

  try {
    const student = await Student8.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    student.fees.set(month, status); // ✅ use status directly (it's already boolean)
    await student.save();

    console.log('Updated fees:', student.fees);

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating fee:', err);
    res.status(500).json({ success: false });
  }
});


// API for React frontend to fetch students as JSON
router.get('/api/students', async (req, res) => {
  try {
    const students = await Student8.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});


export default router; // This is the crucial line!