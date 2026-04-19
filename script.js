class LineageEngine {
    constructor() {
        this.initCursor();
        this.initSanAgustinFlow(); // El fondo místico
        this.initNavigation();
        this.initGenerator();
    }

    // 1. Movimiento del Cursor con Inercia
    initCursor() {
        const dot = document.getElementById('cursor');
        const aura = document.getElementById('cursor-aura');
        
        window.addEventListener('mousemove', (e) => {
            // GSAP crea ese movimiento suave y lujoso
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(aura, { 
                x: e.clientX - 25, 
                y: e.clientY - 25, 
                duration: 0.8, 
                ease: "power3.out" 
            });
        });
    }

    // 2. Fondo de Partículas "Polvo de Piedra" (Three.js)
    initSanAgustinFlow() {
        const canvas = document.getElementById('canvas-bg');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Geometría de las partículas (Simulando micro-fragmentos)
        const particlesGeo = new THREE.BufferGeometry();
        const count = 3500;
        const posArray = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 12;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material de las partículas: Color hueso con transparencia
        const particlesMat = new THREE.PointsMaterial({
            size: 0.008,
            color: 0xf2f2f2,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particlesMesh);

        camera.position.z = 4;

        // Animación de rotación lenta (Como si el aire se moviera en una tumba)
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0004;
            particlesMesh.rotation.x += 0.0002;
            
            // Hacer que las partículas sigan sutilmente al mouse
            window.addEventListener('mousemove', (e) => {
                const mouseX = (e.clientX / window.innerWidth) - 0.5;
                const mouseY = (e.clientY / window.innerHeight) - 0.5;
                gsap.to(particlesMesh.rotation, {
                    y: mouseX * 0.1,
                    x: mouseY * 0.1,
                    duration: 2
                });
            });

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 3. Sistema de Navegación entre Secciones
    initNavigation() {
        const buttons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.view');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-section');
                
                // Animación de salida
                gsap.to('.view.active', { opacity: 0, y: 10, duration: 0.3, onComplete: () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    sections.forEach(s => s.classList.remove('active'));

                    btn.classList.add('active');
                    const targetSection = document.getElementById(target);
                    targetSection.classList.add('active');
                    
                    // Animación de entrada
                    gsap.fromTo(targetSection, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
                }});
            });
        });
    }

    // 4. Motor Generativo de "Tótems"
    initGenerator() {
        // Aquí conectaremos la lógica de la IA en el futuro cercano
        console.log("Motor LineAge listo para recibir prompts de San Agustín.");
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new LineageEngine();
});
