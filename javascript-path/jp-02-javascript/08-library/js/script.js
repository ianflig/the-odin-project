const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/* Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    } */

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

addBookToLibrary(theHobbit);

function display (){
    for (let i = 0; i < myLibrary.length; i++){
        const para = document.createElement("p");
        para.textContent = `Book title: ${myLibrary[i].title}`;
        document.body.appendChild(para);

        const paraTwo = document.createElement("p");
        paraTwo.textContent = `Book read: ${myLibrary[i].read}`;
        document.body.appendChild(paraTwo);
    }
}

display();

console.log(myLibrary);