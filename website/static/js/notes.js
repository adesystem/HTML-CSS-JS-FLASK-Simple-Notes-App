import { showAlert } from "./alert.js";

const noteAddTrigger = document.getElementById('note-add-trigger');
const noteAddCancel = document.getElementById('note-add-cancel');

const noteAddWindow = document.getElementById('note-add-window');
const noteAddForm = document.getElementById('note-add-form');

noteAddTrigger.addEventListener('click', () => {
    noteAddWindow.showModal();
});

noteAddCancel.addEventListener('click', () => {
    noteAddWindow.close();
});

const notesContainer = document.querySelector('.notes-container');

function createNoNoteParagraph() {

    const noNotesParagraph = document.createElement('p');

    if (!notesContainer.querySelector('.note')) {
        noNotesParagraph.textContent = 'No notes found';
        noNotesParagraph.classList.add('no-notes');
        notesContainer.appendChild(noNotesParagraph);
    } else {
        noNotesParagraph.remove();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    createNoNoteParagraph();
});

notesContainer.addEventListener('click', (event) => {

    // Note Deletion
    if (event.target && event.target.classList.contains('note-delete-trigger')) {
        
        const noteDeleteWindow = document.getElementById('note-delete-window');
        const noteDeleteConfirm = document.getElementById('note-delete-confirm');
        const noteDeleteCancel = document.getElementById('note-delete-cancel');

        noteDeleteWindow.showModal();
        
        const noteElement = event.target.closest('.note');
        const noteId = noteElement.getAttribute('note-id');

        noteDeleteConfirm.onclick = () => {
            fetch('/notes/delete/' + noteId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    noteElement.remove();
                    showAlert('Note deleted successfully', 'success');
                } else {
                    showAlert('Note deletion failed', 'error');
                }
                noteDeleteWindow.close();
                createNoNoteParagraph();
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Note deletion failed', 'error');
                noteDeleteWindow.close();
                createNoNoteParagraph();
            });
        };

        noteDeleteCancel.onclick = () => {
            noteDeleteWindow.close();
            createNoNoteParagraph();
        };

    }
});
