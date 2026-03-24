/* MENU SECTION */
class Menu{
    homeComponent = `
    <div class="menu">
            <div class="our-creations">
                <svg>
                    <use href="#utensils-icon"></use>
                </svg>
                <span>Our Creations</span>
            </div>
            <div class="main-info">
                <span class="color-secondary">The Menu</span>
                <p>Each dish is crafted with the passion and creativity that Totsuki Academy demands. Prepare for flavor explosions that will make your clothes fly off.</p>
            </div>
            <div class="button-container">
                <button class="category-active" id="all">All</button>
                <button id="signatures">Signatures</button>
                <button id="appetizers">Appetizers</button>
                <button id="maincourse">Main Course</button>
                <button id="desserts">Desserts</button>
            </div>
            <div class="cards-container">
            </div>     
            <div class="extra-info">
                <p>"The secret to good cooking is putting your soul into every dish." - Joichiro Yukihira</p>
            </div>
        </div>
    `;
    constructor(){}
    appContainer () {
        const divContent = document.querySelector("#content");

        divContent.insertAdjacentHTML('beforeend', this.homeComponent);
    }
}

export const renderMenu = new Menu();