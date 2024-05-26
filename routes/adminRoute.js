const express = require('express')

const router = express.Router()

const { getAdmin,addAdmin,updateAdmin } = require('../controller/adminController')

router.get('/admin', getAdmin);
router.post('/admin',addAdmin);
router.put('/admin',updateAdmin)

module.exports = { router }