import { Task } from './Task.js';
import { Category } from './Category.js';

export class Controller{
    constructor(storage){
        this.storage = storage;
    }

    createCategory(data){
        let category = new Category(data);
        this.storage.addCategory(category);
    }

    createTask(categoryID, {title, dueDate, description, priority, status}){
        let category = this.storage.getCategoryByID(categoryID)
        let task = new Task(title, dueDate, description, priority, status);
        category.addTask(task);
    }

    editCategory(categoryID, {title} = {}){
        let category = this.storage.getCategoryByID(categoryID);
        if (title !== undefined) category.title = title;
    }

    editTask(categoryID, taskID, {title, description, priority, status} = {}){
        let category = this.storage.getCategoryByID(categoryID);
        if (!category) return;
        let task = category.getTaskByID(taskID);
        if (!task) return;
        if (title !== undefined) task.title = title;
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
