'use strict';

const getTodos = () => {
  fetch('http://localhost:3000/todos')
    .then((response) => response.json())
    .then((todos) => console.log(todos));
};

const init = () => {
  getTodos();
};

init();
