/**
 * LINEAGE - EL CÓDICE DE MEMORIA
 * Este archivo contiene la estructura de datos pura del proyecto.
 * Define los estilos de tatuaje y los significados de los arquetipos.
 */

const LineageCodex = {
    [span_2](start_span)// Catálogo extendido según el análisis técnico del reporte[span_2](end_span)
    styles: [
        { 
            id: "tradicional", 
            name: "TRADICIONAL (OLD SCHOOL)", 
            desc: "Líneas negras gruesas y colores primarios sólidos.", 
            prompt: "traditional old school tattoo style, bold black outlines, solid primary colors, flat shading" 
        },
        { 
            id: "neo_tradicional", 
            name: "NEO-TRADICIONAL", 
            desc: "Evolución con degradados suaves y alto detalle ornamental.", 
            prompt: "neo-traditional tattoo style, elegant fine lines, smooth gradients, illustrative ornamental details" 
        },
        { 
            id: "realismo", 
            name: "REALISMO", 
            desc: "Fidelidad fotográfica con luces y sombras precisas.", 
            prompt: "photorealistic tattoo style, hyper-detailed, sophisticated shading, black and grey realism" 
        },
        { 
            id: "blackwork", 
            name: "BLACKWORK", 
            desc: "Contraste absoluto usando solo tinta negra pura.", 
            prompt: "blackwork tattoo, solid black ink, high contrast, illustrative black style" 
        },
        { 
            id: "geometrico", 
            name: "GEOMÉTRICO", 
            desc: "Simetría matemática y geometría sagrada.", 
            prompt: "geometric tattoo, sacred geometry, precise straight lines, mathematical symmetry, clean linework" 
        },
        { 
            id: "acuarela", 
            name: "ACUARELA", 
            desc: "Colores fluidos y difuminados sin contornos definidos.", 
            prompt: "watercolor tattoo style, fluid color splashes, no outlines, soft blending, artistic brush strokes" 
        },
        { 
            id: "japones", 
            name: "JAPONÉS (IREZUMI)", 
            desc: "Motivos tradicionales orientales con fondos de olas y nubes.", 
            prompt: "traditional japanese irezumi tattoo style, oriental motifs, wave and cloud background, bold composition" 
        },
        { 
            id: "trash_polka", 
            name: "TRASH POLKA", 
            desc: "Caos organizado: realismo mezclado con manchas rojas/negras y tipografía.", 
            prompt: "trash polka tattoo style, chaotic composition, black and red ink, abstract realism, grunge typography" 
        },
        { 
            id: "dotwork", 
            name: "DOTWORK (PUNTILLISMO)", 
            desc: "Texturas y sombras creadas exclusivamente mediante puntos.", 
            prompt: "dotwork tattoo, pointillism technique, stippled shading, textured density, black ink dots" 
        },
        { 
            id: "fine_line", 
            name: "FINE LINE", 
            desc: "Trazos ultra finos para una elegancia minimalista.", 
            prompt: "fine line tattoo style, ultra-thin needles, delicate precision, minimalist detailed linework" 
        }
    ],

    [span_3](start_span)[span_4](start_span)// Arquetipos simbólicos de linaje y herencia[span_3](end_span)[span_4](end_span)
    archetypes: [
        { term: "jaguar", meaning: "Poder terrenal, visión nocturna y guardián del mundo inferior." },
        { term: "águila", meaning: "Conexión astral, visión periférica y mensajero del mundo superior." },
        { term: "serpiente", meaning: "Transformación infinita, el ciclo del agua y sabiduría terrenal." },
        { term: "chaman", meaning: "Puente entre mundos, transmutación y el concepto del doble yo." },
        { term: "sol", meaning: "Energía vital, dador de tiempo y geometría circular sagrada." },
        { term: "arbol", meaning: "Raíces familiares, crecimiento del linaje y conexión con la tierra." },
        { term: "adn", meaning: "Memoria biológica, herencia celular y código de vida." }
    ]
};

// Documentación técnica:
// - 'id': Identificador único para la lógica del programa.
// - 'prompt': Cadena de texto optimizada para el generador de imágenes.
