const inquirer = require('inquirer');
const userModel = require('../models/users')
const user = {}
// this is  function
const globle_input = async () => {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'email',
                message: 'Enter email',
            },
        ])
        .then(answers => {
            user.email = answers.email;
            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'name',
                        message: 'Enter name',
                    },
                ])
                .then(answers => {
                    user.name = answers.name;
                    inquirer
                        .prompt([
                            {
                                type: 'number',
                                name: 'age',
                                message: 'Enter age',
                            },
                        ])
                        .then(answers => {
                            user.age = answers.age;

                            inquirer
                                .prompt([
                                    {
                                        type: 'password',
                                        name: 'password',
                                        message: 'Enter password',
                                    },
                                ])
                                .then(answers => {
                                    user.password = answers.password;
                                    userModel(user)
                                    console.log(user, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                                });
                        });
                });
            // Displaying the password for debug purposes only.
            console.info('Answer:', answers.email);
        });
}

async function CreateSuperUser() {
    await globle_input();
    return;
};


async function MainFunction() {
    await CreateSuperUser();
};

MainFunction();