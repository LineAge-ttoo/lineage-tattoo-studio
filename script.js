class LineageArchitect {
    constructor() {
        this.selectedStylePrompt = ""; // Guarda el estilo activo
        this.initNavigation();
        this.initBackground();
        this.initCodex();
        this.initEngine();
    }

    initBackground() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-bg'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(2000 * 3);
        for(let i=0; i < 6000; i++) posArray[i] = (Math.random() - 0.5) * 10;
        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const material = new THREE.PointsMaterial({ size: 0.01, color: 0x333333 });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();
    }

    initNavigation() {
        const btns = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.v-section');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.section).classList.add('active');
            });
        });
    }

    initCodex() {
        // Renderizar Buscador
        const searchInput = document.getElementById('searchInput');
        const resultsGrid = document.getElementById('searchResults');
        
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            resultsGrid.innerHTML = '';
            if(term.length < 2) return;

            const filtered = LineageCodex.archetypes.filter(a => a.term.includes(term) || a.meaning.toLowerCase().includes(term));
            filtered.forEach(item => {
                resultsGrid.innerHTML += `<div class="result-item"><strong>${item.term.toUpperCase()}</strong>: ${item.meaning}</div>`;
            });
        });

        // Renderizar Estilos
        const stylesGrid = document.getElementById('stylesGrid');
        const styleDisplay = document.getElementById('selectedStyleDisplay');

        LineageCodex.styles.forEach(style => {
            const card = document.createElement('div');
            card.className = 'style-card';
            card.innerHTML = `<h4>${style.name}</h4><p>${style.desc}</p>`;
            
            card.addEventListener('click', () => {
                document.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.selectedStylePrompt = style.prompt;
                styleDisplay.innerText = `ESTILO ACTIVO: ${style.name}`;
                styleDisplay.style.color = '#fff';
            });
            stylesGrid.appendChild(card);
        });
    }

    initEngine() {
        const btn = document.getElementById('btnGenerate');
        const output = document.getElementById('visualizer-output');
        const hashDisplay = document.getElementById('hash-id');

        btn.addEventListener('click', () => {
            const val = document.getElementById('promptInput').value;
            if(!val) return alert("Introduce un concepto para iniciar.");

            btn.innerText = "TALLANDO...";
            
            // Une el input del usuario + el estilo de San Agustín + el estilo seleccionado en la Matriz
            const finalPrompt = `${val}, ${this.selectedStylePrompt}, pre-columbian san agustin huila sculpture, stone texture, high contrast black and white`;
            const seed = Math.floor(Math.random() * 99999);
            const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(finalPrompt)}?width=800&height=800&seed=${seed}&nologo=true`;

            output.innerHTML = `<img src="${imageUrl}" alt="Síntesis LineAge">`;
            hashDisplay.innerText = "LINEAGE-ID: " + Math.random().toString(36).substring(2, 10).toUpperCase();

            setTimeout(() => { btn.innerText = "INICIAR RITUAL"; }, 2000);
        });
    }
}

// Arrancar Sistema
window.onload = () => new LineageArchitect();
