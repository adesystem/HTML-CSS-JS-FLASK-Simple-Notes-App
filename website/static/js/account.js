import { showAlert } from "./alert.js";
import { isUsernameValid, isEmailValid } from "./validator.js";

const usernameWindow = document.getElementById('change-username-window');
const usernameTrigger = document.getElementById('edit-username');
const usernameClose = document.getElementById('cancel-username');

const usernameForm = document.getElementById('change-username-form');

const emailWindow = document.getElementById('change-email-window');
const emailTrigger = document.getElementById('edit-email');
const emailClose = document.getElementById('cancel-email');

const emailForm = document.getElementById('change-email-form');

function openUsernameWindow() {
    usernameWindow.showModal();
}

function closeUsernameWindow() {
    usernameWindow.close();
}

function openEmailWindow() {
    emailWindow.showModal();
}

function closeEmailWindow() {
    emailWindow.close();
}

usernameTrigger.onclick = openUsernameWindow;
usernameClose.onclick = closeUsernameWindow;

emailTrigger.onclick = openEmailWindow;
emailClose.onclick = closeEmailWindow;

usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var newUsername = document.getElementById('username').value;
    var password = document.getElementById('username-password').value;

    if (isUsernameValid(newUsername) !== true) {
        showAlert(isUsernameValid(newUsername));
        return;
    }

    if (!password) {
        showAlert('Password is required.');
        return;
    }

    usernameForm.submit();

    newUsername = '';
    password = '';

    usernameWindow.close();
});

emailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var newEmail = document.getElementById('email').value;
    var password = document.getElementById('email-password').value;

    if (isEmailValid(newEmail) !== true) {
        showAlert(isEmailValid(newEmail));
        return;
    }

    if (!password) {
        showAlert('Password is required.');
        return;
    }

    emailForm.submit();

    newEmail = '';
    password = '';

    emailWindow.close();
});


