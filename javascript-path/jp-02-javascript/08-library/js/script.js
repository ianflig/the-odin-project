/* DARK MODE */
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkMode = () => {
    document.documentElement.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};
const disableDarkMode = () => {
    document.documentElement.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
};

if (darkmode === "active"){
    enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

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

    bookReadStatus(){
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == readIdToChange) {
                myLibrary[i].read = !myLibrary[i].read;
            }
        }
        displayLibrary();
    }

    bookDelete(){
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == bookIdToTrash) {

                myLibrary.splice([i], 1);
            }
        }
        bookIdToTrash = null;
        deleteButtonDialog.close();
        displayLibrary();
    }
}

class ScreenController {
    appLibrary;
    constructor () {
        this.appLibrary = new LibraryController();

        this.createBookDialog = document.querySelector("#create-book-dialog");

        this.newBookButton = document.querySelector("#new-book");
        this.newBookCloseButton = document.querySelector("#new-book-close-btn"); 

        this.createBook = document.getElementById("create-book");
        
        this.bindEvents();
    }

    bindEvents(){
        this.createBookDialog.addEventListener("close", () => {this.createBookDialogReset()});
        this.newBookButton.addEventListener("click", () => {this.createBookDialogShowModal()});
        this.newBookCloseButton.addEventListener("click", () => {this.createBookDialogClose()});
        this.createBook.addEventListener("submit", (e) => {this.clickHandlerCreateBook(e)})
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
            if (!this.appLibrary.createBook(formData)){return console.log("error while submiting book")};

            displayLibrary();
    }

    clickHandlerStatusBook(){
        const allCardsContainer = document.querySelector(".all-cards");
        const deleteButtonDialog = document.querySelector("#delete-book-btn-dialog");

        allCardsContainer.addEventListener("click", (e) => {
            e.preventDefault();
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
            /* get response from LC to delete */
        });
    }

    displayLibrary(){
        const allCards = document.querySelector(".all-cards");

        allCards.innerHTML = "";

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

}

const library = new ScreenController();