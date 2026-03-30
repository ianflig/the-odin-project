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
        this.deleteDialog.addEventListener("close", () => {document.querySelector("#delete-confirm-btn").dataset.categoryId = "";})

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
        document.querySelector("#delete-confirm-btn").dataset.categoryId = categoryToDelete.id;
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
            button.dataset.categoryId = ele.id;
            editSVG.classList.add("edit-category-btn");
            deleteSVG.classList.add ( "delete-category-btn");
            editSVG.innerHTML = '<use href="#edit-icon"></use>';
            deleteSVG.innerHTML = '<use href="#delete-icon"></use>';
            divIcons.classList.add("icons");
            buttonSpan.classList.add("category-name");
            divIcons.appendChild(editSVG);
            divIcons.appendChild(deleteSVG);
            button.appendChild(buttonSpan);
            button.appendChild(divIcons);
            this.categoryContainer.appendChild(button);
        });
    }

    removeCategoryView(categoryId) {
        const categoryElement = document.querySelector(`[data-category-id="${categoryId}"]`);
        
        if (categoryElement) {
            categoryElement.remove(); 
        }
    }

    updateCategoryView(categoryId, data){
        const categoryElement = document.querySelector(`[data-category-id="${categoryId}"]`);

        if (categoryElement){
            const titleSpan = categoryElement.querySelector(".category-name");
            const currentCategory = document.querySelector("#current-category");
            console.log(currentCategory)
            titleSpan.textContent = data.title;
            currentCategory.textContent = data.title;

        }
    }

    renderTasks(category){
        if (!category) {
            document.querySelector("#current-category").textContent = "Select or create a new category";
            this.allTasks.innerHTML = ""
            return};
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
            divTask.dataset.category = category.id;
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
            if (ele.status) divTask.classList.add("completed");

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

    renderTaskDescription(task){
        const descriptionContainer = document.querySelector("#description-section-task-description");
        descriptionContainer.innerHTML = "";
        const h4Title = document.createElement("h4");
        const h4DueDate = document.createElement("h4");
        const h4Priority = document.createElement("h4");
        const h4Description = document.createElement("h4");
        const spanTitle = document.createElement("span");
        const spanDueDate = document.createElement("span");
        const spanPriority = document.createElement("span");
        const spanDescription = document.createElement("span");

        h4Title.textContent = "Title: ";
        spanTitle.textContent = task.title;
        h4DueDate.textContent = "Due Date: "
        spanDueDate.textContent = task.dueDate;
        h4Priority.textContent = "Priority: ";
        spanPriority.textContent = task.priority;
        h4Description.textContent = "Description: "
        spanDescription.textContent = task.description;

        h4Title.appendChild(spanTitle);
        descriptionContainer.appendChild(h4Title);
        h4DueDate.appendChild(spanDueDate);
        descriptionContainer.appendChild(h4DueDate);
        h4Priority.appendChild(spanPriority);
        descriptionContainer.appendChild(h4Priority);
        h4Description.appendChild(spanDescription);
        descriptionContainer.appendChild(h4Description);
    }

    updateTaskStatusView(taskId, status){
        const taskElement = document.querySelector(`[data-task="${taskId}"]`);

        if (taskElement){
            taskElement.classList.toggle("completed", status);
        }
    }
}

export class ScreenController{
    currentCaterogyId = null;
    constructor(appLogic){
        this.dialogs = new DialogManager();
        this.renderer = new DOMRenderer();
        this.controller = appLogic;

        /* category */
        this.newCategoryBtn = document.querySelector("#new-category-btn");
        this.closeCategoryBtn = document.querySelector("#category-close-btn");
        this.saveCategoryBtn = document.querySelector("#category-save-btn");
        this.categoryForm = document.querySelector("#category-form");
        this.categoryContainer = document.querySelector("#category-container");

        /* delete */
        this.confirmDeleteBtn = document.querySelector("#delete-confirm-btn");
        this.closeDeleteBtn = document.querySelector("#delete-close-btn");

        /* tasks */
        this.newTaskBtn = document.querySelector("#new-task-btn");
        this.closeTaskBtn = document.querySelector("#task-close-btn");
        this.saveTaskBtn = document.querySelector("#task-save-btn");
        this.taskForm = document.querySelector("#task-form");
        this.taskContainer = document.querySelector("#all-tasks");
        this.closeWarningTaskDialog = document.querySelector("#task-warning-close-btn");

        this.bindEvents();
    }

