const express = require('express');
const authctrl = require('../controllers/authctrl')

const router = express.Router();

router.post('/token', authctrl.gettokenctrl);

module.exports = router;