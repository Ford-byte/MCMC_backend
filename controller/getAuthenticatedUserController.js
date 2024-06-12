const { getAuthenticatedUserModel } = require('../model/getAuthenticatedUserModel ');

async function getAuthenticatedUserController(req, res) {
    const { id } = req.params;
    const data = [id];

    getAuthenticatedUserModel(data, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Retrieval Unsuccessful!' });
        } else {
            res.status(200).json({ success: true, message: 'Retrieval successful!', data: results });
        }
    });
}

module.exports = { getAuthenticatedUserController };
