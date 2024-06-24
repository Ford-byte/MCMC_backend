const express = require('express')

const router = express.Router()

const { getUser,addUser,updateUser, deleteUser } = require('../controller/userController')

router.get('/user', getUser);
router.post('/user',addUser);
router.put('/user',updateUser);
router.delete('/user/:id',deleteUser);

module.exports = { router };