document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Discord contact handling
    const discordBtn = document.getElementById('discord-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const discordUsername = 'roma0589';
            const message = `🎮 Mi Discord: ${discordUsername}\n\n¡Agrégame como amigo!`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(discordUsername).then(() => {
                    alert(message + '\n\n✅ ¡Usuario copiado al portapapeles!');
                }).catch(() => {
                    alert(message);
                });
            } else {
                alert(message);
            }
        });
    }

    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    const scrollTopBtn = document.getElementById('scroll-top');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationFillMode = 'forwards';
                
                // Add stagger effect for multiple elements
                const siblings = entry.target.parentElement?.children;
                if (siblings) {
                    Array.from(siblings).forEach((sibling, index) => {
                        if (sibling.classList.contains('skill-tag')) {
                            sibling.style.animationDelay = `${index * 0.1}s`;
                        }
                    });
                }
            }
        });
    }, animationObserverOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .skill-tag');
    animatedElements.forEach(el => animationObserver.observe(el));

    // Add tooltips to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    const tooltips = {
        'HTML5': 'Lenguaje de marcado para estructurar contenido web',
        'CSS3': 'Hojas de estilo para diseño y presentación',
        'JavaScript': 'Lenguaje de programación para web interactiva',
        'React': 'Biblioteca de JavaScript para interfaces de usuario',
        'Vue.js': 'Framework progresivo de JavaScript',
        'TypeScript': 'JavaScript con tipado estático',
        'Node.js': 'Entorno de ejecución de JavaScript en servidor',
        'Python': 'Lenguaje de programación versátil',
        'PHP': 'Lenguaje de programación para desarrollo web',
        'Express.js': 'Framework web para Node.js',
        'MongoDB': 'Base de datos NoSQL orientada a documentos',
        'MySQL': 'Sistema de gestión de bases de datos relacionales',
        'Git': 'Sistema de control de versiones',
        'Docker': 'Plataforma de contenedores',
        'VS Code': 'Editor de código fuente',
        'Figma': 'Herramienta de diseño de interfaces',
        'Postman': 'Plataforma para desarrollo de APIs',
        'Webpack': 'Empaquetador de módulos para JavaScript'
    };

    skillTags.forEach(tag => {
        const text = tag.textContent.trim();
        if (tooltips[text]) {
            tag.setAttribute('data-tooltip', tooltips[text]);
        }
    });

    // Enhanced smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navList?.classList.remove('active');
                navToggle?.classList.remove('active');
            }
        });
    });
});