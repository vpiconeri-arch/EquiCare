document.addEventListener('DOMContentLoaded', () => {
    /*  MENÚ MÓVIL DESPLEGABLE
        */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
            if (menuIcon) {
                if (isOpen) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-xmark');
                } else {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
        // Cerrar el menú al hacer clic en cualquiera de sus enlaces
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
    }
    /* 
       CARRUSEL INTERACTIVO DEL HERO (3 IMÁGENES + CLIC + AUTOPLAY)
        */
    const carouselTrack = document.getElementById('carouseltrackecb');    const slides = document.querySelectorAll('#carouseltrackecb .carousel-slide');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const dots = document.querySelectorAll('#carousel-dots .dot');
    let currentSlide = 0;
    let autoPlayTimer = null;
    const totalSlides = slides.length;
    // Actualiza la posición del carrusel e indicadores
    function updateCarousel(slideIndex) {
        if (!carouselTrack || totalSlides === 0) return;
        // Limites circulares
        if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = slideIndex;
        }
        // DESPLAZAMIENTO CORREGIDO MEDIANTE SINTAXIS VÁLIDA
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Actualizar estado activo de los puntos (dots)
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    // Navegación con Botones
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            updateCarousel(currentSlide + 1);
            restartAutoPlay();
        });
    }
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            updateCarousel(currentSlide - 1);
            restartAutoPlay();
        });
    }
    // Navegación con Puntos Indicadores
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateCarousel(idx);
            restartAutoPlay();
        });
    });
    // Funciones de Autoplay
    function startAutoPlay() {
        if (totalSlides > 1 && !autoPlayTimer) {
            autoPlayTimer = setInterval(() => {
                updateCarousel(currentSlide + 1);
            }, 5000); // Cambia automáticamente cada 5 segundos
        }
    }
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    // Iniciar el slider y sus eventos de ratón (mouse hover)
    if (carouselTrack && totalSlides > 0) {
        updateCarousel(0);
        startAutoPlay();
        const heroElement = document.getElementById('inicio');
        if (heroElement) {
            heroElement.addEventListener('mouseenter', stopAutoPlay);
            heroElement.addEventListener('mouseleave', startAutoPlay);
        }
    }
    /* 
   AÑO DINÁMICO EN EL FOOTER
       */
    const anioSpan = document.getElementById('anio');
    if (anioSpan) {
        anioSpan.textContent = new Date().getFullYear();
    }
});
