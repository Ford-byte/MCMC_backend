const { getData } = require('../model/leadersModel');
const bcryptjs = require('bcryptjs');


async function getLeaders(req, res) {
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

module.exports = { getLeaders };