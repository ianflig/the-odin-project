function generateBackgroundFlames() {
    const bgContainer = document.getElementById('background-flames');
    const flameAmount = 25; 
    const flameSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;

    for (let i = 0; i < flameAmount; i++) {
        const flameWrapper = document.createElement('div');
        flameWrapper.classList.add('flame-icon');
        flameWrapper.innerHTML = flameSVG;

        const randomTop = Math.floor(Math.random() * 100);
        const randomLeft = Math.floor(Math.random() * 100);
    
        flameWrapper.style.top = `${randomTop}vh`;
        flameWrapper.style.left = `${randomLeft}vw`;

        const randomScale = Math.random() * 0.6 + 0.5;
        flameWrapper.style.transform = `scale(${randomScale})`;

        bgContainer.appendChild(flameWrapper);
    }
}

generateBackgroundFlames();

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


