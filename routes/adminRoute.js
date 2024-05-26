const express = require('express')

const router = express.Router()

const { getAdmin,addAdmin } = require('../controller/adminController')

router.get('/admin', getAdmin);
router.post('/admin',addAdmin);

module.exports = { router }