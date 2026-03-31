export class Task {
    constructor({
        title, 
        description, 
        priority = "Low",
        status = false,
        id
    }) {
        this.id = (id) ? id : crypto.randomUUID();
        this.title = (title && title.trim() !== "") ? title.trim() : "New Task";
        this.dueDate = new Date().toISOString().split('T')[0];
        this.description = (description && description.trim() !== "") ? description.trim() : "No Description";
        this.priority = priority;
        this.status = status;
    }
}
