const express = require('express')

const router = express.Router()

const { getAdmin } = require('../controller/adminController');

router.get('/admin', getAdmin);

module.exports = { router };