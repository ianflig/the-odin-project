/* DARK MODE */
class darkMode {
    darkmode = localStorage.getItem("darkmode");
    darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    constructor (){
        this.themeSwitch = document.getElementById("theme-switch");
        this.themeSwitch.addEventListener("click", () => {this.themeSwitcher()});

        this.init();
    }

    init(){
        if (this.darkmode === "enabled") this.enableDarkMode();
        if (this.darkModeMql && this.darkModeMql.matches && this.darkmode === null) this.enableDarkMode();
    }

    themeSwitcher(){
        this.darkmode = localStorage.getItem("darkmode");
        this.darkmode !== "enabled" ? this.enableDarkMode() : this.disableDarkMode();
    }

    enableDarkMode(){
        document.documentElement.classList.add("darkmode");
        localStorage.setItem("darkmode", "enabled");
    }

    disableDarkMode(){
        document.documentElement.classList.remove("darkmode");
        localStorage.setItem("darkmode", "disabled");
    }
}

new darkMode;

class Book {
    constructor({title, author, pages, read}){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    get info() {return `${this.title} by ${this.author}, ${this.pages} pages`}
}

class LibraryController {
    library;
    constructor () {
        this.library = [];
    }

    createBook(book){
        let createdBook = new Book(book);
        return this.addBookToLibrary(createdBook);
    }

    addBookToLibrary(newBook) {
        this.library.push(newBook);
        return true;
    }

    bookReadStatus(bookID){
        for (let i = 0; i < this.library.length; i++) {
            if (this.library[i].id == bookID) {
                this.library[i].read = !this.library[i].read;
            }
        }
        return true;
    }

    bookDelete(bookID){
        for (let i = 0; i < this.library.length; i++) {
            if (this.library[i].id === bookID) {
                this.library.splice([i], 1);
            }
        }
        return true;
    }
}

class ScreenController {
    appLibrary;
    bookIdToDelete = null;

    constructor () {
        this.appLibrary = new LibraryController();
        this.createBookDialog = document.querySelector("#create-book-dialog");
        this.newBookButton = document.querySelector("#new-book");
        this.newBookCloseButton = document.querySelector("#new-book-close-btn"); 
        this.createBook = document.getElementById("create-book");
        this.allCards = document.querySelector(".all-cards");
        this.deleteButtonDialog = document.querySelector("#delete-book-btn-dialog");
        this.deleteBookCloseBtn = document.querySelector("#delete-book-close-btn");
        this.deleteConfirmButton = document.querySelector("#delete-confirm-button");
        this.bindEvents();
    }

    bindEvents(){
        this.createBookDialog.addEventListener("close", () => {this.createBookDialogReset()});
        this.newBookButton.addEventListener("click", () => {this.createBookDialogShowModal()});
        this.newBookCloseButton.addEventListener("click", () => {this.createBookDialogClose()});
        this.createBook.addEventListener("submit", (e) => {this.clickHandlerCreateBook(e)});
        this.allCards.addEventListener("click", (e) => {this.clickHandlerStatusBook(e)});
        this.deleteBookCloseBtn.addEventListener("click", (e) =>{this.deleteButtonDialogClose()});
        this.deleteConfirmButton.addEventListener("click", (e) =>{this.deleteButtonDialogConfirm()});
    }

    createBookDialogReset(){this.createBook.reset();}

    createBookDialogShowModal(){this.createBookDialog.showModal();}

    createBookDialogClose(){this.createBookDialog.close();}

    clickHandlerCreateBook(e){
            e.preventDefault();

            const formData = Object.fromEntries (new FormData(this.createBook));
            if (formData.read == "on") {
                formData.read = true;
            } else { formData.read = false; }

            this.createBookDialogClose();
            if (!this.appLibrary.createBook(formData)) return;
            this.displayLibrary();
    }

    clickHandlerStatusBook(e){
            e.preventDefault();
            const clickedDeleteBtn = e.target.closest(".delete-btn");
            const readButton = e.target.closest(".check-btn");

            if (clickedDeleteBtn) {
                const cardContainerToDelete = e.target.closest('.card');
                this.bookIdToDelete = cardContainerToDelete.dataset.id;
                this.deleteButtonDialogShowModal();
            } else {
                if (readButton) {
                    const cardContainerToCheck = e.target.closest('.card');
                    this.bookIdToDelete = cardContainerToCheck.dataset.id;
                    this.readStatusUpdate();
                }
            }
    }

    deleteButtonDialogShowModal(){
        this.deleteButtonDialog.showModal()
    }

    deleteButtonDialogClose(){
        this.deleteButtonDialog.close()
    }

    deleteButtonDialogConfirm(){
        if (!this.appLibrary.bookDelete(this.bookIdToDelete)) return;
        this.bookIdToDelete = null;
        this.deleteButtonDialogClose();
        this.displayLibrary();
    }

    readStatusUpdate(){
        if (!this.appLibrary.bookReadStatus(this.bookIdToDelete)) return;
        this.bookIdToDelete = null;
        this.displayLibrary();
    }

    displayLibrary(){
        this.allCards.innerHTML = "";

        for (let i = 0; i < this.appLibrary.library.length; i++){
            const book = this.appLibrary.library[i];

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
            para.textContent = book.info; 
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

            this.allCards.appendChild(divCard);
            divCard.appendChild(cardTitleContainer);
            cardTitleContainer.appendChild(h4);
            cardTitleContainer.appendChild(cardReadStatus);
            divCard.appendChild(para);
            divCard.append(iconContainer);
        }
    }

}

/* 
    --- DUMMY BOOKS --- 
*/
const library = new ScreenController();
library.appLibrary.createBook({ title: "1984", author: "George Orwell", pages: 328, read: true });
library.appLibrary.createBook({ title: "Cien años de soledad", author: "Gabriel García Márquez", pages: 417, read: false });
library.appLibrary.createBook({ title: "Dune", author: "Frank Herbert", pages: 412, read: true });
library.appLibrary.createBook({ title: "Pride and Prejudice", author: "Jane Austen", pages: 279, read: false });
library.appLibrary.createBook({ title: "Fahrenheit 451", author: "Ray Bradbury", pages: 158, read: true });
library.appLibrary.createBook({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178, read: false });
library.appLibrary.createBook({ title: "Frankenstein", author: "Mary Shelley", pages: 280, read: true });
library.appLibrary.createBook({ title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", pages: 863, read: false });
library.appLibrary.createBook({ title: "El Principito", author: "Antoine de Saint-Exupéry", pages: 96, read: true });
library.displayLibrary();