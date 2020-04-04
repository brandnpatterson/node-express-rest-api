const express = require('express');
const router = express.Router();
const { home, auth, messages, profile } = require('../controllers');

router.get('/', home);
router.get('/login', auth);
router.get('/messages', messages);
router.get('/profile', profile);

module.exports = router;
