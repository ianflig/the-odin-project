class DialogManager{
    constructor(){
        this.categoryDialog = document.querySelector("#category-dialog");
        this.categoryForm = document.querySelector("#category-form");

        this.deleteDialog = document.querySelector("#delete-dialog");

        this.taskDialog = document.querySelector("#task-dialog");
        this.taskForm = document.querySelector("#task-form");
        this.taskWarningDialog = document.querySelector("#task-warning-dialog")

        this.bindEvents();
    }

    bindEvents(){
        /* ---- CATEGORY ---- */
        this.categoryDialog.addEventListener("close", () => {
            this.categoryForm.reset();
            document.querySelector("#hidden-category-id").value = "";
        })
        this.taskDialog.addEventListener("close", () => {this.taskForm.reset()});
        this.deleteDialog.addEventListener("close", () => {document.querySelector("#delete-confirm-btn").dataset.category = "";})

        /* ---- TASK ---- */
        this.taskDialog.addEventListener("close", () => {
            this.taskForm.reset();
            document.querySelector("#hidden-task-id").value = "";
        })
        this.taskDialog.addEventListener("close", () => {this.taskForm.reset()});
        this.deleteDialog.addEventListener("close", () => {document.querySelector("#delete-confirm-btn").dataset.task = "";})
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

    closeCategoryModal(){
        this.categoryDialog.close();
    }

    closeTaskModal(){
        this.taskDialog.close();
    }

    openTaskWarningModal(){
        this.taskWarningDialog.showModal();
    }

    closeTaskWarningModal(){
        this.taskWarningDialog.close();
    }

    openDeleteModal(categoryToDelete){
        document.querySelector("#delete-confirm-btn").dataset.category = categoryToDelete.id;
        this.deleteDialog.showModal();
    }

    closeDeleteModal(){
        this.deleteDialog.close();
    }
}

class DOMRenderer{
    constructor(){
        this.categoryContainer = document.querySelector("#category-container");
        this.allTasks = document.querySelector(".all-tasks");
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
            button.dataset.category = ele.id;
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

    renderTasks(category){
        if (!category) {
            document.querySelector("#new-task-btn").dataset.category = "";
            document.querySelector("#current-category").textContent = "Select or create a new category";
            this.allTasks.innerHTML = ""
            return};

        document.querySelector("#new-task-btn").dataset.category = category.id;
        document.querySelector("#current-category").textContent = category.title;
        this.allTasks.innerHTML = "";
        if (!category.tasks) return;
        category.tasks.forEach(ele => {
            const divTask = document.createElement("div");
            const divTaskTitle = document.createElement("div");
            const h4 = document.createElement("h4");
            const divPriority = document.createElement("div");
            const description = document.createElement("p");
            const divIconContainer = document.createElement("div");
            const checkSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const editSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            divTask.dataset.task = ele.id;
            divTask.classList.add("task");
            divTaskTitle.classList.add("task-title-container")
            h4.textContent = ele.title;
            divPriority.classList.add(ele.priority);
            divPriority.textContent = ele.priority;
            description.textContent = ele.description;
            divIconContainer.classList.add("icon-container");
            checkSVG.classList.add("check-btn")
            checkSVG.innerHTML = '<use href="#check-icon"></use>';
            editSVG.classList.add("edit-btn");
            editSVG.innerHTML = '<use href="#edit-icon"></use>';
            deleteSVG.classList.add("delete-btn");
            deleteSVG.innerHTML = '<use href="#delete-icon"></use>';

            divTaskTitle.appendChild(h4);
            divTaskTitle.appendChild(divPriority);
            divTask.appendChild(divTaskTitle);
            divTask.appendChild(description);
            divIconContainer.appendChild(checkSVG);
            divIconContainer.appendChild(editSVG);
            divIconContainer.appendChild(deleteSVG);
            divTask.appendChild(divIconContainer);
            this.allTasks.appendChild(divTask);
        })
        
    }
}

export class ScreenController{
    currentCaterogyId = null;
    constructor(appLogic){
        this.dialogs = new DialogManager();
        this.renderer = new DOMRenderer();
        this.controller = appLogic;

        this.newCategoryBtn = document.querySelector("#new-category-btn");
        this.closeCategoryBtn = document.querySelector("#category-close-btn");
        this.saveCategoryBtn = document.querySelector("#category-save-btn");
        this.categoryForm = document.querySelector("#category-form");
        this.categoryContainer = document.querySelector("#category-container");

        this.confirmDeleteBtn = document.querySelector("#delete-confirm-btn");
        this.closeDeleteBtn = document.querySelector("#delete-close-btn");

        this.newTaskBtn = document.querySelector("#new-task-btn");
        this.closeTaskBtn = document.querySelector("#task-close-btn");
        this.saveTaskBtn = document.querySelector("#task-save-btn");
        this.taskForm = document.querySelector("#task-form");
        this.taskContainer = document.querySelector("#task-container");
        this.closeWarningTaskDialog = document.querySelector("#task-warning-close-btn");

        this.bindEvents();
    }

    bindEvents(){
        this.newCategoryBtn.addEventListener("click", () => {this.dialogs.openCategoryModal()});
        this.closeCategoryBtn.addEventListener("click", () => {this.dialogs.closeCategoryModal()});
        this.categoryContainer.addEventListener("click", (e) => {this.categoryContainerHandler(e)});
        this.categoryForm.addEventListener("submit", (e) => {this.categorySubmitHandler(e)});

        this.confirmDeleteBtn.addEventListener("click", (e) => {this.deleteHandler(e)});
        this.closeDeleteBtn.addEventListener("click", () => {this.dialogs.closeDeleteModal()});

        this.newTaskBtn.addEventListener("click", () => {
            if (!this.newTaskBtn.dataset.category) return this.dialogs.openTaskWarningModal();
            this.dialogs.openTaskModal()
        });
        this.closeTaskBtn.addEventListener("click", () => {this.dialogs.closeTaskModal()});
        this.taskContainer.addEventListener("click", (e) => {this.taskContainerHandler(e)});
        this.taskForm.addEventListener("submit", (e) => {this.taskSubmitHandler(e)});
        this.closeWarningTaskDialog.addEventListener("click", () => {this.dialogs.closeTaskWarningModal()})
    }

    categorySubmitHandler(e){
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this.categoryForm));

        let categoryIdToRender;

        if (formData.categoryId){
            this.controller.editCategory(formData.categoryId, formData);
            categoryIdToRender = formData.categoryId;
        } else {
            const newCategory = this.controller.createCategory(formData);
            categoryIdToRender = newCategory.id;
        }

        const categoryToRender = this.controller.storage.getCategoryByID(categoryIdToRender);

        this.currentCaterogyId = categoryToRender.id;
        this.dialogs.closeCategoryModal();
        this.renderer.renderCategories(this.controller.storage.vault);
        this.renderer.renderTasks(categoryToRender);
    }

    categoryContainerHandler(e){
        e.preventDefault();
        const editBtn = e.target.closest("#edit-category-btn");
        const deleteBtn = e.target.closest("#delete-category-btn");
        const categoryBtn = e.target.closest(".category-btn")
        const category = this.controller.storage.getCategoryByID(categoryBtn.dataset.category);

        if (editBtn){
            this.dialogs.openCategoryModalForEdit(category);
            return;
        }
        if (deleteBtn) {
            this.dialogs.openDeleteModal(category);
            return;
        }
        if (categoryBtn){
            this.renderer.renderTasks(category);
            this.currentCaterogyId = category.id;
            return; 
        }
    }

    taskSubmitHandler(e){
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this.taskForm));

        if (formData.taskId){
            this.controller.editTask(formData.taskId, formData);
        } else {
            this.controller.createTask(categoryId, formData);
        }

        this.dialogs.closeTaskModal();
        /* this.renderer.renderTasks(this.controller.storage.vault); */
    }

    taskContainerHandler(e){
/*         e.preventDefault();
        const editBtn = e.target.closest("#edit-category-btn");
        const deleteBtn = e.target.closest("#delete-category-btn");
        const categoryBtn = e.target.closest(".category-btn")
        const category = this.controller.storage.getCategoryByID(categoryBtn.dataset.category);

        if (editBtn){
            this.dialogs.openCategoryModalForEdit(category);
            return;
        }
        if (deleteBtn) {
            this.dialogs.openDeleteModal(category);
            return;
        }
        if (categoryBtn){
            this.renderer.renderTasks(category);
            return; 
        } */
    }

    deleteHandler(e){
        e.preventDefault();
        const categoryId = document.querySelector("#delete-confirm-btn").dataset.category
        this.controller.deleteCategory(categoryId);
        this.renderer.renderCategories(this.controller.storage.vault);
        if (this.currentCaterogyId === categoryId) {
            this.currentCaterogyId = null;
            this.renderer.renderTasks(null)};
        this.dialogs.closeDeleteModal();
    }

    saveTaskHandler(e){
        e.preventDefault();
    }
}