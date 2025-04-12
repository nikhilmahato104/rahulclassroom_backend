import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';

const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

//a
// GET /login – show login form
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST /login – handle login submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    req.session.admin = admin._id;
    res.redirect('/admin'); // success
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong. Try again.' });
  }
});

// GET /logout – destroy session
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
