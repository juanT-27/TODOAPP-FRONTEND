class TaskManager {
  constructor(tasksContainer, taskTemplate) {
    this.tasksContainer = tasksContainer;
    this.taskTemplate = taskTemplate;
    this.userTasks = this.getTasksFromLocal() || [];
  }

  saveToLocal() {
    localStorage.setItem("userTasks", JSON.stringify(this.userTasks));
  }

  getTasksFromLocal() {
    return JSON.parse(localStorage.getItem("userTasks"));
  }

  checkRepetition(value) {
    return this.userTasks.some((task) => task.title === value);
  }

  inputsValidations(inputsArray, form) {
    let errorMessage = form.querySelectorAll(".inputErrors");
    let isValid = true;

    errorMessage.forEach((err) => (err.textContent = ""));

    inputsArray.forEach((input, index) => {
      if (input.value === "") {
        errorMessage[index].textContent = "You must write something";
        isValid = false;
      } else if (input.name === "title" && this.checkRepetition(input.value)) {
        errorMessage[index].textContent = "This title already exists";
        isValid = false;
      }
    });
    return isValid;
  }

  addTask(form) {
    let inputs = form.querySelectorAll("input");
    let inputsArray = Array.from(inputs);
    if (!this.inputsValidations(inputsArray, form)) return;

    let newTask = {};

    inputs.forEach((input) => {
      if (input.type !== "submit") {
        let inputName = input.name;
        switch (inputName) {
          case "title":
            newTask.title = input.value;
            break;
          case "taskDesc":
            newTask.taskDesc = input.value;
            break;
          case "finishDate":
            newTask.finishDate = input.value;
            break;
        }
      }
    });
    newTask["state"]= false
    this.userTasks.push(newTask);
    this.saveToLocal();
    this.showTasks();
  }

  showTasks() {
    let tasks = this.getTasksFromLocal() || [];
    this.tasksContainer.innerHTML = "";

    tasks.forEach((task) => {
      const taskTemplate = document.importNode(this.taskTemplate.content, true);
      taskTemplate.querySelector(".taskTitle").textContent = task.title;
      taskTemplate.querySelector(".taskDesc").textContent = task.taskDesc;
      taskTemplate.querySelector(".taskDate").textContent = task.finishDate;
      let form = taskTemplate.querySelector("#taskController");
      form.setAttribute("taskId", task.title);
      this.tasksContainer.appendChild(taskTemplate);
    });
  }

  deleteTask(idOfTaskToDelete) {
    let taskIndex = this.userTasks.findIndex((task) => task.title === idOfTaskToDelete);
    if (taskIndex !== -1) {
      this.userTasks.splice(taskIndex, 1);
      this.saveToLocal();
    } else {
      console.log("Task not found");
    }
    this.showTasks();
  }

  bindEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.showTasks(); // Show tasks on page load

      document.addEventListener("submit", (e) => {
        e.preventDefault();
        let formSubmited = e.target.getAttribute("id");
        switch (formSubmited) {
          case "addTask":
            this.addTask(e.target);
            break;
          case "taskController":
            let idOfTaskToDelete = e.target.getAttribute("taskId");
            this.deleteTask(idOfTaskToDelete);
            break;
        }
      });

      document.addEventListener("checked", )
    });
  }
}

// Instantiate and initialize the TaskManager
const taskManager = new TaskManager(
  document.querySelector(".taskSections"),
  document.querySelector("#taskTemplate")
);

// Bind event listeners
taskManager.bindEventListeners();
