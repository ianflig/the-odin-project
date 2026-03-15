const myLibrary = [];
let bookIdToTrash = null;
let readIdToChange = null;

function Book({title, author, pages, read}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function displayLibrary (){
    const allCards = document.querySelector(".all-cards");

    allCards.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];

        const divCard = document.createElement("div");
        const h4 = document.createElement("h4");
        const para = document.createElement("p");
        const iconContainer = document.createElement("div");
        const cardTitleContainer = document.createElement("div")
        const cardReadStatus = document.createElement("div")

        divCard.classList.add("card");
        iconContainer.classList.add("icon-container");
        cardTitleContainer.classList.add("card-title-container");
        h4.textContent = book.title;
        para.textContent = book.info();
        iconContainer.innerHTML = `
        <svg class="icon-btn delete-btn"><use href="#icon-trash"></use></svg>
        <svg class="icon-btn check-btn"><use href="#icon-check"></use></svg>`;
        if (!book.read) {
            cardReadStatus.textContent = "Unread";
            cardReadStatus.classList.add("unread");
        } else {
            cardReadStatus.textContent = "Read";
            cardReadStatus.classList.add("read");
        }

        divCard.dataset.id = book.id;

        allCards.appendChild(divCard);
        divCard.appendChild(cardTitleContainer);
        cardTitleContainer.appendChild(h4);
        cardTitleContainer.appendChild(cardReadStatus);
        divCard.appendChild(para);
        divCard.append(iconContainer);
    }
}

/* 
    --- NEW BOOK DIALOG SECTION --- 
*/

const createBookDialog = document.querySelector("#create-book-dialog");

const newBookButton = document.querySelector("#new-book");
const newBookCloseButton = document.querySelector("#new-book-close-btn");

newBookButton.addEventListener("click", () => {
  createBookDialog.showModal();
});

newBookCloseButton.addEventListener("click", () => {
  createBookDialog.close();
});

const createBook = document.getElementById("create-book");
createBook.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries (new FormData(createBook));
    if (formData.read == "on") {
        formData.read = true;
    } else {
        formData.read = false;
    }

    let book = new Book(formData);
    createBook.reset();
    createBookDialog.close();
    addBookToLibrary(book);
    displayLibrary();
});

/* 
    --- DELETE BOOK & READ STATUS DIALOG SECTION --- 
*/
const allCardsContainer = document.querySelector(".all-cards");
const deleteButtonDialog = document.querySelector("#delete-book-btn-dialog");

allCardsContainer.addEventListener("click", (e) => {
    const clickedDeleteBtn = e.target.closest(".delete-btn");
    const readButton = e.target.closest(".check-btn");

    if (clickedDeleteBtn) {
        const cardContainerToDelete = e.target.closest('.card');
        bookIdToTrash = cardContainerToDelete.dataset.id;

        deleteButtonDialog.showModal();
    } else {
        if (readButton) {
            const cardContainerToCheck = e.target.closest('.card');
            readIdToChange = cardContainerToCheck.dataset.id;
            readStatusUpdate();
        }
    }
});

const deleteBookCloseBtn = document.querySelector("#delete-book-close-btn");
const deleteConfirmButton = document.querySelector("#delete-confirm-button");


deleteBookCloseBtn.addEventListener("click", (e) => {
    deleteButtonDialog.close();
})

deleteConfirmButton.addEventListener("click", (e) => {
    /* console.log(bookIdToTrash); */

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == bookIdToTrash) {
            /* console.log(`${myLibrary[i].id} & ${bookIdToTrash}`); */
            myLibrary.splice([i], 1);
        }
    }
    bookIdToTrash = null;
    deleteButtonDialog.close();
    displayLibrary();
});


/* 
    --- READ BOOK STATUS UPDATER --- 
*/

function readStatusUpdate () {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == readIdToChange) {
            myLibrary[i].read = !myLibrary[i].read;
        }
    }
    displayLibrary();
}

/* 
    --- DUMMY BOOKS --- 
*/

addBookToLibrary(new Book({ title: "1984", author: "George Orwell", pages: 328, read: true }));
addBookToLibrary(new Book({ title: "Cien años de soledad", author: "Gabriel García Márquez", pages: 417, read: false }));
addBookToLibrary(new Book({ title: "Dune", author: "Frank Herbert", pages: 412, read: true }));
addBookToLibrary(new Book({ title: "Pride and Prejudice", author: "Jane Austen", pages: 279, read: false }));
addBookToLibrary(new Book({ title: "Fahrenheit 451", author: "Ray Bradbury", pages: 158, read: true }));
addBookToLibrary(new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178, read: false }));
addBookToLibrary(new Book({ title: "Frankenstein", author: "Mary Shelley", pages: 280, read: true }));
addBookToLibrary(new Book({ title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", pages: 863, read: false }));
addBookToLibrary(new Book({ title: "El Principito", author: "Antoine de Saint-Exupéry", pages: 96, read: true }));

displayLibrary();