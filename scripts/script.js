const todos = [];

const saveTodosToLocalStorage = () => {
  window.localStorage.setItem('todos', JSON.stringify(todos))
}

saveTodosToLocalStorage();

const createTodo = (text) => {
  todos.push({
    title: text,
    completed: false,
    saveTodosToLocalStorage();
  });
};


const filters = {
  searchTitle: "",
  showFinished: false,
  showUnfinished: false,
};

const toggleTodo = (title) => {
  const todo = todos.find(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todo) {
    todo.completed = !todo.completed;
    saveTodosToLocalStorage();
  }
};

const removeTodo = (title) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodosToLocalStorage();
  }
};

const setFilters = (updates) => {
  if (typeof updates.searchTitle === "string") {
    filters.searchTitle = updates.searchTitle;
  }
  if (typeof updates.showFinished === "boolean") {
    filters.showFinished = updates.showFinished;
  }
  if (typeof updates.showUnfinished === "boolean") {
    filters.showUnfinished = updates.showUnfinished;
  }
};



const fetchTodosFromLocalStorage = () => {
  const todosJSON = localStorage.getItem('todos')

  if (todosJSON) {
      todos = JSON.parse(todosJSON)
  } else {
      todos = []
  }
}

console.log("hi am here");

const generateTodoDOM = (todoObj) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");

  // Setup todo checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todoObj.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todoObj.title);
    renderTodos(todos);
  });

  // Setup the todo text
  todoText.textContent = todoObj.title;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todoObj.title);
    renderTodos(todos);
  });

  return todoEl;
};

const renderTodos = (todos) => {
  //1. Crear función
  let filteredTodos = todos.filter((todo) => {
    return todo.title.includes(filters.searchTitle);
  });
  filters.showUnFinished;
  if (filters.showFinished && filters.showUnfinished) {
    //
  } else if (filters.showFinished) {
    console.log("hola");
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  } else if (filters.showUnfinished) {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }

  /*   if (filters.showFinished && filters.showUnfinished) {
    // do nothing
  } else if (filters.showFinished) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  } else if (filters.showUnfinished) {
    console.log("entering in the else");
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }
 */
  const todoList = document.querySelector("#todos"); //2
  todoList.innerHTML = ""; //3. Eliminar todo dentro de todoList usando la propiedad: innerHTML
  //Ejercicio 8:
  if (filteredTodos.length > 0) {
    // Verificar si el arreglo es mayor a 0, quiere decir que no esta vacío si tiene algo mayor a 0.
    //Ejercicio 7 - Parte II:
    filteredTodos.forEach((todo) => {
      const newTodo = generateTodoDOM(todo);
      todoList.appendChild(newTodo);
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message"); //Ejercicio 8:
    messageEl.textContent = "There are no todos to show"; //Ejercicio 8:
    todoList.appendChild(messageEl);
  }
};
document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  console.log(e);
  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  renderTodos(todos);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchTitle: e.target.value,
  });
  renderTodos(todos);
});

document.querySelector("#show-finished").addEventListener("change", (e) => {
  setFilters({
    showFinished: e.target.checked,
  });
  renderTodos(todos);
});

document.querySelector("#show-unfinished").addEventListener("change", (e) => {
  setFilters({
    showUnfinished: e.target.checked,
  });
  console.log(e.target.checked);
  renderTodos(todos);
});




fetchTodosFromLocalStorage();
renderTodos(todos);