import { Task } from './Task.js';
import { Category } from './Category.js';

export class Storage {
    vault = [];
    constructor() { 
        this.init();
    }

    init(){
        this.setLocalStorageData();
    }

    setLocalStorageData(){
        if (!localStorage.getItem("vault")) localStorage.setItem("vault", "[]");
        let data = JSON.parse(localStorage.getItem("vault"));
        data.forEach(category => {
            let newCategory = new Category(category);
            category.tasks.forEach(task => {
                let newTask = new Task(task);
                newCategory.addTask(newTask);
            })
            this.vault.push(newCategory);
        })
    }

    addCategory(category) {
        this.vault.push(category);
        console.log(`Category created, ID: ${category.id}`);
    }

    deleteCategory(id) {
        this.vault = this.vault.filter(ele => ele.id !== id);
        return true;
    }

    getCategoryByID(id) {
        let category = this.vault.find(ele => ele.id === id);
        return category;
    }

    updateLocalStorage() {
        let vaultArray = JSON.stringify(this.vault);
        localStorage.setItem("vault", vaultArray);
    }
}
