import "./style.scss";
import * as InitialVariables from './initialVariables.js';
import * as DarkModeFunctions from './darkModeFunctions.js';
import * as TaskFunctions from './taskFunctions.js';
import * as DragAndDropFunctions from './dragAndDropFunctions.js';

TaskFunctions.loadTasksFromLocalStorage();
DragAndDropFunctions.setupDragAndDrop();


