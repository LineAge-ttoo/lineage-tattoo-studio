/**
 * LINEAGE - MOTOR LÓGICO
 * Controla la interacción del usuario y la generación del prompt adaptado.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ESTADO GLOBAL
    // ==========================================
    let selectedStyle = null; // Guardará el objeto completo del estilo seleccionado

    // ==========================================
    // 2. SISTEMA DE NAVEGACIÓN
    // ==========================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.view-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ==========================================
    // 3. CÓDICE DE SÍMBOLOS (Buscador)
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const renderArchetypes = (list) => {
        searchResults.innerHTML = '';
        list.forEach(item => {
            searchResults.innerHTML += `
                <div class="result-item">
                    <strong>${item.term.toUpperCase()}</strong><br>
                    ${item.meaning}
                </div>`;
        });
    };
    
    // Cargar todos al inicio
    if(typeof LineageCodex !== 'undefined') {
        renderArchetypes(LineageCodex.archetypes);
    } else {
        console.error("Error: lineage-memory.js no está cargado correctamente.");
    }

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term === "") {
            renderArchetypes(LineageCodex.archetypes);
            return;
        }
        const filtered = LineageCodex.archetypes.filter(a => 
            a.term.toLowerCase().includes(term) || a.meaning.toLowerCase().includes(term)
        );
        renderArchetypes(filtered);
    });

    // ==========================================
    // 4. MATRIZ DE ESTILOS
    // ==========================================
    const stylesGrid = document.getElementById('stylesGrid');
    const activeStyleLabel = document.getElementById('activeStyleLabel');
    const generatorStatusBox = document.querySelector('.generator-status');

    LineageCodex.styles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'style-card';
        card.innerHTML = `<h4>${style.name}</h4><p>${style.desc}</p>`;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            selectedStyle = style; // Guardar estilo en memoria global
            
            activeStyleLabel.innerHTML = `<strong>1. Estilo Listo:</strong> ${style.name}`;
            generatorStatusBox.classList.add('ready');
        });
        
        stylesGrid.appendChild(card);
    });

    // ==========================================
    // 5. MOTOR GENERATIVO (Sintetizador)
    // ==========================================
    const btnGenerate = document.getElementById('btnGenerate');
    const objectInput = document.getElementById('objectInput');
    const outputContainer = document.getElementById('outputContainer');
    const textVariants = document.getElementById('textVariants');
    const outputImage = document.getElementById('outputImage');
    const outputHash = document.getElementById('outputHash');

    btnGenerate.addEventListener('click', () => {
        const userObjects = objectInput.value.trim();

        // Validaciones
        if (!selectedStyle) {
            alert("Por favor, ve a la sección ARCHIVO y selecciona una base estética.");
            return;
        }
        if (userObjects === "") {
            alert("Por favor, indica qué objetos o símbolos deseas incorporar.");
            return;
        }

        // Bloquear botón durante la "carga"
        btnGenerate.innerText = "SINTETIZANDO...";
        btnGenerate.disabled = true;
        outputContainer.style.display = "block";
        textVariants.innerHTML = "<em>Conectando con el códice y aplicando esencia LineAge...</em>";
        outputImage.style.display = "none";

        // Lógica inspirada en tu documento: Fusión Estilo + Objetos + Esencia LineAge
        setTimeout(() => {
            // Simulamos la respuesta de la IA mostrando la estructura del prompt
            textVariants.innerHTML = `
                <p><strong>Variante 1 (${selectedStyle.name}):</strong> Un diseño integrando [ ${userObjects} ], aplicando líneas finas, patrones simbólicos de linaje y paleta sobria. Sugerencia: 15 cm en antebrazo.</p>
                <p><strong>Variante 2 (Fusión de Herencia):</strong> Los elementos [ ${userObjects} ] distribuidos siguiendo el flujo anatómico con el estilo ${selectedStyle.name}. Sugerencia: 20 cm en la espalda.</p>
            `;

            // Construcción del Prompt Técnico para la imagen
            const lineaAgeEssence = "fine lines, lineage symbolism, elegant minimalist placement, black ink, high contrast";
            const finalPrompt = `${userObjects}, ${selectedStyle.prompt}, ${lineaAgeEssence}`;
            const seed = Math.floor(Math.random() * 1000000);
            
            // Usamos Pollinations AI para renderizar una aproximación visual sin costo ni claves API
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=800&height=800&seed=${seed}&nologo=true`;

            outputImage.src = imageUrl;
            outputImage.style.display = "block";
            
            outputImage.onload = () => {
                btnGenerate.innerText = "SINTETIZAR NUEVA VARIANTE";
                btnGenerate.disabled = false;
                outputHash.innerText = "LINEAGE-ID: " + Math.random().toString(36).substring(2, 10).toUpperCase();
            };

            outputImage.onerror = () => {
                btnGenerate.innerText = "ERROR - REINTENTAR";
                btnGenerate.disabled = false;
                textVariants.innerHTML += "<br><br><em>Error al generar la imagen de referencia.</em>";
            };

        }, 1500); // Simulamos un breve tiempo de procesamiento
    });
});
