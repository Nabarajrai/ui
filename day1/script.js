document.addEventListener("DOMContentLoaded", function () {
  class TodoApp {
    constructor() {
      this.todos = [];
      this.form = document.querySelector("form");
      this.input = document.querySelector("input");
      this.itemsList = document.querySelector(".items");
      this.item = null; // Not used for attachment anymore; we'll attach per item in render

      if (!this.itemsList) {
        console.error("No .items container found in HTML.");
        return;
      }

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.addTodoList();
      });

      // No global click listener here—handled per item in render
    }

    // Define the click handler as a method for reuse
    handleItemClick(e) {
      const id = Number(e.target.parentElement.getAttribute("data-id"));
      if (e.target.getAttribute("data-action") === "edit") {
        this.editTodoList(id);
      } else if (e.target.getAttribute("data-action") === "delete") {
        this.deleteTodoList(id);
      }
    }

    editTodoList(id) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, edited: !todo.edited }; // Toggle edit mode
        }
        return todo;
      });
      this.render();
    }

    deleteTodoList(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.render();
    }

    updateTodoList(id, newText) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText, edited: false };
        }
        return todo;
      });
      this.render();
    }

    toggleTodo(id) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      this.render();
    }

    addTodoList() {
      const text = this.input.value.trim();
      if (!text) return; // Prevent empty todos

      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        edited: false,
      };
      this.todos.push(newTodo);
      this.input.value = "";
      this.render();
    }

    render() {
      this.itemsList.innerHTML = "";
      this.todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.setAttribute("data-id", todo.id);
        li.innerHTML = `
          <input type="checkbox" ${todo.completed ? "checked" : ""} />
          ${
            todo.edited
              ? `<input type="text" class="edit-input" value="${todo.text}" autofocus />`
              : `<span ${
                  todo.completed ? 'style="text-decoration: line-through;"' : ""
                }>${todo.text}</span>`
          }
          <button class="edit-btn" data-action="edit">Edit</button>
          <button class="delete-btn" data-action="delete">Delete</button>
        `;
        this.itemsList.appendChild(li);

        // Attach the click listener to this specific item (using the original logic)
        li.addEventListener("click", (e) => this.handleItemClick(e));
      });

      // Re-attach checkbox change listeners to new items (optional, for toggling)
      this.itemsList
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const item = e.target.closest(".item");
            if (!item) return;
            const id = Number(item.getAttribute("data-id"));
            this.toggleTodo(id);
          });
        });

      // Re-attach edit input handlers (focusout, keydown) to new inputs (optional)
      this.itemsList.querySelectorAll(".edit-input").forEach((input) => {
        input.addEventListener("focusout", (e) => {
          const item = e.target.closest(".item");
          if (!item) return;
          const id = Number(item.getAttribute("data-id"));
          const newText = e.target.value.trim();
          if (newText) {
            this.updateTodoList(id, newText);
          } else {
            this.editTodoList(id); // Revert
          }
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.target.blur(); // Save
          } else if (e.key === "Escape") {
            const item = e.target.closest(".item");
            if (item) {
              const id = Number(item.getAttribute("data-id"));
              this.editTodoList(id); // Revert
            }
          }
        });
      });
    }
  }
  new TodoApp();
});
