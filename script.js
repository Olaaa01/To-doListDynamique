const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  createTask(titleInput.value, descInput.value, "todo");
  titleInput.value = "";
  descInput.value = "";
});

function createTask(title, desc, columnId) {
  const task = document.createElement("div");
  task.className = "task";

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = title;

  const taskDesc = document.createElement("div");
  taskDesc.textContent = desc;

  const btnContainer = document.createElement("div");
  btnContainer.className = "task-buttons";

  const forwardBtn = document.createElement("button");
  forwardBtn.textContent = "➡️";
  forwardBtn.onclick = () => moveTask(task, "forward");

  const backBtn = document.createElement("button");
  backBtn.textContent = "⬅️";
  backBtn.onclick = () => moveTask(task, "back");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(task, taskTitle, taskDesc);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => task.remove();

  btnContainer.append(backBtn, forwardBtn, editBtn, deleteBtn);
  task.append(taskTitle, taskDesc, btnContainer);

  document.getElementById(columnId).appendChild(task);
}

function moveTask(task, direction) {
  const parent = task.parentElement.id;
  let nextColumn;

  if (direction === "forward") {
    if (parent === "todo") nextColumn = "in-progress";
    else if (parent === "in-progress") nextColumn = "done";
  } else {
    if (parent === "done") nextColumn = "in-progress";
    else if (parent === "in-progress") nextColumn = "todo";
  }

  if (nextColumn) {
    document.getElementById(nextColumn).appendChild(task);
  }
}

function editTask(task, titleEl, descEl) {
  const oldTitle = titleEl.textContent;
  const oldDesc = descEl.textContent;

  const newTitleInput = document.createElement("input");
  newTitleInput.value = oldTitle;
  newTitleInput.style.marginBottom = "0.5rem";

  const newDescInput = document.createElement("textarea");
  newDescInput.value = oldDesc;
  newDescInput.rows = 3;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾 Sauvegarder";
  saveBtn.onclick = () => {
    titleEl.textContent = newTitleInput.value;
    descEl.textContent = newDescInput.value;
    task.replaceChild(titleEl, newTitleInput);
    task.replaceChild(descEl, newDescInput);
    task.removeChild(saveBtn);
  };

  task.replaceChild(newTitleInput, titleEl);
  task.replaceChild(newDescInput, descEl);
  task.appendChild(saveBtn);
}
