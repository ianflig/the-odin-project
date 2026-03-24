import "./css/home.css";
import "./css/menu.css";
import "./css/about.css";
import "./css/contact.css";
import { flameGenerator } from "./js/home.js";
import { renderHome } from "./js/home.js";
import { renderMenu } from "./js/menu.js";
import { renderAbout } from "./js/about.js";
import { renderContact } from "./js/contact.js";

class ScreenController{
    sectionState = "Home";
    routes = {
            "Home": () => renderHome.displayHome(),
            "Menu": () => renderMenu.displayMenu(),
            "About": () => renderAbout.displayAbout(),
            "Contact": () => renderContact.displayContact()
        };

    constructor(){
        this.sectionsContainer = document.querySelector(".nav-links");
        this.contentContainer = document.querySelector("#content");

        this.bindEvents();
    }

    bindEvents(){
        this.sectionsContainer.addEventListener("click", (e) => {this.sectionController(e)})
    }

    sectionController(e){  
        let categorySelected = e.target.dataset.section;
        if (!categorySelected) return;
        if (this.sectionState !== categorySelected){
            this.sectionState = categorySelected;
            this.displaySection(categorySelected);
        }
    }

    displaySection(section){
        this.contentContainer.innerHTML = '';
        if (this.routes[section]) {
            this.routes[section]();
        } 
    }
}

const screen = new ScreenController();
flameGenerator.flameGenerator();
screen.displaySection("Home");

