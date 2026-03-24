
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


