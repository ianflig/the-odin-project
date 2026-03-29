class DialogManager{
    constructor(){
        this.categoryDialog = document.querySelector("#category-dialog");
        this.categoryForm = document.querySelector("#category-form");

        this.deleteDialog = document.querySelector("#delete-dialog");

        this.taskDialog = document.querySelector("#task-dialog");
        this.taskForm = document.querySelector("#task-form");

        this.bindEvents();
    }

    bindEvents(){
        this.categoryDialog.addEventListener("close", () => {this.categoryForm.reset();})
        this.taskDialog.addEventListener("close", () => {this.taskForm.reset()});
    }

    openCategoryModal(){
        this.categoryDialog.showModal();
    }

    openTaskModal(){
        this.taskDialog.showModal();
    }

    openDeleteModal(){
        this.deleteDialog.showModal();
    }

    closeCategoryModal(){
        this.categoryDialog.close();
    }

    closeTaskModal(){
        this.taskDialog.close();
    }

    closeDeleteModal(){
        this.deleteDialog.close();
    }
}

class DOMRenderer{
    constructor(){
        this.categoryContainer = document.querySelector("#category-container");
    }

    renderCategories(categoryArray){
        this.categoryContainer.innerHTML = "";

        categoryArray.forEach(ele => {
            const button = document.createElement("button");
            const divIcons = document.createElement("div");
            const editSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            button.textContent = ele.title;
            button.classList.add("category-btn");
            button.dataset.id = ele.id;
            editSVG.innerHTML = '<use href="#edit-icon"></use>';
            deleteSVG.innerHTML = '<use href="#delete-icon"></use>';
            divIcons.classList.add("icons");
            divIcons.appendChild(editSVG);
            divIcons.appendChild(deleteSVG);
            button.appendChild(divIcons);
            this.categoryContainer.appendChild(button);
        });
    }
}

export class ScreenController{
    constructor(appLogic){
        this.dialogs = new DialogManager();
        this.renderer = new DOMRenderer();
        this.controller = appLogic;

        this.newCategoryBtn = document.querySelector("#new-category-btn");
        this.closeCategoryBtn = document.querySelector("#category-close-btn");
        this.saveCategoryBtn = document.querySelector("#category-save-btn");
        this.categoryForm = document.querySelector("#category-form");

        this.newTaskBtn = document.querySelector("#new-task-btn");
        this.closeTaskbtn = document.querySelector("#task-close-btn");
        this.saveTaskBtn = document.querySelector("#task-save-btn");
        this.taskForm = document.querySelector("#task-form");

        this.bindEvents();
    }

    bindEvents(){
        this.newCategoryBtn.addEventListener("click", () => {this.dialogs.openCategoryModal()});
        this.closeCategoryBtn.addEventListener("click", () => {this.dialogs.closeCategoryModal()});
        this.categoryForm.addEventListener("submit", (e) => {this.saveCategoryHandler(e)});

        this.newTaskBtn.addEventListener("click", () => {this.dialogs.openTaskModal()});
        this.closeTaskbtn.addEventListener("click", () => {this.dialogs.closeTaskModal()});
        this.saveTaskBtn.addEventListener("submit", (e) => {this.saveTaskHandler(e)});
    }

    saveCategoryHandler(e){
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(this.categoryForm));
        console.log(formData);
        this.controller.createCategory(formData);
        this.renderer.renderCategories(this.controller.storage.vault);
        this.dialogs.closeCategoryModal();
    }

    saveTaskHandler(e){
        e.preventDefault();
    }
}