const db = require('../config/dbConfig');

class Programa {
    getProgramas(callback) {
        const sql = 'SELECT id, codigo, nombre, facultad, nivel, duracion_semestres, estado, creado_en, actualizado_en FROM programas ORDER BY id ASC';
        db.query(sql, callback);
    }

    getProgramaById(id, callback) {
        const sql = 'SELECT id, codigo, nombre, facultad, nivel, duracion_semestres, estado, creado_en, actualizado_en FROM programas WHERE id = ?';
        db.query(sql, [id], callback);
    }

    postPrograma(codigo, nombre, facultad, nivel, duracion_semestres, estado, callback) {
        const sql = 'INSERT INTO programas (codigo, nombre, facultad, nivel, duracion_semestres, estado) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [codigo, nombre, facultad, nivel, duracion_semestres, estado || 'Activo'], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putPrograma(id, codigo, nombre, facultad, nivel, duracion_semestres, estado, callback) {
        const sql = 'UPDATE programas SET codigo = ?, nombre = ?, facultad = ?, nivel = ?, duracion_semestres = ?, estado = ? WHERE id = ?';
        db.query(sql, [codigo, nombre, facultad, nivel, duracion_semestres, estado, id], callback);
    }

    deletePrograma(id, callback) {
        const sql = 'DELETE FROM programas WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Programa();
