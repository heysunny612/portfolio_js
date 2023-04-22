'use strict';
const todoForm = document.querySelector('.todo_form');
const todos = document.querySelector('.todos');
const todoInput = document.querySelector('.todo_input');
const todoRemoveBtn = document.querySelector('.todo_remove_button');
const todoEditBtn = document.querySelector('.todo_edit_button');

const TODOS_KEY = 'todos';
let todosItems = [];

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //랜덤한숫자
  };
  todosItems.push(newTodoObj);
  createTodo(newTodoObj);
  saveTodos();
});

todos.addEventListener('click', (event) => {
  deleteTodo(event);
  //editTodo(event);
});

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todosItems));
}

const getSavedTodos = localStorage.getItem(TODOS_KEY);

if (getSavedTodos) {
  const parseTodos = JSON.parse(getSavedTodos);
  todosItems = parseTodos;
  todosItems.forEach(createTodo);
}

function createTodo(newTodo) {
  const item = document.createElement('li');
  item.dataset.id = newTodo.id;
  item.className = 'item';
  item.innerHTML = `
  <div class="content">
    <input type="checkbox" class="todo_checkbox" />
    <label>${newTodo.text}</label>
    <input type="text" value="" />
  </div>
  <div class="item_buttons content_buttons">
    <button class="todo_edit_button">
      <i class="bx bxs-edit"></i>
    </button>
    <button class="todo_remove_button">
      <i class="bx bxs-trash"></i>
    </button>
  </div>`;
  todos.appendChild(item);
  todoInput.value = '';
  todoInput.focus();
}

function deleteTodo(event) {
  const target = event.target;
  const btnContainer = target.parentElement;
  const item = btnContainer.parentElement;
  if (!target.matches('.todo_remove_button')) return;
  item.remove();
  todosItems = todosItems.filter(
    (todoItem) => todoItem.id !== parseInt(item.dataset.id)
  );
  saveTodos(todosItems);
}
