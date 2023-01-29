//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");


//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);


//Functions
//1.input
function addTodo(e) {
    e.preventDefault();
    //console.log(e);
//get todo value:
//create new todo
//add to dom
//reset input
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todoInput.value}</li>
    <span><i class="fa fa-check-square-o"></i> </span>
    <span><i class="fa fa-trash-o"></i></span>`;
    todoDiv.innerHTML = newTodo;

//append to todoList
todoList.appendChild(todoDiv);
saveLocalTodos(todoInput.value);
todoInput.value = "";

}

//2.Check/Remove
function checkRemove(e){
    
    const classList = [...e.target.classList];
//console.log(e.target.classList);
//console.log(classList); 
    const item = e.target;
//console.log(item.parentElement.parentElement);

    if(classList[1] === "fa-check-square-o"){
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }else if(classList[1] === "fa-trash-o"){
        const todo = item.parentElement.parentElement;
        todo.remove();
    }
}

//3.Dropdown
function filterTodos(e){
    //console.log(e.target.value);
    //console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display= "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display= "none";
                }
                break;
        }
    });
}

//Local Storage
    function saveLocalTodos(todo){
    //    localStorage.getItem("todos")
    //    localStorage.setItem("todo", JSON.stringify(todos))
    
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
    
        function getLocalTodos() {
        let savedTodos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
        savedTodos.forEach((todo) => {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            const newTodo = `
            <li>${todo}</li>
            <span><i class="fa fa-check-square-o"></i> </span>
            <span><i class="fa fa-trash-o"></i></span>`;
            todoDiv.innerHTML = newTodo;
            todoList.appendChild(todoDiv);
        });
    
        }
    
    function removeLocalTodos(todo) {
    //    console.log(todo.children);
    //    console.log(todo.children[0].innerText);
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    const filteredTodos = savedTodos.filter((t) => t !== todo.children[0].innerText);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    }
    
    
