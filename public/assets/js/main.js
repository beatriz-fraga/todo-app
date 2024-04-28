const taskInputEl = document.getElementById("task-place");
const actionBtn = document.getElementById("action-btn");
const taskList = document.getElementById("tasks-area");
const noTasksEl = document.querySelector(".no-tasks");
actionBtn.addEventListener("click", () => {
  const value = taskInputEl.value;
  createTask(value);
});

function addTask(task) {
  const taskEl = document.createElement("label");
  const deleteTaskEl = document.createElement("button");
  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  const taskpEl = document.createElement("p");
  taskpEl.innerHTML = `${task.name}`;
  taskEl.className = "task-content";
  deleteTaskEl.classList = "delete-btn";

  deleteTaskEl.innerHTML = '<i class="ri-delete-bin-6-line"></i>';
  deleteTaskEl.addEventListener("click", () => {
    deleteTask(task.id);
  });

  checkboxEl.type = "checkbox";
  checkboxEl.name = "task-" + task.id;
  checkboxEl.checked = task.checked;
  checkboxEl.addEventListener("change", () => {
    updateTask(task.id, task.name, checkboxEl.checked);
  });
  name.innerHTML = task.name;

  taskEl.appendChild(checkboxEl);
  taskEl.appendChild(taskpEl);
  taskEl.appendChild(deleteTaskEl);
  taskList.appendChild(taskEl);
}

function getAllTasks() {
  fetch("http://localhost:3333/api/tasks")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!data || data.length == 0) {
        taskList.innerHTML = `<p class="no-tasks active">Nenhuma tarefa cadastrada.</p>`;
      } else {
        taskList.innerHTML = "";
        data.forEach(addTask);
      }
    });
}

function createTask(value) {
  fetch("http://localhost:3333/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: value, checked: false }),
  }).then(() => {
    getAllTasks();
  });
}

function updateTask(id, name, checked) {
  fetch("http://localhost:3333/api/tasks/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, checked: checked }),
  }).then(() => {
    getAllTasks();
  });
}

function deleteTask(id) {
  fetch("http://localhost:3333/api/tasks/" + id, { method: "DELETE" }).then(
    () => {
      getAllTasks();
    }
  );
}

getAllTasks();
