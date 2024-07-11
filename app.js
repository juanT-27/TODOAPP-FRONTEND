let userTasks = [];

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
  userTasks.push(newTask)
  showTasks(userTasks)
};


const showTasks= (tasks) =>{
    tasks.forEach((task) =>{

    })
}

const createElements= (tag, attrib= {}, elementChilds) =>{
    const elements= document.createElement(tag)
    
}


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
