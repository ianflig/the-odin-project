const myLibrary = [];

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

const theHobbit = new Book({
    title: "The Hobbit", 
    author: "J.R.R Tolkien",
    pages: 295,
    read: false});

addBookToLibrary(theHobbit);

function display (){
    const allCards = document.querySelector(".all-cards");

    allCards.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];

        const divCard = document.createElement("div");
        const h4 = document.createElement("h4");
        const para = document.createElement("p");

        divCard.classList.add("card");
        h4.textContent = book.title;
        para.textContent = book.info();

        allCards.appendChild(divCard);
        divCard.appendChild(h4);
        divCard.appendChild(para);
    }
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#new-book");
const closeButton = document.querySelector("dialog #close-btn");
const submitButton = document.querySelector("#submit-btn")


showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

const createBook = document.getElementById("create-book");
createBook.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries (new FormData(createBook));
    console.log(formData);
    let book = new Book(formData);
    console.log(book);
    dialog.close();
    addBookToLibrary(book);
    display();
});