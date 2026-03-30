export class Task {
    constructor({
        title, 
        dueDate,
        description, 
        priority = "Low",
        status = false
    }) {
        this.id = crypto.randomUUID();
        this.title = (title && title.trim() !== "") ? title.trim() : "New Task";
        this.dueDate = (dueDate === "") ? new Date().toISOString().split('T')[0] : dueDate;
        this.description = (description && description.trim() !== "") ? description.trim() : "No Description";
        this.priority = priority;
        this.status = status;
    }
}
