const express = require('express')

const router = express.Router()

const { getKeeper, addKeeper, updateKeeper } = require('../controller/keeperController')

router.get('/keeper', getKeeper);
router.post('/keeper', addKeeper);
router.put('/keeper', updateKeeper)

module.exports = { router }