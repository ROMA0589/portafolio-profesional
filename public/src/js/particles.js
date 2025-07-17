class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createParticles();
        this.animate();
        
        // Responsive: menos partículas en móviles
        window.addEventListener('resize', () => {
            this.particleCount = window.innerWidth < 768 ? 20 : 50;
            this.container.innerHTML = '';
            this.particles = [];
            this.createParticles();
        });
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Propiedades aleatorias
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 6;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebotar en los bordes
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
