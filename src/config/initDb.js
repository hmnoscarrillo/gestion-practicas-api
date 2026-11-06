const fs = require('fs');
const path = require('path');
const db = require('./dbConfig');

function initializeDatabase(callback) {
    // Verificar si la tabla programas ya existe
    db.query("SHOW TABLES LIKE 'programas'", (err, rows) => {
        if (err) {
            console.error('Error verificando existencia de tablas:', err.message);
            if (callback) callback(err);
            return;
        }

        if (rows && rows.length > 0) {
            console.log('Las tablas de la base de datos ya existen. Omitiendo inicializacion automatica.');
            if (callback) callback(null);
            return;
        }

        console.log('Tablas no encontradas. Inicializando estructura y datos desde schema.sql...');
        const schemaPath = path.join(__dirname, '..', '..', 'schema.sql');
        
        if (!fs.existsSync(schemaPath)) {
            console.warn('No se encontro el archivo schema.sql en:', schemaPath);
            if (callback) callback(null);
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
            console.log('Base de datos inicializada con exito (tablas y 10 registros por tabla creados).');
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
