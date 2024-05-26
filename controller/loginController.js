const { getData } = require('../model/userModel');
const bcryptjs = require('bcryptjs');

function verify(req, res) {
    const { username, password } = req.body;

    getData((error, result) => {
        if (error) {
            return res.status(500).json({ status: false, message: "Internal Server Error" });
        }

        const user = result.find(user => user.username === username);

        let role = "";

        if (user) {
            role = user.role;
            console.log(`Role: ${role}`);
        }
        

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        bcryptjs.compare(password, user.password, (err, response) => {
            if (err) {
                return res.status(500).json({ status: false, message: "Internal Server Error" });
            }
            if (response) {
                return res.status(200).json({ status: true, message: "Login Successfully", role });
            } else {
                return res.status(401).json({ status: false, message: "Incorrect password" });
            }
        });
    });
}

module.exports = { verify };
