const carouselTrack = document.getElementById("carouseltrackebc");
const slides = document.querySelectorAll("#carouseltrackebc .carousel-slide");

let currentSlide = 0;
let autoPlay;

function updateCarousel() {
    if (!carouselTrack || slides.length === 0) return;

    carouselTrack.style.transform = translateX(-${currentSlide * 100}%);
}

function nextSlide() {
    if (slides.length === 0) return;

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    updateCarousel();
}

function startAutoPlay() {
    if (slides.length > 1) {
        autoPlay = setInterval(nextSlide, 4000);
    }
}

function stopAutoPlay() {
    clearInterval(autoPlay);
}

if (carouselTrack && slides.length > 0) {
    updateCarousel();
    startAutoPlay();

    carouselTrack.addEventListener("mouseenter", stopAutoPlay);
    carouselTrack.addEventListener("mouseleave", startAutoPlay);
}

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });
}

const anio = document.getElementById("anio");

if (anio) {
    anio.textContent = new Date().getFullYear();
}
