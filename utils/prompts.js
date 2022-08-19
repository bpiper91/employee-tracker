// main menu questions
const mainMenu = [
    {
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'Show All Departments',
                value: 'showDepartments'
            },
            {
                name: 'Show All Roles',
                value: 'showRoles'
            },
            {
                name: 'Show All Employees',
                value: 'showEmployees'
            },
            {
                name: 'Add a Department',
                value: 'addDepartment'
            },
            {
                name: 'Add a Role',
                value: 'addRole'
            },
            {
                name: 'Add an Employee',
                value: 'addEmployee'
            },
            {
                name: "Change an Employee's Role",
                value: 'updateRole'
            },
            {
                name: "Quit",
                value: 'quit'
            }
        ]
    }
];

// questions for adding a new department
const newDeptMenu = [
    {
        type: 'input',
        name: 'deptName',
        message: 'Adding a department. What is the department called?',
        validate: (input) => {
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
        }
    }
];

module.exports = {
    mainMenu,
    newDeptMenu
};