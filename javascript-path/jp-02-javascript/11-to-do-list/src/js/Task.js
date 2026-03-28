export class Task {
    constructor({
        title = "New Task", 
        dueDate = new Date().toISOString().split('T')[0], 
        description = "No description", 
        priority = "Medium", 
        status = false
    }) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}
