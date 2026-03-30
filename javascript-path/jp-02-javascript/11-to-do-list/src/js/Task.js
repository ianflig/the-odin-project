export class Task {
    constructor({
        title, 
        dueDate = new Date().toISOString().split('T')[0], /* to change */
        description, 
        priority = "Low",    /* to change */
        status = false   /* to change */
    }) {
        this.id = crypto.randomUUID();
        this.title = (title && title.trim() !== "") ? title.trim() : "New Task";
        this.dueDate = dueDate;
        this.description = (description && description.trim() !== "") ? description.trim() : "No Description";
        this.priority = priority;
        this.status = status;
    }
}
