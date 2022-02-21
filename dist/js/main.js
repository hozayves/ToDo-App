// SELECTORS
const todoInput = document.querySelector('.todo__input__area__text'),
      todoPlaceholder = document.querySelector('.todo__input__area__placeholder'),
      todoLists = document.querySelector('.todo__lists'),
      todoNavs = document.querySelector('.todo__navs__nav__ul'),
      tabItems = document.querySelectorAll('.tab-item'),
      counter = document.querySelector('.todo__navs__counter__count');

// EVENT LISTENERS

    // Get content from localstorage 
    document.addEventListener('DOMContentLoaded', getTodo);
    
    // capture input and then add todo to the list
    todoInput.addEventListener('keypress', addTodo);
    
    // Marking complete todo
    todoLists.addEventListener('click', markComplete);

    // Filtering todos
    todoNavs.addEventListener('click', filterTodo);

// FUNCTIONS

// ADDING A TODO INPUT
function addTodo(e) {
    if(e.key === "Enter") {
        e.preventDefault();
        saveTodoLocalStorage(todoInput.value); // calling local storage function
        const{id, todo, status} = getTodoFromLocalStorage()[getTodoFromLocalStorage().length - 1];
        todoElement(todo, id); // function call for create todo element
    }
}
// ADDING A TODO TASK TO EXIST UI FROM LOCAL STORAGE
function getTodo() {
    // Assign fetched data to exist UI
    if(getTodoFromLocalStorage() === undefined) {
        console.log('No task.');
    } else {
        const local = getTodoFromLocalStorage();
        local.forEach(({todo, id}) => {
            todoElement(todo, id);
        })
    }
}
// FUNCTION FOR MARKING TODO AS COMPLETE
function markComplete(e) {
    const targetElement = e.target;

    if(targetElement.classList[0] === 'todo__lists__list__check') { // Complete a task
        targetElement.classList.toggle('todo__lists__list__check-all');
        targetElement.firstElementChild.classList.toggle('imgActive');
        targetElement.parentNode.children[1].classList.toggle('line-complete');
    } else if (targetElement.classList[0] === "todo__lists__list__delete") { // Delete a task
        const parentNode = targetElement.parentNode;
        deleteTodoFromLocalStorage(targetElement.id); // Remove task in local storage
        parentNode.remove();
    }
}
// FUNCTION FOR FILTERING TODOS BASED COMPLETE, ACTIVE & ALL
function filterTodo(e) {
    const targetValue = todoLists.childNodes;
    targetValue.forEach(todo => {
        switch(e.target.classList[0]) {
            case 'All':
                removeActive(); // Remove active class to the clicked nav
                addActive(e);// Adding active class to the clicked nav
                todo.style.display = "flex";
                break;
            case 'Active':
                removeActive(); // Remove active class to the clicked nav
                addActive(e);// Adding active class to the clicked nav
                if(!todo.firstChild.nextSibling.classList.contains('line-complete')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case 'Completed':
                removeActive(); // Remove active class to the clicked nav
                addActive(e); // Adding active class to the clicked nav
                if(todo.firstChild.nextSibling.classList.contains('line-complete')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

// REMOVING ACTIVE CLASS TO THE NAVS
function removeActive() {
    return tabItems.forEach(item => item.classList.remove('actived'));
}
//  ADDING ACTIVE CLASS TO THE NAVS
function addActive(e) {
    e.target.classList.add('actived');
}
//  UPDATING A TODO LISTS COUNTER
function todoCounter() {
   setInterval(() => {
        const currentTodo = todoLists.childElementCount;
        counter.innerHTML = currentTodo;
        
   }, 500)
}
// CALLLING TODOS COUNTER FUNCTION
todoCounter();

// FUNCTION FOR CREATE TODO ELEMENTS
function todoElement(task, id) {
    const list = document.createElement('div'); // overall div
    list.classList.add("todo__lists__list");
    const list_check = document.createElement('div'); // mark complete icon
    list_check.classList.add('todo__lists__list__check');
    const imgCheck = document.createElement('img');
    imgCheck.setAttribute('src', './dist/images/icon-check.svg');
    imgCheck.setAttribute('alt', 'icon-check');
    const list_content = document.createElement('div'); // div for todo text
    list_content.classList.add('todo__lists__list__todo')
    const list_content_span = document.createElement('span');
    list_content_span.textContent = task; // Setting todo from local storage
    const list_close = document.createElement('img'); // delete todo in the list
    list_close.classList.add('todo__lists__list__delete');
    list_close.setAttribute('src', "./dist/images/icon-cross.svg");
    list_close.setAttribute('alt', 'close-icon');
    list_close.setAttribute('id', id); // Setting unique id to the from local storage

    list_content.appendChild(list_content_span);
    list_check.appendChild(imgCheck);
    list.appendChild(list_check);
    list.appendChild(list_content);
    list.appendChild(list_close);
    todoLists.prepend(list);
    todoInput.value = '';
    
}
// =======================================  LOCAL STORAGE ===================================

// SAVE TODOS IN LOCAL STORAGE
function saveTodoLocalStorage(tasks) {
    // check if the storage exists
    const id = new Date();
    let todos;
    if(localStorage.getItem('tasks') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('tasks'));
    }
    todos.push({'id': id, 'todo': tasks, 'status' : ''});
    localStorage.setItem('tasks', JSON.stringify(todos));
} 
// GET TODOS FROM LOCAL STORAGE
function getTodoFromLocalStorage() {
    // check if the storage exists
    let todos;
    if(localStorage.getItem('tasks') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('tasks'));
    }
    let tasks = [];
    todos.forEach(task => {
        tasks.push(task);
    });
    return tasks;
}
// DELETE FROM THE LOCAL STORAGE
function deleteTodoFromLocalStorage(taskId) {
    // check if the storage exists
    let todos;
    if(localStorage.getItem('tasks') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('tasks'));
    }
    todos.forEach(todo => {
        if(todo.id === taskId) {
            const index = todos.indexOf(todo);
            todos.splice(index, 1); // Remove task in the local storage
            localStorage.setItem('tasks', JSON.stringify(todos)); // Update localStorage
        }
    })
}