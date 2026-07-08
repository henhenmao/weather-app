import Task from "./Tasks.js";

function createTask(title, description, dueDate, dueTime) {
  const newTask = new Task(title, description, dueDate, dueTime);
  // console.log(newTask);
  return newTask;
}

// creates and returns the DOM element for a new task to be inserted into a project
// takes in a Task object
function createTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");

  const checkDiv = document.createElement("div");
  checkDiv.classList.add("check-div");
  const checkTask = document.createElement("input");
  checkTask.type = "checkbox";
  checkTask.classList.add("task-check");
  checkTask.checked = task.completed;

  const taskButtons = document.createElement("div");
  taskButtons.classList.add("task-buttons");

  // const editTask = document.createElement("button");
  // editTask.textContent = "edit";

  const deleteTask = document.createElement("button");
  deleteTask.textContent = "X";
  deleteTask.classList.add("delete-task-button");
  deleteTask.classList.add("close-button");

  // taskDetails div will contain the title, due date/time, and edit/delete buttons
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");

  const taskTitle = document.createElement("div");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.title;

  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");
  taskDescription.textContent = task.description;

  const taskDue = document.createElement("div");
  taskDue.classList.add("task-due");

  const taskDate = document.createElement("div");
  taskDate.classList.add("task-date");
  taskDate.textContent = task.dueDate;

  const taskTime = document.createElement("div");
  taskTime.classList.add("task-time");
  taskTime.textContent = task.dueTime;

  taskDue.append(taskDate, taskTime);
  taskInfo.append(taskTitle, taskDescription, taskDue);
  taskInfo.classList.toggle("completed", task.completed);

  checkTask.addEventListener("change", () => {
    task.completed = checkTask.checked;
    taskInfo.classList.toggle("completed", checkTask.checked);
  });

  // taskButtons.append(editTask, deleteTask);
  taskButtons.append(deleteTask);
  checkDiv.append(checkTask);

  taskDetails.append(taskInfo, taskButtons);
  taskDiv.append(checkDiv, taskDetails);

  return taskDiv;
}

export { createTask, createTaskDiv };
