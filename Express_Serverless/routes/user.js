const express = require('express');
const userctrl = require('../controllers/userctrl')
const authctrl = require('../controllers/authctrl')
const redisctrl = require('../controllers/redisctrl')

const router = express.Router();

router.get('/data/:field/:id', authctrl.checktokenctrl, redisctrl.checkcachectrl, userctrl.getuserctrl, redisctrl.savecachectrl);
router.post('/data', authctrl.checktokenctrl, userctrl.postuserctrl);
router.patch('/data/:field/:id', authctrl.checktokenctrl, userctrl.patchuserctrl, redisctrl.deletecachectrl);
router.delete('/data/:field/:id', authctrl.checktokenctrl, userctrl.deleteuserctrl, redisctrl.deletecachectrl);

module.exports = router;