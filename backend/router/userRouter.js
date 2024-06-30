const express = require('express');
const router = express.Router();
const { getUser, addUser, deleteUser, updateUser, changeUserRole } = require('../controller/userController');

router.get('/user', getUser);
router.post('/user', addUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
router.patch('/user/:id', changeUserRole);

module.exports = {router};
