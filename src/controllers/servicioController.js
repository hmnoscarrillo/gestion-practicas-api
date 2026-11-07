const Servicio = require('../models/servicioModel');

const servicioController = {
    getServicios: (req, res) => {
        Servicio.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener servicios de terapia', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getServicioById: (req, res) => {
        const { id } = req.params;
        Servicio.getById(id, (err, servicio) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar servicio', error: err.message });
            }
            if (!servicio) {
                return res.status(404).json({ success: false, message: `Servicio de terapia con ID ${id} no encontrado` });
            }
            res.status(200).json({ success: true, data: servicio });
        });
    },

    createServicio: (req, res) => {
        const { codigo_servicio, nombre_servicio, descripcion, costo } = req.body;

        if (!codigo_servicio || !nombre_servicio || !descripcion || costo === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: codigo_servicio, nombre_servicio, descripcion, costo.'
            });
        }

        Servicio.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: Ya existe un servicio con ese código.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar servicio', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Servicio de terapia registrado exitosamente',
                data: result
            });
        });
    },

    updateServicio: (req, res) => {
        const { id } = req.params;
        const { codigo_servicio, nombre_servicio, descripcion, costo } = req.body;

        if (!codigo_servicio || !nombre_servicio || !descripcion || costo === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar el servicio.'
            });
        }

        Servicio.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar servicio', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: servicio con ID ${id} no encontrado` });
            }

            Servicio.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Código de servicio duplicado', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar servicio', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Servicio con ID ${id} actualizado exitosamente`,
                    data: { id_servicio: Number(id), ...req.body }
                });
            });
        });
    },

    deleteServicio: (req, res) => {
        const { id } = req.params;
        Servicio.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar servicio', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: servicio con ID ${id} no encontrado` });
            }

            Servicio.delete(id, (err) => {
                if (err) {
                    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                        return res.status(409).json({
                            success: false,
                            message: 'Restricción de integridad: No se puede eliminar el servicio porque tiene sesiones de terapia registradas.',
                            error: err.message
                        });
                    }
                    return res.status(500).json({ success: false, message: 'Error al eliminar servicio', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Servicio con ID ${id} eliminado exitosamente`
                });
            });
        });
    }
};

module.exports = servicioController;
