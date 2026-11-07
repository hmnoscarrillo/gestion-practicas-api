const Sesion = require('../models/sesionModel');

const sesionController = {
    getSesiones: (req, res) => {
        Sesion.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener sesiones de terapia', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getSesionById: (req, res) => {
        const { id } = req.params;
        Sesion.getById(id, (err, sesion) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar sesión', error: err.message });
            }
            if (!sesion) {
                return res.status(404).json({ success: false, message: `Sesión de fisioterapia con ID ${id} no encontrada` });
            }
            res.status(200).json({ success: true, data: sesion });
        });
    },

    createSesion: (req, res) => {
        const { codigo_sesion, id_paciente, id_fisioterapeuta, id_servicio, id_sede, id_historia, fecha_sesion, hora_inicio, hora_fin } = req.body;

        if (!codigo_sesion || !id_paciente || !id_fisioterapeuta || !id_servicio || !id_sede || !id_historia || !fecha_sesion || !hora_inicio || !hora_fin) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: codigo_sesion, id_paciente, id_fisioterapeuta, id_servicio, id_sede, id_historia, fecha_sesion, hora_inicio, hora_fin.'
            });
        }

        Sesion.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: Ya existe una sesión con ese código.',
                        error: err.message
                    });
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        success: false,
                        message: 'Error de integridad referencial: Uno de los IDs relacionados (paciente, fisioterapeuta, servicio, sede o historia) no existe en la base de datos.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar sesión de terapia', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Sesión de fisioterapia registrada exitosamente',
                data: result
            });
        });
    },

    updateSesion: (req, res) => {
        const { id } = req.params;
        const { codigo_sesion, id_paciente, id_fisioterapeuta, id_servicio, id_sede, id_historia, fecha_sesion, hora_inicio, hora_fin } = req.body;

        if (!codigo_sesion || !id_paciente || !id_fisioterapeuta || !id_servicio || !id_sede || !id_historia || !fecha_sesion || !hora_inicio || !hora_fin) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar la sesión de fisioterapia.'
            });
        }

        Sesion.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar sesión', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: sesión con ID ${id} no encontrada` });
            }

            Sesion.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Código de sesión duplicado', error: err.message });
                    }
                    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                        return res.status(400).json({ success: false, message: 'Error de integridad referencial: ID de entidad relacionada no existe', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar sesión de terapia', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Sesión de fisioterapia con ID ${id} actualizada exitosamente`,
                    data: { id_sesion: Number(id), ...req.body }
                });
            });
        });
    },

    deleteSesion: (req, res) => {
        const { id } = req.params;
        Sesion.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar sesión', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: sesión con ID ${id} no encontrada` });
            }

            Sesion.delete(id, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error al eliminar sesión de terapia', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Sesión de fisioterapia con ID ${id} eliminada exitosamente`
                });
            });
        });
    }
};

module.exports = sesionController;
