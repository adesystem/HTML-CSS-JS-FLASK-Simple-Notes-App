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

const notesContainer = document.querySelector('.notes');

notesContainer.addEventListener('click', (event) => {

    // View Note
    if (event.target && event.target.classList.contains('note-view')) {
        
        const noteViewCancel = document.getElementById('close-view-note');

        const viewNoteModal = document.getElementById('view-note-modal');
        const viewNoteForm = document.getElementById('view-note-form');
        
        noteViewCancel.addEventListener('click', () => {
            document.getElementById('view-note-title').value = '';
            document.getElementById('view-note-content').textContent = '';
            viewNoteModal.close();
        });

        const noteId = event.target.closest('.note').dataset.id;

        fetch(`/user/notes/get/${noteId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    document.getElementById('view-note-title').value = data.title;
                    document.getElementById('view-note-content').textContent = data.content;
                    document.getElementById('view-note-date').textContent = data.date;
                    viewNoteModal.showModal();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('AN ERROR OCCURRED. PLEASE TRY AGAIN.');
            });
    }
});
