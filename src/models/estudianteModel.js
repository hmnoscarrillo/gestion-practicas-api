const db = require('../config/dbConfig');

class Estudiante {
    getEstudiantes(callback) {
        const sql = `
            SELECT e.id, e.documento, e.nombres, e.apellidos, e.correo, e.telefono, e.semestre, 
                   e.programa_id, p.nombre AS programa_nombre, e.estado, e.creado_en, e.actualizado_en
            FROM estudiantes e
            INNER JOIN programas p ON e.programa_id = p.id
            ORDER BY e.id ASC
        `;
        db.query(sql, callback);
    }

    getEstudianteById(id, callback) {
        const sql = `
            SELECT e.id, e.documento, e.nombres, e.apellidos, e.correo, e.telefono, e.semestre, 
                   e.programa_id, p.nombre AS programa_nombre, e.estado, e.creado_en, e.actualizado_en
            FROM estudiantes e
            INNER JOIN programas p ON e.programa_id = p.id
            WHERE e.id = ?
        `;
        db.query(sql, [id], callback);
    }

    postEstudiante(documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado, callback) {
        const sql = 'INSERT INTO estudiantes (documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado || 'Activo'], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putEstudiante(id, documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado, callback) {
        const sql = 'UPDATE estudiantes SET documento = ?, nombres = ?, apellidos = ?, correo = ?, telefono = ?, semestre = ?, programa_id = ?, estado = ? WHERE id = ?';
        db.query(sql, [documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado, id], callback);
    }

    deleteEstudiante(id, callback) {
        const sql = 'DELETE FROM estudiantes WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Estudiante();
