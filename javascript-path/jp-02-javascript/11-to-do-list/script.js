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
    }

    deleteTask(){

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

    deleteCategory(){

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

    createCategory(title = "New Category", description = "..."){
        let category = new Category(title, description);
        this.storage.addCategory(category);
    }

    createTask(categoryID, title = "New Task", dueDate, description = "...", priority = "Medium", status = false){
        let task = new Task(title, dueDate, description, priority, status);
        let category = this.storage.getCategoryByID(categoryID)
        category.addTask(task);
    }

    editCategory(){

    }

    editTask(){
    }

    deleteCategory(){

    }

    deleteTask(){

    }
}



/* index.js */

const storage = new Storage();
const app = new Controller(storage);