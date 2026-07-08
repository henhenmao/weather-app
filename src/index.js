import "./styles.css";
import Task from "./Tasks.js";
import Project from "./Project.js";
import { createTask, createTaskDiv } from "./createTask.js";
import { createProjectDiv } from "./createProject.js";

const page = document.getElementById("page");
const main = document.getElementById("main");
const newTaskDiv = document.getElementById("new-task-div");
const newProjectDiv = document.getElementById("new-project-div");

// action performed after the submit button of a new task is clicked
const newTaskForm = document.querySelector(".new-task-details");
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("new-title").value;
  const taskDescription = document.getElementById("new-description").value;
  const taskDate = document.getElementById("new-date").value;
  const taskTime = document.getElementById("new-time").value;
  const selectedProject =
    projects[document.getElementById("new-project-select").value];

  const newTask = new Task(taskTitle, taskDescription, taskDate, taskTime);
  addTask(selectedProject, newTask);
  closeForm(newTaskDiv, newTaskForm);
});

// "New Project" button click event
const newProjectButton = document.getElementById("new-project-button");
newProjectButton.addEventListener("click", () => {
  newProjectDiv.classList.add("visible");
  const textBox = document.getElementById("new-project-title");
  textBox.focus();
});

let projects = [];
const newProjectSelect = document.getElementById("new-project-select");
const projectContentDivs = new Map();

const STORAGE_KEY = "todoListProjects";

function saveState() {
  const data = projects.map((project) => ({
    name: project.name,
    tasks: project.tasks.map((task) => ({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      completed: task.completed,
    })),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function renderProjectOptions() {
  newProjectSelect.innerHTML = "";
  projects.forEach((project, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = project.name;
    newProjectSelect.append(option);
  });
}

const newProjectForm = document.querySelector(".new-project-details");
newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectTitle = document.getElementById("new-project-title").value;
  const project = new Project(projectTitle);

  addProject(project);

  closeForm(newProjectDiv, newProjectForm);
});

function addProject(project) {
  projects.push(project);

  const { projectDiv, sidebarDiv } = createProjectDiv(project);
  main.append(projectDiv);

  const contentDiv = projectDiv.querySelector(".project-content");
  projectContentDivs.set(project, contentDiv);

  renderProjectOptions();

  const newTaskButton = projectDiv.querySelector(".new-task-button");
  newTaskButton.addEventListener("click", () => {
    newProjectSelect.value = projects.indexOf(project);
    newTaskDiv.classList.add("visible");
    document.getElementById("new-title").focus();
  });

  const deleteProjectButton = projectDiv.querySelector(
    ".delete-project-button",
  );
  deleteProjectButton.addEventListener("click", () => {
    if (!confirm(`Delete "${project.name}" and all of its tasks?`)) return;
    removeProject(project, projectDiv, sidebarDiv);
  });

  saveState();
}

function removeProject(project, projectDiv, sidebarDiv) {
  projects = projects.filter((p) => p !== project);
  projectContentDivs.delete(project);
  projectDiv.remove();
  sidebarDiv.remove();
  renderProjectOptions();
  saveState();
}

// for closing the "New Task" / "New Project" menus
function closeForm(div, form) {
  if (!div.classList.contains("visible")) return;
  div.classList.remove("visible");
  form.reset();
}

// button that closes the "New Task" menu
const closeTaskFormButton = document.getElementById("close-new-task");
closeTaskFormButton.addEventListener("click", () => {
  closeForm(newTaskDiv, newTaskForm);
});

const closeProjectFormButton = document.getElementById("close-new-project");
closeProjectFormButton.addEventListener("click", () => {
  closeForm(newProjectDiv, newProjectForm);
});

function addTask(project, task) {
  project.tasks.push(task);
  const newDiv = createTaskDiv(task);
  const projectDiv = projectContentDivs.get(project);
  projectDiv.append(newDiv);

  const deleteButton = newDiv.querySelector(".delete-task-button");
  deleteButton.addEventListener("click", () => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    project.removeTask(task);
    newDiv.remove();
    saveState();
  });

  const checkTask = newDiv.querySelector(".task-check");
  checkTask.addEventListener("change", () => {
    saveState();
  });

  saveState();
}

// restore projects/tasks from localStorage, or fall back to an example

const savedProjects = loadState();

if (savedProjects && savedProjects.length > 0) {
  savedProjects.forEach((projectData) => {
    const project = new Project(projectData.name);
    addProject(project);
    projectData.tasks.forEach((taskData) => {
      const task = new Task(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.dueTime,
      );
      task.completed = taskData.completed;
      addTask(project, task);
    });
  });
} else {
  // auto load with default task and project if no projects anymore
  const exampleTask = new Task(
    "My Task",
    "Description of my task :3",
    "2026-07-06",
    "09:21",
  );

  const defaultProject = new Project("Project 1");
  addProject(defaultProject);
  addTask(defaultProject, exampleTask);
}
