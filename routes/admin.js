import express from 'express';
const router = express.Router();

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

export default router;
