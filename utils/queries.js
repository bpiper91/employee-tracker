const db = require('./connection');

// validate user input string
const validateString = (input) => {
    if (input.includes(';')) {
        return false;
    } else {
        return true;
    };
};

// validate user input array
const validateArray = (inputArr) => {
    newArr = inputArr.filter(validateString);
    if (newArr.length !== inputArr.length) {
        return false;
    } else {
        return true;
    };
};

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

        console.log('');
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
            
        console.log('');
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
            
        console.log('');
        console.table(results);
    });
};

// add a department
const addDepartment = (deptName) => {
    // if (!validateString(deptName)) {
    //     return false;
    // };

    const sql = `INSERT INTO departments (name)
                VALUES (?)`;

    db.query(sql, deptName, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.log(`Added department ${deptName}.`);
    });   
};

// add a role
const addRole = (roleArr) => {
    // if (!validateArray(roleArr)) {
    //     return false;
    // } else if (!roleArr[0] || !roleArr[1]) {
    //     return false;
    // };

    const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;

    db.query(sql, roleArr, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.log(`Added role ${roleArr[0]}.`);
    });
};

// add an employee
const addEmployee = (employeeArr) => {
    // if (!validateArray(employeeArr)) {
    //     return false;
    // } else if (!employeeArr[0] || !employeeArr[1] || !employeeArr[2]) {
    //     return false;
    // };

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
                VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, employeeArr, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.log(`Added employee ${employeeArr[0]} ${employeeArr[1]}.`);
    });
};

// update an employee role
const updateRole = (roleUpdateArr) => {
    // if (!validateArray(roleUpdateArr)) {
    //     return false;
    // } else if (!roleUpdateArr[0] || !roleUpdateArr[1]) {
    //     return false;
    // };

    const sql = `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;

    db.query(sql, roleUpdateArr, (err, results) => {
        if (err) {
            console.error(err);
        };

        console.log(`Changed employee's role.`);
    });
};

module.exports = {
    showDepartments,
    showRoles,
    showEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
};