let Note = new Object;
let Notes = [];
initNotes(Notes);
function initNotes(Notes){    
    
    retrieveNotesFromModel();
    for(let index = 0; index < Notes.length; index++){
        processNotesFromModel(index);
        printNote();
        updateNotes();
    }
}

function retrieveNotesFromModel(){
    let storedNotes = JSON.parse(localStorage.getItem("StoredNotes"));
    for(let index = 0; index < storedNotes.length; index++){
        Notes[index] = storedNotes[index];
    }
}

function processNotesFromModel(index){
    let task = Notes[index].task;
    let date = Notes[index].date;
    return Note = {task : task,
                   date : date,};
}
function onPostForm(Notes){
    collectNoteData();
    try{
        validateInputs();
        Notes.push(Note);
        printNote();
        updateNotes();
        saveToModel();
        resetValues();
    }
    catch(e){
        handleError(e);
    }
}

function collectNoteData(){
    let task = document.getElementById("textInput").value;
    let date = document.getElementById("dateInput").value;
    return Note = {task : task, date : date};
}

function validateInputs(){
    if(document.getElementById("textInput").value == ""){
        throw new Error("Please Input Task and a Deadline.");
    }
    if(document.getElementById("dateInput").value == ""){
        throw new Error("Please Input Task and a Deadline.");
    }
}

function deleteNote(node){
    noteDiv = node.parentNode.parentNode;
    Notes.splice(noteDiv.id, 1);
    document.getElementById("notes").removeChild(noteDiv);
    updateNotes();
    saveToModel();
}

function noteDone(check){
    check.style.color = "rgb(0,255,0)";
}

function printNote(Note){
    let newNote = document.createElement("div");
    let newTextArea = document.createElement("textarea");
    let newDueDate = document.createElement("p");
    let newButtonDiv = document.createElement("div");
    let doneButton = document.createElement("i");
    let deleteButton = document.createElement("i");
    constructNewDueDate(newDueDate, Note);
    constructNewTextArea(newTextArea, Note);
    constructNewDiv(newNote);
    constructButtonDiv(newButtonDiv);
    constructDoneButton(doneButton);
    constructDeleteButton(deleteButton);
    newButtonDiv.append(doneButton);
    newButtonDiv.append(deleteButton);
    newNote.append(newButtonDiv);
    newNote.append(newTextArea);
    newNote.append(newDueDate);
    document.getElementById("notes").appendChild(newNote);
}

function constructButtons(newButtonDiv){
    constructButtonDiv(newButtonDiv);
    constructDoneButton(doneButton);
    constructDeleteButton(deleteButton);
}

function constructDoneButton(doneButton){
    let doneButtonClasses = ["flex-col-1","done-btn","btn-location","fas","fa-check","hidden"];
    for(let index = 0; index < doneButtonClasses.length; index++){
        doneButton.classList.add(doneButtonClasses[index]);
    }
    doneButton.setAttribute("onclick","noteDone(this)");
}

function constructDeleteButton(deleteButton){
    let deleteButtonClasses = ["flex-col-1","delete-btn","btn-location","fas","fa-times","hidden"];
    for(let index = 0; index < deleteButtonClasses.length; index++){
        deleteButton.classList.add(deleteButtonClasses[index]);
    }
    deleteButton.setAttribute("onclick","deleteNote(this)");
}

function constructButtonDiv(newButtonDiv){
    let newButtonDivClasses = ["btn-container","container","d-flex","justify-content-end","pr-2"];
    for(let index = 0; index< newButtonDivClasses.length; index++){
        newButtonDiv.classList.add(newButtonDivClasses[index]);
    }
}

function constructNewDiv(newDiv){
    let divClasses = ["note", "col-12", "col-md-6", "col-lg-4", "col-xl-3","fade-in"];
    for(let index = 0; index < divClasses.length; index++){
        newDiv.classList.add(divClasses[index]);
    }
}

function constructNewTextArea(newTextArea){
    newTextArea.readOnly = true;
    newTextArea.classList.add("note-task");
    newTextArea.innerHTML = Note.task;
}

function constructNewDueDate(newDueDate){
    newDueDate.textContent += "Deadline: " + Note.date;
    let newDueDateClasses = ["note-date", "col-12"];
    for(let index = 0; index < newDueDateClasses.length; index++){
        newDueDate.classList.add(newDueDateClasses[index]);
    }
}

function saveToModel(){
    localStorage.setItem("StoredNotes",JSON.stringify(Notes));
}

function resetValues(){
    document.getElementById("textInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("textInput").classList.remove("inputerrors");
    document.getElementById("dateInput").classList.remove("inputerrors");
}

function handleError(e){
    alert(e.message);
    document.getElementById("textInput").classList.add("inputerrors");
    document.getElementById("dateInput").classList.add("inputerrors");
}

function updateNotes(){
    let note = document.getElementsByClassName("note");
    for(let index = 0; index < Notes.length; index++){
        Notes[index].id = index;
    }
    for(let index = 0; index < note.length; index++){
        note[index].id = index;
    }
}