const express = require('express');
const bcrypt = require('bcrypt');
const { getData, addData, deleteData, updateData, changeRole } = require('../model/userModel');

const router = express.Router();

async function getUser(req, res) {
    try {
        getData([], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve data' });
            }
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

async function addUser(req, res) {
    try {
        const userExists = await checkUserExists(req.body.email, req.body.username);
        if (userExists) {
            return res.status(400).json({ error: 'User already has an account' });
        }

        // Hash password
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = [
            req.body.profile,
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            hashedPassword, // Store hashed password in the database
            req.body.email,
            req.body.birthday,
            req.body.role,
            req.body.status,
            req.body.qrcode
        ];

        addData(newUser, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to add data' });
            }
            res.status(201).json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

async function checkUserExists(email, username) {
    return new Promise((resolve, reject) => {
        getData({ email }, (err, data) => {
            if (err || !data || data.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

async function deleteUser(req, res) {
    try {
        const userId = [req.params.id];
        deleteData(userId, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete data' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

async function updateUser(req, res) {
    try {
        const updatedData = [
            req.body.profile,
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            req.body.password, // Assuming you handle password updates separately
            req.body.email,
            req.body.birthday,
            req.body.role,
            req.body.status,
            req.body.email // Assuming email is the unique identifier for the user
        ];
        updateData(updatedData, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update data' });
            }
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

async function changeUserRole(req, res) {
    try {
        const roleData = [
            req.body.role,
            req.params.id
        ];
        changeRole(roleData, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to change role' });
            }
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}

module.exports = { getUser, addUser, deleteUser, updateUser, changeUserRole };
