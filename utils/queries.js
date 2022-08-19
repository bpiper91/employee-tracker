const db = require('./connection');

// view all departments
const showDepartments = () => {
    const sql = `SELECT name AS Department, id AS ID FROM departments`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.table(results);
    });
};

module.exports = { showDepartments };