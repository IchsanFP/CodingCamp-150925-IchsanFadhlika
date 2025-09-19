const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const deleteAllBtn = document.getElementById("delete-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render Todo
function renderTodos() {
  todoList.innerHTML = "";
  const searchText = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  todos
    .filter((todo) => {
      if (filter === "complete" && !todo.complete) return false;
      if (filter === "incomplete" && todo.complete) return false;
      if (!todo.text.toLowerCase().includes(searchText)) return false;
      return true;
    })
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center p-4 hover:bg-gray-50 transition";

      li.innerHTML = `
            <div class="flex items-center gap-3">
              <input type="checkbox" ${
                todo.complete ? "checked" : ""
              } class="w-5 h-5 text-teal-600 cursor-pointer border-gray-300 rounded focus:ring-teal-500 toggle-status" data-index="${index}" />
              <div>
                <p class="font-medium ${
                  todo.complete ? "line-through text-gray-500" : ""
                }">${todo.text}</p>
                <p class="text-sm text-gray-500">Due: ${todo.date}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="${
                todo.complete ? "text-emerald-600" : "text-amber-600"
              } font-semibold">${
        todo.complete ? "Complete" : "Incomplete"
      }</span>
              <button data-index="${index}" class="delete-btn text-red-500 hover:text-red-700 cursor-pointer">🗑️</button>
            </div>
          `;

      todoList.appendChild(li);
    });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add Todo
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  const date = todoDate.value;
  if (!text || !date) return alert("Isi todo dan tanggal dulu!");

  todos.push({ text, date, complete: false });
  todoInput.value = "";
  todoDate.value = "";
  renderTodos();
});

// Toggle Complete / Delete
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-status")) {
    const index = e.target.dataset.index;
    todos[index].complete = !todos[index].complete;
    renderTodos();
  }
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    todos.splice(index, 1);
    renderTodos();
  }
});

// Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Yakin hapus semua todos?")) {
    todos = [];
    renderTodos();
  }
});

// Search
searchInput.addEventListener("input", renderTodos);

// Filter
filterSelect.addEventListener("change", renderTodos);

// Initial render
renderTodos();
