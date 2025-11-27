// ============================================
// COMMON.JS - Patricia Romero
// Funcionalidad común de las páginas
// ============================================

document.addEventListener("DOMContentLoaded", function() {

    // ============================================
    // PERSISTENCIA DE MODO OSCURO
    // ============================================
    
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Cargar tema guardado al iniciar la página
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }


    // ============================================
    // TOGGLING DARK MODE
    // ============================================
    
    const modeToggle = document.getElementById("mode-toggle");
    const languageMode = document.getElementById("languageMode");
    const linkedinButton = document.getElementById("Linkedin");
    const home = document.getElementById("footer-home");
    const user = document.getElementById("footer-about");
    const contact = document.getElementById("footer-contact");
    const folder = document.getElementById("footer-works");
    const wifi = document.getElementById("wifi");
    const volumeImage = document.getElementById("volume");
    const playPauseButton = document.getElementById("play-pause-button");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const loopButton = document.getElementById("loop-button");
    const navWorks = document.getElementById("nav-icon-works");
    const navAbout = document.getElementById("nav-icon-user");
    const navContact = document.getElementById("nav-icon-contact");
    const contactIcon = document.getElementById("contact-icon");

    //Obtener el idioma actual del HTML
    const htmlLang = document.documentElement.lang || 'en';

    // Cambios para modo
    function updateIconsForTheme(isDark) {
        /*const theme = isDark ? 'dark' : '';*/
        const themeSuffix = isDark ? '_dark' : '';

        // Mode toggle
        if (modeToggle) {
            modeToggle.src = isDark ? "../icons/light.svg" : "../icons/dark.svg";
            modeToggle.alt = isDark ? "Toggle light mode" : "Toggle dark mode";
        }

        // Language icon - según idioma actual
        if (languageMode) {
            const langMap = {
                'en': 'lang_en',
                'es': 'lang_esp',
                'fr': 'lang_fr',
                'ca': 'lang_val',
                'zh': 'lang_ch'
            };
            const langIcon = langMap[htmlLang] || 'lang_en';
            languageMode.src = `../icons/${langIcon}${themeSuffix}.svg`;
        }

        // LinkedIn
        if (linkedinButton) {
            linkedinButton.src = `../icons/linkedin${themeSuffix}.svg`;
        }

        // Music player buttons - considerar estado de reproducción
        if (playPauseButton) {
            const isPlaying = playPauseButton.alt === "Pause";
            const playState = isPlaying ? 'pause' : 'play';
            playPauseButton.src = `../icons/${playState}${themeSuffix}.svg`;
        }

        if (nextButton) {
            nextButton.src = `../icons/next${themeSuffix}.svg`;
        }

        if (prevButton) {
            prevButton.src = `../icons/prev${themeSuffix}.svg`;
        }

        if (loopButton) {
            loopButton.src = `../icons/loop${themeSuffix}.svg`;
        }

        // Footer icons
        if (home) home.src = `../icons/casa${themeSuffix}.svg`;
        if (user) user.src = `../icons/user${themeSuffix}.svg`;
        if (contact) contact.src = `../icons/contact${themeSuffix}.svg`;
        if (folder) folder.src = `../icons/folder${themeSuffix}.svg`;

        // Volume icon - considerar estado actual
        if (volumeImage) {
            const currentVolume = volumeImage.alt;
            let volumeState = 'volume_up';
            
            if (currentVolume === 'Volume Off') {
                volumeState = 'volume_off';
            } else if (currentVolume === 'Volume Down') {
                volumeState = 'volume_down';
            }
            
            volumeImage.src = `../icons/${volumeState}${themeSuffix}.svg`;
        }

        // WiFi
        if (wifi) wifi.src = `../icons/wifi${themeSuffix}.svg`;

        // MAINPAGE Navs
        if (navWorks) navWorks.src = `../icons/folder${themeSuffix}.svg`;
        if (navAbout) navAbout.src = `../icons/user${themeSuffix}.svg`;
        if (navContact) navContact.src = `../icons/contact${themeSuffix}.svg`;

        // CONTACTPAGE Icon
        if (contactIcon) contactIcon.src = `../icons/contact${themeSuffix}.svg`;
    }

    // Actualizar iconos al cargar la página según tema guardado
    const isDarkOnLoad = document.documentElement.classList.contains("dark-theme");
    updateIconsForTheme(isDarkOnLoad);

    if (modeToggle) {
        modeToggle.addEventListener("click", function() {
            document.documentElement.classList.toggle("dark-theme");
            const isDark = document.documentElement.classList.contains("dark-theme");

            // Guardar preferencia en localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            updateIconsForTheme(isDark);
        });
    }


    // ============================================
    // LINKEDIN
    // ============================================

    if (linkedinButton) {
        linkedinButton.addEventListener("click", function() {
            window.open("https://www.linkedin.com/in/patricia-romero-a52aa62a0", "_blank");
        });
    }


    // ============================================
    // DISPLAY CURRENT DAY AND TIME
    // ============================================

    const datetimeElement = document.getElementById("current-datetime");
    if (datetimeElement) {
        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            };
            
            // Ya tenemos la variable del idioma, definimos predet.
            let locale = 'en-US';

            // Mapear idioma del HTML a locale
            switch(htmlLang) {
                case 'es':
                    locale = 'es-ES';
                    break;
                case 'fr':
                    locale = 'fr-FR';
                    break;
                case 'ca':
                    locale = 'ca-ES';
                    break;
                case 'zh':
                    locale = 'zh-CN';
                    break;
                default:
                    locale = 'en-US';
            }

            const datetime = now.toLocaleDateString(locale, options);
            datetimeElement.textContent = datetime;
        }
        
        updateDateTime();
        // Actualizar cada minuto
        setInterval(updateDateTime, 60000);
    }


    // ============================================
    // MUSIC PLAYER FUNCTIONALITY
    // ============================================

    // Song list
    const songs = [
        { title: "Dance Mashup from The Grinch Saves Christmas", file: "../music/Dance Mashup from The Grinch Saves Christmas.wav" },
        { title: "Double Take (Duet) (Down One Version)", file: "../music/Double Take (Duet) (Down One Version).wav" },
        { title: "Double Take (Duet)", file: "../music/Double Take (Duet).wav" },
        { title: "Lost Through Time", file: "../music/Lost Through Time.wav" },
        { title: "Timeless Project - Relojes de Muñeca", file: "../music/RELOJES DE MUÑECA.wav" },
        { title: "Sleepwalking", file: "../music/Sleepwalking.wav" },
        { title: "Spanish Mix from El Zorro x Puss In Boots", file: "../music/Spanish Mix from El Zorro x Puss In Boots.wav" },
        { title: "Timeless Project - TEMPO", file: "../music/TEMPO.wav" },
        { title: "The Colours of Youth", file: "../music/The Colours of Youth.wav" },
        { title: "Timeless Project - TIMELESS", file: "../music/TIMELESS.wav" },
        { title: "Timeless Project - YOU (late night thoughts)", file: "../music/YOU (late night thoughts).wav" }
    ];

    // Define elements that aren't already defined (buttons are)
    const musicPlayer = document.getElementById("music-player");
    const songTitle = document.getElementById("song-title");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");

    // Verificar que todos los elementos necesarios existen
    if (musicPlayer && playPauseButton && songTitle) {
        
        // CARGAR ESTADO GUARDADO
        let currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
        let isPlaying = localStorage.getItem('isPlaying') === 'true';
        let isLooping = localStorage.getItem('isLooping') === 'true';
        let savedTime = parseFloat(localStorage.getItem('currentTime')) || 0;
        let lastSongIndex = parseInt(localStorage.getItem('lastSongIndex')) || -1;

        // Variable para detectar si hay cambio de canción
        let songChanged = (lastSongIndex !== -1 && currentSongIndex !== lastSongIndex);
    
        // Set initial song title
        songTitle.textContent = songs[currentSongIndex].title;
        musicPlayer.src = songs[currentSongIndex].file;
        musicPlayer.loop = isLooping;

        // Actualizar lastSongIndex para la próxima vez
        localStorage.setItem('lastSongIndex', currentSongIndex)

        // Actualizar botón de loop
        if (loopButton && isLooping) {
            loopButton.classList.add('active');
        }

        // FUNCIÓN PARA FORMATEAR TIEMPO (mm:ss)
        function formatTime(seconds) {
            if (isNaN(seconds) || seconds < 0) return '0:00';
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }


        // CUNADO AUDIO ESTÁ LISTO
        musicPlayer.addEventListener('loadedmetadata', function() {
            // Actualizar duración
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(musicPlayer.duration);
            }

            if (progressBar) {
                progressBar.max = musicPlayer.duration;
            }

            // Si NO hay cambio de canción, restaurar el tiempo guardado
            if (!songChanged && savedTime > 0 && savedTime < musicPlayer.duration) {
                musicPlayer.currentTime = savedTime;
                if (progressBar) {
                    progressBar.value = savedTime;
                }
            }

            // Actualizar display de tiempo actual
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
            }

            // Si estaba reproduciendo, continuar
            if (isPlaying) {
                const isDark = document.documentElement.classList.contains("dark-theme");
                const themeSuffix = isDark ? '_dark' : '';

                musicPlayer.play().then(() => {
                    playPauseButton.src = `../icons/pause${themeSuffix}.svg`;
                    playPauseButton.alt = "Pause";
                }).catch(err => {
                    console.log("Autoplay prevented:", err);
                    // Si el navegador bloquea autoplay, resetear estado
                    isPlaying = false;
                    localStorage.setItem('isPlaying', 'false');
                    playPauseButton.src = `../icons/play${themeSuffix}.svg`;
                    playPauseButton.alt = "Play";
                });
            }
        });

        // ACTUALIZAR BARRA DE PROGRESO
        musicPlayer.addEventListener('timeupdate', function() {
            if (progressBar) {
                progressBar.value = musicPlayer.currentTime
            }

            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
            }

            // Guardar tiempo actual contiuamente
            localStorage.setItem('currentTime', musicPlayer.currentTime.toString());
        });

        // PLAY/PAUSE FUNCTIONALITY
        function togglePlayPause() {
            const isDark = document.documentElement.classList.contains("dark-theme");
            const themeSuffix = isDark ? '_dark' : '';
            
            if (isPlaying) {
                // Pausar
                musicPlayer.pause();
                playPauseButton.src = `../icons/play${themeSuffix}.svg`;
                playPauseButton.alt = "Play";
                isPlaying = false;
                localStorage.setItem('isPlaying', 'false');
                // Guardar tiempo al pausar
                localStorage.setItem('currentTime', musicPlayer.currentTime.toString());
            } else {
                // Reproducir
                musicPlayer.play().then(() => {
                    playPauseButton.src = `../icons/pause${themeSuffix}.svg`;
                    playPauseButton.alt = "Pause";
                    isPlaying = true;
                    localStorage.setItem('isPlaying', 'true');
                }).catch(err => {
                    console.error("Error playing audio:", err);
                });
            }
        }

        playPauseButton.addEventListener("click", togglePlayPause);

        // CAMBIAR CANCIÓN
        function changeSong(direction) {
            // Calcular nuevo índice
            if (direction === 'next') {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
            } else if (direction === 'prev') {
                currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            }
            
            // Guardar nuevo índice y marcar que cambió la canción
            localStorage.setItem('currentSongIndex', currentSongIndex.toString());
            localStorage.setItem('lastSongIndex', lastSongIndex.toString());

            //Reiniciar tiempo al cambiar la canción
            localStorage.setItem('currentTime', '0');

            // Actualizar UI
            songTitle.textContent = songs[currentSongIndex].title;
            musicPlayer.src = songs[currentSongIndex].file;

            if (progressBar) {
                progressBar.value = 0;
            }

            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = '0:00';
            }

            // Si estaba reproduciendo, seguir reproduciendo la nueva canción
            if (isPlaying) {
                musicPlayer.play().catch(err => {
                    console.error("Error playing audio:", err);
                });
            }
        }

        // BOTONES NEXT Y PREVIOUS
        if (nextButton) {
            nextButton.addEventListener("click", function() {
                changeSong('next');
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function() {
                changeSong('prev');
            });
        }
        
        // AL TERMINAR CANCIÓN (si no está en loop)
        musicPlayer.addEventListener("ended", function() {
            if (!isLooping) {
                changeSong('next');
            }
        });

        // PROGRESS BAR: CLICK PARA SALTAR
        if (progressBar) {
            progressBar.addEventListener('input', function() {
                musicPlayer.currentTime = progressBar.value;
                localStorage.setItem('currentTime', progressBar.value.toString());
            });
        }

        // BOTÓN DE LOOP
        if (loopButton) {
            loopButton.addEventListener('click', function() {
                isLooping = !isLooping;
                musicPlayer.loop = isLooping;
                localStorage.setItem('isLooping', isLooping.toString());

                if (isLooping) {
                    loopButton.classList.add('active');
                } else {
                    loopButton.classList.remove('active');
                }
            });
        }

        
    }

    
    // ============================================
    // VOLUME CONTROL
    // ============================================

    const volumeBar = document.getElementById("volume-bar");
    const volumeSlider = document.getElementById("volume-slider");

    if (volumeImage && volumeBar && volumeSlider && musicPlayer) {
        // Toggle volume bar
        volumeImage.addEventListener("click", function(e) {
            e.stopPropagation();
            //Si la clase existe, la quita; si no existe, la añade
            volumeBar.classList.toggle("active");
        });
        
        // Cargar volumen guardado
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            musicPlayer.volume = parseFloat(savedVolume);
        } else {
            musicPlayer.volume = volumeSlider.value;
        }
        
        // Actualizar icono inicial según volumen guardado
        const initialVolume = parseFloat(volumeSlider.value);
        const isDark = document.documentElement.classList.contains("dark-theme");
        const themeSuffix = isDark ? '_dark' : '';

        if (initialVolume === 0) {
            volumeImage.src = `../icons/volume_off${themeSuffix}.svg`;
            volumeImage.alt = "Volume Off";
        } else if (initialVolume < 0.5) {
            volumeImage.src = `../icons/volume_down${themeSuffix}.svg`;
            volumeImage.alt = "Volume Down";
        } else {
            volumeImage.src = `../icons/volume_up${themeSuffix}.svg`;
            volumeImage.alt = "Volume Up";
        }

        // Update volume on slider change
        volumeSlider.addEventListener("input", function(event) {
            //Obtener el valor del slider
            const volume = parseFloat(event.currentTarget.value);
            //Establecer el volumen del reproductor
            musicPlayer.volume = volume;

            // Guardar volumen
            localStorage.setItem('volume', volume.toString());

            const isDark = document.documentElement.classList.contains("dark-theme");
            const themeSuffix = isDark ? '_dark' : '';

            // Cambiar icono según nivel de volumen
            if (volume === 0) {
                volumeImage.src = `../icons/volume_off${themeSuffix}.svg`;
                volumeImage.alt = "Volume Off";
            } else if (volume < 0.5) {
                volumeImage.src = `../icons/volume_down${themeSuffix}.svg`;
                volumeImage.alt = "Volume Down";
            } else {
                volumeImage.src = `../icons/volume_up${themeSuffix}.svg`;
                volumeImage.alt = "Volume Up";
            }
        });

        
        // Cerrar volume bar al hacer click fuera
        document.addEventListener("click", function(event) {
            if (!volumeBar.contains(event.target) && event.target !== volumeImage) {
                volumeBar.classList.remove("active");
            }
        });
    }
});
