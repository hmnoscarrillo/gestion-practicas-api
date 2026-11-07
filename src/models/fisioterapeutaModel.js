const db = require('../config/dbConfig');

const Fisioterapeuta = {
    getAll: (callback) => {
        const query = 'SELECT * FROM fisioterapeutas ORDER BY id_fisioterapeuta ASC';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM fisioterapeutas WHERE id_fisioterapeuta = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO fisioterapeutas (tarjeta_profesional, nombres, apellidos, especialidad, telefono, email, anios_experiencia, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.tarjeta_profesional,
            data.nombres,
            data.apellidos,
            data.especialidad,
            data.telefono,
            data.email,
            data.anios_experiencia || 1,
            data.estado || 'Activo'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_fisioterapeuta: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE fisioterapeutas 
            SET tarjeta_profesional = ?, nombres = ?, apellidos = ?, especialidad = ?, telefono = ?, email = ?, anios_experiencia = ?, estado = ?
            WHERE id_fisioterapeuta = ?
        `;
        const values = [
            data.tarjeta_profesional,
            data.nombres,
            data.apellidos,
            data.especialidad,
            data.telefono,
            data.email,
            data.anios_experiencia,
            data.estado,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM fisioterapeutas WHERE id_fisioterapeuta = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Fisioterapeuta;
