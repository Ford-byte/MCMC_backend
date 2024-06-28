const { connection } = require('../configuration/database');

function getAuthenticatedUserModel(data, callback) {
    const query = "SELECT * FROM users WHERE id = ?";
    connection.query(query, data, callback);
    connection.end();
}

module.exports = { getAuthenticatedUserModel };
