import "./style.scss";

const toggleModeButton = document.querySelector('#darkmodbtn');
toggleModeButton.addEventListener('click', toggleDarkMode);
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function toggleDarkMode() {
  let elements = document.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("dark-theme");
  }
}

function addDarkModeByDefault() {
  if (prefersDarkScheme.matches) {
    let elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("dark-theme");
    }
  }
}

addDarkModeByDefault();

const btnfermer = document.querySelector('#btnfermer');
const modal = document.querySelector('#modal');
btnfermer.addEventListener('click', function(e){
  e.preventDefault();
  modal.style.display = 'none';
});

const deleteAllButton = document.querySelector("#deleteAll");
deleteAllButton.addEventListener("click", function() {
  const doneTaskSection = document.querySelector("#DoneTask");
  const doneTaskDivs = doneTaskSection.querySelectorAll(".task");
  doneTaskDivs.forEach(function(taskDiv) {
    taskDiv.remove();
  });
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('supprimer')) {
    const taskElement = event.target.closest('.task');
    taskElement.remove();
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('addTask')) {
    const parentElementId = event.target.parentNode.id;
    modal.style.display = 'flex';
    btnmodal.addEventListener("click", function(e) {
      e.preventDefault();

      const nameTask = document.getElementById('nameTask').value;
      const description = document.getElementById('descrimodal').value;
      const date = document.getElementById('datemodal').value;

      const template = document.querySelector('.newTaskTemplate');
      const newTask = template.content.cloneNode(true);

      const taskNameElement = newTask.querySelector('.nomDeTâche');
      taskNameElement.textContent = nameTask;

      const taskDateElement = newTask.querySelector('.date');
      taskDateElement.textContent = date;

      const taskDescriptionElement = newTask.querySelector('.description');
      taskDescriptionElement.textContent = description;

      const parentElement = document.getElementById(parentElementId);
      parentElement.appendChild(newTask);

      // Réinitialiser les valeurs du formulaire
      document.getElementById('nameTask').value = '';
      document.getElementById('descrimodal').value = '';
      document.getElementById('datemodal').value = '';

      modal.style.display = 'none';
    });
  }
});
