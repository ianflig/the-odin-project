const myLibrary = [];
let bookIdToTrash = null;

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

function display (){
    const allCards = document.querySelector(".all-cards");

    allCards.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];

        const divCard = document.createElement("div");
        const h4 = document.createElement("h4");
        const para = document.createElement("p");
        const iconContainer = document.createElement("div");

        divCard.classList.add("card");
        iconContainer.classList.add("icon-container");
        h4.textContent = book.title;
        para.textContent = book.info();
        iconContainer.innerHTML = `
        <svg class="icon-btn delete-btn">
        <use href="#icon-trash"></use>
        </svg>
        <svg class="icon-btn check-btn">
        <use href="#icon-check"></use>
        </svg>`;

        divCard.dataset.id = book.id;

        allCards.appendChild(divCard);
        divCard.appendChild(h4);
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
        formData.read = "already read";
    } else {
        formData.read = "not read";
    }

    let book = new Book(formData);
    createBook.reset();
    createBookDialog.close();
    addBookToLibrary(book);
    display();
});

/* 
    --- DELETE BOOK DIALOG SECTION --- 
*/
const allCardsContainer = document.querySelector(".all-cards");
const deleteButtonDialog = document.querySelector("#delete-book-btn-dialog");

allCardsContainer.addEventListener("click", (e) => {
    const clickedDeleteBtn = e.target.closest(".delete-btn");

    if (clickedDeleteBtn) {
        const cardContainerToDelete = e.target.closest('.card');
        bookIdToTrash = cardContainerToDelete.dataset.id;

        deleteButtonDialog.showModal();
    }
});

const deleteBookCloseBtn = document.querySelector("#delete-book-close-btn");
const deleteConfirmButton = document.querySelector("#delete-confirm-button");


deleteBookCloseBtn.addEventListener("click", (e) => {
    deleteButtonDialog.close();
    console.log(myLibrary);
})

deleteConfirmButton.addEventListener("click", (e) => {
    /* console.log(bookIdToTrash); */

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == bookIdToTrash) {
            /* console.log(`${myLibrary[i].id} & ${bookIdToTrash}`); */
            myLibrary.splice([i], 1);
        }
    }

    deleteButtonDialog.close();
    display();
});


/* 
    --- READ BOOK DIALOG SECTION --- 
*/
