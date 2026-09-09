// ============================================
// PORTFOLIO.JS - Patricia Romero
// Funcionalidad de la página de proyectos
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
                window.location.href = `PORTFOLIO_${lang}.html`;
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
    // CATEGORY TABS NAVIGATION
    // ============================================

    const categoryTabs = document.querySelectorAll('.category-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (categoryTabs.length > 0 && projectCards.length > 0) {
        // Función para filtrar proyectos por categoría
        function filterProjects(selectedCategory) {
            console.log('Filtering by:', selectedCategory) // Debug
            
            // Quitar clase active de todos los tabs
            categoryTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Añadir clase active al tab seleccionado
            const activeTab = Array.from(categoryTabs).find( tab => tab.getAttribute('data-category') === selectedCategory);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.setAttribute('aria-selected', 'true');
            }
            
            // Filtrar proyectos
            let visibleCount = 0;
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category').split(' ');
                console.log('Card category:', cardCategory, 'Selected:', selectedCategory); //Debug

                //if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                if (selectedCategory === 'all' || cardCategory.includes(selectedCategory)) {
                    card.style.display = 'flex';
                    visibleCount++;
                    // Reiniciar animación
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            console.log('Visible cards:', visibleCount); // Debug
        }

        // Añadir event listeners a cada tab
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterProjects(category);
            });
        });

        // Mostrar todos los proyectos por defecto
        filterProjects('all');
    }


    // ============================================
    // PROJECT CARDS HOVER EFFECTS
    // ============================================

    projectCards.forEach(card => {
        // Pausar video embebido al salir del hover
        const iframe = card.querySelector('iframe');

        card.addEventListener('mouseleave', function() {
            // Si hay un iframe de YouTube, pausar el video
            if (iframe && iframe.src.includes('youtube')) {
                // Para pausar necesitamos usar la API de YouTube
                // Por ahora solo reiniciamos el src si es necesario
            }
        });
    });


    // ============================================
    // IMAGE LIGHTBOX AND GALLERIES
    // ============================================

    const imageThumbnails = Array.from(document.querySelectorAll('.project-thumbnail'))
        .map(thumbnail => ({
            thumbnail,
            images: Array.from(thumbnail.querySelectorAll(':scope > img'))
        }))
        .filter(gallery => gallery.images.length > 0);

    if (imageThumbnails.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image viewer');
        lightbox.hidden = true;
        lightbox.innerHTML = `
            <button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
            <button class="lightbox-arrow lightbox-previous" type="button" aria-label="Previous image">&#10094;</button>
            <figure class="lightbox-content">
                <img class="lightbox-image" alt="">
                <figcaption class="lightbox-counter"></figcaption>
            </figure>
            <button class="lightbox-arrow lightbox-next" type="button" aria-label="Next image">&#10095;</button>
        `;
        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCounter = lightbox.querySelector('.lightbox-counter');
        const closeButton = lightbox.querySelector('.lightbox-close');
        const previousButton = lightbox.querySelector('.lightbox-previous');
        const nextButton = lightbox.querySelector('.lightbox-next');
        let activeGallery;
        let activeIndex = 0;
        let lastFocusedElement;

        function renderLightboxImage() {
            const image = activeGallery.images[activeIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCounter.textContent = activeGallery.images.length > 1
                ? `${activeIndex + 1} / ${activeGallery.images.length}`
                : '';
            const hasMultipleImages = activeGallery.images.length > 1;
            previousButton.hidden = !hasMultipleImages;
            nextButton.hidden = !hasMultipleImages;
        }

        function openLightbox(gallery, index) {
            activeGallery = gallery;
            activeIndex = index;
            lastFocusedElement = document.activeElement;
            renderLightboxImage();
            lightbox.hidden = false;
            document.body.classList.add('lightbox-open');
            closeButton.focus();
        }

        function closeLightbox() {
            lightbox.hidden = true;
            document.body.classList.remove('lightbox-open');
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }

        function showAdjacentImage(direction) {
            activeIndex = (activeIndex + direction + activeGallery.images.length) % activeGallery.images.length;
            renderLightboxImage();
        }

        imageThumbnails.forEach(gallery => {
            gallery.images.forEach((image, index) => {
                image.classList.add('gallery-image');
                image.setAttribute('tabindex', '0');
                image.setAttribute('role', 'button');
                image.setAttribute('aria-label', `View ${image.alt || 'image'} full size`);
                image.addEventListener('click', () => openLightbox(gallery, index));
                image.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openLightbox(gallery, index);
                    }
                });
            });
        });

        closeButton.addEventListener('click', closeLightbox);
        previousButton.addEventListener('click', () => showAdjacentImage(-1));
        nextButton.addEventListener('click', () => showAdjacentImage(1));
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', event => {
            if (lightbox.hidden) {
                return;
            }
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft' && activeGallery.images.length > 1) {
                showAdjacentImage(-1);
            } else if (event.key === 'ArrowRight' && activeGallery.images.length > 1) {
                showAdjacentImage(1);
            }
        });
    }


    // ============================================
    // FOOTER NAVIGATION ACTIVE STATE
    // ============================================

    const worksIcon = document.getElementById("footer-works");
    if (worksIcon) {
        worksIcon.style.opacity = "1";
    }


    // ============================================
    // TO-DO LIST TOGGLE
    // ============================================

    const todoToggle = document.getElementById("todo-toggle");
    const todoNote = document.getElementById("todo-note");

    if (todoToggle && todoNote) {

        function openTodoNote() {
            todoNote.hidden = false;
            todoToggle.classList.add('active');
            todoToggle.setAttribute('aria-expanded', 'true');
            todoToggle.setAttribute('aria-label', 'Hide to-do list');
        }

        function closeTodoNote() {
            todoNote.hidden = true;
            todoToggle.classList.remove('active');
            todoToggle.setAttribute('aria-expanded', 'false');
            todoToggle.setAttribute('aria-label', 'Show to-do list');
        }

        todoToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            todoNote.hidden ? openTodoNote() : closeTodoNote();
        });

        // Cerrar con Escape
        todoNote.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closeTodoNote();
                todoToggle.focus();
            }
        });

        // Cerrar al hacer click fuera
        document.addEventListener("click", function(event) {
            if (!todoNote.contains(event.target) && event.target !== todoToggle) {
                closeTodoNote();
            }
        });
    }


    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    // Observador para animar cards al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });


    // ============================================
    // SEARCH FUNCTIONALITY (OPCIONAL)
    // ============================================

    /*const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.project-tags span'))
                    .map(tag => tag.textContent.toLowerCase())
                    .join(' ');
                
                const matchesSearch = title.includes(searchTerm) || 
                                     description.includes(searchTerm) || 
                                     tags.includes(searchTerm);
                
                card.style.display = matchesSearch ? 'flex' : 'none';
            });
        });
    }*/
});

// ============================================
// NOTAS PARA MEJORAS FUTURAS
// ============================================

/*
TODO - Implementar lightbox para ver proyectos en detalle
TODO - Añadir sistema de filtrado combinado (categoría + tags)
TODO - Implementar paginación o infinite scroll
TODO - Añadir botón "Load More" para cargar más proyectos
TODO - Integrar con API o CMS para gestión dinámica de proyectos
TODO - Añadir animaciones de transición entre filtros
TODO - Implementar sistema de favoritos/bookmarks
TODO - Añadir share buttons para redes sociales
*/