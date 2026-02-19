/* ===================================================
   INICIALIZAÇÃO SEGURA
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCarousel();
    initFadeIn();
    initActiveNav();
    initProjectModal();
    initLightbox();
    initDesignModal();

});


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
   FADE-IN COM INTERSECTION OBSERVER
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
    }, {
        threshold: 0.2
    });

    faders.forEach(section => observer.observe(section));
}


/* ===================================================
   NAVBAR ATIVA NO SCROLL
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
   MODAL DE PROJETOS
=================================================== */

function initProjectModal() {

    const modal = document.getElementById("projectModal");
    const modalBody = document.querySelector(".modal-body");
    const closeBtn = document.querySelector(".close-btn");
    const cards = document.querySelectorAll(".card");

    if (!modal || !modalBody || !closeBtn || !cards.length) return;

    const projectData = {
        sistemaBarbearia: {
            title: "Sistema de Agendamento - Barbearia",
            about: `
                O cliente precisava de um sistema sob medida, fácil de usar,
                com interface moderna e organização de processos internos.
                Tudo foi desenvolvido do zero.
            `,
            images: [
                "assets/images/barbearia1.png",
                "assets/images/barbearia2.png",
                "assets/images/barbearia3.png",
                "assets/images/barbearia4.png"
            ]
        }
    };

    cards.forEach(card => {
        card.addEventListener("click", (e) => {

            const key = card.getAttribute("data-project");
            const project = projectData[key];

            if (!project) return;

            e.preventDefault(); // evita navegação

            modalBody.innerHTML = `
                <h2>${project.title}</h2>

                <div class="modal-section">
                    <h3>Sobre o Projeto</h3>
                    <p>${project.about}</p>
                </div>

                <div class="modal-section">
                    <h3>Imagens do Projeto</h3>
                    <div class="modal-gallery">
                        ${project.images.map(img => `
                            <img src="${img}" alt="Imagem do projeto">
                        `).join("")}
                    </div>
                </div>
            `;

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
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

            const imgSrc = item.dataset.img;
            const title = item.dataset.title;
            const desc = item.dataset.desc;

            designModal.style.display = "flex";
            designModalImg.src = imgSrc;

            designModalCaption.innerHTML = `
                <h3>${title}</h3>
                <p>${desc}</p>
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
