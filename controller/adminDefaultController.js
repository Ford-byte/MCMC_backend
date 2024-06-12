const bcrypt = require('bcryptjs');
const { getData, addData } = require('../model/userModel');

async function adminDefaultController() {
    try {
        const password = await bcrypt.hash('admin', 10);

        const adminInfo = ['admin','admin','admin','admin',password,'admin','admin','admin','active'];

        const result = await new Promise((resolve, reject) => {
            getData((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        const adminExist = result.some(user => user.role === 'admin');

        if (adminExist) {
            console.log("Admin already exists");
            return;
        }

        await new Promise((resolve, reject) => {
            addData(adminInfo, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("Action is successful");

    } catch (error) {
        console.log({ success: false, message: 'Server error', error: error.message });
    }
}

module.exports = { adminDefaultController };
