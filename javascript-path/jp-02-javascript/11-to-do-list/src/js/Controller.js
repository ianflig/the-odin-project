import { Task } from './Task.js';
import { Category } from './Category.js';

export class Controller{
    constructor(storage){
        this.storage = storage;
    }

    createCategory(data){
        let category = new Category(data);
        this.storage.addCategory(category);
        return category;
    }

    createTask(categoryID, data){
        let category = this.storage.getCategoryByID(categoryID)
        let task = new Task(data);
        category.addTask(task);
    }

    editCategory(categoryID, data){
        let category = this.storage.getCategoryByID(categoryID);
        if (data.title !== undefined) category.title = data.title;
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
    }

    deleteCategory(id){
        this.storage.deleteCategory(id);
    }

    deleteTask(categoryID, taskID){
        let category = this.storage.getCategoryByID(categoryID);
        category.deleteTask(taskID);
    }
}
