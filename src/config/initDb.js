const fs = require('fs');
const path = require('path');
const db = require('./dbConfig');

function initializeDatabase(callback) {
    // Verificar si las 6 tablas principales existen en la base de datos actual
    const checkSql = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
          AND table_name IN ('programas', 'empresas', 'tutores_academicos', 'estudiantes', 'convenios', 'practicas')
    `;

    db.query(checkSql, (err, rows) => {
        if (err) {
            console.error('Error verificando existencia de tablas:', err.message);
            if (callback) callback(err);
            return;
        }

        if (rows && rows.length === 6) {
            console.log('Las 6 tablas del modelo ya existen en la base de datos.');
            if (callback) callback(null);
            return;
        }

        console.log(`Se detectaron ${rows ? rows.length : 0} de 6 tablas. Ejecutando schema.sql para inicializar estructura y 10 registros por tabla...`);
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
            console.log('Base de datos inicializada exitosamente (6 tablas creadas con 10 registros cada una).');
            if (callback) callback(null);
        });
    });
}

// Permitir ejecucion directa por CLI
if (require.main === module) {
    initializeDatabase((err) => {
        if (err) {
            console.error('Fallo en la inicializacion:', err);
            process.exit(1);
        } else {
            console.log('Proceso de inicializacion finalizado.');
            process.exit(0);
        }
    });
}

module.exports = initializeDatabase;
