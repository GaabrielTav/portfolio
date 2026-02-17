const track = document.querySelector('.carrossel-track');
const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
let visibleCards = getVisibleCards();



function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    visibleCards = getVisibleCards();

    const cardWidth = cards[0].offsetWidth + 40;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visibleCards;

    prevBtn.style.opacity = prevBtn.disabled ? "0.3" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.3" : "1";
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    currentIndex = 0;
    updateCarousel();
});

updateCarousel();

const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

faders.forEach(section => {
    observer.observe(section);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
