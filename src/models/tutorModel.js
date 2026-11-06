const db = require('../config/dbConfig');

class Tutor {
    getTutores(callback) {
        const sql = `
            SELECT t.id, t.documento, t.nombres, t.apellidos, t.correo, t.telefono, t.cargo, 
                   t.programa_id, p.nombre AS programa_nombre, t.estado, t.creado_en, t.actualizado_en
            FROM tutores_academicos t
            INNER JOIN programas p ON t.programa_id = p.id
            ORDER BY t.id ASC
        `;
        db.query(sql, callback);
    }

    getTutorById(id, callback) {
        const sql = `
            SELECT t.id, t.documento, t.nombres, t.apellidos, t.correo, t.telefono, t.cargo, 
                   t.programa_id, p.nombre AS programa_nombre, t.estado, t.creado_en, t.actualizado_en
            FROM tutores_academicos t
            INNER JOIN programas p ON t.programa_id = p.id
            WHERE t.id = ?
        `;
        db.query(sql, [id], callback);
    }

    postTutor(documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado, callback) {
        const sql = 'INSERT INTO tutores_academicos (documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado || 'Activo'], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putTutor(id, documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado, callback) {
        const sql = 'UPDATE tutores_academicos SET documento = ?, nombres = ?, apellidos = ?, correo = ?, telefono = ?, cargo = ?, programa_id = ?, estado = ? WHERE id = ?';
        db.query(sql, [documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado, id], callback);
    }

    deleteTutor(id, callback) {
        const sql = 'DELETE FROM tutores_academicos WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Tutor();
