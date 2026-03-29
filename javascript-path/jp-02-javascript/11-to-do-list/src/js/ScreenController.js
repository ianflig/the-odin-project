class DialogManager{
    constructor(){
        this.saveCategoryDialog = document.querySelector("#save-category-dialog");
        this.saveTaskDialog = document.querySelector("#save-task-dialog");
        this.deleteDialog = document.querySelector("#delete-dialog");
    }

    openCategoryModal(){
        this.saveCategoryDialog.showModal();
    }

    openTaskModal(){
        this.saveTaskDialog.showModal();
    }

    openDeleteDialog(){
        this.deleteDialog.showModal();
    }
}

class DOMRenderer{

} 

export class ScreenController{
    constructor(){
        this.dialogs = new DialogManager();
        this.renderer = new DOMRenderer();
        this.newCategoryBtn = document.querySelector("#new-category-btn");
        this.newTaskBtn = document.querySelector("#new-task-btn");
        
        this.bindEvents();
    }

    bindEvents(){
        this.newCategoryBtn.addEventListener("click", () => {this.dialogs.openCategoryModal()});
        this.newTaskBtn.addEventListener("click", () => {this.dialogs.openTaskModal()})
        
    }
}