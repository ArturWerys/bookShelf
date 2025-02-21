const titleInput = document.getElementById("title-input");

let allList = getAllBooks();
let readList = getRead();
let toReadList = getToRead();


document.addEventListener('DOMContentLoaded', () => {
    const allBooksSection = document.getElementById("all-books-section");
    const readSection = document.getElementById("read-section");
    const toReadSection = document.getElementById("to-read-section");
    const addBookSection = document.getElementById("add-book-section");
    const deleteBook = document.getElementById("delete-book-section");

    document.getElementById("all-books").addEventListener("click", () => showSection(allBooksSection));
    document.getElementById("read").addEventListener("click", () => showSection(readSection));
    document.getElementById("to-read").addEventListener("click", () => showSection(toReadSection));
    document.getElementById("add-book").addEventListener("click", () => showSection(addBookSection));
    document.getElementById("add-book-button").addEventListener("click", (event) => {
        event.preventDefault();
        addBook();
    });
    document.getElementById("delete-book").addEventListener("click", () => showSection(deleteBook));

    
    updateAllLists();
});

function showSection(section) {
    document.getElementById("all-books-section").classList.add("hidden");
    document.getElementById("read-section").classList.add("hidden");
    document.getElementById("to-read-section").classList.add("hidden");
    document.getElementById("add-book-section").classList.add("hidden");
    document.getElementById("delete-book-section").classList.add("hidden");

    section.classList.remove("hidden");

}

function addBook(){
    const title = titleInput.value.trim();
    const status = document.querySelector('input[name="book-status"]:checked').value;

    if (!title) {
        alert("Please enter a title");
        return;
    }


    if( status === "read"){
        readList.push(title);
        updateList(readList, "read-list");
        saveRead();
    }
    else {
        toReadList.push(title);
        updateList(toReadList, "to-read-list");
        saveToRead();
    }
    allList.push(title);
    updateList(allList, "all-books-list");

    titleInput.value = "";
}
function deleteBook() {
    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter a title to delete");
        return;
    }

    let found = false;

   
    if (readList.includes(title)) {
        readList = readList.filter(book => book !== title);
        localStorage.setItem("readList", JSON.stringify(readList)); 
        found = true;
    }


    if (toReadList.includes(title)) {
        toReadList = toReadList.filter(book => book !== title);
        localStorage.setItem("toReadList", JSON.stringify(toReadList)); 
        found = true;
    }

    if (!found) {
        alert("Book not found");
        return;
    }

    // Odśwież listy
    updateAllLists();
    titleInput.value = "";
}



function updateAllLists() {
    allList = getAllBooks();  
    updateList(readList, "read-list");
    updateList(toReadList, "to-read-list");
    updateList(allList, "all-books-list");
}

function updateList(list, elementId) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ""; 
    list.forEach(title => {
        const li = document.createElement("li");
        li.textContent = title;
        listElement.appendChild(li);
    });
}

function saveRead(){
    const readJson = JSON.stringify(readList);
    localStorage.setItem("readList", readJson);
}

function saveToRead(){
    const toReadJson = JSON.stringify(toReadList);
    localStorage.setItem("toReadList", toReadJson);
} 

function getRead(){
    const read = localStorage.getItem("readList") || "[]";
    return JSON.parse(read);
}

function getToRead(){
    const toRead = localStorage.getItem("toReadList") || "[]";
    return JSON.parse(toRead);
}

function getAllBooks(){
    return [...getRead(), ...getToRead()];
}