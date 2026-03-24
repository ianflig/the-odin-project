/* ABOUT SECTION */
class About{
    homeComponent = `
    <div class="about">
            <div class="our-story">
                <svg>
                    <use href="#award-icon"></use>
                </svg>
                <span>Our Story</span>
            </div>
            <div class="pre-info">
                <span class="color-secondary">About Yukihira</span>
                <p>From a humble family diner to culinary legend - this is the story of how passion, perseverance, and a pinch of madness created something extraordinary.</p>
            </div>
            <div class="main-info">
                <div class="left">
                    <span>A Legacy of <span>Flavor</span></span>
                    <p>Yukihira Diner began as a modest restaurant run by Joichiro Yukihira, a former Totsuki Academy student who left at the peak of his career to pursue what truly mattered - making everyday people happy with delicious food.</p>
                    <p>His son, Soma Yukihira, grew up in this kitchen, developing an unconventional style that would later shake the foundations of Totsuki Academy itself. His philosophy is simple yet profound: never stop experimenting, never give up, and always cook to put a smile on someone's face.</p>
                    <p>Today, we continue that legacy. Every dish that leaves our kitchen carries the spirit of countless Shokugeki battles, the wisdom of culinary masters, and the heart of a family that believes food is the ultimate expression of love.</p>
                    <div class="icon-container">
                        <div class="icon-wrapper">
                            <div class="icon-background">
                                <svg><use href="#users-icon"></use></svg>
                            </div>
                            <div class="icon-background">
                                <svg><use href="#chef-hat-icon"></use></svg>
                            </div>
                            <div class="icon-background">
                                <svg><use href="#flame-icon"></use></svg>
                            </div>
                        </div>
                        <div class="complementary-text">
                            <span>10,000+ Happy Diners</span>
                            <span>And counting...</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-content">
                            <span class="year">YEAR 1</span>
                            <h3>Yukihira Dinner Founded</h3>
                            <p>A small family restaurant with big dreams</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-content">
                            <span class="year">YEAR 10</span>
                            <h3>SOMA JOINS TOTSUKI</h3>
                            <p>The next generation begins their journey</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-content">
                            <span class="year">YEAR 12</span>
                            <h3>Elite 10 Achievement</h3>
                            <p>Reaching the pinnacle of culinary excellence</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-content">
                            <span class="year">TODAY</span>
                            <h3>Legend Continues</h3>
                            <p>Serving flavor explosions to the world</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cards-container">
                <div class="card">
                    <div class="icon-background">
                        <svg><use href="#heart-icon"></use></svg>
                    </div>
                    <h3>Passion</h3>
                    <p>Every dish is cooked with unwavering passion. We believe cooking should make both the chef and the diner smile.</p>
                </div>
                <div class="card">
                    <div class="icon-background">
                        <svg><use href="#chef-hat-icon"></use></svg>
                    </div>
                    <h3>Creativity</h3>
                    <p>We push boundaries and break conventions. Traditional techniques meet bold innovation in every creation.</p>
                </div>
                <div class="card">
                    <div class="icon-background">
                        <svg><use href="#cup-icon"></use></svg>
                    </div>
                    <h3>Excellence</h3>
                    <p>Trained in the rigorous standards of culinary excellence. Every plate that leaves our kitchen is a masterpiece.</p>
                </div>
            </div>
            <span>"</span>
            <h2>A chef who can't satisfy a customer is no chef at all.</h2>
            <p>- Soma Yukihira</p>
        </div>
    `;
    constructor(){}
    displayAbout () {
        const divContent = document.querySelector("#content");

        divContent.insertAdjacentHTML('beforeend', this.homeComponent);
    }
}

export const renderAbout = new About();