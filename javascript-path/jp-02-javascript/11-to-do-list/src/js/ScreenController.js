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
        this.deleteDialog.addEventListener("close", () => {document.querySelector("#delete-confirm-btn").dataset.categoryId = "";})

        /* ---- TASK ---- */
        this.taskDialog.addEventListener("close", () => {
            this.taskForm.reset();
            document.querySelector("#hidden-task-id").value = "";
        })
        this.deleteDialog.addEventListener("close", () => {
            document.querySelector("#delete-confirm-btn").dataset.taskId = "";
            document.querySelector("#delete-confirm-btn").dataset.categoryIdForTask = "";
        })
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

    openTaskModalForEdit(taskToEdit){
        document.querySelector("#task-title").value = taskToEdit.title;
        document.querySelector(`input[name="priority"][value="${taskToEdit.priority}"]`).checked = true;
        document.querySelector("#task-description").value = taskToEdit.description;
        document.querySelector("#hidden-task-id").value = taskToEdit.id;
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

    openDeleteCategoryModal(categoryToDelete){
        document.querySelector("#delete-confirm-btn").dataset.categoryId = categoryToDelete.id;
        this.deleteDialog.showModal();
    }

    openDeleteTaskModal(taskIdToDelete, categoryIdToCheck){
        document.querySelector("#delete-confirm-btn").dataset.taskId = taskIdToDelete;
        document.querySelector("#delete-confirm-btn").dataset.categoryIdForTask = categoryIdToCheck;
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

    renderCategories(categoryArray, currentCategoryId){
        this.categoryContainer.innerHTML = "";
        
        categoryArray.forEach(ele => {
            const button = document.createElement("button");
            const buttonSpan = document.createElement("span");
            const divIcons = document.createElement("div");
            const editSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            buttonSpan.textContent = ele.title;
            button.classList.add("category-btn");
            if (currentCategoryId === ele.id) {button.classList.add("active")};
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

    updateCategoryView(data){
        const categoryElement = document.querySelector(`[data-category-id="${data.id}"]`);

        if (categoryElement){
            const titleSpan = categoryElement.querySelector(".category-name");
            const currentCategory = document.querySelector("#current-category");
            titleSpan.textContent = data.title;
            currentCategory.textContent = data.title;
        }
    }

    removeCategoryView(category) {
        const categoryElement = document.querySelector(`[data-category-id="${category.id}"]`);
        
        if (!categoryElement) return;
        
        categoryElement.remove(); 

        return true;
    }

    renderTasks(category, currentTaskDescriptionId){
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

            divTask.dataset.taskId = ele.id;
            divTask.dataset.category = category.id;
            divTask.classList.add("task");
            if (ele.id === currentTaskDescriptionId) {divTask.classList.add("active")};
            divTaskTitle.classList.add("task-title-container")
            h4.textContent = ele.title;
            h4.classList.add("task-title")
            divPriority.classList.add(ele.priority);
            divPriority.classList.add("task-priority")
            divPriority.textContent = ele.priority;
            description.textContent = ele.description;
            description.classList.add("task-description");
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

    updateTaskStatusView(taskId, status){
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

        if (taskElement){
            taskElement.classList.toggle("completed", status);
        }
    }

    updateTaskView(task){
        const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);

        if (!taskElement) return;

        const titleH4 = taskElement.querySelector(".task-title");
        const priorityDiv = taskElement.querySelector(".task-priority")
        const descriptionPara = taskElement.querySelector(".task-description")
        titleH4.textContent = task.title;
        priorityDiv.textContent = task.priority;
        priorityDiv.className = `task-priority ${task.priority}`;
        descriptionPara.textContent = task.description;

        return true;
    }

    removeTaskView(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        
        if (!taskElement) return;

        taskElement.remove(); 
    
        return true;
    }
    

    renderTaskDescription(task){
        const descriptionContainer = document.querySelector("#description-section-task-description");
        if (!task) {
            return descriptionContainer.innerHTML = "";
        };

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

        return true;
    }
}

export class ScreenController{
    currentCategoryId = null;
    currentTaskDescriptionId = null;
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
        this.categoryBtn = document.querySelector(".category-btn");

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
        this.confirmDeleteBtn.addEventListener("click", (e) => {
            this.deleteCategoryHandler(e);
            this.deleteTaskHandler(e);
        });
        this.closeDeleteBtn.addEventListener("click", () => {this.dialogs.closeDeleteModal()});

        /* tasks */
        this.newTaskBtn.addEventListener("click", () => {
            if (!this.currentCategoryId) return this.dialogs.openTaskWarningModal();
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

        if (formData.categoryId){
            /* editing */
            if (!this.controller.editCategory(formData.categoryId, formData)) return;
            const category = this.controller.storage.getCategoryByID(formData.categoryId);
            this.renderer.updateCategoryView(category);
        } else {
            /* creating */
            const newCategory = this.controller.createCategory(formData);
            
            this.currentCategoryId = newCategory.id;
            this.renderer.renderCategories(this.controller.storage.vault, this.currentCategoryId);
            this.renderer.renderTasks(newCategory, this.currentTaskDescriptionId);
            this.swapCategoryState(newCategory.id)
        }

        this.dialogs.closeCategoryModal();
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
            this.dialogs.openDeleteCategoryModal(category);
            return;
        }
        if (categoryBtn && (this.currentCategoryId !== category.id)){
            this.currentCategoryId = category.id;
            this.renderer.renderTasks(category, this.currentTaskDescriptionId);
            this.swapCategoryState(category.id);
            return; 
        }
    }

    deleteCategoryHandler(e){
        e.preventDefault();
        if (!e.target.dataset.categoryId) return;

        const categoryId = e.target.dataset.categoryId;
        const category = this.controller.storage.getCategoryByID(categoryId);
        
        if (!this.controller.deleteCategory(category.id)) return;

        if (!this.renderer.removeCategoryView(category)) return;

        if (category.tasks.find(ele => ele.id === this.currentTaskDescriptionId)) this.renderer.renderTaskDescription(null);

        if (this.currentCategoryId === category.id) {
            this.currentCategoryId = null;
            this.renderer.renderTasks(null);
            this.renderer.renderTaskDescription(null);
        };
        this.dialogs.closeDeleteModal();
    }

    swapCategoryState(categoryId){
        const previousCategory = this.categoryContainer.querySelector(".active");
        if (previousCategory) {
            previousCategory.classList.remove("active");
        }

        const newCategory = this.categoryContainer.querySelector(`[data-category-id="${categoryId}"]`);
        if (newCategory) {
            newCategory.classList.add("active");
        }
    }

    taskSubmitHandler(e){
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(this.taskForm));
        const categoryId = this.currentCategoryId;

        /* editing */
        if (formData.taskId){
            if (!this.controller.editTask(categoryId, formData.taskId, formData)) return;
            /* for renderTaskDescription */
            const category = this.controller.storage.getCategoryByID(categoryId);
            const task = category.getTaskByID(formData.taskId);

            if (!this.renderer.updateTaskView(task)) return;
            if (this.currentTaskDescriptionId === task.id) this.renderer.renderTaskDescription(task);

            this.dialogs.closeTaskModal();
            return;
        } else {
        /* creating */
            this.controller.createTask(categoryId, formData);
        }

        this.dialogs.closeTaskModal();
        this.renderer.renderTasks(this.controller.storage.getCategoryByID(categoryId), this.currentTaskDescriptionId);
    }

    taskContainerHandler(e){
        e.preventDefault();
        const taskContainer = e.target.closest(".task")
        if (!taskContainer) return;

        const checkBtn = e.target.closest(".check-btn")
        const editBtn = e.target.closest(".edit-btn");
        const deleteBtn = e.target.closest(".delete-btn");

        const category = this.controller.storage.getCategoryByID(taskContainer.dataset.category);
        const task = category.getTaskByID(taskContainer.dataset.taskId);

        if (checkBtn){
            const updatedTask = this.controller.toggleTaskStatus(task);
            this.renderer.updateTaskStatusView(updatedTask.id, updatedTask.status);
            return;
        }
        if (editBtn){
            this.dialogs.openTaskModalForEdit(task);
            return;
        }
        if (deleteBtn) {
            this.dialogs.openDeleteTaskModal(task.id, category.id);
            return;
        }
        if (taskContainer){
            if(this.renderer.renderTaskDescription(task)){
                this.currentTaskDescriptionId = task.id;
            }
            this.swapTaskState(task.id)
            return;
        }
    }

    deleteTaskHandler(e){
        e.preventDefault();
        if (!e.target.dataset.taskId) return;

        const categoryId = e.target.dataset.categoryIdForTask;
        const taskId = e.target.dataset.taskId;

        if (!this.controller.deleteTask(categoryId, taskId)) return;

        if (!this.renderer.removeTaskView(taskId)) return;

        if (taskId === this.currentTaskDescriptionId) {this.renderer.renderTaskDescription(null);}

        this.dialogs.closeDeleteModal();
    }

    swapTaskState(taskId){
        const previousTask = this.taskContainer.querySelector(".active");
        if (previousTask) {
            previousTask.classList.remove("active");
        }

        const newTask = this.taskContainer.querySelector(`[data-task-id="${taskId}"]`);
        if (newTask) {
            newTask.classList.add("active");
        }
    }
}