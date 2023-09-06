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
// 
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('can')) {
    const taskElement = event.target.closest('.task');
    if (taskElement && taskElement instanceof Node) {
      const doneTaskDiv = document.getElementById('DoneTask');
      doneTaskDiv.appendChild(taskElement);
      const checkmarkButton = taskElement.querySelector('.checkmark');
      checkmarkButton.remove();
    }
  }
// Pour le bouton modifier
  if (event.target.classList.contains('pen')) {
    const taskElement = event.target.closest('.task');
    const nameTask = taskElement.querySelector('.nomDeTâche').textContent;
    const description = taskElement.querySelector('.description').textContent;
    const date = taskElement.querySelector('.date').textContent;
    const nameTaskInput = document.getElementById('nameTask');
    const descriptionInput = document.getElementById('descrimodal');
    const dateInput = document.getElementById('datemodal');
    nameTaskInput.value = nameTask;
    descriptionInput.value = description;
    dateInput.value = date;
    modal.style.display = 'flex';
    editingTaskElement = taskElement;
  }
});

// Pour le bouton ajouter une tâche et pour déplacer la tâche vers DoneTask
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
    }
  });
});

// Fonction lors du click submit du modal pour la création de la nouvelle tâche
btnmodal.addEventListener("click", function (e) {
  e.preventDefault();
  const nameTask = document.getElementById('nameTask').value;
  const description = document.getElementById('descrimodal').value;
  const date = document.getElementById('datemodal').value;

// Se passe si on modifie l'élément, récupère les values existantes
  if (editingTaskElement) {
    editingTaskElement.querySelector('.nomDeTâche').textContent = nameTask;
    editingTaskElement.querySelector('.description').textContent = description;
    editingTaskElement.querySelector('.date').textContent = date;
    editingTaskElement = null;
  } else {
// Crée la task avec le template et lui applique le dark-mode s'il est actif
    const template = document.querySelector('.newTaskTemplate');
    const newTask = template.content.cloneNode(true);
    const taskElements = newTask.querySelectorAll('*');
    taskElements.forEach(function (element) {
      element.classList.add("dark-theme");
    });
    newTask.querySelector('.nomDeTâche').textContent = nameTask;
    newTask.querySelector('.date').textContent = date;
    newTask.querySelector('.description').textContent = description;
    const parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(newTask);
  }
  document.getElementById('nameTask').value = '';
  document.getElementById('descrimodal').value = '';
  document.getElementById('datemodal').value = '';
  modal.style.display = 'none';
});








