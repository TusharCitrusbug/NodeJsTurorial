const { faker } = require('@faker-js/faker');
const Task = require('../../models/tasks')
exports.list_tasks = async (number,user_id) => {
    let tasks = []
    let task_img_task = '/index.jpeg'
    for (let index = 0; index < number; index++) {
        let name = faker.name.fullName()
        let data = {
            title: name, description: faker.address.secondaryAddress(), owner: user_id, task_image: task_img_task
        }
        let task = await new Task(data);
        task.save()
        tasks.push(task)
    }
    return tasks
}
