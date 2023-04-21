'use strict';
const API_URL = 'https://heysunny612.github.io/portfolio_js/';
const $todos = document.querySelector('.todos');
const $todoForm = document.querySelector('.todo_form');
const $todoInput = document.querySelector('.todo_input');

const createTodosElement = (todos) => {
  todos.forEach((todo) => {
    const $item = document.createElement('div');
    $item.classList.add('item');
    $item.dataset.id = `${todo.id}`;
    $item.innerHTML = ` 
      <div class='content'>
        <input type='checkbox' class='todo_checkbox' />
        <label>${todo.content}</label>
        <input type='text' value='' />
      </div>
      <div class='item_buttons content_buttons'>
        <button class='todo_edit_button'>
          <i class='bx bxs-edit'></i>
        </button>
        <button class='todo_remove_button'>
          <i class='bx bxs-trash'></i>
        </button>
      </div>
      <div class='item_buttons edit_buttons'>
        <button class='todo_edit_confirm_button'>
          <i class='fas fa-check'></i>
        </button>
        <button class='todo_edit_cancel_button'>
          <i class='fas fa-times'></i>
        </button>
      </div>
    `;
    $todos.appendChild($item);
  });
};

const getTodos = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((todos) => createTodosElement(todos))
    .catch((error) => console.log(error));
};

const addTodo = (event) => {
  event.preventDefault();
  const todo = {
    content: $todoInput.value,
    completed: false,
  };
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
};

const init = () => {
  getTodos();
  $todoForm.addEventListener('submit', addTodo);
};

init();
