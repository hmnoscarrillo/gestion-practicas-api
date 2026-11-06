const db = require('../config/dbConfig');

class Practica {
    getPracticas(callback) {
        const sql = `
            SELECT 
                p.id,
                p.codigo_practica,
                p.estudiante_id,
                CONCAT(e.nombres, ' ', e.apellidos) AS estudiante_nombre,
                e.documento AS estudiante_documento,
                p.empresa_id,
                em.razon_social AS empresa_nombre,
                em.nit AS empresa_nit,
                p.programa_id,
                pr.nombre AS programa_nombre,
                p.convenio_id,
                c.numero_convenio AS convenio_numero,
                p.tutor_academico_id,
                CONCAT(t.nombres, ' ', t.apellidos) AS tutor_nombre,
                p.cargo_practicante,
                p.fecha_inicio,
                p.fecha_fin,
                p.modalidad,
                p.horas_totales,
                p.estado,
                p.creado_en,
                p.actualizado_en
            FROM practicas p
            INNER JOIN estudiantes e ON p.estudiante_id = e.id
            INNER JOIN empresas em ON p.empresa_id = em.id
            INNER JOIN programas pr ON p.programa_id = pr.id
            INNER JOIN convenios c ON p.convenio_id = c.id
            INNER JOIN tutores_academicos t ON p.tutor_academico_id = t.id
            ORDER BY p.id ASC
        `;
        db.query(sql, callback);
    }

    getPracticaById(id, callback) {
        const sql = `
            SELECT 
                p.id,
                p.codigo_practica,
                p.estudiante_id,
                CONCAT(e.nombres, ' ', e.apellidos) AS estudiante_nombre,
                e.documento AS estudiante_documento,
                p.empresa_id,
                em.razon_social AS empresa_nombre,
                em.nit AS empresa_nit,
                p.programa_id,
                pr.nombre AS programa_nombre,
                p.convenio_id,
                c.numero_convenio AS convenio_numero,
                p.tutor_academico_id,
                CONCAT(t.nombres, ' ', t.apellidos) AS tutor_nombre,
                p.cargo_practicante,
                p.fecha_inicio,
                p.fecha_fin,
                p.modalidad,
                p.horas_totales,
                p.estado,
                p.creado_en,
                p.actualizado_en
            FROM practicas p
            INNER JOIN estudiantes e ON p.estudiante_id = e.id
            INNER JOIN empresas em ON p.empresa_id = em.id
            INNER JOIN programas pr ON p.programa_id = pr.id
            INNER JOIN convenios c ON p.convenio_id = c.id
            INNER JOIN tutores_academicos t ON p.tutor_academico_id = t.id
            WHERE p.id = ?
        `;
        db.query(sql, [id], callback);
    }

    postPractica(codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin, modalidad, horas_totales, estado, callback) {
        const sql = `
            INSERT INTO practicas 
            (codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin, modalidad, horas_totales, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad || 'Presencial',
            horas_totales || 320,
            estado || 'En curso'
        ], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.insertId);
        });
    }

    putPractica(id, codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin, modalidad, horas_totales, estado, callback) {
        const sql = `
            UPDATE practicas 
            SET codigo_practica = ?, estudiante_id = ?, empresa_id = ?, programa_id = ?, convenio_id = ?, tutor_academico_id = ?, cargo_practicante = ?, fecha_inicio = ?, fecha_fin = ?, modalidad = ?, horas_totales = ?, estado = ? 
            WHERE id = ?
        `;
        db.query(sql, [
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad,
            horas_totales,
            estado,
            id
        ], callback);
    }

    deletePractica(id, callback) {
        const sql = 'DELETE FROM practicas WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Practica();
