# employee-tracker


User flow:
Start Inquirer
    Menu:   
        1. View All Departments
            > Table shows department names and department ids
        2. View All Roles
            > Table shows job title, role id, the department that role belongs to, and the salary for that role
        3. View All Employees
            > Table shows employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        4. Add a Department
            > Prompt department name
            > Add department to database
        5. Add a Role
            > Prompt name, salary, and department
            > Add role to database
        6. Add an Employee
            > Prompt employee's first and last name, role, and manager
            > Add employee to database
        7. Update an Employee Role
            > Prompt to select employee
            > Prompt new role
            > Update information in database

    Additional functions:
        Update an employee's manager
        View employees by manager
        Delete department, role, or employee
        View the total utilized budget of a department