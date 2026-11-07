const Sede = require('../models/sedeModel');

const sedeController = {
    getSedes: (req, res) => {
        Sede.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener sedes', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getSedeById: (req, res) => {
        const { id } = req.params;
        Sede.getById(id, (err, sede) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar sede', error: err.message });
            }
            if (!sede) {
                return res.status(404).json({ success: false, message: `Sede con ID ${id} no encontrada` });
            }
            res.status(200).json({ success: true, data: sede });
        });
    },

    createSede: (req, res) => {
        const { codigo_sede, nombre_sede, ciudad, direccion, telefono } = req.body;

        if (!codigo_sede || !nombre_sede || !ciudad || !direccion || !telefono) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: codigo_sede, nombre_sede, ciudad, direccion, telefono.'
            });
        }

        Sede.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: Ya existe una sede con ese código.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar sede', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Sede registrada exitosamente',
                data: result
            });
        });
    },

    updateSede: (req, res) => {
        const { id } = req.params;
        const { codigo_sede, nombre_sede, ciudad, direccion, telefono } = req.body;

        if (!codigo_sede || !nombre_sede || !ciudad || !direccion || !telefono) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar la sede.'
            });
        }

        Sede.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar sede', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: sede con ID ${id} no encontrada` });
            }

            Sede.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Código de sede duplicado', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar sede', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Sede con ID ${id} actualizada exitosamente`,
                    data: { id_sede: Number(id), ...req.body }
                });
            });
        });
    },

    deleteSede: (req, res) => {
        const { id } = req.params;
        Sede.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar sede', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: sede con ID ${id} no encontrada` });
            }

            Sede.delete(id, (err) => {
                if (err) {
                    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                        return res.status(409).json({
                            success: false,
                            message: 'Restricción de integridad: No se puede eliminar la sede porque tiene sesiones programadas.',
                            error: err.message
                        });
                    }
                    return res.status(500).json({ success: false, message: 'Error al eliminar sede', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Sede con ID ${id} eliminada exitosamente`
                });
            });
        });
    }
};

module.exports = sedeController;
