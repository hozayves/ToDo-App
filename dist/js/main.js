// SELECTORS
const todoInput = document.querySelector('.todo__input__area__text'),
      todoPlaceholder = document.querySelector('.todo__input__area__placeholder'),
      todoLists = document.querySelector('.todo__lists');

// EVENT LISTENERS
    // Input handle placehodler
    todoInput.addEventListener('keyup', (e) =>  placeholder(todoInput.value, todoPlaceholder));
    
    // capture input and then add todo to the list
    todoInput.addEventListener('keypress', addTodo);
    
    // Marking complete todo
    todoLists.addEventListener('click', markComplete);

// FUNCTIONS

// HIDE PLACEHOLDER WHEN USER START TYPING
function placeholder(text, change){
    if(text <= 0) {
        change.style.display = "block";
    } else {
        change.style.display = "none";
    }
}
// ADDING A TODO INPUT
function addTodo(e) {
    
    if(e.key === "Enter") {
        e.preventDefault();
        // function call for create todo element
        todoElement(todoInput);
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
        parentNode.remove();
    }
}





// FUNCTION FOR CREATE TODO ELEMENTS
function todoElement(InputText) {
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
    list_content_span.textContent = InputText.value;
    const list_close = document.createElement('img'); // delete todo in the list
    list_close.classList.add('todo__lists__list__delete');
    list_close.setAttribute('src', "./dist/images/icon-cross.svg");
    list_close.setAttribute('alt', 'close-icon');

    list_content.appendChild(list_content_span);
    list_check.appendChild(imgCheck);
    list.appendChild(list_check);
    list.appendChild(list_content);
    list.appendChild(list_close);
    todoLists.prepend(list);
    InputText.value = "";
}