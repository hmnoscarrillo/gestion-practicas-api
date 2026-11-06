const db = require('../config/dbConfig');

class Convenio {
    getConvenios(callback) {
        const sql = `
            SELECT c.id, c.numero_convenio, c.empresa_id, em.razon_social AS empresa_nombre, 
                   c.programa_id, pr.nombre AS programa_nombre, c.fecha_inicio, c.fecha_fin, 
                   c.cupos_disponibles, c.estado, c.creado_en, c.actualizado_en
            FROM convenios c
            INNER JOIN empresas em ON c.empresa_id = em.id
            INNER JOIN programas pr ON c.programa_id = pr.id
            ORDER BY c.id ASC
        `;
        db.query(sql, callback);
    }

    getConvenioById(id, callback) {
        const sql = `
            SELECT c.id, c.numero_convenio, c.empresa_id, em.razon_social AS empresa_nombre, 
                   c.programa_id, pr.nombre AS programa_nombre, c.fecha_inicio, c.fecha_fin, 
                   c.cupos_disponibles, c.estado, c.creado_en, c.actualizado_en
            FROM convenios c
            INNER JOIN empresas em ON c.empresa_id = em.id
            INNER JOIN programas pr ON c.programa_id = pr.id
            WHERE c.id = ?
        `;
        db.query(sql, [id], callback);
    }

    postConvenio(numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado, callback) {
        const sql = 'INSERT INTO convenios (numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles || 5, estado || 'Vigente'], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putConvenio(id, numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado, callback) {
        const sql = 'UPDATE convenios SET numero_convenio = ?, empresa_id = ?, programa_id = ?, fecha_inicio = ?, fecha_fin = ?, cupos_disponibles = ?, estado = ? WHERE id = ?';
        db.query(sql, [numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado, id], callback);
    }

    deleteConvenio(id, callback) {
        const sql = 'DELETE FROM convenios WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Convenio();
