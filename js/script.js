// define variables for DOM elements
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterbtn = document.getElementById('filter-btn');
const delAllbtn = document.getElementById('del-all-btn');

const taskInput = document.getElementById('task-input');
const inputDate = document.getElementById('date-input');

// function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = inputDate.value;
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span class="task-text">${taskText} - Due: ${dueDate}</span>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    inputDate.value = '';
}
addTaskButton.addEventListener('click', addTask);