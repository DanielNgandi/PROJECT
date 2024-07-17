// routes.js
const express = require('express');
const { signup, signin, resetPassword } = require('../controllers/logincontrollers');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/reset-password', resetPassword);

module.exports = router;
