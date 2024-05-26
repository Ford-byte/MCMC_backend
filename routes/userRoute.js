const express = require('express')

const router = express.Router()

const { getUser,addUser,updateUser } = require('../controller/userController')

router.get('/user', getUser);
router.post('/user',addUser);
router.put('/user',updateUser);

module.exports = { router };