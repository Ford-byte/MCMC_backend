const express = require('express')

const router = express.Router()

const { getLeaders } = require('../controller/leadersController')

router.get('/leaders', getLeaders);

module.exports = { router };