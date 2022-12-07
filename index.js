// finding element


const container =  document.querySelector(".container");
const todoForm =  document.querySelector(".todo-form");
const todoInput =  document.querySelector("#inputTodo");
const todoAddBtn =  document.getElementById("submitBtn");
const messageElement = container.querySelector("#message");
const todoList = document.getElementById("lists");

// show message 
const showMessage = (text, status) => {
    messageElement.textContent = `${text} `;
    messageElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`)
    }, 1000);


}


// getTodosFromLocalStorage

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem("myTodos")) : [];
};


// addTodo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;


 //    unique id generate
 const todoId = Date.now().toString();
 
createTodo(todoId, todoValue)

showMessage("todo is added", "success")

// adding todos to localStorage

const todos = getTodosFromLocalStorage();
todos.push({todoId, todoValue});
localStorage.setItem("myTodos", JSON.stringify(todos));

todoInput.value = "";

};








// create todo

const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class ="btn"  id ="deleteBtn" > <i class="fa-solid fa-trash"></i> </button> </span>
    `;
    
    todoList.appendChild(todoElement);

    const btnDelete = todoElement.querySelector("#deleteBtn");
    btnDelete.addEventListener("click", deleteTodo);



};

// deleteTodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoList.removeChild(selectedTodo);
    showMessage("todo is deleted", "danger");

    

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("myTodos", JSON.stringify(todos));




};



// loadTodos
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};
// add listener 
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos)