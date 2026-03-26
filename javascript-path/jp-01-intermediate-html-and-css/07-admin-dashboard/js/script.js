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