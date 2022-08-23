// get the database connection
const mysql = require('mysql2/promise');
// const conn = require('./connection');
// const db = require('./connection');

// validate user input string
const validateString = (input) => {
    if (!input) {
        console.log('Please enter a name.');
        return false;
    } else if (input.includes(';')) {
        console.log('Please do not include semi-colons.');
        return false;
    } else if (input.includes('--')) {
        console.log('Please do not include double dashes.');
    } else {
        return true;
    };
};

// // validate user input array
// const validateArray = (inputArr) => {
//     newArr = inputArr.filter(validateString);
//     if (newArr.length !== inputArr.length) {
//         return false;
//     } else {
//         return true;
//     };
// };

// view all departments
async function showDepartments() {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    const sql = `SELECT 
                name AS Department,
                id AS ID 
                FROM departments`;

    const [rows, fields] = await db.execute(sql);
    console.log(`\n`);
    console.table(rows);
    console.log(`\n\n\n\n\n\n\n\n\n`);

    // db.query(sql, (err, results) => {
    //     if (err) {
    //         console.error(err);
    //     };

    //     console.log(`\n`);
    //     console.table(results);
    //     console.log(`\n\n\n\n\n\n\n\n`);
    // });
};

// view all roles
async function showRoles() {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    const sql = `SELECT title AS Title,
                roles.id AS ID,
                departments.name AS Department,
                salary AS Salary
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;

    const [rows, fields] = await db.execute(sql);
    console.log(`\n`);
    console.table(rows);
    console.log(`\n\n\n\n\n\n\n\n\n`);
};

// view all employees
async function showEmployees() {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

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

    const [rows, fields] = await db.execute(sql);
    console.log(`\n`);
    console.table(rows);
    console.log(`\n\n\n\n\n\n\n\n`);
};

// add a department
async function addDepartment(deptName) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    const sql = `INSERT INTO departments (name)
                VALUES (?)`;

    const [rows, fields] = await db.execute(sql);

    // db.query(sql, deptName, (err, results) => {
    //     if (err) {
    //         console.error(err);
    //     };
    // });

    console.log(`\n`);
    console.log(`Added department ${deptName}.`);
    console.log(`\n`);
};

// add a role
async function addRole(roleArr) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    // if (!validateArray(roleArr)) {
    //     return false;
    // } else if (!roleArr[0] || !roleArr[1]) {
    //     return false;
    // };

    const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;

    const [rows] = await db.execute(sql);
    console.log(`Added role ${roleArr[0]}.`);
};

// add an employee
async function addEmployee(employeeArr) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    // if (!validateArray(employeeArr)) {
    //     return false;
    // } else if (!employeeArr[0] || !employeeArr[1] || !employeeArr[2]) {
    //     return false;
    // };

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
                VALUES (?, ?, ?, ?, ?)`;

    const [rows, fields] = await db.execute(sql);
    console.log(`Added employee ${employeeArr[0]} ${employeeArr[1]}.`);
};

// update an employee role
async function updateRole(roleUpdateArr) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    // if (!validateArray(roleUpdateArr)) {
    //     return false;
    // } else if (!roleUpdateArr[0] || !roleUpdateArr[1]) {
    //     return false;
    // };

    const sql = `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;

    const [rows, fields] = await db.execute(sql);
    console.log(`Changed employee's role.`);
};

module.exports = {
    validateString,
    showDepartments,
    showRoles,
    showEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
};