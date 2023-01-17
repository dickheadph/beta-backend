const express = require('express');
const router = express.Router();

const {
  signupAdmin,
  loginAdmin,
} = require('../Controller/adminAuthController');

router.post('/admin-sign-up', signupAdmin);
router.post('/admin-login', loginAdmin);

module.exports = router;
