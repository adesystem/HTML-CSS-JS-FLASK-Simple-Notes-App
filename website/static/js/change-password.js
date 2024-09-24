import { showAlert } from "./alert.js";
import { isPasswordValid } from "./validator.js";

const dialogueWindow = document.getElementById('change-password-window');
const openButton = document.getElementById('open-change-password-window');
const closeButton = document.getElementById('cancel-password');

const changePasswordForm = document.getElementById('change-password-form');

openButton.addEventListener('click', () => {
    dialogueWindow.showModal();
});

closeButton.addEventListener('click', () => {
    dialogueWindow.close();
});

changePasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var currentPassword = document.getElementById('current-password').value;
    var newPassword = document.getElementById('new-password').value;

    if (!currentPassword) {
        showAlert('Current password is required.');
        return;
    }

    if (!newPassword) {
        showAlert('New password is required.');
        return;
    }

    if (currentPassword === newPassword) {
        showAlert('Current password and new password cannot be the same.');
        return;
    }

    var passwordError = isPasswordValid(newPassword);

    if (passwordError !== true) {
        showAlert(passwordError);
        return;
    }

    changePasswordForm.submit();

    currentPassword = '';
    newPassword = '';

    dialogueWindow.close();
});