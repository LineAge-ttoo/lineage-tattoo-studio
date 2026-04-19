/**
 * LINEAGE CORE v2.0
 * Módulo de IA Simbólica y Renderizado Ancestral
 */

const LINEAGE_SETTINGS = {
    origin: "San Agustín, Huila",
    style: "Tatuaje ritual, tallado en obsidiana, lineas finas, geometría sagrada, sombras cinematográficas, arqueológico.",
    fallbacks: ["Jaguar Ancestral", "Guerrero de Piedra", "Diosa Lunar"]
};

class LineageSystem {
    constructor() {
        this.initCore();
        this.initAtmosphere();
        this.initNavigation();
        this.initEngine();
    }

    // 1. Manejo de Identidad y Carga
    initCore() {
        window.onload = () => {
            gsap.to("#loader", { opacity: 0, duration: 1.5, onComplete: () => document.getElementById('loader').remove() });
        };

        const dot = document.getElementById('cursor');
        const aura = document.getElementById('cursor-aura');
        window.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(aura, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.6, ease: "power2.out" });
        });
    }

    // 2. Fondo de Partículas (Polvo de Obsidiana)
    initAtmosphere() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-bg'), alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geo = new THREE.BufferGeometry();
        const posArr = new Float32Array(3000 * 3);
        for(let i=0; i<3000*3; i++) posArr[i] = (Math.random() - 0.5) * 15;
        geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
        
        const mat = new THREE.PointsMaterial({ color: 0xc5a059, size: 0.01, transparent: true, opacity: 0.2 });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        camera.position.z = 5;
        const animate = () => {
            requestAnimationFrame(animate);
            points.rotation.y += 0.0002;
            renderer.render(scene, camera);
        };
        animate();
    }

    // 3. Motor de IA Inteligente (LineAge Prompting)
    initEngine() {
        const btn = document.getElementById('btnGenerate');
        const input = document.getElementById('promptInput');
        const narrativeBox = document.getElementById('narrative-box');
        const storyText = document.getElementById('story-text');

        btn.addEventListener('click', () => {
            const userPrompt = input.value || "Tótem místico";
            btn.innerText = "TALLANDO PIEDRA...";
            document.getElementById('gen-status').innerText = "GENERATING DNA";

            // Capa A: Transformación del Prompt
            const finalPrompt = `${userPrompt}, ${LINEAGE_SETTINGS.style}, ultra realistic tattoo on skin background, cinematic lighting, 8k.`;
            
            // Capa B: Generación de Narrativa Cultural
            const story = `El motivo "${userPrompt}" ha sido interpretado por el oráculo de LineAge. Representa una conexión vital tallada en las montañas del Huila, migrando desde el monolito de piedra hacia la arquitectura viva de tu piel.`;
            
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?nologo=true&seed=${Math.random()}`;

            this.update3D(url);

            // Mostrar Narrativa
            storyText.innerText = story;
            narrativeBox.classList.remove('hidden');
            document.getElementById('gen-id').innerText = `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`;
            
            setTimeout(() => {
                btn.innerText = "SINTETIZAR ADN";
                document.getElementById('gen-status').innerText = "COMPLETE";
            }, 3000);
        });
    }

    update3D(url) {
        const container = document.getElementById('visualizer-3d');
        container.innerHTML = '';
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "anonymous";
        loader.load(url, (tex) => {
            const mesh = new THREE.Mesh(
                new THREE.CylinderGeometry(1, 1, 3, 64), 
                new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, metalness: 0.2 })
            );
            scene.add(mesh);
            scene.add(new THREE.AmbientLight(0xffffff, 1));
            camera.position.z = 4.5;
            const rot = () => { requestAnimationFrame(rot); mesh.rotation.y += 0.008; renderer.render(scene, camera); };
            rot();
        });
    }

    initNavigation() {
        const btns = document.querySelectorAll('.nav-btn');
        const views = document.querySelectorAll('.view');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-section');
                btns.forEach(b => b.classList.remove('active'));
                views.forEach(v => v.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new LineageSystem());
