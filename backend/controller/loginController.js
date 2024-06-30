const { getData } = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

async function checkUserExists(email) {
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

async function validateUser(email) {
    return new Promise((resolve, reject) => {
        getData({ email }, (err, data) => {
            if (err || !data || data.lengthd === 0) {
                resolve(false)
            } else {
                resolve(data[0]);
            }
        })
    })
}

async function giveToken(user) {
    return new Promise((resolve, reject) => {
        const payload = {
            email: user.email
        };
        jwt.sign(payload, "your_secret_key", { expiresIn: '1m' }, (err, token) => {
            if (err)
                reject(err)
            else
                resolve(token)
        });
    });
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await checkUserExists(email);

        if (!userExists) {
            res.status(404).json({ message: "User not found!" });
        }

        const user = await validateUser(email);

        const isPassTrue = await bcrypt.compare(password, user.password);

        if (isPassTrue) {
            const token = await giveToken(user)
            res.status(200).json({ message: "User is logged!", token })
        } else {
            res.status(500).json({ message: "Error Found!" })
        }



    } catch (error) {
        res.status(500).json({ message: "Error Found" + error })
    }


}

module.exports = { loginController }