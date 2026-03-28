class CreateCategory {
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.tasks = [];
    }
}

class CreateTask {
    constructor(title, dueDate, description, priority, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}

class newCategory{
    categoryList = [];
    constructor(){}

    addCategory(title, description){
        let category = new CreateCategory(title, description);
        this.categoryList.push(category);
        console.log(`Category created, ID: ${category.id}`)
    }

    getCategory(){
        console.log(this.categoryList);
    }

    setTask(task, category){
        for (let i = 0; i < this.categoryList.length; i++){
            if (this.categoryList[i].id === category){
                this.categoryList[i].tasks.push(task);
            }
        }
    }
}

class Controller{
    categoryInstance = new newCategory;
    constructor(){}

    addTask(title, dueDate, description, priority, status, category){
        let task = new CreateTask(title, dueDate, description, priority, status);
        this.categoryInstance.setTask(task, category);
    }
}


const app = new Controller;