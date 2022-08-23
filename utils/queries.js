// get the database connection
const mysql = require('mysql2/promise');

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
                COALESCE(CONCAT(m.first_name, ' ', m.last_name),'None') AS Manager
                FROM employees e
                LEFT JOIN roles
                ON e.role_id = roles.id
                LEFT JOIN departments
                ON e.department_id = departments.id
                LEFT JOIN employees m
                ON e.manager_id = m.id`;

    const [rows, fields] = await db.execute(sql);
    console.log(`\n`);
    console.table(rows);
    console.log(`\n\n\n\n\n\n\n\n`);
};



module.exports = {
    validateString,
    showDepartments,
    showRoles,
    showEmployees
};