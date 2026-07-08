export default class Tasks {
  constructor(title, description, dueDate, dueTime) {
    this.title = title;
    this.description = description;
    this.dueTime = dueTime;
    this.dueDate = dueDate;
    this.completed = false;
    // this.priority = priority;
  }
}
