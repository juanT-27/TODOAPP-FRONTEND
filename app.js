let userTasks = [];
const tasksContainer = [
  document.querySelector(".taskSections"),
  document.querySelector("#taskTemplate"),
];

const addTask = (form) => {
  let inputs = form.querySelectorAll("input");
  let newTask = {};
  inputs.forEach((input) => {
    if (input.type !== "submit") {
      let data = input.name;
      switch (data) {
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
  userTasks.push(newTask);
  showTasks(userTasks);
};

const showTasks = (tasks) => {
  tasks.forEach((task) => {
    const taskTemplate = document.importNode(tasksContainer[1].content, true);
    console.log(taskTemplate)
    taskTemplate.querySelector(".taskTitle").textContent = task.title;
    taskTemplate.querySelector(".taskDesc").textContent = task.taskDesc;
    taskTemplate.querySelector(".taskDate").textContent = task.finishDate;
    tasksContainer[0].appendChild(taskTemplate);
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    let formSubmited = e.target.getAttribute("id");
    switch (formSubmited) {
      case "addTask":
        addTask(e.target);
        break;
      case "taskController":
        alert("Controller");
        break;
    }
  });
});
