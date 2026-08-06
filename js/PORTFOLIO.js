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