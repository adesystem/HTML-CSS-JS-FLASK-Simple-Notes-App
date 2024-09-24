import { showAlert } from "./alert.js";

const dialogueWindow = document.getElementById('delete-window');
const openButton = document.getElementById('open-delete-window');
const closeButton = document.getElementById('cancel-delete');

const confirmDeleteForm = document.getElementById('confirm-delete-form');

openButton.addEventListener('click', () => {
    dialogueWindow.showModal();
});

closeButton.addEventListener('click', () => {
    dialogueWindow.close();
});

confirmDeleteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    var password = document.getElementById('delete-password').value;
    
    if (!password) {
        showAlert('Password is required.');
        return;
    }

    confirmDeleteForm.submit();

    password = '';

    dialogueWindow.close();
});

