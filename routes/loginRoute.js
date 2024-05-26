const express = require('express')

const router = express.Router()

const { verify } = require('../controller/loginController')

router.post('/login',verify);

module.exports = { router }