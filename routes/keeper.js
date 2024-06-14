const express = require('express')

const router = express.Router()

const { getKeeper } = require('../controller/keeperController')

router.get('/keeper', getKeeper);

module.exports = { router };