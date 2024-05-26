const { connection } = require('../configuration/database')

function getData(data, callback) {
    const query = "SELECT * from admin where view = 1";
    connection.query(query, data, callback)
}

function addData(data, callback) {
    const query = "INSERT INTO admin() values('',?,?,?,?,?,?,?,1)";
    connection.query(query, data, callback)
}

function updateData(data, callback) {
    const query = "UPDATE `admin` SET `firstname`=?, `lastname`=?, `username`=?, `password`=?, `email`=?, `birthday`=?, `role`=? WHERE `email`=?";

    connection.query(query, data, callback)
}

module.exports = { getData, addData, updateData }    