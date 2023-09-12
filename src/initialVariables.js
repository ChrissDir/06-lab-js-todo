const toggleModeButton = document.querySelector('#darkmodbtn');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const btnfermer = document.querySelector('#btnfermer');
const modal = document.querySelector('#modal');
const isDarkThemeSet = localStorage.getItem('dark-theme');
const deleteAllButton = document.querySelector("#deleteAll");
const searchbar = document.querySelector('#searchbar');
let editingTaskElement = null;

// Encapsulation de parentElementId dans un objet
export const state = {
    parentElementId: null,
    editingTaskElement: null
};

export {
    toggleModeButton,
    prefersDarkScheme,
    btnfermer,
    modal,
    deleteAllButton,
    isDarkThemeSet,
    searchbar,
    editingTaskElement
};
