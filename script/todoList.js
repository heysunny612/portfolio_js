'use strict';

const todoForm = document.querySelector('.todo_form');
const todoInput = todoForm.querySelector('.todo_input');
const todoIntro = document.querySelector('.todo-intro');
const todos = document.querySelector('.todos');

let saveTodos = [];

//CLICK EVENT
todos.addEventListener('click', (event) => {
  const target = event.target;

  if (target.matches('.todo_remove_button')) {
    deleteTodoList(target);
  } else if (
    target.matches('.todo_edit_button') ||
    target.matches('.todo_edit_confirm_button') ||
    target.matches('.todo_edit_cancel_button')
  ) {
    editTodoList(target);
  } else {
    return;
  }
});

//FORM SUBMIT EVENT
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //랜덤아이디 만들기
  const objTodos = {
    id: Date.now(),
    todo: todoInput.value,
  };
  saveTodos.push(objTodos);
  createTodoElements(objTodos);
  saveTodo(objTodos);
});

//새로고침시 값 가져오기
const getSavedTodos = localStorage.getItem('todos');
if (getSavedTodos) {
  const parseTodos = JSON.parse(getSavedTodos);
  saveTodos = parseTodos;
  saveTodos.forEach(createTodoElements);
}

//새로고침시, 값 저장
function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(saveTodos));
}

//투두 리스트 DOM 만들기
function createTodoElements(Todos) {
  const { id, todo } = Todos;
  const todoList = document.createElement('li');
  todoList.dataset.id = id;
  todoList.classList.add('item');
  todoList.innerHTML = `
    <div class="content">
      <label class="todo_label">${todo}</label>
      <input type="text" value="${todo}" class="todo_input" />
    </div>
    <div class="item_buttons content_buttons">
      <button class="todo_edit_button">
        <i class="bx bxs-edit"></i>
      </button>
      <button class="todo_remove_button">
        <i class="bx bxs-trash"></i>
      </button>
    </div>
    <div class="item_buttons edit_buttons">
      <button class="todo_edit_confirm_button">
        <i class="bx bx-check-circle"></i>
      </button>
      <button class="todo_edit_cancel_button">
        <i class="bx bxs-x-circle"></i>
      </button>
    </div>  
  `;
  todos.appendChild(todoList);
  todoInput.value = '';
  todoInput.focus();
}

//투두 삭제
function deleteTodoList(deleteBtn) {
  const currentTodoList = deleteBtn.parentElement.parentElement;
  currentTodoList.remove();

  saveTodos = saveTodos.filter((saveTodo) => {
    return saveTodo.id !== parseInt(currentTodoList.dataset.id);
  });
  saveTodo(saveTodos);
}

//투두 수정
function editTodoList(editBtn) {
  const currentTodoList = editBtn.closest('.item');
  const id = currentTodoList.dataset.id;
  const todoLable = currentTodoList.querySelector('.todo_label');
  const todoInput = currentTodoList.querySelector('.todo_input');
  const todoValue = todoInput.value;
  const contentBtns = currentTodoList.querySelector('.content_buttons');
  const editBtns = currentTodoList.querySelector('.edit_buttons');

  if (editBtn.className == 'todo_edit_button') {
    todoLable.style.display = 'none';
    todoInput.style.display = 'block';
    contentBtns.style.display = 'none';
    editBtns.style.display = 'block';
    todoInput.focus();
    todoInput.value = '';
    todoInput.value = todoValue;
  } else if (
    editBtn.className == 'todo_edit_confirm_button' ||
    editBtn.className == 'todo_edit_cancel_button'
  ) {
    todoLable.style.display = 'block';
    todoInput.style.display = 'none';
    contentBtns.style.display = 'block';
    editBtns.style.display = 'none';

    if (editBtn.className == 'todo_edit_confirm_button') {
      const newValue = todoInput.value;
      const newTodoObj = {
        id: parseInt(id),
        todo: newValue,
      };
      updateTodo(newTodoObj);
    }
  }
}

//수정된 값 UPDATE
function updateTodo(newTodo) {
  const item = document.querySelector('.todos');
  item.innerHTML = '';
  saveTodos.forEach((saveTodo) => {
    if (saveTodo.id == newTodo.id && saveTodo.todo !== newTodo.todo) {
      saveTodo.todo = newTodo.todo;
    }
    createTodoElements(saveTodo);
  });
  saveTodo(saveTodos);
}
