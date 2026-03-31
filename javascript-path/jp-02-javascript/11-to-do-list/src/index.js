import "./css/styles.css";
import { Storage } from "./js/Storage.js";
import { Controller } from "./js/Controller.js";
import { ScreenController } from "./js/ScreenController.js";
import { darkMode } from "./js/darkMode.js";

const storage = new Storage();
const controller = new Controller(storage);
const app = new ScreenController(controller);

new darkMode();

window.logic = controller;
window.app = app;

const clearBtn = document.querySelector("#test");
clearBtn.addEventListener("click", () => {localStorage.clear()})