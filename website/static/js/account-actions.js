import { showAlert } from "./alert.js";
import { isUsernameValid, isEmailValid } from "./validator.js";

const usernameTrigger = document.getElementById('change-username');
const usernameClose = document.getElementById('close-change-username');

const usernameModal = document.getElementById('change-username-modal');
const usernameForm = document.getElementById('change-username-form');

const emailTrigger = document.getElementById('change-email');
const emailClose = document.getElementById('close-change-email');

const emailModal = document.getElementById('change-email-modal');
const emailForm = document.getElementById('change-email-form');

usernameTrigger.addEventListener('click', () => {
    usernameModal.showModal();
});

usernameClose.addEventListener('click', () => {
    usernameModal.close();
});

usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var newUsername = document.getElementById('new-username').value;


    if (isUsernameValid(newUsername) !== true) {
        showAlert(isUsernameValid(newUsername));
        usernameModal.close();
        return;
    }

    var usrPassword = document.getElementById('usr-password').value;

    if (!usrPassword) {
        showAlert("PASSWORD IS REQUIRED");
        usernameModal.close();
        return;
    }

    usernameForm.submit();
});

emailTrigger.addEventListener('click', () => {
    emailModal.showModal();
});

emailClose.addEventListener('click', () => {
    emailModal.close();
});

emailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var newEmail = document.getElementById('new-email').value;

    if (isEmailValid(newEmail) !== true) {
        showAlert(isEmailValid(newEmail));
        emailModal.close();
        return;
    }

    var emailPassword = document.getElementById('email-password').value;

    if (!emailPassword) {
        showAlert("PASSWORD IS REQUIRED");
        emailModal.close();
        return;
    }

    emailForm.submit();
});