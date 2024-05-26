const { getData, addData } = require('../model/adminModel');
const bcryptjs = require('bcryptjs');

async function getAdmin(req, res) {
    try {
        getData((error, result) => {
            if (error) {
                res.status(500).json({ success: false, message: 'Retrieval Data Unsuccessful!' });
            } else {
                res.status(200).json({ success: true, message: 'Success!', data: result });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Retrieval Data Unsuccessful!' });
    }
}

async function addAdmin(req, res) {
    try {
        const { firstname, lastname, username, password, email, birthday, role } = req.body;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        getData((err, result) => {
            if (err) {
                res.status(500).json({ success: false, message: "Server error" });
                return;
            }

            const usernameExists = result.some(user => user.username === username);
            const emailExists = result.some(user => user.email === email);

            if (usernameExists) {
                res.status(400).json({ success: false, message: "Username already exists" });
                return;
            }
            if (emailExists) {
                res.status(400).json({ success: false, message: "Email already exists" });
                return;
            }

            const data = [firstname, lastname, username, hashedPassword, email, birthday, role];

            addData(data, (error, result) => {
                if (error) {
                    res.status(500).json({ success: false, message: "Server error" });
                } else {
                    res.status(200).json({ success: true, message: "Action is successful" });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
module.exports = { getAdmin, addAdmin };
