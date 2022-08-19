const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./utils/connection');

// get questions from prompts.js
const { 
    mainMenu,
    newDeptMenu } = require('./utils/prompts');

// get query functions from queries.js
const { 
    showDepartments,
    showRoles,
    showEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole } = require('./utils/queries');

// prompt user
const promptMenu = () => {
    console.log(`\n\n`);
    inquirer
        .prompt(mainMenu)
        .then((selection) => {

            // if the user selected 'Quit", close the app
            if (selection.menuChoice === 'quit') {
                process.exit();
            };

            // run the selected query
            switch (selection.menuChoice) {
                case 'showDepartments':
                    showDepartments();
                    promptMenu();
                    break;
                case 'showRoles':
                    showRoles();
                    promptMenu();
                    break;
                case 'showEmployees':
                    showEmployees();
                    promptMenu();
                    break;
                case 'addDepartment':
                    addDepartment();
                    break;
                case 'addRole':
                    addRole();
                    break;
                case 'addEmployee':
                    addEmployee();
                    break;
                case 'updateRole':
                    updateRole();
                    break;
            };

        })
        .catch((err) => {
            console.error(err);
        });
};

// initialize application
promptMenu();