require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas de cada modulo del Centro de Fisioterapia
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const fisioterapeutaRoutes = require('./src/routes/fisioterapeutaRoutes');
const servicioRoutes = require('./src/routes/servicioRoutes');
const sedeRoutes = require('./src/routes/sedeRoutes');
const historiaRoutes = require('./src/routes/historiaRoutes');
const sesionRoutes = require('./src/routes/sesionRoutes');

// Modulo de inicializacion automatica de BD
const initDb = require('./src/config/initDb');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir portal web interactivo
app.use('/web', express.static(path.join(__dirname, 'public')));

// Redireccionar /portal a /web
app.get('/portal', (req, res) => {
    res.redirect('/web');
});

// Endpoint raiz informativo
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        nombre: 'API REST - Sistema de Gestion Clinica y Terapeutica "FisioSalud"',
        tematica: 'Centro de Fisioterapia y Rehabilitacion Integral',
        version: '1.0.0',
        autor: 'Ivan Carrillo',
        estado: 'En linea y operativo',
        despliegue: 'Railway Cloud Platform',
        portal_web: '/web',
        modulos: {
            pacientes: '/api/pacientes/getPacientes',
            fisioterapeutas: '/api/fisioterapeutas/getFisioterapeutas',
            servicios: '/api/servicios/getServicios',
            sedes: '/api/sedes/getSedes',
            historias_clinicas: '/api/historias/getHistorias',
            sesiones_terapia: '/api/sesiones/getSesiones'
        },
        documentacion: 'Consulta la coleccion de Postman adjunta y el archivo README.md.'
    });
});

// Endpoint de verificacion de salud (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        servicio: 'FisioSalud API',
        timestamp: new Date().toISOString()
    });
});

// Endpoint de inicializacion de base de datos
app.all('/api/init-db', (req, res) => {
    const force = req.query.force === 'true' || req.body.force === true;
    const runner = force ? initDb.forceReset : initDb;

    runner((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al inicializar la base de datos de Fisioterapia', error: err.message });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Base de datos de Centro de Fisioterapia inicializada exitosamente con 6 tablas y 10 registros por tabla.' 
        });
    });
});

// Registrar rutas de la API segun la arquitectura del docente
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/fisioterapeutas', fisioterapeutaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/sedes', sedeRoutes);
app.use('/api/historias', historiaRoutes);
app.use('/api/sesiones', sesionRoutes);

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
    console.log(` Servidor FisioSalud Express iniciado exitosamente`);
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
