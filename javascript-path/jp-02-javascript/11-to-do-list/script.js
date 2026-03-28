class Category {
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.tasks = [];
    }
}

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

class Storage{
    vault = [];
    constructor(){}

    setCategory(category){
        this.vault.push(category);
        console.log(`Category created, ID: ${category.id}`) 
    }

    setTask(task, category){
        for (let i = 0; i < this.vault.length; i++){
            if (this.vault[i].id === category){
                this.vault[i].tasks.push(task);
            }
        }
    }
}

class Controller{
    constructor(vault){
        this.vault = vault;
    }

    addCategory(title, description){
        let category = new Category(title, description);
        this.vault.setCategory(category);
    }

    addTask(title, dueDate, description, priority, status, category){
        let task = new Task(title, dueDate, description, priority, status);
        this.vault.setTask(task, category);
    }
}

/* index.js */

const storage = new Storage();
const app = new Controller(storage);