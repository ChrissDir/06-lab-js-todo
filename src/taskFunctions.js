import { state } from './initialVariables.js';
import { setupDragAndDrop } from './dragAndDropFunctions.js';
import { 
    btnfermer, 
    modal, 
    deleteAllButton,
    searchbar
} from './initialVariables.js';


export function saveTasksToLocalStorage() {
    const taskElements = document.querySelectorAll('.task');
    const tasks = Array.from(taskElements).map((taskElement) => {
        return {
            id: taskElement.id,
            name: taskElement.querySelector('.nomDeTâche').textContent,
            description: taskElement.querySelector('.description').textContent,
            date: taskElement.querySelector('.date').textContent,
            parent: taskElement.parentElement.id,
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        const template = document.querySelector('.newTaskTemplate');
        const newTask = template.content.cloneNode(true);
        newTask.querySelector('.task').id = task.id;
        newTask.querySelector('.nomDeTâche').textContent = task.name;
        newTask.querySelector('.description').textContent = task.description;
        newTask.querySelector('.date').textContent = task.date;
        if (document.body.classList.contains('dark-theme')) {
            newTask.querySelector('.nomDeTâche').classList.add('dark-theme');
            newTask.querySelector('.date').classList.add('dark-theme');
            newTask.querySelector('.description').classList.add('dark-theme');
        };
        const parentElement = document.getElementById(task.parent);
        parentElement.appendChild(newTask);
    });
}

btnfermer.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'none';
});

deleteAllButton.addEventListener("click", function () {
    const doneTaskDivs = document.querySelectorAll("#DoneTask .task");
    doneTaskDivs.forEach(function (taskDiv) {
        taskDiv.remove();
    });
    saveTasksToLocalStorage();
});

// All the missing click event handlers
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('checkmark')) {
        const taskElement = event.target.closest('.task');
        if (taskElement && taskElement instanceof Node) {
            const doneTaskDiv = document.getElementById('DoneTask');
            doneTaskDiv.appendChild(taskElement);
            const checkmarkButton = taskElement.querySelector('.checkmark');
            checkmarkButton.remove();
            saveTasksToLocalStorage();
        }
    }

    if (event.target.classList.contains('can')) {
        const taskElement = event.target.closest('.task');
        if (taskElement && taskElement instanceof Node) {
            taskElement.remove();
        }
        saveTasksToLocalStorage();
    }

    if (event.target.classList.contains('pen')) {
        const taskElement = event.target.closest('.task');
        const nameTask = taskElement.querySelector('.nomDeTâche').textContent;
        const description = taskElement.querySelector('.description').textContent;
        const date = taskElement.querySelector('.date').textContent;
        const nameTaskInput = document.getElementById('nameTask');
        const descriptionInput = document.getElementById('descrimodal');
        const dateInput = document.getElementById('datemodal');
        const btnModal = document.getElementById('btnmodal');

        nameTaskInput.value = nameTask;
        descriptionInput.value = description;
        dateInput.value = date;
        btnModal.textContent = 'Modify';

        modal.style.display = 'flex';
        state.editingTaskElement = taskElement;
    }
});

const addTaskButtons = document.querySelectorAll('.addTask');
addTaskButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        state.parentElementId = event.target.parentNode.id;
        modal.style.display = 'flex';
        const btnModal = document.getElementById('btnmodal');
        btnModal.textContent = 'Add a task';
    });
});

const btnModal = document.getElementById('btnmodal');

btnModal.addEventListener("click", function (e) {
    e.preventDefault();
    const nameTask = document.getElementById('nameTask').value;
    const description = document.getElementById('descrimodal').value;
    const date = document.getElementById('datemodal').value;

    // Modifier le contenu d'une tâche si le bouton modifier a été cliqué
    if (state.editingTaskElement) {
        state.editingTaskElement.querySelector('.nomDeTâche').textContent = nameTask;
        state.editingTaskElement.querySelector('.description').textContent = description;
        state.editingTaskElement.querySelector('.date').textContent = date;
        state.editingTaskElement = null;  // Reset
        saveTasksToLocalStorage();
    } else {
        // Créer une nouvelle tâche à partir du template
        const template = document.querySelector('.newTaskTemplate');
        const newTask = template.content.cloneNode(true);
        newTask.querySelector('.nomDeTâche').textContent = nameTask;
        newTask.querySelector('.date').textContent = date;
        newTask.querySelector('.description').textContent = description;

        // Ajout du thème sombre si nécessaire
        if (document.body.classList.contains('dark-theme')) {
            newTask.querySelector('.nomDeTâche').classList.add('dark-theme');
            newTask.querySelector('.date').classList.add('dark-theme');
            newTask.querySelector('.description').classList.add('dark-theme');
        }

        const parentElement = document.getElementById(state.parentElementId);
        newTask.querySelector('.task').setAttribute('id', 'task' + Date.now());
        parentElement.appendChild(newTask);
    }

    // Réinitialiser les champs et fermer le modal
    document.getElementById('nameTask').value = '';
    document.getElementById('descrimodal').value = '';
    document.getElementById('datemodal').value = '';
    modal.style.display = 'none';

    // Mise à jour des événements
    setupDragAndDrop(); 
    saveTasksToLocalStorage();
});

searchbar.addEventListener('input', function (event) {
    const searchText = event.target.value.toLowerCase();
    const tasks = Array.from(document.querySelectorAll('.task'));

    // Si la barre de recherche est vide, affichez toutes les tâches
    if (searchText === "") { 
        tasks.forEach(t => t.style.display = 'flex');
        return;
    }

    tasks.forEach(function (task) {
        const taskNameElement = task.querySelector('.nomDeTâche');
        const taskDescriptionElement = task.querySelector('.description');
        const taskName = taskNameElement ? taskNameElement.textContent.toLowerCase() : "";
        const taskDescription = taskDescriptionElement ? taskDescriptionElement.textContent.toLowerCase() : "";

        if (taskName.includes(searchText) || taskDescription.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});
