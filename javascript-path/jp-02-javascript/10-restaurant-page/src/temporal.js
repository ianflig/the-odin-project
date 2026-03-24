
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 28) {
        header.classList.add('border-bottom');
    } else {
        header.classList.remove('border-bottom');
    }
});

const toggleMenuButton = document.querySelector('.toggle-menu-btn');
const navLinks = document.querySelector('.nav-links');

toggleMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    if (navLinks.classList.contains('open')) {
        toggleMenuButton.textContent = '✕';
    } else {
        toggleMenuButton.textContent = '☰';
    }
});

class Card {
    constructor({name, highlighted, price, jpName, description, spicinessLevel, category}) {
        this.name = name;
        this.highlighted = highlighted;
        this.price = price;
        this.jpName = jpName;
        this.description = description;
        this.spicinessLevel = spicinessLevel;
        this.category = category;
    }
}

class CardController {
    categoryState = null;
    cardsContainer = [];
    categories = ["all", "signatures", "appetizers", "maincourse", "desserts"];

    constructor() {
        this.cardsContainerDiv = document.querySelector(".cards-container");
        this.allButton = document.querySelector("#all");
        this.signaturesButton = document.querySelector("#signatures");
        this.appetizersButton = document.querySelector("#appetizers");
        this.mainCourseButton = document.querySelector("#maincourse");
        this.dessertsButton = document.querySelector("#desserts");

        this.bindEvents();
    }

    bindEvents(){
        this.allButton.addEventListener("click", () => this.menuFilter("all"));
        this.signaturesButton.addEventListener("click", () => this.menuFilter("SIGNATURES"));
        this.appetizersButton.addEventListener("click", () => this.menuFilter("APPETIZERS"));
        this.mainCourseButton.addEventListener("click", () => this.menuFilter("MAINCOURSE"));
        this.dessertsButton.addEventListener("click", () => this.menuFilter("DESSERTS"));
    }

    menuFilter(category){
        if (this.categoryState !== category){
            this.categoryState = category;
            this.clearCategoryClass();
            const categoryButton = document.querySelector(`#${category.toLowerCase()}`)
            categoryButton.classList.add("category-active")
            this.filterCardsContainerArray(category);
            return;
        }
    }

    clearCategoryClass(){
        for (let i = 0; i < this.categories.length; i++){
            const buttonToRemove = document.querySelector(`#${this.categories[i]}`);
            buttonToRemove.classList.remove("category-active");
        }
    }

    filterCardsContainerArray(category){
        if(category === "all"){return this.displayCards(this.cardsContainer)};

        let filteredArr = this.cardsContainer.filter(card => card.category === category);
        this.displayCards(filteredArr);
        console.log(filteredArr);
    }

    createCard(card) {
        let newCard = new Card(card);
        this.addToContaier(newCard);
    }
        
    addToContaier(newCard){
        this.cardsContainer.push(newCard)
    }

    displayCards(newArr){
        this.cardsContainerDiv.innerHTML = '';
        for (let i = 0; i < newArr.length; i++){
            const cardsContainer = document.querySelector(".cards-container");
            const card = document.createElement("div");
            const cardTitle = document.createElement("div");
            const cardTitleLeft = document.createElement("div");
            const leftSpan = document.createElement("span");
            const leftSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const cardTitleRight = document.createElement("div");
            const rightSpan = document.createElement("span");
            const cardFirstSpan = document.createElement("span");
            const cardFirstParra = document.createElement("p");
            const cardsButtonContainer = document.createElement("div");
            const cardsButtonContainerFlames = document.createElement("div");
            const secondSpan = document.createElement("span");

            leftSpan.textContent = newArr[i].name;
            if (newArr[i].highlighted){
                leftSvg.innerHTML = '<use href="#card-icon"></use>';
            }
            rightSpan.textContent = `$${newArr[i].price}`;
            cardFirstSpan.textContent = newArr[i].jpName;
            cardFirstParra.textContent = newArr[i].description;
            secondSpan.textContent = newArr[i].category;

            card.classList.add("card");
            cardTitle.classList.add("title");
            cardTitleLeft.classList.add("left");
            leftSvg.classList.add("cursor-default");
            cardTitleRight.classList.add("right");
            
            cardsContainer.appendChild(card);
            card.appendChild(cardTitle);
            cardTitle.appendChild(cardTitleLeft);
            cardTitleLeft.appendChild(leftSpan);
            cardTitleLeft.appendChild(leftSvg);
            cardTitle.appendChild(cardTitleRight);
            cardTitleRight.appendChild(rightSpan);
            card.appendChild(cardFirstSpan);
            card.appendChild(cardFirstParra);
            card.appendChild(cardsButtonContainer);
            cardsButtonContainer.classList.add("cards-button-container");
            cardsButtonContainer.appendChild(cardsButtonContainerFlames);
            cardsButtonContainerFlames.classList.add("flames")
            for (let j = 1; j <= 3; j++){
                const flame = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                flame.innerHTML = '<use href="#flame-icon">';
                flame.classList.add("cursor-default");
                if (j <= newArr[i].spicinessLevel){
                    flame.classList.add("flame-filled");
                }
                cardsButtonContainerFlames.appendChild(flame);
            }
            cardsButtonContainer.appendChild(secondSpan);
        }
    }
}

