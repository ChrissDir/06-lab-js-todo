import { 
    toggleModeButton, 
    prefersDarkScheme, 
    isDarkThemeSet 
} from './initialVariables.js';

export function toggleDarkMode() {
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

export function addDarkModeByDefault() {
    const isDarkTheme = localStorage.getItem('dark-theme');
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

toggleModeButton.addEventListener('click', toggleDarkMode);

// Handle the default dark mode setting
if (!isDarkThemeSet && isDarkSchemePreferred) {
    localStorage.setItem('dark-theme', 'true');
    document.body.classList.add('dark-theme');
} else if (!isDarkThemeSet) {
    localStorage.setItem('dark-theme', 'false');
} else if (isDarkThemeSet === 'true') {
    document.body.classList.add('dark-theme');
}
addDarkModeByDefault();

