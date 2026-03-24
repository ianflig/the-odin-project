/* HOME SECTION */
class Home{
    homeComponent = `
    <div class="home">
            <div class="council-approbation">
                <svg>
                    <use href="#star"></use>
                </svg>
                <span>Elite 10 Council Approved</span>
                <svg>
                    <use href="#star"></use>
                </svg>
            </div>
            <div class="main-info">
                <h1>
                    <span class="color-secondary">YUKIHIRA</span>
                    <span class="color-primary">DINNER</span>
                </h1>
                <h4 class="color-tertiary">食戟のソーマ</h4>
                <h3>Where Every Dish is a <span class="color-primary">Shokugeki</span></h3>
                <p>Experience the legendary cuisine that sparked culinary revolutions. Every plate tells a story of passion, creativity, and the relentless pursuit of the perfect flavor.</p>
                <div class="button-container">
                    <button>
                        <svg>
                            <use href="#chef-hat-icon"></use>
                        </svg>
                        Explore Our Menu
                    </button>
                    <button>
                        Our Story
                    </button>
                </div>
                <div class="extra-info">
                    <div class="extra-info-container">
                        <span class="color-primary">92</span>
                        <span>Shokugeki Wins</span>
                    </div>
                    <div class="extra-info-container">
                        <span class="color-primary">∞</span>
                        <span>Flavor Explosions</span>
                    </div>
                    <div class="extra-info-container">
                        <span class="color-primary">1</span>
                        <span>Mission</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    constructor(){}
    appContainer () {
        const divContent = document.querySelector("#content");

        divContent.insertAdjacentHTML('beforeend', this.homeComponent);
    }
}

export const renderHome = new Home();