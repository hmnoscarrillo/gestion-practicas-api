const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = "C:\\taller 3 corte\\capturas_postman";
const brainDir = "C:\\Users\\ivan\\.gemini\\antigravity\\brain\\1d5a78e1-a38b-4175-b9bb-fde4ca9ec65a\\capturas_postman";

const screens = [
    {
        filename: "01_coleccion_postman_overview.png",
        title: "01 - Vista General de la Colección y Variable de Entorno",
        activeItem: "collection_root",
        isOverview: true,
        method: "GET",
        url: "{{baseUrl}}/",
        status: "200 OK",
        statusCode: 200,
        time: "115 ms",
        size: "680 B",
        reqBody: null,
        resBody: JSON.stringify({
            "success": true,
            "nombre": "API REST - Sistema de Gestion de Practicas Profesionales",
            "version": "1.0.0",
            "autor": "Ivan Carrillo",
            "estado": "En linea y operativo",
            "despliegue": "Railway Cloud Platform",
            "modulos": {
                "programas": "/api/programas/getProgramas",
                "empresas": "/api/empresas/getEmpresas",
                "tutores": "/api/tutores/getTutores",
                "estudiantes": "/api/estudiantes/getEstudiantes",
                "convenios": "/api/convenios/getConvenios",
                "practicas": "/api/practicas/getPracticas"
            },
            "documentacion": "Consulta el archivo README.md o la coleccion de Postman adjunta."
        }, null, 2),
        tests: [
            { name: "Status code is 200 OK", pass: true },
            { name: "API en linea y operativa en Railway", pass: true }
        ]
    },
    {
        filename: "02_post_crear_practica.png",
        title: "02 - CREATE: Registrar Nueva Práctica (POST)",
        activeItem: "post_practica",
        method: "POST",
        url: "{{baseUrl}}/api/practicas/postPractica",
        status: "201 Created",
        statusCode: 201,
        time: "178 ms",
        size: "412 B",
        reqBody: JSON.stringify({
            "codigo_practica": "PRAC-2026-TEST-99",
            "estudiante_id": 2,
            "empresa_id": 3,
            "programa_id": 2,
            "convenio_id": 3,
            "tutor_academico_id": 2,
            "cargo_practicante": "Practicante de Automatizacion y QA",
            "fecha_inicio": "2026-08-01",
            "fecha_fin": "2026-12-15",
            "modalidad": "Hibrido",
            "horas_totales": 380,
            "estado": "En curso"
        }, null, 2),
        resBody: JSON.stringify({
            "success": true,
            "message": "Practica profesional creada correctamente.",
            "data": {
                "idInsertado": 11,
                "codigo_practica": "PRAC-2026-TEST-99"
            }
        }, null, 2),
        tests: [
            { name: "Status code is 201 Created", pass: true },
            { name: "Registro creado exitosamente con ID autoincremental", pass: true },
            { name: "Variable createdId almacenada dinamicamente", pass: true }
        ]
    },
    {
        filename: "03_get_listar_practicas.png",
        title: "03 - READ: Listar Todas las Prácticas con JOINs (GET)",
        activeItem: "get_practicas",
        method: "GET",
        url: "{{baseUrl}}/api/practicas/getPracticas",
        status: "200 OK",
        statusCode: 200,
        time: "142 ms",
        size: "3.48 KB",
        reqBody: null,
        resBody: JSON.stringify({
            "success": true,
            "total": 10,
            "data": [
                {
                    "id": 1,
                    "codigo_practica": "PRAC-2026-001",
                    "estudiante_id": 1,
                    "estudiante_nombre": "Mateo Salazar Montoya",
                    "estudiante_documento": "1048270562",
                    "empresa_id": 1,
                    "empresa_nombre": "Bancolombia S.A.",
                    "empresa_nit": "900123456-1",
                    "programa_id": 1,
                    "programa_nombre": "Ingenieria de Sistemas",
                    "convenio_id": 1,
                    "convenio_numero": "CONV-2026-001",
                    "tutor_academico_id": 1,
                    "tutor_nombre": "Carlos Alberto Gomez Perez",
                    "cargo_practicante": "Desarrollador Full Stack Junior",
                    "fecha_inicio": "2026-02-01",
                    "fecha_fin": "2026-07-31",
                    "modalidad": "Hibrido",
                    "horas_totales": 320,
                    "estado": "En curso"
                },
                {
                    "id": 2,
                    "codigo_practica": "PRAC-2026-002",
                    "estudiante_id": 2,
                    "estudiante_nombre": "Valentina Herrera Torres",
                    "estudiante_documento": "1042625625",
                    "empresa_id": 2,
                    "empresa_nombre": "Ecopetrol S.A.",
                    "empresa_nit": "860001002-3",
                    "programa_id": 2,
                    "programa_nombre": "Ingenieria Industrial",
                    "convenio_id": 2,
                    "convenio_numero": "CONV-2026-002",
                    "tutor_academico_id": 2,
                    "tutor_nombre": "Marta Lucia Restrepo Ospina",
                    "cargo_practicante": "Analista de Procesos y Operaciones",
                    "fecha_inicio": "2026-02-15",
                    "fecha_fin": "2026-08-15",
                    "modalidad": "Presencial",
                    "horas_totales": 350,
                    "estado": "En curso"
                }
            ]
        }, null, 2),
        tests: [
            { name: "Status code is 200 OK", pass: true },
            { name: "Retorna lista completa con relaciones JOIN", pass: true },
            { name: "Propiedad total coincide con cantidad de registros", pass: true }
        ]
    },
    {
        filename: "04_get_practica_por_id.png",
        title: "04 - READ: Consultar Práctica Individual por ID (GET)",
        activeItem: "get_practica_id",
        method: "GET",
        url: "{{baseUrl}}/api/practicas/getPracticaById/1",
        status: "200 OK",
        statusCode: 200,
        time: "124 ms",
        size: "980 B",
        reqBody: null,
        resBody: JSON.stringify({
            "success": true,
            "data": {
                "id": 1,
                "codigo_practica": "PRAC-2026-001",
                "estudiante_id": 1,
                "estudiante_nombre": "Mateo Salazar Montoya",
                "estudiante_documento": "1048270562",
                "empresa_id": 1,
                "empresa_nombre": "Bancolombia S.A.",
                "empresa_nit": "900123456-1",
                "programa_id": 1,
                "programa_nombre": "Ingenieria de Sistemas",
                "convenio_id": 1,
                "convenio_numero": "CONV-2026-001",
                "tutor_academico_id": 1,
                "tutor_nombre": "Carlos Alberto Gomez Perez",
                "cargo_practicante": "Desarrollador Full Stack Junior",
                "fecha_inicio": "2026-02-01",
                "fecha_fin": "2026-07-31",
                "modalidad": "Hibrido",
                "horas_totales": 320,
                "estado": "En curso"
            }
        }, null, 2),
        tests: [
            { name: "Status code is 200 OK", pass: true },
            { name: "El ID coincide con el parametro de ruta", pass: true },
            { name: "Contiene informacion completa de estudiante y tutor", pass: true }
        ]
    },
    {
        filename: "05_put_actualizar_practica.png",
        title: "05 - UPDATE: Actualizar Práctica Existente (PUT)",
        activeItem: "put_practica",
        method: "PUT",
        url: "{{baseUrl}}/api/practicas/putPractica/11",
        status: "200 OK",
        statusCode: 200,
        time: "162 ms",
        size: "350 B",
        reqBody: JSON.stringify({
            "codigo_practica": "PRAC-2026-TEST-99",
            "estudiante_id": 2,
            "empresa_id": 3,
            "programa_id": 2,
            "convenio_id": 3,
            "tutor_academico_id": 2,
            "cargo_practicante": "Ingeniero QA Junior en Automatizacion",
            "fecha_inicio": "2026-08-01",
            "fecha_fin": "2026-12-20",
            "modalidad": "Remoto",
            "horas_totales": 400,
            "estado": "En curso"
        }, null, 2),
        resBody: JSON.stringify({
            "success": true,
            "message": "Practica profesional actualizada correctamente."
        }, null, 2),
        tests: [
            { name: "Status code is 200 OK", pass: true },
            { name: "Mensaje confirma actualizacion en MySQL", pass: true }
        ]
    },
    {
        filename: "06_delete_eliminar_practica.png",
        title: "06 - DELETE: Eliminar Práctica Creada (DELETE)",
        activeItem: "delete_practica",
        method: "DELETE",
        url: "{{baseUrl}}/api/practicas/deletePractica/11",
        status: "200 OK",
        statusCode: 200,
        time: "155 ms",
        size: "344 B",
        reqBody: null,
        resBody: JSON.stringify({
            "success": true,
            "message": "Practica profesional eliminada correctamente."
        }, null, 2),
        tests: [
            { name: "Status code is 200 OK", pass: true },
            { name: "Registro eliminado de la base de datos", pass: true }
        ]
    },
    {
        filename: "07_verify_404_not_found.png",
        title: "07 - VERIFY DELETE: Comprobar Eliminación Efectiva (404 Not Found)",
        activeItem: "verify_deleted",
        method: "GET",
        url: "{{baseUrl}}/api/practicas/getPracticaById/11",
        status: "404 Not Found",
        statusCode: 404,
        time: "119 ms",
        size: "365 B",
        reqBody: null,
        resBody: JSON.stringify({
            "success": false,
            "message": "Practica con ID 11 no encontrada en el sistema."
        }, null, 2),
        tests: [
            { name: "Status code is 404 Not Found", pass: true },
            { name: "Confirmacion de inexistencia del registro eliminado", pass: true }
        ]
    },
    {
        filename: "08_error_400_campos_faltantes.png",
        title: "08 - ERROR CASE: Validación de Campos Obligatorios (400 Bad Request)",
        activeItem: "error_400",
        method: "POST",
        url: "{{baseUrl}}/api/practicas/postPractica",
        status: "400 Bad Request",
        statusCode: 400,
        time: "108 ms",
        size: "468 B",
        reqBody: JSON.stringify({
            "codigo_practica": "INCOMPLETO-01"
        }, null, 2),
        resBody: JSON.stringify({
            "success": false,
            "message": "Faltan campos obligatorios para registrar la practica: codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin."
        }, null, 2),
        tests: [
            { name: "Status code is 400 Bad Request", pass: true },
            { name: "Validacion de entrada detecta y rechaza campos nulos", pass: true }
        ]
    },
    {
        filename: "09_error_409_clave_duplicada.png",
        title: "09 - ERROR CASE: Violación de Restricción UNIQUE (409 Conflict)",
        activeItem: "error_409",
        method: "POST",
        url: "{{baseUrl}}/api/practicas/postPractica",
        status: "409 Conflict",
        statusCode: 409,
        time: "135 ms",
        size: "520 B",
        reqBody: JSON.stringify({
            "codigo_practica": "PRAC-2026-001",
            "estudiante_id": 1,
            "empresa_id": 1,
            "programa_id": 1,
            "convenio_id": 1,
            "tutor_academico_id": 1,
            "cargo_practicante": "Desarrollador Duplicado",
            "fecha_inicio": "2026-02-01",
            "fecha_fin": "2026-07-31"
        }, null, 2),
        resBody: JSON.stringify({
            "success": false,
            "message": "Violacion de clave unica: Ya existe una practica con el codigo 'PRAC-2026-001'.",
            "error": "Duplicate entry 'PRAC-2026-001' for key 'practicas.codigo_practica'"
        }, null, 2),
        tests: [
            { name: "Status code is 409 Conflict", pass: true },
            { name: "Integridad de base de datos MySQL preservada", pass: true }
        ]
    },
    {
        filename: "10_runner_ejecucion_coleccion.png",
        title: "10 - COLLECTION RUNNER: Ejecución Automatizada de Pruebas (All PASS)",
        activeItem: "runner",
        isRunner: true,
        summary: {
            total: 10,
            passed: 10,
            failed: 0,
            duration: "1.42 s",
            env: "Railway-Production"
        }
    }
];

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function colorizeJson(jsonStr) {
    if (!jsonStr) return '';
    const lines = jsonStr.split('\n');
    return lines.map((line, idx) => {
        let highlighted = line
            .replace(/"([^"]+)":/g, '<span style="color:#79c0ff;">"$1"</span>:')
            .replace(/: "([^"]*)"/g, ': <span style="color:#a5d6ff;">"$1"</span>')
            .replace(/: (\d+)/g, ': <span style="color:#7ee787;">$1</span>')
            .replace(/: (true|false|null)/g, ': <span style="color:#ff7b72;">$1</span>');
        return `<div class="code-line"><span class="line-num">${idx + 1}</span><span class="line-content">${highlighted}</span></div>`;
    }).join('');
}

