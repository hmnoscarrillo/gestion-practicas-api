const db = require('../config/dbConfig');

const Sesion = {
    getAll: (callback) => {
        const query = `
            SELECT 
                st.id_sesion,
                st.codigo_sesion,
                st.id_paciente,
                st.id_fisioterapeuta,
                st.id_servicio,
                st.id_sede,
                st.id_historia,
                DATE_FORMAT(st.fecha_sesion, '%Y-%m-%d') AS fecha_sesion,
                TIME_FORMAT(st.hora_inicio, '%H:%i') AS hora_inicio,
                TIME_FORMAT(st.hora_fin, '%H:%i') AS hora_fin,
                st.numero_sesion,
                st.escala_dolor_eva,
                st.observaciones_evolucion,
                st.estado_sesion,
                CONCAT(p.nombres, ' ', p.apellidos) AS paciente_nombre,
                p.cedula AS paciente_cedula,
                p.telefono AS paciente_telefono,
                p.eps AS paciente_eps,
                CONCAT(f.nombres, ' ', f.apellidos) AS fisioterapeuta_nombre,
                f.especialidad AS fisioterapeuta_especialidad,
                s.nombre_servicio,
                s.duracion_minutos AS servicio_duracion,
                s.costo AS servicio_costo,
                s.modalidad AS servicio_modalidad,
                sd.nombre_sede,
                sd.ciudad AS sede_ciudad,
                h.numero_expediente,
                h.diagnostico_cie
            FROM sesiones_terapia st
            INNER JOIN pacientes p ON st.id_paciente = p.id_paciente
            INNER JOIN fisioterapeutas f ON st.id_fisioterapeuta = f.id_fisioterapeuta
            INNER JOIN servicios_terapia s ON st.id_servicio = s.id_servicio
            INNER JOIN sedes sd ON st.id_sede = sd.id_sede
            INNER JOIN historias_clinicas h ON st.id_historia = h.id_historia
            ORDER BY st.id_sesion ASC
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT 
                st.id_sesion,
                st.codigo_sesion,
                st.id_paciente,
                st.id_fisioterapeuta,
                st.id_servicio,
                st.id_sede,
                st.id_historia,
                DATE_FORMAT(st.fecha_sesion, '%Y-%m-%d') AS fecha_sesion,
                TIME_FORMAT(st.hora_inicio, '%H:%i') AS hora_inicio,
                TIME_FORMAT(st.hora_fin, '%H:%i') AS hora_fin,
                st.numero_sesion,
                st.escala_dolor_eva,
                st.observaciones_evolucion,
                st.estado_sesion,
                CONCAT(p.nombres, ' ', p.apellidos) AS paciente_nombre,
                p.cedula AS paciente_cedula,
                p.telefono AS paciente_telefono,
                p.eps AS paciente_eps,
                CONCAT(f.nombres, ' ', f.apellidos) AS fisioterapeuta_nombre,
                f.especialidad AS fisioterapeuta_especialidad,
                s.nombre_servicio,
                s.duracion_minutos AS servicio_duracion,
                s.costo AS servicio_costo,
                s.modalidad AS servicio_modalidad,
                sd.nombre_sede,
                sd.ciudad AS sede_ciudad,
                h.numero_expediente,
                h.diagnostico_cie
            FROM sesiones_terapia st
            INNER JOIN pacientes p ON st.id_paciente = p.id_paciente
            INNER JOIN fisioterapeutas f ON st.id_fisioterapeuta = f.id_fisioterapeuta
            INNER JOIN servicios_terapia s ON st.id_servicio = s.id_servicio
            INNER JOIN sedes sd ON st.id_sede = sd.id_sede
            INNER JOIN historias_clinicas h ON st.id_historia = h.id_historia
            WHERE st.id_sesion = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (data, callback) => {
        const query = `
            INSERT INTO sesiones_terapia (
                codigo_sesion, id_paciente, id_fisioterapeuta, id_servicio, id_sede, id_historia,
                fecha_sesion, hora_inicio, hora_fin, numero_sesion, escala_dolor_eva, observaciones_evolucion, estado_sesion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.codigo_sesion,
            data.id_paciente,
            data.id_fisioterapeuta,
            data.id_servicio,
            data.id_sede,
            data.id_historia,
            data.fecha_sesion,
            data.hora_inicio,
            data.hora_fin,
            data.numero_sesion || 1,
            data.escala_dolor_eva || 5,
            data.observaciones_evolucion || 'Sin observaciones iniciales',
            data.estado_sesion || 'Programada'
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, { id_sesion: result.insertId, ...data });
        });
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE sesiones_terapia 
            SET codigo_sesion = ?, id_paciente = ?, id_fisioterapeuta = ?, id_servicio = ?, id_sede = ?, id_historia = ?,
                fecha_sesion = ?, hora_inicio = ?, hora_fin = ?, numero_sesion = ?, escala_dolor_eva = ?, 
                observaciones_evolucion = ?, estado_sesion = ?
            WHERE id_sesion = ?
        `;
        const values = [
            data.codigo_sesion,
            data.id_paciente,
            data.id_fisioterapeuta,
            data.id_servicio,
            data.id_sede,
            data.id_historia,
            data.fecha_sesion,
            data.hora_inicio,
            data.hora_fin,
            data.numero_sesion,
            data.escala_dolor_eva,
            data.observaciones_evolucion,
            data.estado_sesion,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM sesiones_terapia WHERE id_sesion = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Sesion;
