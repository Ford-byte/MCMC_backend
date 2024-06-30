const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Connection Error:', err.message);
    } else {
        console.log('Connection Successful!');
    }
});

module.exports = { connection };
