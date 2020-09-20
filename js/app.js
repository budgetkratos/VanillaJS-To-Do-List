// SELECTORS
const todoInput = document.querySelector('.todo-input'); // select the input
const todoButton = document.querySelector('.todo-button'); // select button
const todoList = document.querySelector('.todo-list'); // select <UL>
const filterBtn = document.querySelector('.filter');

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', getLocalStorageItems());


todoButton.addEventListener('click', addTodo); // for the submit button to add an item to the todo list

todoList.addEventListener('click', deleteItem); // for the delete button to delete the item

filterBtn.addEventListener('click', filterItems); //filters items 

// FUNCTIONS

function addTodo(e) {
    e.preventDefault(); // prevents the page from submitting - keeps the value

    // create the TODO div that will wrap around the li
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create the LI element that will contain our TODO assignment
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    localStorageSave(todoInput.value); // gets the value of the input that we got up in the beginning

    // added the <LI> element inside a todo <DIV>
    todoDiv.appendChild(newTodo);

    // the DIV is now floating in air, we can't see it.. we will appendChild it later into todoList

    // CHECK MARK BUTTON

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // DELETE BUTTON

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // APPEND TODO <DIV> to the todo LIST
    todoList.appendChild(todoDiv);

    // CLEAR THE VALUE FROM THE INPUT

    todoInput.value = ''; // sets the input value to an empty string

}

function deleteItem(e) {
    const item = e.target;

    // delete functionality 

    if (item.classList.contains('delete-btn')) {
        item.parentElement.classList.add('disappear'); // adds class ''dissapear''
        removeToDos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove(); //waits till transition ends, then removes element
        });
    }

    // checkmark color upon completion

    if (item.classList.contains('complete-btn')) {
        item.parentElement.classList.toggle('completed'); // changes the opacity and line through
        item.classList.toggle('completedBtnBg'); // changes the background color of the checkmark button upon completion
    }
}

function filterItems(e) {
    const todos = todoList.childNodes;

    console.log(todos);

    todos.forEach((todo) => {

        //check for undefined values and skips then and only apply the switch statement on nodes with properties 
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = 'none';

                    }
                    break;

                case 'unfinished':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';

                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });
}


/* localStorageSave -> function has one parameter that is the input.value 
1. defined a variable todos 
2. we check the local storage if it is empty. If it is, then we define an empty array and push the input item into that array.
3. if the array isn't empty, then we parse whatever it's inside and then update the array in the local storage
4. NOTE: saved and updated array is visible in the console*/

function localStorageSave(todo) { // to check and save in local storage
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo); // we add inside todoInput.value, in that empty array in case the localStorage is empty
    localStorage.setItem('todos', JSON.stringify(todos)); // here we update the array in the localStorage
}


/* getLocalStorageItems -> 
1. as soon as DOMContentLoaded is finished, this function is run
2. it checks if there is anything in the local storage
3. if there isn't, a new array is created that is then populated by input.values.*/

function getLocalStorageItems() {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create the LI element that will contain our TODO assignment

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo; // changed from todoInput.value to todo since we need the value from LOCAL STORAGE

        // added the <LI> element inside a todo <DIV>
        todoDiv.appendChild(newTodo);

        // the DIV is now floating in air, we can't see it.. we will appendChild it later into todoList

        // CHECK MARK BUTTON

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // DELETE BUTTON

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // APPEND TODO <DIV> to the todo LIST
        todoList.appendChild(todoDiv);

    })
}

function removeToDos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText; /* when we click on the delete button, we are clicking on a div element (that is the todo parameter of the function).. todoIndex is the text that is contained in the LI (LI is the [0] element of the div). todoIndex is the text that is contained within the LI */
    todos.splice(todos.indexOf(todoIndex), 1); /* with the function indexOf, we can find the indexOf for example some text that is contained within the LI and it gets removed with the SPLICE function*/

    localStorage.setItem('todos', JSON.stringify(todos)); // then we update the array in the local storage
}

/* EXAMPLE OF THE REMOVE FUNCTION

const todos = [''apple'', ''john'', ''donut'', ''baby''];

const johnIndex = todos.indexOf(''john'');

todos.splice(johnIndex, 1);

console.log(todos);

the result would be [''apple'', ''donut'', ''baby'']

*/