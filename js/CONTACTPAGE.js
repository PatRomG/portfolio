// ============================================
// CONTACTPAGE.JS - Patricia Romero
// Funcionalidad de la página de contacto
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
                window.location.href = `CONTACTPAGE_${lang}.html`;
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
    // FORM VALIDATION + FEEDBACK
    // ============================================

    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        // Detectar si venimos de una confirmación exitosa
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            // Limpiar el formulario
            contactForm.reset();
            
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
            // Limpiar la URL sin recargar la página
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        contactForm.addEventListener("submit", async function(event) {
            //event.preventDefault(); // Prevenir envío por defecto

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const submitButton = document.querySelector("button[type='submit']");

            // Validación básica
            if (!nameInput.value.trim()) {
                alert("Please enter your name.");
                nameInput.focus();
                return;
            }

            if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            if (!messageInput.value.trim()) {
                alert("Please enter a message.");
                messageInput.focus();
                return;
            }


            // Cambiar estado del botón
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            submitButton.style.opacity = "0.6";

            // Mostrar mensaje de "enviando"
            showSendingMessage();
            
            // El formulario se enviará automáticamente por el action del HTML
            // No hacemos event.preventDefault() aquí
        });

        // Placeholder animation on focus
        const inputs = contactForm.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener("focus", function() {
                this.style.borderColor = "var(--accent-color)";
            });

            input.addEventListener("blur", function() {
                this.style.borderColor = "var(--input-border)";
            });
        });
    }

            /* //Envío de formulario usando formSpree
            try {
                const formspreeEndpoint = "https://formspree.io/f/mqawjbgl"
                
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        message: messageInput.value.trim()
                    })
                });
                
                
                const json = await res.json();
                if (response.ok) {
                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset();

                    const successMsg = document.createElement("div");
                    successMsg.classname = "success-message";
                    successMsg.textContent = "Your message has been sent successfully!";
                    contactForm.appendChild(successMsg);

                    setTimeout(() => {successMsg.remove();}, 5000);
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                console.error('Error sending form:', err);
                alert('There was an error sending your message. Please try again later or contact me directly at patriciaromerogonzalez02@gmail.com');
            } finally {
             // Rehabilitar botón después del envío
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.opacity = "1";
            }
        });*/


    // ============================================
    // FUNCIONES DE MENSAJES
    // ============================================

    function showSendingMessage() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.id = 'sending-overlay';
        overlay.innerHTML = `
            <div class="sending-message">
                <div class="spinner"></div>
                <h2>Sending your message...</h2>
                <p>Please wait a moment</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    function showSuccessMessage() {
        // Crear mensaje de éxito
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <h3>Message sent successfully!</h3>
                <p>Thank you for contacting me. I'll get back to you soon!</p>
            </div>
        `;
        
        const formContainer = document.querySelector('.contact-form');
        if (formContainer) {
            formContainer.parentNode.insertBefore(successDiv, formContainer);
            
            // Animar entrada
            setTimeout(() => {
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateY(0)';
            }, 10);
            
            // Remover después de 8 segundos
            setTimeout(() => {
                successDiv.style.opacity = '0';
                successDiv.style.transform = 'translateY(-20px)';
                setTimeout(() => successDiv.remove(), 300);
            }, 8000);
        }
    }

    // Cerrar el mensaje de éxito al hacer click
    successDiv.addEventListener('click', function() {
        this.style.opacity = '0';
        setTimeout(() => this.remove(), 300);
    });


    // ============================================
    // FOOTER NAVIGATION ACTIVE STATE
    // ============================================

    // Marcar como activo el icono de contacto en el footer
    const contactIcon = document.getElementById("footer-contact");
    if (contactIcon) {
        contactIcon.style.opacity = "1";
    }
});

// ============================================
// NOTAS PARA MEJORAS FUTURAS
// ============================================

/*
TODO - Añadir animación de envío exitoso/error
TODO - Guardar borradores en localStorage
TODO - Añadir contador de caracteres para el mensaje
*/