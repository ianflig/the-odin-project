import "./css/styles.css";
import { Storage } from "./js/Storage.js";
import { Controller } from "./js/Controller.js";
import { darkMode } from "./js/darkMode.js";

const storage = new Storage();
const app = new Controller(storage);

new darkMode();
window.app = app;