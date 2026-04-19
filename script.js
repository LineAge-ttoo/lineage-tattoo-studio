class LineageApp {
    constructor() {
        this.initLoader();
        this.initCursor();
        this.initBackground();
        this.initNavigation();
        this.initIAEngine();
    }

    initLoader() {
        window.onload = () => {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 1000);
            }
        };
    }

    initCursor() {
        const aura = document.getElementById('cursor-aura');
        const dot = document.getElementById('cursor');
        window.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(aura, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.5 });
        });
    }

    initBackground() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-bg'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geo = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 3000; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(10));
            vertices.push(THREE.MathUtils.randFloatSpread(10));
            vertices.push(THREE.MathUtils.randFloatSpread(10));
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const mat = new THREE.PointsMaterial({ color: 0x444444, size: 0.015 });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        camera.position.z = 5;
        const anim = () => {
            requestAnimationFrame(anim);
            points.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        anim();
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

    initIAEngine() {
        const btn = document.getElementById('btnGenerate');
        btn.addEventListener('click', () => {
            const prompt = document.getElementById('promptInput').value;
            if(!prompt) return;
            btn.innerText = "SINTETIZANDO...";
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " stone tattoo black and white")}?nologo=true`;
            this.update3D(url);
            btn.innerText = "SINTETIZAR";
        });
    }

    update3D(imgUrl) {
        const container = document.getElementById('visualizer-3d');
        container.innerHTML = '';
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "anonymous";
        loader.load(imgUrl, (tex) => {
            const mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3, 32), new THREE.MeshStandardMaterial({ map: tex }));
            scene.add(mesh);
            scene.add(new THREE.PointLight(0xffffff, 1, 100).clone().set(5,5,5));
            scene.add(new THREE.AmbientLight(0x333333));
            camera.position.z = 4;
            const rotate = () => { requestAnimationFrame(rotate); mesh.rotation.y += 0.01; renderer.render(scene, camera); };
            rotate();
        });
    }
}
new LineageApp();
