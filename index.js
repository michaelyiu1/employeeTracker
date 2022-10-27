const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('connected to the database')
);


const tracker = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: "prompt",
                message: "What would you like to do?",
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee','quit']
            }
        ]).then((data) => {
            switch(data.prompt){
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'exit':
                    quit();
                    break;
            }
        });
    };

const viewDepartments = () => {
        db.query('SELECT * FROM departments', async function (err, results) {
        const table = await cTable.getTable(results);
        console.log(table);
        tracker();
    });

};

const viewRoles = () => {
    db.query('SELECT * FROM roles', async function (err, results) {
        const table = await cTable.getTable(results);
        console.log(table);
        tracker();
    });   
};

const viewEmployees = () => {
    db.query('SELECT * FROM employee', async function (err, results) {
        const table = await cTable.getTable(results);
        console.log(table);
        tracker();
    });
};

const addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What department would you like to add?'
            }
        ]).then((data) => {
            db.query('INSERT INTO departments(department_name) VALUES (?)', data.newDepartment, async function (err, results) {
                await console.log(`${data.newDepartment} added to departments!`);
                tracker();
            } );
        });
    };

const addRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the title of the role would you like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?'
            },
            {
                type: 'input',
                name: 'department',
                message: 'what is the department id for this role?'
            }
        ]).then((data) => {
            db.query('INSERT INTO roles(title, salary, department_id) VALUES (?)', data.newRole, async function (err, results) {
                await console.log(`${data.newRole} added to roles!`);
                tracker();
            } );
        });
    };

const quit = () => {
        console.log("\nGoodbye!");
        process.exit(0);
      };


tracker();






