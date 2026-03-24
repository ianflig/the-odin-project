/* CONTACT SECTION */
class Contact{
    homeComponent = `
    <div class="contact">
            <div class="get-in-touch">
                <svg>
                    <use href="#location-icon"></use>
                </svg>
                <span>Get In Touch</span>
            </div>
            <div class="pre-info">
                <span class="color-secondary">Contact Us</span>
                <p>Ready to experience the Yukihira magic? Make a reservation or send us a challenge for a Shokugeki. We accept all culinary battles!</p>
            </div>
            <div class="main-info">
                <div class="reservation">
                    <h3>Make a Reservation</h3>
                    <form class="form-container" id="reservation-form">
                        <div class="first-wrapper">
                            <div class="name-wrapper">
                                <label for="name">Your Name</label>
                                <input type="text" id="name" placeholder="Enter your name" required>
                            </div>
                            <div class="email-wrapper">
                                <label for="email">Email Addres</label>
                                <input type="email" id="email" placeholder="your@email.com" required>   
                            </div>
                        </div>
                        <div class="second-wrapper">
                            <div class="date-wrapper">
                                <label for="date">Preferred Date</label>
                                <input type="date" id="date" required>
                            </div>
                            <div class="guests-wrapper">
                                <label for="guests">Number of Guests</label>
                                <input type="number" id="guests" placeholder="2" required>
                            </div>
                        </div>
                        <div class="special-request">
                            <label for="special-request">Special Requests</label>
                            <input type="text" id="special-requests" placeholder="Any dietary restrictions, special occasions, or Shokugeki challenges?">
                        </div>
                        <button type="submit" form="reservation-form">
                            <svg><use href="#submit-icon"></use></svg>
                            <h4>Submit Reservation</h4>
                        </button>
                    </form>
                </div>
                <div class="others">
                    <div class="card">
                        <svg><use href="#location-icon"></use></svg>
                        <div>
                            <h4>Location</h4>
                            <span>Sumiredori Shopping District</span>
                            <span>Tokyo, Japan</span>
                        </div>
                    </div>
                    <div class="card">
                        <svg><use href="#phone-icon"></use></svg>
                        <div>
                            <h4>Phone</h4>
                            <span>+81 3-YUKIHIRA</span>
                            <span>(Reservations Welcome)</span>
                        </div>
                    </div>
                    <div class="card">
                        <svg><use href="#clock-icon"></use></svg>
                        <div>
                            <h4>Hours</h4>
                            <span>Mon-Sat: 11:00 - 22:00</span>
                            <span>Sun: 12:00 - 20:00</span>
                        </div>
                    </div>
                    <div class="card">
                        <svg><use href="#email-icon"></use></svg>
                        <div>
                            <h4>Email</h4>
                            <span>contact@yukihira.jp</span>
                            <span>reservations@yukihira.jp</span>
                        </div>
                    </div>
                    <div class="feeling-bold">
                        <svg><use href="#flame-icon"></use></svg>
                        <h3>Feeling Bold?</h3>
                        <p>Challenge us to a Shokugeki! If you win, your meal is free. If we win... you join our fan club. Fair trade, right?</p>
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

export const renderMenu = new Contact();