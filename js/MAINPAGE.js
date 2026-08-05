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