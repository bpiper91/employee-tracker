const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./utils/connection');


const { showDepartments, 
    showRoles, 
    showEmployees, 
    addDepartment,
    addRole,
    addEmployee,
    updateRole } = require('./utils/queries');


const input = [
    'Jim',
    'Elliott',
    10,
    6,
    2
];

addEmployee(input);
showEmployees();


// show options w/ inquirer
// .then run function to do the thing and run show options again


// process.exit ends everything