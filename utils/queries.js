const db = require('./connection');

// view all departments
const showDepartments = () => {
    const sql = `SELECT 
                name AS Department,
                id AS ID 
                FROM departments`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.table(results);
    });
};

// view all roles
const showRoles = () => {
    const sql = `SELECT title AS Title,
                roles.id AS ID,
                departments.name AS Department,
                salary AS Salary
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        };
            
         console.table(results);
    });
};

// view all employees
const showEmployees = () => {
    const sql = `SELECT e.id AS ID,
                e.first_name AS First_Name,
                e.last_name AS Last_Name,
                roles.title AS Title,
                departments.name AS Department,
                roles.salary AS Salary,
                CONCAT(m.first_name, ' ', m.last_name) AS Manager
                FROM employees e
                LEFT JOIN roles
                ON e.role_id = roles.id
                LEFT JOIN departments
                ON e.department_id = departments.id
                INNER JOIN employees m ON e.manager_id = m.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        };
            
         console.table(results);
    });
};

module.exports = { showDepartments, showRoles, showEmployees };