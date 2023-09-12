

import { 
    saveTasksToLocalStorage 
} from './taskFunctions.js';

let taskElements;
let currentHoveredTask = null;
let dropDirection = null;

export function setupDragAndDrop() {
    taskElements = document.querySelectorAll('.task');
    taskElements.forEach(function (taskElement) {
        taskElement.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text', taskElement.id);
        });

        taskElement.addEventListener('dragover', function (event) {
            event.preventDefault();
            const bounding = taskElement.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);
            if (event.clientY - bounding.y < offset) {
                dropDirection = 'above';
            } else {
                dropDirection = 'below';
            }
            currentHoveredTask = taskElement;
        });

        taskElement.addEventListener('drop', function (event) {
            const draggedTaskId = event.dataTransfer.getData('text');
            const draggedTask = document.getElementById(draggedTaskId);
            if (dropDirection === 'above') {
                taskElement.parentNode.insertBefore(draggedTask, taskElement);
            } else {
                if (taskElement.nextSibling && taskElement.nextSibling.classList.contains('task')) {
                    taskElement.parentNode.insertBefore(draggedTask, taskElement.nextSibling);
                } else {
                    taskElement.parentNode.appendChild(draggedTask);
                }
            }
            saveTasksToLocalStorage();
        });
        
        taskElement.addEventListener('dragleave', function() {
            taskElement.classList.remove('drop-above', 'drop-below');
            currentHoveredTask = null;
        });
    });
}
const appDiv = document.querySelector('#app');

appDiv.addEventListener('dragover', function(event) {
    event.preventDefault();
});
appDiv.addEventListener('drop', function(event) {
    const draggedTaskId = event.dataTransfer.getData('text');
    const draggedTask = document.getElementById(draggedTaskId);
    if (!currentHoveredTask) {
        const todoDiv = document.querySelector('#todoTask');
        const doingDiv = document.querySelector('#DoingTask');
        const doneDiv = document.querySelector('#DoneTask');
        const distances = {
            'todoTask': Math.abs((todoDiv.getBoundingClientRect().top + todoDiv.getBoundingClientRect().height / 2) - event.clientY),
            'DoingTask': Math.abs((doingDiv.getBoundingClientRect().top + doingDiv.getBoundingClientRect().height / 2) - event.clientY),
            'DoneTask': Math.abs((doneDiv.getBoundingClientRect().top + doneDiv.getBoundingClientRect().height / 2) - event.clientY)
        };
        const closestDivId = Object.keys(distances).reduce((a, b) => distances[a] < distances[b] ? a : b);
        const closestDiv = document.querySelector(`#${closestDivId}`);
        closestDiv.appendChild(draggedTask);
    }
    saveTasksToLocalStorage();
});


