class LineageApp {
    constructor() {
        this.initLoader();
        this.initCursor();
        this.initBackground();
        this.initNav();
        this.initEngine();
    }

    initLoader() {
        // Quita el protector negro después de 1.5 segundos
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            if(loader) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 1000);
                }, 1500);
            }
        });
    }

    initCursor() {
        const dot = document.getElementById('cursor');
        const aura = document.getElementById('cursor-aura');
        window.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(aura, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.5 });
        });
    }

    initBackground() {
        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-bg'), alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);

            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(2000 * 3);
            for(let i=0; i<2000*3; i++) pos[i] = (Math.random() - 0.5) * 10;
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const mat = new THREE.PointsMaterial({ color: 0x444444, size: 0.01 });
            const points = new THREE.Points(geo, mat);
            scene.add(points);

            camera.position.z = 5;
            const anim = () => {
                requestAnimationFrame(anim);
                points.rotation.y += 0.0005;
                renderer.render(scene, camera);
            };
            anim();
        } catch (e) { console.error("Error en Three.js:", e); }
    }

    initNav() {
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

    initEngine() {
        const btn = document.getElementById('btnGenerate');
        btn.addEventListener('click', () => {
            const prompt = document.getElementById('promptInput').value;
            if(!prompt) return;
            btn.innerText = "TALLANDO...";
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " ancestral stone tattoo san agustín style")}?nologo=true`;
            
            const container = document.getElementById('visualizer-3d');
            container.innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:cover; animation:fadeIn 2s;">`;
            
            setTimeout(() => { btn.innerText = "SINTETIZAR"; }, 3000);
        });
    }
}

// Arrancar App
new LineageApp();
