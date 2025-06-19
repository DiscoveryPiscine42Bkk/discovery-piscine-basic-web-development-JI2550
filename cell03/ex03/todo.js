window.onload = function () {
  loadTodos();
};

function newTodo() {
  const task = prompt("Enter a new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
    saveTodos();
  }
}

function addTodo(text) {
  const ftList = document.getElementById("ft_list");
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", function () {
    const confirmDelete = confirm("Do you want to delete this TO DO?");
    if (confirmDelete) {
      div.remove();
      saveTodos();
    }
  });

  // Add to the top of the list
  ftList.insertBefore(div, ftList.firstChild);
}

function saveTodos() {
  const todos = [];
  const elements = document.querySelectorAll("#ft_list .todo");
  elements.forEach(el => {
    todos.push(el.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
  const match = document.cookie.match(/(?:^|;) *todos=([^;]*)/);
  if (match) {
    try {
      const todos = JSON.parse(decodeURIComponent(match[1]));
      todos.reverse().forEach(todo => addTodo(todo)); // reverse to preserve order
    } catch (e) {
      console.error("Error loading todos from cookie");
    }
  }
}
