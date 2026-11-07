const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = "C:\\taller 3 corte\\capturas_wordpress";
const brainDir = "C:\\Users\\ivan\\.gemini\\antigravity\\brain\\1d5a78e1-a38b-4175-b9bb-fde4ca9ec65a\\capturas_wordpress";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

const pages = [
    {
        filename: "wp_01_inicio.png",
        title: "Inicio - Sistema de Gestion de Practicas",
        url: "http://127.0.0.1/practicas/"
    },
    {
        filename: "wp_02_programas_empresas.png",
        title: "Programas Academicos y Red Empresarial",
        url: "http://127.0.0.1/practicas/?page_id=5"
    },
    {
        filename: "wp_03_reglamento_proceso.png",
        title: "Reglamento y Proceso de Practicas",
        url: "http://127.0.0.1/practicas/?page_id=6"
    },
    {
        filename: "wp_04_consumo_api_tabla.png",
        title: "Consumo de API - Seguimiento en Vivo",
        url: "http://127.0.0.1/practicas/?page_id=7"
    }
];

async function capture() {
    for (const p of pages) {
        console.log(`Descargando HTML de: ${p.url}...`);
        const res = await fetch(p.url);
        let html = await res.text();

        // Asegurar que las rutas de assets apunten a localhost absoluto
        html = html.replace(/href="\//g, 'href="http://localhost/');
        html = html.replace(/src="\//g, 'src="http://localhost/');

        const tempHtml = path.join(outputDir, `temp_${p.filename}.html`);
        const targetPng = path.join(outputDir, p.filename);
        const brainPng = path.join(brainDir, p.filename);

        fs.writeFileSync(tempHtml, html, 'utf8');

        try {
            const cmd = `"${edgePath}" --headless=new --screenshot="${targetPng}" --window-size=1280,950 "file:///${tempHtml.replace(/\\/g, '/')}"`;
            execSync(cmd, { stdio: 'pipe' });
            fs.copyFileSync(targetPng, brainPng);
            console.log(`[OK] Captura generada: ${p.filename}`);
        } catch (err) {
            console.error(`[ERROR] en ${p.filename}:`, err.message);
        } finally {
            if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
        }
    }
}

capture().then(() => console.log("Capturas de WordPress finalizadas."));
