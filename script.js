let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox"); 
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      renderTasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    // Delete task
    btn.addEventListener("click", function () {
      tasks.splice(index, 1);
      renderTasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li);
  }); 
}

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  taskInput.value = "";
});
renderTasks();
taskInput.addEventListener("keypress", function(event){
  if(event.key==="Enter"){
    addTaskBtn.click();
  }
});
