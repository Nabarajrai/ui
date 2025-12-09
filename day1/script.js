const form = document.querySelector("form");
const input = document.querySelector("input");
const result = document.querySelector(".items");

const todos = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  if (value === "") return;
  const newTodo = {
    id: Date.now(),
    text: value,
    edited: false,
    completed: false,
  };
  todos.push(newTodo);
  input.value = "";
  renderTodos();
});

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
  }
};

const handleChecked = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

const editTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.edited = !todo.edited;
    renderTodos();
  }
};

const saveTodo = (id, newText) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.text = newText;
    todo.edited = false;
    renderTodos();
  }
};

const renderTodos = () => {
  let html = "";
  console.log(todos);

  todos.forEach((todo) => {
    html += `
    <li>
        <span>
      ${
        todo.completed
          ? `<input type="checkbox" checked onclick="handleChecked(${todo.id})">`
          : `<input type="checkbox" onclick="handleChecked(${todo.id})">`
      }
        </span>
        ${
          todo.edited
            ? `<input type="text" value="${todo.text}" /> <button class="save" onclick="saveTodo(${todo.id}, this.previousElementSibling.value)">Save</button>`
            : `<span class=${todo.completed ? "checkbox" : ""}>${
                todo.text
              }</span>`
        }
        <span>
          <button class="edit" onclick="editTodo(${todo.id})">edit</button>
        <button class="delete" onclick="deleteTodo(${todo.id})">delete</button>
        </span>
    </li>
    `;
  });
  result.innerHTML = html;
};
