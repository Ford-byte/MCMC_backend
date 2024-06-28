const express = require('express');
const router = express.Router();

const { addOtp,getOtp } = require('../controller/oneTimePassController');

router.post('/otp', addOtp);
router.get('/otp', getOtp);


module.exports = { router };
