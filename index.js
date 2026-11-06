require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas de cada modulo (estructura del docente)
const programaRoutes = require('./src/routes/programaRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes');
const tutorRoutes = require('./src/routes/tutorRoutes');
const estudianteRoutes = require('./src/routes/estudianteRoutes');
const convenioRoutes = require('./src/routes/convenioRoutes');
const practicaRoutes = require('./src/routes/practicaRoutes');

// Modulo de inicializacion automatica de BD
const initDb = require('./src/config/initDb');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint raiz informativo
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        nombre: 'API REST - Sistema de Gestion de Practicas Profesionales',
        version: '1.0.0',
        autor: 'Ivan Carrillo',
        estado: 'En linea y operativo',
        despliegue: 'Railway Cloud Platform',
        modulos: {
            programas: '/api/programas/getProgramas',
            empresas: '/api/empresas/getEmpresas',
            tutores: '/api/tutores/getTutores',
            estudiantes: '/api/estudiantes/getEstudiantes',
            convenios: '/api/convenios/getConvenios',
            practicas: '/api/practicas/getPracticas'
        },
        documentacion: 'Consulta el archivo README.md o la coleccion de Postman adjunta.'
    });
});

// Endpoint de verificacion de salud (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

// Registrar rutas de la API segun la estructura requerida
app.use('/api/programas', programaRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/convenios', convenioRoutes);
app.use('/api/practicas', practicaRoutes);

// Manejador para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `La ruta solicitada [${req.method} ${req.originalUrl}] no existe en esta API.`
    });
});

// Manejador global de errores (500)
app.use((err, req, res, next) => {
    console.error('Error no controlado en la aplicacion:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Ocurrio un error interno en el servidor.',
        error: process.env.NODE_ENV === 'production' ? err.message : err.stack
    });
});

// Iniciar servidor y verificar base de datos
app.listen(port, () => {
    console.log(`=======================================================`);
    console.log(` Servidor Express iniciado exitosamente`);
    console.log(` URL local: http://localhost:${port}`);
    console.log(` Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=======================================================`);
    
    // Auto-inicializar tablas y datos si aun no existen
    initDb((err) => {
        if (err) {
            console.warn('Aviso durante la comprobacion inicial de la BD:', err.message);
        }
    });
});

module.exports = app;