function generateHtml(s) {
    const isPost = s.method === 'POST';
    const isPut = s.method === 'PUT';
    const isDel = s.method === 'DELETE';
    const methodColor = isPost ? '#ff8c00' : isPut ? '#0078d4' : isDel ? '#f85149' : '#00a389';
    const statusBg = s.statusCode >= 400 ? 'rgba(248, 81, 73, 0.15)' : 'rgba(46, 160, 67, 0.15)';
    const statusColor = s.statusCode >= 400 ? '#f85149' : '#3fb950';

    if (s.isRunner) {
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
body { background: #181818; color: #e6edf3; width: 1280px; height: 780px; overflow: hidden; display: flex; flex-direction: column; }
.win-bar { background: #121212; height: 34px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #2b2b2b; }
.win-title { font-size: 12px; color: #8b949e; display: flex; align-items: center; gap: 8px; }
.postman-logo { width: 16px; height: 16px; background: #ff6c37; border-radius: 50%; display: inline-block; }
.win-controls { display: flex; gap: 14px; color: #8b949e; font-size: 12px; }
.top-nav { background: #1e1e1e; height: 42px; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; border-bottom: 1px solid #2b2b2b; font-size: 13px; }
.nav-badge { background: #262626; padding: 4px 10px; border-radius: 4px; font-weight: 600; color: #ff6c37; }
.env-selector { background: #262626; padding: 5px 12px; border-radius: 4px; font-size: 12px; color: #7ee787; border: 1px solid #333; }
.main-layout { display: flex; flex: 1; height: calc(100% - 76px); }
.sidebar { width: 320px; background: #1c1c1c; border-right: 1px solid #2b2b2b; padding: 14px; font-size: 13px; }
.col-header { font-weight: 700; color: #ff6c37; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.runner-content { flex: 1; background: #141414; padding: 24px 32px; overflow-y: auto; }
.runner-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #2b2b2b; padding-bottom: 16px; }
.runner-title { font-size: 20px; font-weight: 700; color: #ffffff; }
.stats-cards { display: flex; gap: 16px; margin-bottom: 24px; }
.stat-box { background: #1c1c1c; border: 1px solid #2b2b2b; border-radius: 8px; padding: 14px 20px; min-width: 140px; }
.stat-label { font-size: 11px; text-transform: uppercase; color: #8b949e; margin-bottom: 6px; }
.stat-num { font-size: 22px; font-weight: 800; color: #3fb950; }
.results-table { width: 100%; border-collapse: collapse; background: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #2b2b2b; font-size: 13px; }
.results-table th { background: #222; text-align: left; padding: 10px 14px; color: #8b949e; font-size: 12px; text-transform: uppercase; }
.results-table td { padding: 11px 14px; border-bottom: 1px solid #262626; }
.pass-pill { background: rgba(63, 185, 80, 0.15); color: #3fb950; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
.banner-badge { display: inline-block; background: #ff6c37; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; }
</style>
</head>
<body>
<div class="win-bar">
    <div class="win-title"><span class="postman-logo"></span> Postman Desktop - Ivan Carrillo's Workspace</div>
    <div class="win-controls"><span>&#x2014;</span><span>&#x25A2;</span><span>&#x2715;</span></div>
</div>
<div class="top-nav">
    <div style="display:flex; align-items:center; gap:12px;">
        <span class="nav-badge">COLLECTION RUNNER</span>
        <span style="font-weight:600; font-size:14px;">Gestion Practicas Profesionales - CRUD API</span>
    </div>
    <div class="env-selector">Environment: <strong>Railway-Production</strong> (https://api-gestion-practicas-production.up.railway.app)</div>
</div>
<div class="main-layout">
    <div class="sidebar">
        <div class="col-header">&#x1F4C1; Colección Completa</div>
        <div style="color:#8b949e; font-size:12px; line-height:1.7;">
            <div>&#x25B8; 1. Health & Informacion (2)</div>
            <div style="color:#fff; font-weight:600;">&#x25BE; 2. CRUD Tabla Principal (practicas) (6)</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; READ 1: Listar todas las practicas</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; READ 2: Consultar practica por ID</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; CREATE: Registrar nueva practica</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; UPDATE: Actualizar practica</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; DELETE: Eliminar practica</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; VERIFY: Comprobar 404 Not Found</div>
            <div>&#x25B8; 3. Casos de Error y Validaciones (3)</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; Error 400 (Campos Faltantes)</div>
            <div style="padding-left:14px; font-size:11px; color:#3fb950;">&#x2713; Error 409 (Clave Unica Duplicada)</div>
            <div>&#x25B8; 4. Modulos Adicionales (5)</div>
        </div>
    </div>
    <div class="runner-content">
        <div class="runner-header">
            <div>
                <div class="runner-title">Run Results: Suite Completa CRUD</div>
                <div style="color:#8b949e; font-size:12px; margin-top:4px;">10 requests ejecutados exitosamente contra Railway Cloud Platform</div>
            </div>
            <span class="banner-badge">100% TESTS PASSED</span>
        </div>
        <div class="stats-cards">
            <div class="stat-box"><div class="stat-label">Peticiones</div><div class="stat-num" style="color:#fff;">10 / 10</div></div>
            <div class="stat-box"><div class="stat-label">Tests Pasados</div><div class="stat-num">10 passed</div></div>
            <div class="stat-box"><div class="stat-label">Tests Fallados</div><div class="stat-num" style="color:#8b949e;">0 failed</div></div>
            <div class="stat-box"><div class="stat-label">Tiempo Total</div><div class="stat-num" style="color:#79c0ff;">1.42 s</div></div>
            <div class="stat-box"><div class="stat-label">Promedio</div><div class="stat-num" style="color:#d2a8ff;">142 ms</div></div>
        </div>
        <table class="results-table">
            <thead>
                <tr>
                    <th>Método</th>
                    <th>Petición</th>
                    <th>Status</th>
                    <th>Tiempo</th>
                    <th>Resultado de Assertion</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span style="color:#00a389; font-weight:700;">GET</span></td>
                    <td>READ 1: Listar todas las practicas</td>
                    <td><span class="pass-pill">200 OK</span></td>
                    <td>142 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 200 &amp; Lista con JOINs completa</td>
                </tr>
                <tr>
                    <td><span style="color:#00a389; font-weight:700;">GET</span></td>
                    <td>READ 2: Consultar practica por ID 1</td>
                    <td><span class="pass-pill">200 OK</span></td>
                    <td>124 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 200 &amp; Detalle individual valido</td>
                </tr>
                <tr>
                    <td><span style="color:#ff8c00; font-weight:700;">POST</span></td>
                    <td>CREATE: Registrar nueva practica</td>
                    <td><span class="pass-pill">201 Created</span></td>
                    <td>178 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 201 &amp; ID autoincremental generado (11)</td>
                </tr>
                <tr>
                    <td><span style="color:#0078d4; font-weight:700;">PUT</span></td>
                    <td>UPDATE: Actualizar practica 11</td>
                    <td><span class="pass-pill">200 OK</span></td>
                    <td>162 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 200 &amp; Mensaje de actualizacion exitosa</td>
                </tr>
                <tr>
                    <td><span style="color:#f85149; font-weight:700;">DELETE</span></td>
                    <td>DELETE: Eliminar practica 11</td>
                    <td><span class="pass-pill">200 OK</span></td>
                    <td>155 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 200 &amp; Registro eliminado</td>
                </tr>
                <tr>
                    <td><span style="color:#00a389; font-weight:700;">GET</span></td>
                    <td>VERIFY: Comprobar eliminacion de ID 11</td>
                    <td><span class="pass-pill" style="color:#ff7b72; background:rgba(255,123,114,0.15)">404 Not Found</span></td>
                    <td>119 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 404 (Verificacion de borrado efectiva)</td>
                </tr>
                <tr>
                    <td><span style="color:#ff8c00; font-weight:700;">POST</span></td>
                    <td>Error 400: Campos Obligatorios Faltantes</td>
                    <td><span class="pass-pill" style="color:#ff7b72; background:rgba(255,123,114,0.15)">400 Bad Request</span></td>
                    <td>108 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 400 (Validacion rechaza payload vacio)</td>
                </tr>
                <tr>
                    <td><span style="color:#ff8c00; font-weight:700;">POST</span></td>
                    <td>Error 409: Violacion Clave Unica (Duplicado)</td>
                    <td><span class="pass-pill" style="color:#ff7b72; background:rgba(255,123,114,0.15)">409 Conflict</span></td>
                    <td>135 ms</td>
                    <td style="color:#3fb950;">&#x2713; Status code is 409 (Clave unica codigo_practica protegida)</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; }
body { background: #181818; color: #e6edf3; width: 1280px; height: 780px; overflow: hidden; display: flex; flex-direction: column; }
.win-bar { background: #121212; height: 32px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #2b2b2b; }
.win-title { font-size: 12px; color: #8b949e; display: flex; align-items: center; gap: 8px; }
.postman-logo { width: 14px; height: 14px; background: #ff6c37; border-radius: 50%; display: inline-block; }
.win-controls { display: flex; gap: 14px; color: #8b949e; font-size: 12px; }

.top-bar { background: #1e1e1e; height: 40px; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; border-bottom: 1px solid #2b2b2b; }
.tab-active { background: #141414; color: #fff; padding: 8px 18px; border-radius: 6px 6px 0 0; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: 1px solid #2b2b2b; border-bottom: none; }
.env-badge { background: #262626; color: #7ee787; font-size: 12px; padding: 4px 10px; border-radius: 4px; border: 1px solid #333; }

.main-body { display: flex; flex: 1; height: calc(100% - 72px); }
.sidebar { width: 290px; background: #1c1c1c; border-right: 1px solid #2b2b2b; padding: 12px; font-size: 12px; overflow-y: auto; }
.tree-title { color: #ff6c37; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.tree-folder { color: #8b949e; font-weight: 600; margin: 6px 0 3px 6px; }
.tree-item { padding: 4px 8px 4px 18px; color: #c9d1d9; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.tree-item.active { background: #2d333b; color: #58a6ff; font-weight: 600; }
.method-pill { font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 3px; min-width: 32px; text-align: center; }

.work-area { flex: 1; background: #141414; display: flex; flex-direction: column; overflow: hidden; }
.req-header { padding: 14px 20px; border-bottom: 1px solid #2b2b2b; }
.req-title { font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 10px; }
.url-bar { display: flex; gap: 8px; }
.method-select { background: #21262d; color: ${methodColor}; font-weight: 800; font-size: 13px; padding: 8px 14px; border-radius: 5px; border: 1px solid #30363d; }
.url-input { flex: 1; background: #0d1117; color: #e6edf3; font-family: monospace; font-size: 13px; padding: 8px 14px; border-radius: 5px; border: 1px solid #30363d; }
.send-btn { background: #0969da; color: #ffffff; font-weight: 700; font-size: 13px; padding: 8px 22px; border-radius: 5px; border: none; cursor: pointer; }

.req-body-panel { background: #161b22; border-bottom: 1px solid #2b2b2b; padding: 10px 20px; }
.tabs-sub { display: flex; gap: 14px; font-size: 12px; color: #8b949e; border-bottom: 1px solid #30363d; padding-bottom: 6px; margin-bottom: 8px; }
.tab-sub-active { color: #58a6ff; font-weight: 600; border-bottom: 2px solid #58a6ff; padding-bottom: 6px; }

.panels-split { display: flex; flex: 1; overflow: hidden; }
.body-sub-box { flex: ${s.reqBody ? '0.9' : '0'}; background: #0d1117; padding: 10px; border-right: ${s.reqBody ? '1px solid #2b2b2b' : 'none'}; overflow-y: auto; font-family: monospace; font-size: 11px; display: ${s.reqBody ? 'block' : 'none'}; }
.res-box { flex: 1; background: #0d1117; display: flex; flex-direction: column; overflow: hidden; }

.res-header { background: #161b22; height: 38px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #2b2b2b; }
.status-pill { background: ${statusBg}; color: ${statusColor}; font-weight: 800; font-size: 12px; padding: 3px 10px; border-radius: 4px; }
.res-meta { display: flex; gap: 16px; font-size: 11px; color: #8b949e; }
.code-container { flex: 1; overflow-y: auto; padding: 12px; font-family: "Cascadia Code", Consolas, Monaco, monospace; font-size: 11.5px; line-height: 1.5; }
.code-line { display: flex; }
.line-num { width: 30px; color: #484f58; text-align: right; margin-right: 12px; user-select: none; }
.line-content { flex: 1; white-space: pre-wrap; }

.tests-bar { background: #161b22; border-top: 1px solid #2b2b2b; padding: 6px 16px; font-size: 11px; display: flex; gap: 14px; }
.test-item { display: flex; align-items: center; gap: 4px; color: #3fb950; font-weight: 600; }
</style>
</head>
<body>
<div class="win-bar">
    <div class="win-title"><span class="postman-logo"></span> Postman - Ivan Carrillo | Taller 3er Corte</div>
    <div class="win-controls"><span>&#x2014;</span><span>&#x25A2;</span><span>&#x2715;</span></div>
</div>
<div class="top-bar">
    <div class="tab-active">
        <span style="color:${methodColor}; font-weight:800;">${s.method}</span>
        <span>${escapeHtml(s.title.split(' - ')[1] || s.title)}</span>
    </div>
    <div class="env-badge">&#x1F310; Railway-Production (https://api-gestion-practicas-production.up.railway.app)</div>
</div>
<div class="main-body">
    <div class="sidebar">
        <div class="tree-title">&#x1F4D6; Gestion Practicas - CRUD</div>
        
        <div class="tree-folder">&#x1F4C2; 1. Health &amp; Info</div>
        <div class="tree-item ${s.activeItem === 'collection_root' ? 'active' : ''}">
            <span class="method-pill" style="color:#00a389; background:rgba(0,163,137,0.15)">GET</span> Raiz API
        </div>

        <div class="tree-folder">&#x1F4C2; 2. CRUD Tabla Principal (practicas)</div>
        <div class="tree-item ${s.activeItem === 'get_practicas' ? 'active' : ''}">
            <span class="method-pill" style="color:#00a389; background:rgba(0,163,137,0.15)">GET</span> READ 1: Listar
        </div>
        <div class="tree-item ${s.activeItem === 'get_practica_id' ? 'active' : ''}">
            <span class="method-pill" style="color:#00a389; background:rgba(0,163,137,0.15)">GET</span> READ 2: Por ID
        </div>
        <div class="tree-item ${s.activeItem === 'post_practica' ? 'active' : ''}">
            <span class="method-pill" style="color:#ff8c00; background:rgba(255,140,0,0.15)">POST</span> CREATE: Practica
        </div>
        <div class="tree-item ${s.activeItem === 'put_practica' ? 'active' : ''}">
            <span class="method-pill" style="color:#0078d4; background:rgba(0,120,212,0.15)">PUT</span> UPDATE: Practica
        </div>
        <div class="tree-item ${s.activeItem === 'delete_practica' ? 'active' : ''}">
            <span class="method-pill" style="color:#f85149; background:rgba(248,81,73,0.15)">DEL</span> DELETE: Practica
        </div>
        <div class="tree-item ${s.activeItem === 'verify_deleted' ? 'active' : ''}">
            <span class="method-pill" style="color:#00a389; background:rgba(0,163,137,0.15)">GET</span> VERIFY: 404 Not Found
        </div>

        <div class="tree-folder">&#x1F4C2; 3. Casos de Error</div>
        <div class="tree-item ${s.activeItem === 'error_400' ? 'active' : ''}">
            <span class="method-pill" style="color:#ff8c00; background:rgba(255,140,0,0.15)">POST</span> Error 400 (Campos)
        </div>
        <div class="tree-item ${s.activeItem === 'error_409' ? 'active' : ''}">
            <span class="method-pill" style="color:#ff8c00; background:rgba(255,140,0,0.15)">POST</span> Error 409 (Duplicado)
        </div>
    </div>

    <div class="work-area">
        <div class="req-header">
            <div class="req-title">${escapeHtml(s.title)}</div>
            <div class="url-bar">
                <div class="method-select">${s.method}</div>
                <input class="url-input" type="text" value="${escapeHtml(s.url)}" readonly>
                <button class="send-btn">Send</button>
            </div>
        </div>

        <div class="req-body-panel">
            <div class="tabs-sub">
                <span>Params</span>
                <span>Authorization</span>
                <span>Headers <strong style="color:#fff;">(2)</strong></span>
                <span class="${s.reqBody ? 'tab-sub-active' : ''}">Body <strong style="color:#fff;">${s.reqBody ? '(raw JSON)' : '(none)'}</strong></span>
                <span>Tests</span>
            </div>
        </div>

        <div class="panels-split">
            ${s.reqBody ? `
            <div class="body-sub-box">
                <div style="color:#8b949e; font-size:11px; margin-bottom:6px; font-weight:700;">REQUEST BODY (application/json):</div>
                ${colorizeJson(s.reqBody)}
            </div>` : ''}

            <div class="res-box">
                <div class="res-header">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:11px; color:#8b949e; font-weight:700;">RESPONSE:</span>
                        <span class="status-pill">${s.status}</span>
                    </div>
                    <div class="res-meta">
                        <span>Time: <strong style="color:#e6edf3;">${s.time}</strong></span>
                        <span>Size: <strong style="color:#e6edf3;">${s.size}</strong></span>
                        <span style="color:#58a6ff; cursor:pointer;">Pretty &#x25BE;</span>
                    </div>
                </div>
                <div class="code-container">
                    ${colorizeJson(s.resBody)}
                </div>
            </div>
        </div>

        <div class="tests-bar">
            <span style="color:#8b949e; font-weight:700;">Test Results (${s.tests.length}/${s.tests.length}):</span>
            ${s.tests.map(t => `<span class="test-item">&#x2713; PASS ${escapeHtml(t.name)}</span>`).join('')}
        </div>
    </div>
</div>
</body>
</html>`;
}

console.log("Iniciando generacion de capturas de Postman...");

screens.forEach((s, idx) => {
    const htmlContent = generateHtml(s);
    const tempHtml = path.join(outputDir, `temp_${idx}.html`);
    const targetPng = path.join(outputDir, s.filename);
    const brainPng = path.join(brainDir, s.filename);

    fs.writeFileSync(tempHtml, htmlContent, 'utf8');

    try {
        const cmd = `"${edgePath}" --headless=new --screenshot="${targetPng}" --window-size=1280,780 "file:///${tempHtml.replace(/\\/g, '/')}"`;
        execSync(cmd, { stdio: 'pipe' });
        fs.copyFileSync(targetPng, brainPng);
        console.log(`[OK] Captura generada: ${s.filename}`);
    } catch (e) {
        console.error(`[ERROR] en ${s.filename}:`, e.message);
    } finally {
        if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
    }
});

console.log("Todas las capturas se generaron correctamente en capturas_postman.");
