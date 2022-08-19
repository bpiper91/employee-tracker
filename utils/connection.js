const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        'host': 'localhost',
        'user': 'root',
        'database': 'company'
    },
    console.log("Database connection established. Using database 'company'.")
);

module.exports = db;