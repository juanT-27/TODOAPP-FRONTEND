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

  displayErrorMessage(element, index, message) {}

  collectInputData(inputs) {
    let newTask = {};
    inputs.forEach((input) => {
      if (input.type !== "submit") {
        newTask[input.name] = input.value;
        newTask["state"] = false;
      }
    });
    return newTask;
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
    // form.preventDefault()
    let inputs = Array.from(form.querySelectorAll("input"));
    if (!this.inputsValidations(inputs, form)) return;
    let newTask = this.collectInputData(inputs);
    this.userTasks.push(newTask);
    this.saveToLocal();
    this.showTasks();
  }

  createTaskCard(task) {
    const taskTemplate = document.importNode(this.taskTemplate.content, true);
    const taskCard = taskTemplate.querySelector(".task");
    taskCard.classList.add(task.state ? "done" : "undone")
    taskTemplate.querySelector(".taskTitle").textContent = task.title;
    taskTemplate.querySelector(".taskDesc").textContent = task.taskDesc;
    taskTemplate.querySelector(".taskDate").textContent = task.finishDate;
    let form = taskTemplate.querySelector("#taskController");
    form.setAttribute("taskId", task.title);
    let checkTask = form.querySelector("#taskDone");
    checkTask.setAttribute("taskTitle", task.title );
    checkTask.checked= task.state;
    form.querySelector(".checkLabel").textContent=(task.state ? "Done": "To do")
    return taskTemplate;
  }

  showTasks() {
    this.tasksContainer.innerHTML = "";
    this.userTasks.forEach((task) => {
      let taskCard = this.createTaskCard(task);
      this.tasksContainer.appendChild(taskCard);
    });
  }

  deleteTask(idOfTaskToDelete) {
    let taskIndex = this.userTasks.findIndex(
      (task) => task.title === idOfTaskToDelete
    );
    if (taskIndex !== -1) {
      this.userTasks.splice(taskIndex, 1);
      this.saveToLocal();
    } else {
      console.log("Task not found");
    }
    this.showTasks();
  }

  handleSubmit(e) {
    let formId = e.target.getAttribute("id");
    if (formId === "addTask") {
      this.addTask(e.target);
    }
    if (formId === "taskController") {
      let idOfTaskToDelete = e.target.getAttribute("taskId");
      this.deleteTask(idOfTaskToDelete);
    }
  }

  handleTaskChecked(e) {
    let taskTitle = e.getAttribute("taskTitle");
    let task = this.userTasks.find((task) => task.title === taskTitle);
    if (task) {
      task.state = e.checked;
      this.saveToLocal();
      this.showTasks();
    }
  }
  bindEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.showTasks();
    });
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
    document.addEventListener("change", (e)=>{
      if(e.target.id=== "taskDone"){
        this.handleTaskChecked(e.target)
      }
    })
  }
}

// Instantiate and initialize the TaskManager
const taskManager = new TaskManager(
  document.querySelector(".taskSections"),
  document.querySelector("#taskTemplate")
);

// Bind event listeners
taskManager.bindEventListeners();
