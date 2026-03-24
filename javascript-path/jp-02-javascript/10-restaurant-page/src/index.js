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
        this.header = document.querySelector('header');
        this.toggleMenuButton = document.querySelector('.toggle-menu-btn');
        this.navLinks = document.querySelector('.nav-links');

        this.bindEvents();
        this.init();
    }

    init(){
        /* home section active */
        const navSectionSpan = document.querySelector("#Home")
        navSectionSpan.classList.add('active');

        flameGenerator.flameGenerator();
        this.displaySection("Home");
    }

    bindEvents(){
        this.sectionsContainer.addEventListener("click", (e) => {this.sectionController(e)})
        this.toggleMenuButton.addEventListener('click', () => {this.headerMenuToggle()});
        window.addEventListener('scroll', () => {this.headerScroll()});
    }

    sectionController(e){  
        let categorySelected = e.target.dataset.section;
        if (!categorySelected) return;
        if (this.sectionState !== categorySelected){
            this.sectionState = categorySelected;
            this.displaySection(categorySelected);
            this.swapNavState(e);
        }
    }

    displaySection(section){
        this.contentContainer.innerHTML = '';
        if (this.routes[section]) {
            this.routes[section]();
            this.headerMenuToggle();
        }
    }

    headerScroll(){
        if (window.scrollY > 28) {
            this.header.classList.add('border-bottom');
        } else {
            this.header.classList.remove('border-bottom');
        }
    }

    headerMenuToggle(){
        this.navLinks.classList.toggle('open');
        if (this.navLinks.classList.contains('open')) {
            this.toggleMenuButton.textContent = '✕';
        } else {
            this.toggleMenuButton.textContent = '☰';
        }
    }

    swapNavState(e){
        const previousBtn = this.navLinks.querySelector('.active');
        if (previousBtn) {
            previousBtn.classList.remove('active');
        }
        e.target.classList.add('active');
    }
}

new ScreenController();