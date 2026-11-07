const db = require('../config/dbConfig');

const Historia = {
    getAll: (callback) => {
        const query = `
            SELECT h.*, 
                   CONCAT(p.nombres, ' ', p.apellidos) AS paciente_nombre,
                   p.cedula AS paciente_cedula,
                   p.eps AS paciente_eps
            FROM historias_clinicas h
            INNER JOIN pacientes p ON h.id_paciente = p.id_paciente
            ORDER BY h.id_historia ASC
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT h.*, 
                   CONCAT(p.nombres, ' ', p.apellidos) AS paciente_nombre,
                   p.cedula AS paciente_cedula,
                   p.eps AS paciente_eps
            FROM historias_clinicas h
            INNER JOIN pacientes p ON h.id_paciente = p.id_paciente
            WHERE h.id_historia = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO historias_clinicas (numero_expediente, id_paciente, fecha_apertura, diagnostico_cie, motivo_consulta, antecedentes_medicos, total_sesiones_prescritas, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.numero_expediente,
            data.id_paciente,
            data.fecha_apertura,
            data.diagnostico_cie,
            data.motivo_consulta,
            data.antecedentes_medicos,
            data.total_sesiones_prescritas || 10,
            data.estado || 'En Tratamiento'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_historia: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE historias_clinicas 
            SET numero_expediente = ?, id_paciente = ?, fecha_apertura = ?, diagnostico_cie = ?, motivo_consulta = ?, antecedentes_medicos = ?, total_sesiones_prescritas = ?, estado = ?
            WHERE id_historia = ?
        `;
        const values = [
            data.numero_expediente,
            data.id_paciente,
            data.fecha_apertura,
            data.diagnostico_cie,
            data.motivo_consulta,
            data.antecedentes_medicos,
            data.total_sesiones_prescritas,
            data.estado,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM historias_clinicas WHERE id_historia = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Historia;
