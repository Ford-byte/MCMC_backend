const { connection } = require('../configuration/database')


function getData(data, callback) {
    const query = "SELECT * from users where view = 1";
    connection.query(query, data, (err, results) => {
        connection.end();
        callback(err, results);
    })
}

function addData(data, callback) {
    const query = "INSERT INTO users() values(null,?,?,?,?,?,?,?,?,?,1)";
    connection.query(query, data, callback)
}

function updateData(data, callback) {
    const query = "UPDATE `users` SET `profile`=? ,`firstname`=?, `lastname`=?, `username`=?, `password`=?, `email`=?, `birthday`=?, `role`=? , `status`=? WHERE `email`=?";
    connection.query(query, data, (err, results) => {
        connection.end();
        callback(err, results);
    })
}

function deleteData(data, callback){
    const query = "UPDATE `users` SET view = 0 WHERE id = ?";
    connection.query(query, data, (err, results) => {
        connection.end();
        callback(err, results);
    })
}

function changeRole(data, callback){
    const query = "UPDATE `users` SET role = ? WHERE id = ?";
    connection.query(query, data, (err, results) => {
        connection.end();
        callback(err, results);
    })
}

module.exports = { getData, addData, updateData,deleteData,changeRole }    