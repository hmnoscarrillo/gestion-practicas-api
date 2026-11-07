const db = require('../config/dbConfig');

const Servicio = {
    getAll: (callback) => {
        const query = 'SELECT * FROM servicios_terapia ORDER BY id_servicio ASC';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM servicios_terapia WHERE id_servicio = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO servicios_terapia (codigo_servicio, nombre_servicio, descripcion, duracion_minutos, costo, modalidad, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.codigo_servicio,
            data.nombre_servicio,
            data.descripcion,
            data.duracion_minutos || 45,
            data.costo,
            data.modalidad || 'Presencial',
            data.estado || 'Activo'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_servicio: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE servicios_terapia 
            SET codigo_servicio = ?, nombre_servicio = ?, descripcion = ?, duracion_minutos = ?, costo = ?, modalidad = ?, estado = ?
            WHERE id_servicio = ?
        `;
        const values = [
            data.codigo_servicio,
            data.nombre_servicio,
            data.descripcion,
            data.duracion_minutos,
            data.costo,
            data.modalidad,
            data.estado,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM servicios_terapia WHERE id_servicio = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Servicio;
