import "./style.scss";

const toggleModeButton = document.querySelector('#darkmodbtn');
const container = document.querySelector('#container');
const searchBar = document.querySelector('#searchbar');
const loupe = document.querySelector('#loupe');
const selection = document.querySelector('#selection');
const buttons = document.querySelectorAll('button');
const toDo = document.querySelector('#todoTask');
const doingTask = document.querySelector('#DoingTask');
const doneTask = document.querySelector('#DoneTask');

toggleModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  container.classList.toggle('dark-theme');
  searchBar.classList.toggle('dark-theme');
  loupe.classList.toggle('dark-theme');
  selection.classList.toggle('dark-theme');
  toDo.classList.toggle('dark-theme');
  doingTask.classList.toggle('dark-theme');
  doneTask.classList.toggle('dark-theme');
  buttons.forEach(button => {
    button.classList.toggle('dark-theme');
  });
});

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
  container.classList.add('dark-theme');
  searchBar.classList.add('dark-theme');
  loupe.classList.add('dark-theme');
  selection.classList.add('dark-theme');
  toDo.classList.add('dark-theme');
  doingTask.classList.add('dark-theme');
  doneTask.classList.add('dark-theme');
  buttons.forEach(button => {
    button.classList.add('dark-theme');
  });
} else {
  document.body.classList.remove("dark-theme");
  container.classList.remove('dark-theme');
  searchBar.classList.remove('dark-theme');
  loupe.classList.remove('dark-theme');
  selection.classList.remove('dark-theme');
  toDo.classList.remove('dark-theme');
  doingTask.classList.remove('dark-theme');
  doneTask.classList.remove('dark-theme');
  buttons.forEach(button => {
    button.classList.remove('dark-theme');
  });
}

/* // Sélection des éléments du DOM
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const filterButtons = document.querySelectorAll('.filter-button');
const clearCompletedButton = document.querySelector('#supprimer');

// Écouteur d'événement pour l'ajout d'une nouvelle tâche
taskInput.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

// Fonction pour ajouter une nouvelle tâche
function addTask(taskText) {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox">
    <span class="task-text">${taskText}</span>
    <button class="delete-button">Supprimer</button>
  `;
  taskList.appendChild(taskItem);
}

// Écouteur d'événement pour marquer une tâche comme terminée
taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const taskItem = e.target.parentNode;
    taskItem.classList.toggle('completed');
  }
});

// Écouteur d'événement pour supprimer une tâche
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const taskItem = e.target.parentNode;
    taskList.removeChild(taskItem);
  }
});

// Écouteurs d'événement pour les boutons de filtrage
filterButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;
    filterTasks(filter);
  });
});

// Fonction pour filtrer les tâches
function filterTasks(filter) {
  const taskItems = taskList.children;
  for (const taskItem of taskItems) {
    switch (filter) {
      case 'all':
        taskItem.style.display = 'flex';
        break;
      case 'active':
        if (taskItem.classList.contains('completed')) {
          taskItem.style.display = 'none';
        } else {
          taskItem.style.display = 'flex';
        }
        break;
      case 'completed':
        if (taskItem.classList.contains('completed')) {
          taskItem.style.display = 'flex';
        } else {
          taskItem.style.display = 'none';
        }
        break;
    }
  }
}

// Écouteur d'événement pour effacer toutes les tâches terminées
clearCompletedButton.addEventListener('click', () => {
  const completedTasks = taskList.querySelectorAll('.completed');
  completedTasks.forEach((task) => {
    taskList.removeChild(task);
  });
});

// Récupération des tâches depuis le stockage local
window.addEventListener('DOMContentLoaded', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach((taskText) => {
    addTask(taskText);
  });
});

// Mise à jour du stockage local lors de la modification des tâches
taskList.addEventListener('change', () => {
  const tasks = Array.from(taskList.children).map((taskItem) => {
    const taskText = taskItem.querySelector('.task-text').textContent;
    return taskText;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
});  */
