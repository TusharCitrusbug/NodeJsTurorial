const inquirer = require('inquirer');
const userModel = require('../models/users')
const user = {}

// this is  function for create a super user by user input by chaining promises.
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
                                    user.isAdmin = true;
                                    require('../database/mongo_db');
                                    const User = new userModel(user);
                                    User.save().then((user) => {
                                        console.log("Super user created successfully ! Press clt + C to exit");
                                    }).catch((e) => {
                                        console.log(e);
                                    })
                                });
                        });
                });
        });
}

async function CreateSuperUser() {
    await globle_input();
};

// main execution function will execute first ::::::::::
CreateSuperUser();