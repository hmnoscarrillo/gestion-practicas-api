const db = require('../config/dbConfig');

const Sede = {
    getAll: (callback) => {
        const query = 'SELECT * FROM sedes ORDER BY id_sede ASC';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM sedes WHERE id_sede = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO sedes (codigo_sede, nombre_sede, ciudad, direccion, telefono, capacidad_boxes, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.codigo_sede,
            data.nombre_sede,
            data.ciudad,
            data.direccion,
            data.telefono,
            data.capacidad_boxes || 6,
            data.estado || 'Operativa'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_sede: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE sedes 
            SET codigo_sede = ?, nombre_sede = ?, ciudad = ?, direccion = ?, telefono = ?, capacidad_boxes = ?, estado = ?
            WHERE id_sede = ?
        `;
        const values = [
            data.codigo_sede,
            data.nombre_sede,
            data.ciudad,
            data.direccion,
            data.telefono,
            data.capacidad_boxes,
            data.estado,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM sedes WHERE id_sede = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Sede;
