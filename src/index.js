import "./style.scss";

const toggleModeButton = document.querySelector('#darkmodbtn');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const btnfermer = document.querySelector('#btnfermer');
const modal = document.querySelector('#modal');
const deleteAllButton = document.querySelector("#deleteAll");
let parentElementId;
let editingTaskElement = null;

toggleModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  const elements = document.querySelectorAll("*");
  elements.forEach(function (element) {
    element.classList.toggle("dark-theme");
  });

  const newTaskElements = document.querySelectorAll('.newTaskTemplate *');
  newTaskElements.forEach(function (element) {
    element.classList.toggle("dark-theme");
  });
}

function addDarkModeByDefault() {
  if (prefersDarkScheme.matches) {
    const elements = document.querySelectorAll("*");
    elements.forEach(function (element) {
      element.classList.add("dark-theme");
    });

    const newTaskElements = document.querySelectorAll('.newTaskTemplate *');
    newTaskElements.forEach(function (element) {
      element.classList.add("dark-theme");
    });
  }
}
addDarkModeByDefault();

btnfermer.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = 'none';
});

deleteAllButton.addEventListener("click", function () {
  const doneTaskDivs = document.querySelectorAll("#DoneTask .task");
  doneTaskDivs.forEach(function (taskDiv) {
    taskDiv.remove();
  });
});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('checkmark')) {
    const taskElement = event.target.closest('.task');
    if (taskElement && taskElement instanceof Node) {
      const doneTaskDiv = document.getElementById('DoneTask');
      doneTaskDiv.appendChild(taskElement);
      const checkmarkButton = taskElement.querySelector('.checkmark');
      checkmarkButton.remove();
    }
  }

  if (event.target.classList.contains('can')) {
    const taskElement = event.target.closest('.task');
    if (taskElement && taskElement instanceof Node) {
      taskElement.remove();
    }
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
    editingTaskElement = taskElement;
  }
});

const addTaskButtons = document.querySelectorAll('.addTask');
addTaskButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    parentElementId = event.target.parentNode.id;
    modal.style.display = 'flex';

    if (parentElementId === 'DoneTask') {
      const checkmarkButtons = document.querySelectorAll('#DoneTask .checkmark');
      checkmarkButtons.forEach(function (button) {
        button.style.display = 'none';
      });
    } else {
      const btnModal = document.getElementById('btnmodal');
      btnModal.textContent = 'Add a task';
    }
  });
});

btnmodal.addEventListener("click", function (e) {
  e.preventDefault();
  const nameTask = document.getElementById('nameTask').value;
  const description = document.getElementById('descrimodal').value;
  const date = document.getElementById('datemodal').value;

  if (editingTaskElement) {
    editingTaskElement.querySelector('.nomDeTâche').textContent = nameTask;
    editingTaskElement.querySelector('.description').textContent = description;
    editingTaskElement.querySelector('.date').textContent = date;
    editingTaskElement = null;
  } else {
    const template = document.querySelector('.newTaskTemplate');
    const newTask = template.content.cloneNode(true);
    newTask.querySelector('.nomDeTâche').textContent = nameTask;
    newTask.querySelector('.date').textContent = date;
    newTask.querySelector('.description').textContent = description;
    if (document.body.classList.contains('dark-theme')){
      newTask.querySelector('.nomDeTâche').classList.add('dark-theme');
      newTask.querySelector('.date').classList.add('dark-theme');
      newTask.querySelector('.description').classList.add('dark-theme');
    };
    const parentElement = document.getElementById(parentElementId);
    newTask.querySelector('.task').setAttribute('id', 'task' + Date.now());
    parentElement.appendChild(newTask);
    taskElements = document.querySelectorAll('.task');
  }
  document.getElementById('nameTask').value = '';
  document.getElementById('descrimodal').value = '';
  document.getElementById('datemodal').value = '';
  modal.style.display = 'none';
  
  // Mise à jour des évènements
  setupDragAndDrop();
});

let taskElements = document.querySelectorAll('.task');

function setupDragAndDrop() {
  taskElements.forEach(function (taskElement) {
    taskElement.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text', taskElement.id);
    });
  });
}

const zoneTask = document.querySelector('#todoTask');
zoneTask.addEventListener('dragover', function (event) {
  event.preventDefault();
});

const zoneDoing = document.querySelector('#DoingTask');
zoneDoing.addEventListener('dragover', function (event) {
  event.preventDefault();
});

const zoneDone = document.querySelector('#DoneTask');
zoneDone.addEventListener('dragover', function (event) {
  event.preventDefault();
});

zoneTask.addEventListener('drop', function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  if (event.target.id === 'todoTask') {
    event.target.appendChild(document.getElementById(data));
  }
});

zoneDoing.addEventListener('drop', function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  if (event.target.id === 'DoingTask') {
    event.target.appendChild(document.getElementById(data));
  }
});

zoneDone.addEventListener('drop', function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  if (event.target.id === 'DoneTask') {
    event.target.appendChild(document.getElementById(data));
  }
});

// Fonction pour chercher une tâche dans la searchbar

const searchbar = document.getElementById('searchbar');
const tasks = document.querySelectorAll('.task');

searchbar.addEventListener('input', function(event) {
  const searchText = event.target.value.toLowerCase();

  tasks.forEach(function(task) {
    const taskName = task.querySelector('.nomDeTâche').textContent.toLowerCase();
    const taskDescription = task.querySelector('.description').textContent.toLowerCase();

    if (taskName.includes(searchText) || taskDescription.includes(searchText)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
});

// Fonction pour le local storage

// Pour sauvegarder les données dans le localStorage
function saveDataToLocalStorage() {
  const tasks = document.querySelectorAll('.task');
  const taskData = [];

  tasks.forEach(function(task) {
    const name = task.querySelector('.nomDeTâche').textContent;
    const description = task.querySelector('.description').textContent;
    const date = task.querySelector('.date').textContent;

    taskData.push({ name, description, date });
  });

  localStorage.setItem('tasks', JSON.stringify(taskData));
}

// Pour charger les données depuis le localStorage
function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem('tasks');

  if (storedData) {
    const taskData = JSON.parse(storedData);

    taskData.forEach(function(data) {
      const template = document.querySelector('.newTaskTemplate');
      const newTask = template.content.cloneNode(true);
      newTask.querySelector('.nomDeTâche').textContent = data.name;
      newTask.querySelector('.date').textContent = data.date;
      newTask.querySelector('.description').textContent = data.description;

      const parentElement = document.getElementById('todoTask');
      parentElement.appendChild(newTask);
    });

    taskElements = document.querySelectorAll('.task');
  }
}

// Appeler les fonctions pour sauvegarder et charger les données
saveDataToLocalStorage();
loadDataFromLocalStorage();
