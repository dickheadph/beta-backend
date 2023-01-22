const express = require('express');
const { sendDevMail } = require('../Controller/mailController');

const router = express.Router();

router.post('/', sendDevMail);

module.exports = router;
