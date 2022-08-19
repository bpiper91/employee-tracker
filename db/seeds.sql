INSERT INTO departments (name)
VALUES
    ('Accounting'),
    ('Information Technology'),
    ('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Accounting Technician', 100000, 1),
    ('Accounting Manager', 150000, 1),
    ('IT Analyst', 100000, 2),
    ('IT Manager', 150000, 2),
    ('Chief Financial Officer', 200000, 3),
    ('Chief Technical Officer', 200000, 3);
    ('Chief Executive Officer', 250000, 3)

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Marcos', 'Fernandez', 5, 8),
    ('Karen', 'Jefferson', 6, 8),
    ('Carolyn', 'Dawes', 2, 1),
    ('Maya', 'Erwin', 1, 3),
    ('Bob', 'Hall', 4, 2),
    ('Doug', 'Cohen', 3, 5),
    ('Darwin', 'Mannex', 3, 5),
    ('Alma', 'Rodriguez', 7, NULL);