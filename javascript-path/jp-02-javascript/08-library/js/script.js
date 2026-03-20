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
    constructor () {
        this.library = [];
    }

    addBookToLibrary(newBook) {
        this.library.push(newBook);
    }

    get books(){
        return console.log(this.library)
    }
}

class ScreenController {
    
}

const library = new LibraryController();