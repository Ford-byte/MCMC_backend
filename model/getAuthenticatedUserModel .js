const { connection } = require('../configuration/database');

function getAuthenticatedUserModel(data, callback) {
    const query = "SELECT * FROM users WHERE user_id = ?";
    connection.query(query, data, callback);
}

module.exports = { getAuthenticatedUserModel };
