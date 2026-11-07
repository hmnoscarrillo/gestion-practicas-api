const fs = require('fs');
const path = require('path');
const db = require('./dbConfig');

function initializeDatabase(callback) {
    // Verificar si las 6 tablas principales de Fisioterapia existen en la base de datos
    const checkSql = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
          AND table_name IN ('pacientes', 'fisioterapeutas', 'servicios_terapia', 'sedes', 'historias_clinicas', 'sesiones_terapia')
    `;

    db.query(checkSql, (err, rows) => {
        if (err) {
            console.error('Error verificando existencia de tablas:', err.message);
            if (callback) callback(err);
            return;
        }

        if (rows && rows.length === 6) {
            console.log('Las 6 tablas del modelo de Centro de Fisioterapia ya existen en la base de datos.');
            if (callback) callback(null);
            return;
        }

        console.log(`Se detectaron ${rows ? rows.length : 0} de 6 tablas de Fisioterapia. Ejecutando schema.sql para inicializar estructura y 10 registros por tabla...`);
        const schemaPath = path.join(__dirname, '..', '..', 'schema.sql');
        
        if (!fs.existsSync(schemaPath)) {
            console.warn('No se encontro el archivo schema.sql en:', schemaPath);
            if (callback) callback(new Error('Archivo schema.sql no encontrado'));
            return;
        }

        const sql = fs.readFileSync(schemaPath, 'utf8');

        // Ejecutar los statements del schema
        db.query(sql, (execErr) => {
            if (execErr) {
                console.error('Error al ejecutar schema.sql:', execErr.message);
                if (callback) callback(execErr);
                return;
            }
            console.log('Base de datos de Centro de Fisioterapia inicializada exitosamente (6 tablas creadas con 10 registros cada una).');
            if (callback) callback(null);
        });
    });
}

// Opcion para forzar reinicializacion limpia
function forceResetDatabase(callback) {
    const schemaPath = path.join(__dirname, '..', '..', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
        if (callback) callback(new Error('Archivo schema.sql no encontrado'));
        return;
    }
    const sql = fs.readFileSync(schemaPath, 'utf8');
    db.query(sql, (err) => {
        if (err) {
            console.error('Error forzando reinicializacion de base de datos:', err.message);
            if (callback) callback(err);
            return;
        }
        console.log('Base de datos reinicializada con exito.');
        if (callback) callback(null);
    });
}

module.exports = initializeDatabase;
module.exports.forceReset = forceResetDatabase;
