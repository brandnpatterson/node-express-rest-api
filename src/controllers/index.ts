import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('auth');
});

router.get('/messages', (req, res) => {
  res.render('messages');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

export default router;
