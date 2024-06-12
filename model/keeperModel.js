const { connection } = require('../configuration/database')


function getData(data, callback) {
    const query = "SELECT * from users where role='keeper' && view = 1";
    connection.query(query, data, (err, results) => {
        connection.end();
        callback(err, results);
    })
}

module.exports = { getData }    