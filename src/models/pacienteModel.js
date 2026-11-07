const db = require('../config/dbConfig');

const Paciente = {
    getAll: (callback) => {
        const query = 'SELECT * FROM pacientes ORDER BY id_paciente ASC';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM pacientes WHERE id_paciente = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO pacientes (cedula, nombres, apellidos, telefono, email, fecha_nacimiento, genero, eps, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.cedula,
            data.nombres,
            data.apellidos,
            data.telefono,
            data.email,
            data.fecha_nacimiento,
            data.genero || 'M',
            data.eps,
            data.estado || 'Activo'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_paciente: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE pacientes 
            SET cedula = ?, nombres = ?, apellidos = ?, telefono = ?, email = ?, fecha_nacimiento = ?, genero = ?, eps = ?, estado = ?
            WHERE id_paciente = ?
        `;
        const values = [
            data.cedula,
            data.nombres,
            data.apellidos,
            data.telefono,
            data.email,
            data.fecha_nacimiento,
            data.genero,
            data.eps,
            data.estado,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM pacientes WHERE id_paciente = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Paciente;
