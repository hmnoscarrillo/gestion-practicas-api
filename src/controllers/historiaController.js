const Historia = require('../models/historiaModel');

const historiaController = {
    getHistorias: (req, res) => {
        Historia.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener historias clínicas', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getHistoriaById: (req, res) => {
        const { id } = req.params;
        Historia.getById(id, (err, historia) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar historia clínica', error: err.message });
            }
            if (!historia) {
                return res.status(404).json({ success: false, message: `Historia clínica con ID ${id} no encontrada` });
            }
            res.status(200).json({ success: true, data: historia });
        });
    },

    createHistoria: (req, res) => {
        const { numero_expediente, id_paciente, fecha_apertura, diagnostico_cie, motivo_consulta, antecedentes_medicos } = req.body;

        if (!numero_expediente || !id_paciente || !fecha_apertura || !diagnostico_cie || !motivo_consulta || !antecedentes_medicos) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: numero_expediente, id_paciente, fecha_apertura, diagnostico_cie, motivo_consulta, antecedentes_medicos.'
            });
        }

        Historia.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: Ya existe una historia clínica con ese número de expediente.',
                        error: err.message
                    });
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        success: false,
                        message: 'Error de llave foránea: El paciente especificado no existe.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar historia clínica', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Historia clínica registrada exitosamente',
                data: result
            });
        });
    },

    updateHistoria: (req, res) => {
        const { id } = req.params;
        const { numero_expediente, id_paciente, fecha_apertura, diagnostico_cie, motivo_consulta, antecedentes_medicos } = req.body;

        if (!numero_expediente || !id_paciente || !fecha_apertura || !diagnostico_cie || !motivo_consulta || !antecedentes_medicos) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar la historia clínica.'
            });
        }

        Historia.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar historia clínica', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: historia clínica con ID ${id} no encontrada` });
            }

            Historia.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Número de expediente duplicado', error: err.message });
                    }
                    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                        return res.status(400).json({ success: false, message: 'Error de llave foránea: Paciente no existe', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar historia clínica', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Historia clínica con ID ${id} actualizada exitosamente`,
                    data: { id_historia: Number(id), ...req.body }
                });
            });
        });
    },

    deleteHistoria: (req, res) => {
        const { id } = req.params;
        Historia.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar historia clínica', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: historia clínica con ID ${id} no encontrada` });
            }

            Historia.delete(id, (err) => {
                if (err) {
                    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                        return res.status(409).json({
                            success: false,
                            message: 'Restricción de integridad: No se puede eliminar la historia clínica porque tiene sesiones de terapia vinculadas.',
                            error: err.message
                        });
                    }
                    return res.status(500).json({ success: false, message: 'Error al eliminar historia clínica', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Historia clínica con ID ${id} eliminada exitosamente`
                });
            });
        });
    }
};

module.exports = historiaController;
