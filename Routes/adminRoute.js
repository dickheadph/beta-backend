const express = require('express');
const router = express.Router();

const {
  signupAdmin,
  loginAdmin,
  logoutAdmin,
} = require('../Controller/adminAuthController');

router.post('/admin-sign-up', signupAdmin);
router.post('/admin-login', loginAdmin);
router.post('/admin-login', logoutAdmin);

module.exports = router;
