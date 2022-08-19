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
    ('Chief Technical Officer', 200000, 3),
    ('Chief Executive Officer', 250000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Alma', 'Rodriguez', 7, NULL),
    ('Marcos', 'Fernandez', 5, 1),
    ('Karen', 'Jefferson', 6, 1),
    ('Carolyn', 'Dawes', 2, 2),
    ('Maya', 'Erwin', 1, 4),
    ('Bob', 'Hall', 4, 3),
    ('Doug', 'Cohen', 3, 6),
    ('Darwin', 'Mannex', 3, 6);