const Fisioterapeuta = require('../models/fisioterapeutaModel');

const fisioterapeutaController = {
    getFisioterapeutas: (req, res) => {
        Fisioterapeuta.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener fisioterapeutas', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getFisioterapeutaById: (req, res) => {
        const { id } = req.params;
        Fisioterapeuta.getById(id, (err, fisio) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar fisioterapeuta', error: err.message });
            }
            if (!fisio) {
                return res.status(404).json({ success: false, message: `Fisioterapeuta con ID ${id} no encontrado` });
            }
            res.status(200).json({ success: true, data: fisio });
        });
    },

    createFisioterapeuta: (req, res) => {
        const { tarjeta_profesional, nombres, apellidos, especialidad, telefono, email } = req.body;

        if (!tarjeta_profesional || !nombres || !apellidos || !especialidad || !telefono || !email) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: tarjeta_profesional, nombres, apellidos, especialidad, telefono, email.'
            });
        }

        Fisioterapeuta.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: La tarjeta profesional o el email ya están registrados.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar fisioterapeuta', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Fisioterapeuta registrado exitosamente',
                data: result
            });
        });
    },

    updateFisioterapeuta: (req, res) => {
        const { id } = req.params;
        const { tarjeta_profesional, nombres, apellidos, especialidad, telefono, email } = req.body;

        if (!tarjeta_profesional || !nombres || !apellidos || !especialidad || !telefono || !email) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar el fisioterapeuta.'
            });
        }

        Fisioterapeuta.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar fisioterapeuta', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: fisioterapeuta con ID ${id} no encontrado` });
            }

            Fisioterapeuta.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Tarjeta profesional o email duplicado', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar fisioterapeuta', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Fisioterapeuta con ID ${id} actualizado exitosamente`,
                    data: { id_fisioterapeuta: Number(id), ...req.body }
                });
            });
        });
    },

    deleteFisioterapeuta: (req, res) => {
        const { id } = req.params;
        Fisioterapeuta.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar fisioterapeuta', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: fisioterapeuta con ID ${id} no encontrado` });
            }

            Fisioterapeuta.delete(id, (err) => {
                if (err) {
                    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                        return res.status(409).json({
                            success: false,
                            message: 'Restricción de integridad: No se puede eliminar el fisioterapeuta porque tiene sesiones de terapia asignadas.',
                            error: err.message
                        });
                    }
                    return res.status(500).json({ success: false, message: 'Error al eliminar fisioterapeuta', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Fisioterapeuta con ID ${id} eliminado exitosamente`
                });
            });
        });
    }
};

module.exports = fisioterapeutaController;
