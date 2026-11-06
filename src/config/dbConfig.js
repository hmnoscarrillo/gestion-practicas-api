require('dotenv').config();
const mysql = require('mysql2');

// Parametros de conexion con fallback a variables nativas de Railway
const dbConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway',
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

// Verificar la conexion al iniciar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err.message);
    } else {
        console.log(`Conexion a MySQL exitosa en [${dbConfig.host}:${dbConfig.port}] Base de datos: [${dbConfig.database}]`);
        connection.release();
    }
});

module.exports = pool;
