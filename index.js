document.addEventListener("DOMContentLoaded", function() {
    const addNoteButton = document.querySelector('.add');
    const notesDiv = document.querySelector('.notesDiv');
    const titleInput = document.getElementById('notestitle');
    const bodyInput = document.getElementById('otesbody');
    const colorSelect = document.getElementById('colors');

    // Function to add a new note
    function addNote() {
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        const color = colorSelect.value;

        if (!title || !body || color === 'select any color') {
            alert('Please fill in all fields and select a color');
            return;
        }

        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.style.marginTop = '16px';
        noteDiv.style.display = 'flex';
        noteDiv.style.alignItems = 'flex-start';

        const textDiv = document.createElement('div');
        textDiv.classList.add('text');
        textDiv.style.backgroundColor = color;
        textDiv.style.padding = '16px';
        textDiv.style.borderRadius = '4px';
        textDiv.style.width = 'calc(100% - 250px)';
        textDiv.innerHTML = `<b>${title}</b><p>${body}</p>`;

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerText = 'Edit Note';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerText = 'Delete Note';

        noteDiv.appendChild(textDiv);
        noteDiv.appendChild(editButton);
        noteDiv.appendChild(deleteButton);

        notesDiv.appendChild(noteDiv);

        // Clear input fields after adding note
        titleInput.value = '';
        bodyInput.value = '';
        colorSelect.selectedIndex = 0;
    }

    // Function to delete a note
    function deleteNote() {
        const note = this.parentNode;
        notesDiv.removeChild(note);
    }

    // Function to edit a note (here, it just clears the note)
    function editNote() {
        const note = this.parentNode;
        const textDiv = note.querySelector('.text');
        textDiv.innerHTML = ''; // You can implement editing functionality here
    }

    // Event listeners
    addNoteButton.addEventListener('click', addNote);

    // Event delegation for dynamically added delete and edit buttons
    notesDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            deleteNote.call(event.target);
        } else if (event.target.classList.contains('edit')) {
            editNote.call(event.target);
        }
    });
});
// Function to edit a note
function editNote() {
    const note = this.parentNode;
    const textDiv = note.querySelector('.text');
    const title = textDiv.querySelector('b').innerText;
    const body = textDiv.querySelector('p').innerText;

    // Create input fields for editing
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = title;

    const bodyInput = document.createElement('input');
    bodyInput.type = 'text';
    bodyInput.value = body;

    // Replace text with input fields
    textDiv.innerHTML = '';
    textDiv.appendChild(titleInput);
    textDiv.appendChild(document.createElement('br')); // Line break between title and body
    textDiv.appendChild(bodyInput);

    // Change edit button to save button
    const saveButton = document.createElement('button');
    saveButton.classList.add('save');
    saveButton.innerText = 'Save Note';
    note.replaceChild(saveButton, this);

    // Add event listener to save button
    saveButton.addEventListener('click', function() {
        // Get edited title and body
        const editedTitle = titleInput.value.trim();
        const editedBody = bodyInput.value.trim();
        
        // Check if fields are not empty
        if (!editedTitle || !editedBody) {
            alert('Please fill in all fields');
            return;
        }

        // Update note content
        textDiv.innerHTML = `<b>${editedTitle}</b><p>${editedBody}</p>`;

        // Change save button back to edit button
        note.replaceChild(this.editButton, saveButton);
    });
}
