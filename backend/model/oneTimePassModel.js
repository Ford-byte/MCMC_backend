const { connection } = require('../configuration/database')


function getData(data, callback) {
    // const query = "SELECT * from otp";
    const query = "SELECT o.otp_id,o.otpnumber,o.user_id,u.firstname,u.lastname FROM `otp` AS o LEFT JOIN `users` AS u ON o.user_id = u.id WHERE o.user_id = u.id; ";
    connection.query(query, data, (err, results) => {
        callback(err, results);
    })
}

function addData(data, callback) {
    const query = "INSERT INTO otp() values(null,6,?,null)";
    connection.query(query, data, callback);
}

module.exports = { getData, addData }