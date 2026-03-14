const myLibrary = [];

function Book(title, author, pages, read) {
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

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

addBookToLibrary(theHobbit);

function display (){
    const allCards = document.querySelector(".all-cards");

    allCards.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];

        const div = document.createElement("div");
        const h4 = document.createElement("h4");
        const para = document.createElement("p");

        div.classList.add("card");
        h4.textContent = book.title;
        para.textContent = book.info();

        allCards.appendChild(div);
        div.appendChild(h4);
        div.appendChild(para);
    }
}

display();

console.log(myLibrary);