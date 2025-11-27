// ============================================
// ABOUTMEPAGE.JS - Patricia Romero
// Funcionalidad de la página "sobre mí"
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
                window.location.href = `ABOUTMEPAGE_${lang}.html`;
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
    // CV LINK
    // ============================================

    /*const cvButton = document.getElementById("profile-picture");
    if (cvButton) {
        // Sacamos el idioma a partir del html
        const htmlLang = document.documentElement.lang || 'en';
        let language = 'en';

        switch(htmlLang) {
            case 'es':
                language = 'es';
                break;
            case 'fr':
                language = 'fr';
                break;
            case 'ca':
                language = 'ca';
                break;
            case 'zh':
                language = 'zh';
                break;
            default:
                language = 'en';
        }

        cvButton.style.cursor = "pointer";
        cvButton.addEventListener("click", function() {
            window.open(`pdfs/CV_Patricia_Romero_${language}.pdf`, "_blank");
        });
    }*/


    // ============================================
    // TAB NAVIGATION (MY SKILLS, STUDIES, etc.)
    // ============================================

    const tabHeaders = document.querySelectorAll('main > section:nth-of-type(2) h2');
    const tabSections = document.querySelectorAll('main > section[id]');

    if (tabHeaders.length > 0 && tabSections.length > 0) {
        // Función para cambiar entre tabs
        function switchTab(index) {
            // Remover clase active de todos los headers
            tabHeaders.forEach(header => header.classList.remove('active'));
            
            // Añadir clase active al header seleccionado
            tabHeaders[index].classList.add('active');
            
            // Ocultar todas las secciones
            tabSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostrar la sección seleccionada
            if (tabSections[index]) {
                tabSections[index].style.display = 'block';
            }
        }

        // Añadir event listeners a cada header
        tabHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                switchTab(index);
            });
        });

        // Mostrar la primera tab por defecto (MY SKILLS)
        switchTab(0);
    }


    // ============================================
    // FOOTER NAVIGATION ACTIVE STATE
    // ============================================

    // Marcar como activo el icono de About Me en el footer
    const aboutIcon = document.getElementById("footer-about");
    if (aboutIcon) {
        aboutIcon.style.opacity = "1";
    }
    

    // ============================================
    // SMOOTH SCROLL ANIMATIONS ON PAGE LOAD
    // ============================================

    // Añadir efecto de fade-in a los elementos al cargar
    const fadeElements = document.querySelectorAll('main > section, main > h1');
    
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// ============================================
// NOTAS PARA MEJORAS FUTURAS
// ============================================

/*
TODO - Añadir sistema de filtrado para skills por categoría
TODO - Implementar timeline interactivo para studies y experience
TODO - Añadir modals con más detalles para cada proyecto/experiencia
TODO - Implementar download CV button
TODO - Añadir galería de imágenes para proyectos destacados
TODO - Implementar sistema de búsqueda en el contenido
*/
