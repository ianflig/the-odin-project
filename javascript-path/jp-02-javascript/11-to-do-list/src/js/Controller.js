import { Task } from './Task.js';
import { Category } from './Category.js';

export class Controller{
    constructor(storage){
        this.storage = storage;
    }

    createCategory(data){
        let category = new Category(data);
        this.storage.addCategory(category);
        this.storage.updateLocalStorage();
        return category;
    }

    createTask(categoryID, data){
        let category = this.storage.getCategoryByID(categoryID)
        let task = new Task(data);
        category.addTask(task);
        this.storage.updateLocalStorage();
    }

    editCategory(categoryID, data){
        let category = this.storage.getCategoryByID(categoryID);
        if (data.title !== undefined) category.title = data.title;
        this.storage.updateLocalStorage();
        return true;
    }

    editTask(categoryID, taskID, data){
        let category = this.storage.getCategoryByID(categoryID);
        if (!category) return;
        let task = category.getTaskByID(taskID);
        if (!task) return;
        if (data.title !== undefined) task.title = data.title;
        if (data.description !== undefined) task.description = data.description;
        if (data.priority !== undefined) task.priority = data.priority;
        if (data.status !== undefined) task.status = data.status;
        this.storage.updateLocalStorage();
        return true;
    }

    toggleTaskStatus(task){
        task.status = !task.status;
        this.storage.updateLocalStorage();
        return task;
    }

    deleteCategory(id){
        if (!this.storage.deleteCategory(id)) return;
        this.storage.updateLocalStorage();
        return true;
    }

    deleteTask(categoryID, taskID){
        let category = this.storage.getCategoryByID(categoryID);
        if (!category.deleteTask(taskID)) return;
        this.storage.updateLocalStorage();
        return true;
    }
}
