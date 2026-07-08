import Project from "./Project.js";

function createProjectDiv(project) {
  const list = document.getElementById("projects-list");
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("project-header");

  const projectHeaderTop = document.createElement("div");
  projectHeaderTop.classList.add("project-header-top");

  const projectTitle = document.createElement("div");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = `${project.name}`;

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.classList.add("delete-project-button");
  deleteProjectButton.classList.add("close-button");
  deleteProjectButton.textContent = "X";

  const newTaskButton = document.createElement("button");
  newTaskButton.classList.add("add-btn");
  newTaskButton.classList.add("new-task-button");
  newTaskButton.textContent = "add task";

  const projectContent = document.createElement("div");
  projectContent.classList.add("project-content");

  projectHeaderTop.append(projectTitle, deleteProjectButton);
  projectHeader.append(projectHeaderTop, newTaskButton);
  projectDiv.append(projectHeader, projectContent);

  const sidebarDiv = addProjectToList(project, list, projectDiv);
  // console.log(projectDiv);
  return { projectDiv, sidebarDiv };
}

function addProjectToList(project, listDiv, projectDiv) {
  const sidebarProject = document.createElement("div");
  sidebarProject.classList.add("sidebar-project");

  const showProject = document.createElement("input");
  showProject.type = "checkbox";
  showProject.classList.add("show-project");
  showProject.checked = true;

  showProject.addEventListener("change", () => {
    if (showProject.checked) {
      projectDiv.classList.remove("collapsed");
      void projectDiv.offsetWidth; // force reflow so the fade-in transition runs
      projectDiv.classList.remove("hidden");
    } else {
      projectDiv.classList.add("hidden");
      projectDiv.addEventListener(
        "transitionend",
        () => {
          if (projectDiv.classList.contains("hidden")) {
            projectDiv.classList.add("collapsed");
          }
        },
        { once: true },
      );
    }
  });

  const projectTitle = document.createElement("div");
  projectTitle.classList.add("sidebar-project-title");
  projectTitle.textContent = project.name;

  sidebarProject.append(showProject, projectTitle);
  listDiv.append(sidebarProject);

  return sidebarProject;
}

export { createProjectDiv };
