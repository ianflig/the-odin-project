export class Category {
    tasks = []
    constructor({title, id}) {
        this.id = (id) ? id : crypto.randomUUID();
        this.title = (title && title.trim() !== "") ? title.trim() : "New Category";
        this.tasks = this.tasks;
    }

    addTask(task){
        this.tasks.push(task);
    }

    deleteTask(id){
        this.tasks = this.tasks.filter(ele => ele.id !== id);
        return true;
    }

    getTaskByID(id){
        let task = this.tasks.find(ele => ele.id === id)
        return task;
    }
}