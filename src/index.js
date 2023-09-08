import "./style.scss";

const toggleModeButton = document.querySelector('#darkmodbtn');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const btnfermer = document.querySelector('#btnfermer');
const modal = document.querySelector('#modal');
const deleteAllButton = document.querySelector("#deleteAll");
let parentElementId;
let editingTaskElement = null;

// Ajouter un écouteur sur le bouton en toggle
toggleModeButton.addEventListener('click', toggleDarkMode);

// Fonction pour basculer entre les modes  
function toggleDarkMode() {
  const elements = document.querySelectorAll("*");
  elements.forEach(function (element) {
    element.classList.toggle("dark-theme");
  });

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('dark-theme', 'true');
  } else {
    localStorage.setItem('dark-theme', 'false');
  }
}

// Vérifier la préférence de l'utilisateur
const isDarkSchemePreferred = prefersDarkScheme.matches;

// Vérifier si un choix existe déja
let isDarkThemeSet = localStorage.getItem('dark-theme');

// Appliquer le mode sombre par défaut si préféré et non encore défini
if (!isDarkThemeSet && isDarkSchemePreferred) {
  localStorage.setItem('dark-theme', 'true');
  document.body.classList.add('dark-theme');
} else if (!isDarkThemeSet) {
  localStorage.setItem('dark-theme', 'false');
} else if (isDarkThemeSet === 'true') {
  document.body.classList.add('dark-theme');
}

function addDarkModeByDefault() {
  // Vérifier la valeur du localStorage
  const isDarkTheme = localStorage.getItem('dark-theme');

  // Activer le thème sombre uniquement si isDarkTheme = 'true' 
  if (isDarkTheme === 'true') {

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

// Bouton permettant de fermer le modal

btnfermer.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = 'none';
});

// Sélectionne chaque tâche présente dans "DoneTask" et les suppriment

deleteAllButton.addEventListener("click", function () {
  const doneTaskDivs = document.querySelectorAll("#DoneTask .task");
  doneTaskDivs.forEach(function (taskDiv) {
    taskDiv.remove();
  });
  saveTasksToLocalStorage();
});

// Lorsque le bouton avec l'image de checkmark est cliqué, envoie la tâche vers la div "DoneTask" en supprimant ce bouton checkmark

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

  // Lors du clique sur l'image de la corbeille, sélectionne la div task la plus proche et la supprime avec tous ses éléments

  if (event.target.classList.contains('can')) {
    const taskElement = event.target.closest('.task');
    if (taskElement && taskElement instanceof Node) {
      taskElement.remove();
    }
    saveTasksToLocalStorage();
  }

  // Lorsque l'on clique sur le bouton modifier, récupération des données de la tâche puis modification + change le textContent du bouton du modal en "Modify"

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

// Fonction permettant de situer quel bouton a été cliqué pour situer ou la tâche va se créer et d'ouvrir le modal en changeant le textContent du btnmodal en "Add a task"

const addTaskButtons = document.querySelectorAll('.addTask');
addTaskButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    parentElementId = event.target.parentNode.id;
    modal.style.display = 'flex';
    const btnModal = document.getElementById('btnmodal');
    btnModal.textContent = 'Add a task';
  });
});

// Evènement se passant lors du click sur le bouton du modal

btnmodal.addEventListener("click", function (e) {
  e.preventDefault();
  const nameTask = document.getElementById('nameTask').value;
  const description = document.getElementById('descrimodal').value;
  const date = document.getElementById('datemodal').value;

  // Modifier le contenu d'une tâche si le bouton modifier a été cliqué

  if (editingTaskElement) {
    editingTaskElement.querySelector('.nomDeTâche').textContent = nameTask;
    editingTaskElement.querySelector('.description').textContent = description;
    editingTaskElement.querySelector('.date').textContent = date;
    editingTaskElement = null;
    saveTasksToLocalStorage();
  } else {

    // Créer une nouvelle tâche à partir du template

    const template = document.querySelector('.newTaskTemplate');
    const newTask = template.content.cloneNode(true);
    newTask.querySelector('.nomDeTâche').textContent = nameTask;
    newTask.querySelector('.date').textContent = date;
    newTask.querySelector('.description').textContent = description;

    // Lui ajouter une classe dark-theme à ses éléments si le body contient cette classe

    if (document.body.classList.contains('dark-theme')) {
      newTask.querySelector('.nomDeTâche').classList.add('dark-theme');
      newTask.querySelector('.date').classList.add('dark-theme');
      newTask.querySelector('.description').classList.add('dark-theme');
    };
    const parentElement = document.getElementById(parentElementId);
    newTask.querySelector('.task').setAttribute('id', 'task' + Date.now());
    parentElement.appendChild(newTask);
  }
  document.getElementById('nameTask').value = '';
  document.getElementById('descrimodal').value = '';
  document.getElementById('datemodal').value = '';
  modal.style.display = 'none';

  // Mise à jour des évènements

  setupDragAndDrop();
  saveTasksToLocalStorage();
});

// Correction pour que le drag and drop fonctionne après rechargement
let taskElements;

// Fonction sélectionnant toute les tâches et leurs appliquant un dragstart permettant de récupérer les données de la tâche qui va se faire drag en se basant sur son id

function setupDragAndDrop() {
  taskElements = document.querySelectorAll('.task');
  taskElements.forEach(function (taskElement) {
    taskElement.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text', taskElement.id);
    });
  });
}

// Distribution des zones de dragover et de drop pour la fonction de drag and drop

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
  saveTasksToLocalStorage();
});

zoneDoing.addEventListener('drop', function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  if (event.target.id === 'DoingTask') {
    event.target.appendChild(document.getElementById(data));
  }
  saveTasksToLocalStorage();
});

zoneDone.addEventListener('drop', function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  if (event.target.id === 'DoneTask') {
    event.target.appendChild(document.getElementById(data));
  }
  saveTasksToLocalStorage();
});

// Récupérer la barre de recherche
const searchbar = document.querySelector('#searchbar');

// Tableau pour stocker les tâches 
let tasks = [];

// Fonction pour la recherche
searchbar.addEventListener('input', function (event) {

  const searchText = event.target.value.toLowerCase();
  tasks = Array.from(document.querySelectorAll('.task'));
  tasks.forEach(function (task) {

    // Récupérer le nom et la description
    const taskNameElement = task.querySelector('.nomDeTâche');
    const taskDescriptionElement = task.querySelector('.description');
    const taskName = taskNameElement?.textContent?.toLowerCase();
    const taskDescription = taskDescriptionElement?.textContent?.toLowerCase();

    // Comparer avec la recherche
    if (taskName && taskName.includes(searchText) ||
      taskDescription && taskDescription.includes(searchText)) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });

  // Si rien ne correspond, tout afficher
  if (tasks.every(t => t.style.display === 'none')) {
    tasks.forEach(t => t.style.display = 'flex');
  }
});

// Fonction pour sauvegarder les tâches dans le localStorage

function saveTasksToLocalStorage() {
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

// Fonction pour charger les tâches depuis le localStorage

function loadTasksFromLocalStorage() {
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

// Charger les tâches au chargement de la page
loadTasksFromLocalStorage();

// Réinitialiser les événements de drag and drop
setupDragAndDrop();
