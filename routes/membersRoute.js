const express = require('express')

const router = express.Router()

const { getMembers } = require('../controller/membersController')

router.get('/members', getMembers);

module.exports = { router };