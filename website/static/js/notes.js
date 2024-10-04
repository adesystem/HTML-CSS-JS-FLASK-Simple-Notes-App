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

async function getNoteData(noteId) {
    const url = `/user/notes/get/${noteId}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }

        const noteData = await response.json();
        return noteData;
    
    } catch (error) {
        console.error('Error:', error);
    }
}

async function viewNote(noteId) {
    
    const viewNoteModal = document.getElementById('view-note-modal');
    const viewNoteClose = document.getElementById('close-view-note');

    const noteData = await getNoteData(noteId);

    if (noteData) {
        document.getElementById('view-note-title').value = noteData.title;
        document.getElementById('view-note-content').textContent = noteData.content;
        document.getElementById('view-note-date').textContent = noteData.date;
    } else {
        showAlert('AN ERROR OCCURRED, TRY AGAIN LATER');
        return;
    }

    viewNoteModal.showModal();

    viewNoteClose.addEventListener('click', () => {
        viewNoteModal.close();
    });
}

async function editNote(noteId) {

    const editNoteModal = document.getElementById('edit-note-modal');
    const editNoteForm = document.getElementById('edit-note-form');
    editNoteForm.action = `/user/notes/edit/${noteId}`;
    const editNoteClose = document.getElementById('cancel-edit-note');

    const noteData = await getNoteData(noteId);

    if (noteData) {
        var noteTitleFetched = noteData.title;
        var noteContentFetched = noteData.content;
        document.getElementById('edit-note-title').value = noteTitleFetched;
        document.getElementById('edit-note-content').textContent = noteContentFetched;
    } else {
        showAlert('AN ERROR OCCURRED, TRY AGAIN LATER');
        return;
    }

    editNoteModal.showModal();

    editNoteClose.addEventListener('click', () => {
        editNoteModal.close();
    });

    editNoteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const noteTitle = document.getElementById('edit-note-title').value;
        const noteContent = document.getElementById('edit-note-content').value;
        
        if (noteTitleFetched === noteTitle && noteContentFetched === noteContent) {
            showAlert('NO CHANGES DETECTED');
            return;
        }

        var noteValid = isNoteValid(noteTitle, noteContent);

        console.log(noteValid);

        if (noteValid !== true) {
            showAlert(noteValid);
            return;
        }

        editNoteForm.submit();
    });
}

function deleteNote (noteId) {

    const deleteNoteModal = document.getElementById('delete-note-modal');
    const deleteNoteForm = document.getElementById('delete-note-form');
    deleteNoteForm.action = `/user/notes/delete/${noteId}`;
    const deleteNoteClose = document.getElementById('cancel-delete-note');

    deleteNoteModal.showModal();

    deleteNoteClose.addEventListener('click', () => {
        deleteNoteModal.close();
    });

    deleteNoteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        deleteNoteForm.submit();
    });

}

const notesContainer = document.querySelector('.notes');

notesContainer.addEventListener('click', (event) => {
    
    // View note
    if (event.target && event.target.classList.contains('note-view')) {

        const noteId = event.target.closest('.note').dataset.id;

        viewNote(noteId);
    }

    // Edit note
    if (event.target && event.target.classList.contains('edit-note')) {
        
        const noteId = event.target.closest('.note').dataset.id;

        editNote(noteId);
    }

    // Delete note
    if (event.target && event.target.classList.contains('delete-note')) {

        const noteId = event.target.closest('.note').dataset.id;

        deleteNote(noteId);
    }

});


