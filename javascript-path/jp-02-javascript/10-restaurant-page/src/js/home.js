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
                    <button data-section="Menu" id="explore-our-menu">
                        <svg>
                            <use href="#chef-hat-icon"></use>
                        </svg>
                        Explore Our Menu
                    </button>
                    <button data-section="About" id="our-story">
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
    displayHome () {
        const divContent = document.querySelector("#content");

        divContent.insertAdjacentHTML('beforeend', this.homeComponent);
    }
}

export const renderHome = new Home();

class GenerateBackgroundFlames{
    constructor(){
        this.bgContainer = document.getElementById('background-flames');
        this.flameAmount = 25; 
        this.flameSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    }

    flameGenerator(){
        for (let i = 0; i < this.flameAmount; i++) {
            const flameWrapper = document.createElement('div');
            flameWrapper.classList.add('flame-icon');
            flameWrapper.innerHTML = this.flameSVG;

            const randomTop = Math.floor(Math.random() * 100);
            const randomLeft = Math.floor(Math.random() * 100);
        
            flameWrapper.style.top = `${randomTop}vh`;
            flameWrapper.style.left = `${randomLeft}vw`;

            const randomScale = Math.random() * 0.6 + 0.5;
            flameWrapper.style.transform = `scale(${randomScale})`;

            this.bgContainer.appendChild(flameWrapper);
        }
    }
}

export const flameGenerator = new GenerateBackgroundFlames();