const card = new CardController();
card.createCard({
    name: "Gotcha Pork Roast", 
    highlighted: true, 
    price: 28, 
    jpName: "ゴッチャ肉丼", 
    description: "Soma's legendary dish - crispy bacon wrapped around a juicy pork loin, served with our secret apple-onion sauce that triggers explosive foodgasms.", 
    spicinessLevel: 2, 
    category: "SIGNATURES"
});

card.createCard({
    name: "Transforming Furikake Gohan", 
    highlighted: true, 
    price: 18, 
    jpName: "化けるふりかけご飯", 
    description: "A magical rice dish that transforms before your eyes. Warm dashi broth is poured over the rice, releasing aromatic furikake that dances and swirls.", 
    spicinessLevel: 0, 
    category: "SIGNATURES"
});

card.createCard({
    name: "Chaliapin Steak Don", 
    highlighted: false, 
    price: 32, 
    jpName: "シャリアピンステーキ丼", 
    description: "Tender beef steak marinated in onion for supreme tenderness, served on a bed of perfectly cooked rice with caramelized onion sauce.", 
    spicinessLevel: 1, 
    category: "MAINCOURSE"
});

card.createCard({
    name: "Ravioli of the Dragon", 
    highlighted: false, 
    price: 26, 
    jpName: "龍のラビオリ", 
    description: "Handmade ravioli filled with a fusion of Italian and Chinese flavors, topped with a fiery dragon breath sauce.", 
    spicinessLevel: 3, 
    category: "MAINCOURSE"
});

card.createCard({
    name: "Egg Tempura Don", 
    highlighted: false, 
    price: 16, 
    jpName: "卵の天ぷら丼", 
    description: "A perfectly soft-boiled egg encased in a light, crispy tempura shell, served over seasoned rice with our signature dashi.", 
    spicinessLevel: 0, 
    category: "APPETIZERS"
});

card.createCard({
    name: "Peanut Butter Squid Tentacles", 
    highlighted: false, 
    price: 22, 
    jpName: "ピーナッツバターイカ", 
    description: "A surprising combination that works - tender squid tentacles glazed with a savory peanut butter sauce, proving creativity has no limits.", 
    spicinessLevel: 1, 
    category: "APPETIZERS"
});

card.createCard({
    name: "Apple Risotto", 
    highlighted: false, 
    price: 24, 
    jpName: "リンゴのリゾット", 
    description: "Creamy arborio rice cooked with apple cider, topped with caramelized apple slices and aged parmesan for a sweet-savory symphony.", 
    spicinessLevel: 0, 
    category: "MAINCOURSE"
});

card.createCard({
    name: "Soufflé Omelette", 
    highlighted: true, 
    price: 19, 
    jpName: "スフレオムレツ", 
    description: "Light as a cloud, this fluffy omelette rises like the morning sun, filled with a secret blend of cheeses that melt on your tongue.", 
    spicinessLevel: 0, 
    category: "SIGNATURES"
});

card.createCard({
    name: "Autumn Election Parfait", 
    highlighted: false, 
    price: 14, 
    jpName: "秋の選抜パフェ", 
    description: "A towering dessert celebrating autumn flavors - layers of chestnut cream, persimmon compote, and maple-glazed walnuts.", 
    spicinessLevel: 0, 
    category: "DESSERTS"
});

card.createCard({
    name: "Dorayaki Surprise", 
    highlighted: false, 
    price: 12, 
    jpName: "サプライズどら焼き", 
    description: "Traditional Japanese pancakes with a twist - filled with our special red bean and vanilla custard fusion that defies expectations.", 
    spicinessLevel: 0, 
    category: "DESSERTS"
});

card.menuFilter("all");
