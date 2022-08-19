const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./utils/connection');
const { showDepartments } = require('./utils/queries');


showDepartments();


// show options w/ inquirer
// .then run function to do the thing and run show options again


// process.exit ends everything