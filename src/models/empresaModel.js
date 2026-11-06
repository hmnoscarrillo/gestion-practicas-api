const db = require('../config/dbConfig');

class Empresa {
    getEmpresas(callback) {
        const sql = 'SELECT id, nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, creado_en, actualizado_en FROM empresas ORDER BY id ASC';
        db.query(sql, callback);
    }

    getEmpresaById(id, callback) {
        const sql = 'SELECT id, nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, creado_en, actualizado_en FROM empresas WHERE id = ?';
        db.query(sql, [id], callback);
    }

    postEmpresa(nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, callback) {
        const sql = 'INSERT INTO empresas (nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado || 'Activa'], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putEmpresa(id, nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, callback) {
        const sql = 'UPDATE empresas SET nit = ?, razon_social = ?, sector_economico = ?, ciudad = ?, direccion = ?, telefono = ?, correo = ?, estado = ? WHERE id = ?';
        db.query(sql, [nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, id], callback);
    }

    deleteEmpresa(id, callback) {
        const sql = 'DELETE FROM empresas WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Empresa();
