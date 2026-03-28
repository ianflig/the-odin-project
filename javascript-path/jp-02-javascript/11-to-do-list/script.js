class Task {
    constructor(title, dueDate, description, priority, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}

class Category {
    tasks = []
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
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

class Storage{
    vault = [];
    constructor(){}

    addCategory(category){
        this.vault.push(category);
        console.log(`Category created, ID: ${category.id}`) 
    }

    deleteCategory(id){
        this.vault = this.vault.filter(ele => ele.id !== id);
    }

    getCategoryByID(id){
        let category = this.vault.find(ele => ele.id === id);
        return category;
    }
}

class Controller{
    constructor(storage){
        this.storage = storage;
    }

    createCategory({title = "New Category", description = "..."}){
        let category = new Category(title, description);
        this.storage.addCategory(category);
    }

    createTask(categoryID, {title = "New Task", dueDate, description = "...", priority = "Medium", status = false}){
        let category = this.storage.getCategoryByID(categoryID)
        let task = new Task(title, dueDate, description, priority, status);
        category.addTask(task);
    }

    editCategory(categoryID, {title, description} = {}){
        let category = this.storage.getCategoryByID(categoryID);
        if (title !== undefined) category.title = title;
        if (description !== undefined) category.description = description;
    }

    editTask(categoryID, taskID, {title, dueDate, description, priority, status} = {}){
        let category = this.storage.getCategoryByID(categoryID);
        if (!category) return;
        let task = category.getTaskByID(taskID);
        if (!task) return;
        if (title !== undefined) task.title = title;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;
    }

    deleteCategory(id){
        this.storage.deleteCategory(id);
    }

    deleteTask(categoryID, taskID){
        let category = this.storage.getCategoryByID(categoryID);
        category.deleteTask(taskID);
    }
}

/* index.js */

const storage = new Storage();
const app = new Controller(storage);