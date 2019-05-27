const form = document.querySelector('form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks.btn.black');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM content loaded event
    document.addEventListener('DOMContentLoaded', resumeTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
}

// Resume tasks function
function resumeTasks() {
    // Get the task list from the local storage
    const tasks = localStorage.getItem('Tasks');

    // Check if the tasks in local storage has any values
    if (tasks) {
        // Add each task as a list item in the unordered list
        JSON.parse(tasks).forEach(function(task){
            // Create a list item
            const listItem = document.createElement('li');
            listItem.className = 'collection-item';
            // Create text node and append to LI
            listItem.appendChild(document.createTextNode(task));
            // Create new link element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append the link to the li
            listItem.appendChild(link);
            // Append the list item to the unordered list of class collection
            taskList.appendChild(listItem);
        });
}
}

// Add task function
function addTask(e) {
    if (taskInput.value) {
        // Create a list item
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        // Create text node and append to LI
        listItem.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        listItem.appendChild(link);
        // Append the list item to the unordered list of class collection
        taskList.appendChild(listItem);

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);
        
        e.preventDefault();
    } else {
        window.alert('Add a task');
    }


    e.preventDefault();
}

// Add a delete task functfion
function removeTask(e) {
    // Check if the target parent element class contains delete-item
    if (e.target.parentElement.classList.contains('delete-item')) {
        // Get the list item through traversing
        listItem = e.target.parentElement.parentElement;
        // If true, the list item is removed from the task list
        listItem.remove();

        // Remove the task from the local storage
        const tasks = JSON.parse(localStorage.getItem('Tasks'));
        tasks.splice(tasks.indexOf(listItem.textContent), 1);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    e.preventDefault();
}

// Add a filter task function
function filterTasks(e) {
    // Get the value from the input filter
    const filterValue = document.querySelector('#filter').value.toLowerCase();
    // Get the list items for iteration in the collection ul
    const listItems = document.querySelectorAll('ul li.collection-item');

    listItems.forEach(function(item){
        // Check if each list item contains the substring in the filter value
        if (item.textContent.toLowerCase().includes(filterValue)) {
            item.hidden = false;
        } else {
            // Hide the list item if substring filter value is not in the list item text content
            item.hidden = true;
        }
    });
}

// Add a clear task function
function clearTasks(e) {
    // Check if the user confirms the action of clearing all tasks
    if (window.confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    
        // Clear the local storage
        localStorage.clear();
    }
}

// Add a function for storing data in the local storage
function storeTaskInLocalStorage(item) {
    let tasks;
    if (localStorage.getItem('Tasks')) {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    } else {
        tasks = [];
    }
    tasks.push(item);

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}