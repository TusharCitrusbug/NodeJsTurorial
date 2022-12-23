const inquirer = require('inquirer');

const email_input = () => {
    return

}

const name_input = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                message: 'What is your favorite reptile?',
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.name);
        });
}

const age_input = () => {
    return

}

const password_input = () => {
    return
}
async function CreateSuperUser() {
    console.log("Process started");
    name_input();
    console.log("name_done");
    age_input();
    console.log("age_done");
    email_input();
    console.log("email_done");
    password_input();
    console.log("password_done");
    return;
};


async function MainFunction() {
    await CreateSuperUser();
    console.log("Process finished---------")
    // now wait for firstFunction to finish...
    // do something else
};

MainFunction();