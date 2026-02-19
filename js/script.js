const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtn = document.getElementById('filter-btn');
const delAllBtn = document.getElementById('del-all-btn');

const taskInput = document.getElementById('task-input');
const inputDate = document.getElementById('date-input');

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = inputDate.value;

    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="due-date">${dueDate || ''}</span>
        <span class="task-status">pending</span>
        <span class="action-wrapper">
            <button class="complete-btn">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
            </button>
            <button class="delete-btn">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </span>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
    inputDate.value = '';
}

addTaskButton.addEventListener('click', addTask);

taskList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    const completeBtn = e.target.closest('.complete-btn');

    if (deleteBtn) {
        const taskItem = deleteBtn.closest('.task-item');
        taskItem.remove();
        return;
    }

    if (completeBtn) {
        const taskItem = completeBtn.closest('.task-item');
        const statusEl = taskItem.querySelector('.task-status');

        statusEl.textContent = 'completed';
        statusEl.style.color = '#22ee74';
        statusEl.style.fontStyle = 'italic';

        taskItem.classList.add('completed');
        completeBtn.remove();
    }
});

delAllBtn.addEventListener('click', () => {
    if (!taskList.children.length) return;

    if (confirm('Delete all tasks?')) {
        taskList.innerHTML = '';
    }
});

let filterState = 'all';

function applyFilter() {
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
        const status = task.querySelector('.task-status').textContent;

        const show =
            filterState === 'all' ||
            (filterState === 'pending' && status === 'pending') ||
            (filterState === 'completed' && status === 'completed');

        task.style.display = show ? 'flex' : 'none';
    });
}

filterBtn.addEventListener('click', () => {
    if (filterState === 'all') {
        filterState = 'pending';
        filterBtn.textContent = 'Show Pending';
    } else if (filterState === 'pending') {
        filterState = 'completed';
        filterBtn.textContent = 'Show Completed';
    } else {
        filterState = 'all';
        filterBtn.textContent = 'Show All';
    }

    applyFilter();
});
