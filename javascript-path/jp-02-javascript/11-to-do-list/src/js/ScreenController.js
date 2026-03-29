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
        this.categoryDialog.addEventListener("close", () => {
            this.categoryForm.reset();
            document.querySelector("#hidden-category-id").value = "";
        })
        this.taskDialog.addEventListener("close", () => {this.taskForm.reset()});
    }

    openCategoryModal(){
        this.categoryDialog.showModal();
    }

    openCategoryModalForEdit(categoryToEdit){
        document.querySelector("#category-title").value = categoryToEdit.title;
        document.querySelector("#hidden-category-id").value = categoryToEdit.id;
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
            const buttonSpan = document.createElement("span");
            const divIcons = document.createElement("div");
            const editSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            buttonSpan.textContent = ele.title;
            button.classList.add("category-btn");
            button.id = "category-btn"
            button.dataset.id = ele.id;
            editSVG.id = "edit-category-btn";
            deleteSVG.id = "delete-category-btn";
            editSVG.innerHTML = '<use href="#edit-icon"></use>';
            deleteSVG.innerHTML = '<use href="#delete-icon"></use>';
            divIcons.classList.add("icons");
            divIcons.appendChild(editSVG);
            divIcons.appendChild(deleteSVG);
            button.appendChild(buttonSpan);
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
        this.categoryContainer = document.querySelector("#category-container");

        this.newTaskBtn = document.querySelector("#new-task-btn");
        this.closeTaskbtn = document.querySelector("#task-close-btn");
        this.saveTaskBtn = document.querySelector("#task-save-btn");
        this.taskForm = document.querySelector("#task-form");

        this.bindEvents();
    }

    bindEvents(){
        this.newCategoryBtn.addEventListener("click", () => {this.dialogs.openCategoryModal()});
        this.closeCategoryBtn.addEventListener("click", () => {this.dialogs.closeCategoryModal()});
        this.categoryContainer.addEventListener("click", (e) => {this.categoryContainerHandler(e)});
        this.categoryForm.addEventListener("submit", (e) => {this.categorySubmitHandler(e)});

        this.newTaskBtn.addEventListener("click", () => {this.dialogs.openTaskModal()});
        this.closeTaskbtn.addEventListener("click", () => {this.dialogs.closeTaskModal()});
        this.saveTaskBtn.addEventListener("submit", (e) => {this.saveTaskHandler(e)});
    }

    categorySubmitHandler(e){
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this.categoryForm));

        if (formData.categoryId){
            this.controller.editCategory(formData.categoryId, formData);
        } else {
            this.controller.createCategory(formData);
        }

        this.dialogs.closeCategoryModal();
        this.renderer.renderCategories(this.controller.storage.vault);
    }

    categoryContainerHandler(e){
        e.preventDefault();
        const editBtn = e.target.closest("#edit-category-btn");
        const categoryContainer = e.target.closest("#category-btn");
        if (editBtn){
            const category = this.controller.storage.getCategoryByID(categoryContainer.dataset.id)

            this.dialogs.openCategoryModalForEdit(category);
        }
    }

    saveTaskHandler(e){
        e.preventDefault();
    }
}