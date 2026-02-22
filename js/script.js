/* ===================================================
   INICIALIZAÇÃO SEGURA
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCarousel();
    initFadeIn();
    initActiveNav();
    initLightbox();
    initDesignModal();
    initMobileMenu();

});


/* ===================================================
   MENU MOBILE
=================================================== */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!menuToggle || !navMenu || !menuOverlay) return;

    function openMenu() {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function toggleMenu() {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuToggle.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

/* ===================================================
   CARROSSEL
=================================================== */

function initCarousel() {

    const track = document.querySelector('.carrossel-track');
    const cards = document.querySelectorAll('.card');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (!track || !cards.length || !nextBtn || !prevBtn) return;

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
}


/* ===================================================
   FADE-IN
=================================================== */

function initFadeIn() {

    const faders = document.querySelectorAll('.fade-in');
    if (!faders.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(section => observer.observe(section));
}


/* ===================================================
   NAVBAR ATIVA
=================================================== */

function initActiveNav() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (!sections.length || !navLinks.length) return;

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

    });
}


/* ===================================================
   LIGHTBOX
=================================================== */

function initLightbox() {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    document.addEventListener("click", function (e) {
        if (e.target.matches(".modal-gallery img")) {
            lightbox.style.display = "flex";
            lightboxImg.src = e.target.src;
            document.body.style.overflow = "hidden";
        }
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }
}


/* ===================================================
   MODAL DESIGN
=================================================== */

function initDesignModal() {

    const designItems = document.querySelectorAll(".design-item");
    const designModal = document.getElementById("designModal");
    const designModalImg = document.getElementById("designModalImg");
    const designModalCaption = document.getElementById("designModalCaption");
    const designClose = document.querySelector(".design-close");

    if (!designItems.length || !designModal) return;

    designItems.forEach(item => {
        item.addEventListener("click", () => {

            designModal.style.display = "flex";
            designModalImg.src = item.dataset.img;

            designModalCaption.innerHTML = `
                <h3>${item.dataset.title}</h3>
                <p>${item.dataset.desc}</p>
            `;

            document.body.style.overflow = "hidden";
        });
    });

    designClose.addEventListener("click", closeDesignModal);
    designModal.addEventListener("click", (e) => {
        if (e.target === designModal) closeDesignModal();
    });

    function closeDesignModal() {
        designModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}