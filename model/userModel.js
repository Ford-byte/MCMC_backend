const { connection } = require('../configuration/database')

function getData(data, callback) {
    const query = "SELECT * from users where view = 1";
    connection.query(query, data, callback)
}

function addData(data, callback) {
    const query = "INSERT INTO users() values('',?,?,?,?,?,?,?,?,?,1)";
    connection.query(query, data, callback)
}

function updateData(data, callback) {
    const query = "UPDATE `users` SET `profile`=? ,`firstname`=?, `lastname`=?, `username`=?, `password`=?, `email`=?, `birthday`=?, `role`=? , `status`=? WHERE `email`=?";

    connection.query(query, data, callback)
}

module.exports = { getData, addData, updateData }    