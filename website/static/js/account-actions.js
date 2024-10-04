import { showAlert } from "./alert.js";
import { isUsernameValid, isEmailValid, isPasswordValid } from "./validator.js";

const usernameTrigger = document.getElementById('change-username');
const usernameClose = document.getElementById('close-change-username');

const usernameModal = document.getElementById('change-username-modal');
const usernameForm = document.getElementById('change-username-form');

const emailTrigger = document.getElementById('change-email');
const emailClose = document.getElementById('close-change-email');

const emailModal = document.getElementById('change-email-modal');
const emailForm = document.getElementById('change-email-form');

const passwordTrigger = document.getElementById('change-password');
const passwordClose = document.getElementById('close-change-password');

const passwordModal = document.getElementById('change-password-modal');
const passwordForm = document.getElementById('change-password-form');

const deleteTrigger = document.getElementById('delete-account');
const deleteClose = document.getElementById('close-delete-account');

const deleteModal = document.getElementById('delete-account-modal');
const deleteForm = document.getElementById('delete-account-form');

usernameTrigger.addEventListener('click', () => {
    usernameModal.showModal();
});

usernameClose.addEventListener('click', () => {
    usernameModal.close();
});

usernameForm.addEventListener('submit', (event) => {
    
    function clearModal() {
        document.getElementById('new-username').value = '';
        document.getElementById('usr-password').value = '';
    }

    event.preventDefault();

    var newUsername = document.getElementById('new-username').value;


    if (isUsernameValid(newUsername) !== true) {
        showAlert(isUsernameValid(newUsername));
        usernameModal.close();
        clearModal();
        return;
    }

    var usrPassword = document.getElementById('usr-password').value;

    if (!usrPassword) {
        showAlert("PASSWORD IS REQUIRED");
        usernameModal.close();
        clearModal();
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
    
    function clearModal() {
        document.getElementById('new-email').value = '';
        document.getElementById('email-password').value = '';
    }
    
    event.preventDefault();

    var newEmail = document.getElementById('new-email').value;

    if (isEmailValid(newEmail) !== true) {
        showAlert(isEmailValid(newEmail));
        emailModal.close();
        clearModal();
        return;
    }

    var emailPassword = document.getElementById('email-password').value;

    if (!emailPassword) {
        showAlert("PASSWORD IS REQUIRED");
        emailModal.close();
        clearModal();
        return;
    }

    emailForm.submit();
});

passwordTrigger.addEventListener('click', () => {
    passwordModal.showModal();
});

passwordClose.addEventListener('click', () => {
    passwordModal.close();
});

passwordForm.addEventListener('submit', (event) => {
    
    function clearModal() {
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
    }
    
    event.preventDefault();

    var currentPassword = document.getElementById('current-password').value;
    var newPassword = document.getElementById('new-password').value;

    if (!currentPassword) {
        showAlert('CURRENT PASSWORD IS REQUIRED');
        passwordModal.close();
        clearModal();
        return;
    }

    if (!newPassword) {
        showAlert('NEW PASSWORD IS REQUIRED');
        passwordModal.close();
        clearModal();
        return;
    }

    if (currentPassword === newPassword) {
        showAlert('CURRENT PASSWORD AND NEW PASSWORD CANNOT BE THE SAME');
        passwordModal.close();
        clearModal();
        return;
    }

    var passwordError = isPasswordValid(newPassword);

    if (passwordError !== true) {
        showAlert(passwordError);
        passwordModal.close();
        clearModal();
        return;
    }

    passwordForm.submit();
});

deleteTrigger.addEventListener('click', () => {
    deleteModal.showModal();
});

deleteClose.addEventListener('click', () => {
    deleteModal.close();
});

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var deletePassword = document.getElementById('delete-password').value;

    if (!deletePassword) {
        showAlert('PASSWORD IS REQUIRED');
        deleteModal.close();
        return;
    }

    deleteForm.submit();
});