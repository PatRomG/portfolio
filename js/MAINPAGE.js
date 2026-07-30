// ============================================
// MAINPAGE.JS - Patricia Romero
// Funcionalidad de la página principal
// ============================================

document.addEventListener("DOMContentLoaded", function() {

    // ============================================
    // LANGUAGE TOGGLE
    // ============================================

    const languageMode = document.getElementById("languageMode");
    const languageMenu = document.getElementById("language-menu");

    if (languageMode && languageMenu) {
        languageMode.addEventListener("click", function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle("active"); // Si la clase existe, la quita; si no existe, la añade
        });

        // Handle language button clicks
        document.querySelectorAll(".lang-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const lang = btn.getAttribute("data-lang");
                // Redirect to another HTML page for the selected language
                window.location.href = `MAINPAGE_${lang}.html`;
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener("click", function(event) {
            if (!languageMenu.contains(event.target) && event.target !== languageMode) {
                languageMenu.classList.remove("active");
            }
        });
    }

    // ============================================
    // ARTIST PROFILES DROPDOWN
    // ============================================
 
    const logoWrapper = document.getElementById("logo-wrapper");
    const artistMenu  = document.getElementById("artist-menu");
    const logo        = document.getElementById("logo");
 
    if (logoWrapper && artistMenu && logo) {
 
        // Mostrar tooltip brevemente al cargar
        logoWrapper.classList.add('tooltip-visible');
        // Pulso suave en el logo
        logo.classList.add('hint-pulse');
        logo.addEventListener('animationend', () => logo.classList.remove('hint-pulse'), { once: true });
 
        // Ocultar tooltip a los 4 segundos si no interactúa
        setTimeout(() => {
            if (!logoWrapper.classList.contains('menu-open')) {
                logoWrapper.classList.remove('tooltip-visible');
            }
        }, 4000);
 
        // Toggle del menú al hacer click en el logo-wrapper
        logoWrapper.addEventListener("click", function(e) {
            e.stopPropagation();
            const isOpen = artistMenu.classList.contains('active');
 
            if (isOpen) {
                artistMenu.classList.remove('active');
                logoWrapper.classList.remove('menu-open');
            } else {
                artistMenu.classList.add('active');
                logoWrapper.classList.add('menu-open');
                logoWrapper.classList.remove('tooltip-visible');
                logoWrapper.classList.add('tooltip-seen');
            }
        });
 
        // Cerrar al hacer click fuera
        document.addEventListener("click", function(event) {
            if (!logoWrapper.contains(event.target)) {
                artistMenu.classList.remove('active');
                logoWrapper.classList.remove('menu-open');
            }
        });
    }


    // ============================================
    // FOOTER NAVIGATION ACTIVE STATE
    // ============================================

    const homeIcon = document.getElementById("footer-home");
    if (homeIcon) {
        homeIcon.style.opacity = "1";
    }
});

// CHANGE PAGE FUNCTIONALITY
// TODO - Add a progress bar to show song progress - can manipulate to change moment of song
// TODO - Add shuffle and repeat functionality?
// TODO - Improve UI/UX design of the music player?
// TODO - Improve UI/UX design of the page transition?
// TODO - Add animations for page transitions?