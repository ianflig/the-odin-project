export class Category {
    tasks = []
    constructor({
        title = "New Category"
    }) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.tasks = this.tasks;
    }

    addTask(task){
        this.tasks.push(task);
        console.log(`Task created, ID: ${task.id}`) 
    }

    deleteTask(id){
        this.tasks = this.tasks.filter(ele => ele.id !== id);
    }

    getTaskByID(id){
        let task = this.tasks.find(ele => ele.id === id)
        return task;
    }
}