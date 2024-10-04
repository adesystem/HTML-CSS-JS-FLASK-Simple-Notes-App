import { showAlert } from "./alert.js";
import { isNoteValid } from "./validator.js";

const noteAddTrigger = document.getElementById('add-note');
const noteAddCancel = document.getElementById('cancel-add-note');

const noteAddModal = document.getElementById('add-note-modal');
const noteAddForm = document.getElementById('add-note-form');

noteAddTrigger.addEventListener('click', () => {
    noteAddModal.showModal();
});

noteAddCancel.addEventListener('click', () => {
    noteAddModal.close();
});

noteAddForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;
    
    var noteValid = isNoteValid(noteTitle, noteContent);

    if (noteValid !== true) {
        showAlert(noteValid);
        return;
    }

    noteAddForm.submit();
});



// const notesContainer = document.querySelector('.notes-container');

// function createNoNoteParagraph() {

//     const noNotesParagraph = document.createElement('p');

//     if (!notesContainer.querySelector('.note')) {
//         noNotesParagraph.textContent = 'No notes found';
//         noNotesParagraph.classList.add('no-notes');
//         notesContainer.appendChild(noNotesParagraph);
//     } else {
//         noNotesParagraph.remove();
//     }

// }

// document.addEventListener('DOMContentLoaded', () => {
//     createNoNoteParagraph();
// });

// notesContainer.addEventListener('click', (event) => {

//     // Note Deletion
//     if (event.target && event.target.classList.contains('note-delete-trigger')) {
        
//         const noteDeleteModal = document.getElementById('note-delete-Modal');
//         const noteDeleteConfirm = document.getElementById('note-delete-confirm');
//         const noteDeleteCancel = document.getElementById('note-delete-cancel');

//         noteDeleteModal.showModal();
        
//         const noteElement = event.target.closest('.note');
//         const noteId = noteElement.getAttribute('note-id');

//         noteDeleteConfirm.onclick = () => {
//             fetch('/notes/delete/' + noteId, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//             .then(response => {
//                 if (response.ok) {
//                     noteElement.remove();
//                     showAlert('Note deleted successfully', 'success');
//                 } else {
//                     showAlert('Note deletion failed', 'error');
//                 }
//                 noteDeleteModal.close();
//                 createNoNoteParagraph();
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 showAlert('Note deletion failed', 'error');
//                 noteDeleteModal.close();
//                 createNoNoteParagraph();
//             });
//         };

//         noteDeleteCancel.onclick = () => {
//             noteDeleteModal.close();
//             createNoNoteParagraph();
//         };

//     }
// });
