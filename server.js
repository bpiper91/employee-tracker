const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');
// const db = require('./utils/connection');

// get questions from prompts.js
const {
    mainMenu,
    addMenu } = require('./utils/prompts');

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
    return inquirer
        .prompt(mainMenu)
        .then(promptData)   // gets and returns data needed for action
        .then(dbAction)   // performs selected action
        .then((response) => {   // loops back to main menu
            if (response) {
                return promptMenu();
            };
        })
        .catch(err => {
            console.log(err);
        });
};

async function promptData(selection) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    // if the user selected 'Quit", close the app
    if (selection.menuChoice === 'quit') {
        process.exit();
    };

    // create an array for the list selection questions
    let chooseMenu = [];

    // if the user will need to choose a department, get the departments list
    if (selection.menuChoice === 'addRole' || selection.menuChoice === 'addEmployee') {
        // get department list
        let deptChoices = [];

        var sql = `SELECT 
        name AS Department,
        id AS ID 
        FROM departments`;

        // let depts = [];

        // db.promise().query(sql)
        //     .then(([rows,fields]) => {
        //         return rows;
        //     })
        //     .then((rows) => {
        //         depts = rows;
        //         console.log(depts);
        //     })
        //     .catch(console.log)
        //     .then(() => db.end());

        // db.query(sqlDept, (err, rows) => {
        //     if (err) {
        //         console.error(err);
        //     };

        //     depts = rows;
        // });

        const [rows, fields] = await db.execute(sql);
        let depts = rows;

        // create array of department names and ids
        for (i = 0; i < depts.length; i++) {
            let obj = {
                name: depts[i].Department,
                value: depts[i].ID
            };

            deptChoices.push(obj);
        };

        // add department_id question to array
        chooseMenu.push({
            type: 'list',
            name: 'department_id',
            message: "Please choose the corresponding department.",
            choices: deptChoices
        });

    };

    // if the user will need to choose an employee, get the employees list
    if (selection.menuChoice === 'addEmployee' || selection.menuChoice === 'updateRole') {
        // get list of employees
        let empChoices = [];

        const sqlEmp = `SELECT 
        CONCAT(first_name, " ", last_name) AS Employee,
        id AS ID 
        FROM employees`;

        let emps = [];

        db.query(sqlEmp, (err, rows) => {
            if (err) {
                console.error(err);
            };

            emps = rows;
        });

        // create array of employee names and ids
        for (i = 0; i < emps.length; i++) {
            let obj = {
                name: emps[i].Employee,
                value: emps[i].ID
            };

            empChoices.push(obj);
        };

        // add employee_id question to chooseMenu, with appropriate text
        if (selection.menuChoice === 'addEmployee') {
            chooseMenu.push(
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Please choose the employee's manager.",
                    choices: empChoices
                }
            );
        } else if (selection.menuChoice === 'updateRole') {
            chooseMenu.push(
                {
                    type: 'list',
                    name: 'employee_id',
                    message: "Which employee would you like to update?",
                    choices: empChoices
                }
            );
        };
    };

    // if the user will need to select a role, get the roles list
    if (selection.menuChoice === 'addEmployee' || selection.menuChoice === 'updateRole') {
        // get list of roles
        let roleChoices = [];

        const sqlRole = `SELECT 
        title AS Role,
        id AS ID 
        FROM roles`;

        let roles = [];

        db.query(sqlRole, (err, rows) => {
            if (err) {
                console.error(err);
            };

            roles = rows;
        });

        // create array of role titles and ids
        for (i = 0; i < roles.length; i++) {
            let obj = {
                name: roles[i].Role,
                value: roles[i].ID
            };

            roleChoices.push(obj);
        };

        // add role_id question to chooseMenu
        chooseMenu.push(
            {
                type: 'list',
                name: 'role_id',
                message: "Please select the appropriate role.",
                choices: roleChoices
            }
        );
    };

    // combine chooseMenu and addMenu into actionMenu
    const actionMenu = addMenu.concat(chooseMenu);
    // console.log(actionMenu);

    // get user input necessary for the selected action
    switch (selection.menuChoice) {
        case 'showDepartments':
            var action = {
                type: 'show',
                target: 'departments'
            };
            return action;

        case 'showRoles':
            var action = {
                type: 'show',
                target: 'roles'
            };
            return action;

        case 'showEmployees':
            var action = {
                type: 'show',
                target: 'employees'
            };
            return action;

        case 'addDepartment':
            var action = {
                type: 'add',
                target: 'department'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'addRole':
            var action = {
                type: 'add',
                target: 'role'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'addEmployee':
            var action = {
                type: 'add',
                target: 'employee'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'updateRole':
            var action = {
                type: 'update',
                target: 'employee role'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });
    };
};

const dbAction = action => {
    if (action.type === 'show') {
        switch (action.target) {
            case 'departments':
                showDepartments();
                return true;
            case 'roles':
                showRoles();
                return true;
            case 'employees':
                showEmployees();
                return true;
        };
    };

    if (action.type === 'add') {
        switch (action.target) {
            case 'department':
                addDepartment(action.deptName);
                return true;

            case 'role':
                var array = [
                    action.title,
                    action.salary,
                    action.department_id
                ];
                addRole(array);
                return true;

            case 'employee':
                var array = [
                    action.first_name,
                    action.last_name,
                    action.role_id,
                    action.manager_id,
                    action.department_id
                ];
                addEmployee(array);
                return true;
        };
    };

    if (action.type === 'update') {
        const array = [
            action.role_id,
            action.employee_id
        ];
        updateRole(array);
        return true;
    };
};

// initialize application
promptMenu();


//  REMAINING PROBLEM: 
//      1. DB queries happen async, so choice lists are undefined
//          (affects add role, add employee, and update role)
//          await solution works, just needs adding to promptData
//      2. final db query not logging completed message in queries.js
//          probably related to database not sending data back
//          maybe they shouldn't be async functions