    bindEvents(){
        /* category */
        this.newCategoryBtn.addEventListener("click", () => {this.dialogs.openCategoryModal()});
        this.closeCategoryBtn.addEventListener("click", () => {this.dialogs.closeCategoryModal()});
        this.categoryContainer.addEventListener("click", (e) => {this.categoryContainerHandler(e)});
        this.categoryForm.addEventListener("submit", (e) => {this.categorySubmitHandler(e)});

        /* delete */
        this.confirmDeleteBtn.addEventListener("click", (e) => {this.deleteCategoryHandler(e)});
        this.closeDeleteBtn.addEventListener("click", () => {this.dialogs.closeDeleteModal()});

        /* tasks */
        this.newTaskBtn.addEventListener("click", () => {
            if (!this.currentCaterogyId) return this.dialogs.openTaskWarningModal();
            this.dialogs.openTaskModal();
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

        /* editing */
        if (formData.categoryId){
            if (!this.controller.editCategory(formData.categoryId, formData)) return;
            this.renderer.updateCategoryView(formData.categoryId, formData)
            this.dialogs.closeCategoryModal();
            return;
        } else {
        /* creating */
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
        const categoryBtn = e.target.closest(".category-btn")
        if (!categoryBtn) return;
        const editBtn = e.target.closest(".edit-category-btn");
        const deleteBtn = e.target.closest(".delete-category-btn");
        const category = this.controller.storage.getCategoryByID(categoryBtn.dataset.categoryId);

        if (editBtn){
            this.dialogs.openCategoryModalForEdit(category);
            return;
        }
        if (deleteBtn) {
            this.dialogs.openDeleteModal(category);
            return;
        }
        if (categoryBtn && (this.currentCaterogyId !== category.id)){
            this.renderer.renderTasks(category);
            this.currentCaterogyId = category.id;
            return; 
        }
    }

    deleteCategoryHandler(e){
        e.preventDefault();
        const categoryId = document.querySelector("#delete-confirm-btn").dataset.categoryId
        if (!this.controller.deleteCategory(categoryId)) return;
        this.renderer.removeCategoryView(categoryId);
        if (this.currentCaterogyId === categoryId) {
            this.currentCaterogyId = null;
            this.renderer.renderTasks(null)};
        this.dialogs.closeDeleteModal();
    }

    taskSubmitHandler(e){
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this.taskForm));
        const categoryId = this.currentCaterogyId;

        /* editing */
        if (formData.taskId){
            this.controller.editTask(formData.taskId, formData);
        } else {
        /* creating */
            this.controller.createTask(categoryId, formData);
        }

        this.dialogs.closeTaskModal();
        this.renderer.renderTasks(this.controller.storage.getCategoryByID(categoryId));
    }

    taskContainerHandler(e){
        e.preventDefault();
        const taskContainer = e.target.closest(".task")
        if (!taskContainer) return;

        const checkBtn = e.target.closest(".check-btn")
        const editBtn = e.target.closest(".edit-btn");
        const deleteBtn = e.target.closest(".delete-btn");

        const category = this.controller.storage.getCategoryByID(taskContainer.dataset.category);
        const task = category.getTaskByID(taskContainer.dataset.task);

        if (checkBtn){
            const updatedTask = this.controller.toggleTaskStatus(task);
            this.renderer.updateTaskStatusView(updatedTask.id, updatedTask.status);
            return;
        }
        if (editBtn){
            this.dialogs.openCategoryModalForEdit(category);
            return;
        }
        if (deleteBtn) {
            this.dialogs.openDeleteModal(category);
            return;
        }
        if (taskContainer){
            this.renderer.renderTaskDescription(task);
            return; 
        }
    }

    deleteTaskHandler(){

    }
}