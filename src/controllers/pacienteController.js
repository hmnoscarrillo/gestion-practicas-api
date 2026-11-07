const Paciente = require('../models/pacienteModel');

const pacienteController = {
    getPacientes: (req, res) => {
        Paciente.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener pacientes', error: err.message });
            }
            res.status(200).json({ success: true, count: rows.length, data: rows });
        });
    },

    getPacienteById: (req, res) => {
        const { id } = req.params;
        Paciente.getById(id, (err, paciente) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al consultar paciente', error: err.message });
            }
            if (!paciente) {
                return res.status(404).json({ success: false, message: `Paciente con ID ${id} no encontrado` });
            }
            res.status(200).json({ success: true, data: paciente });
        });
    },

    createPaciente: (req, res) => {
        const { cedula, nombres, apellidos, telefono, email, fecha_nacimiento, genero, eps } = req.body;

        if (!cedula || !nombres || !apellidos || !telefono || !email || !fecha_nacimiento || !eps) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes: cedula, nombres, apellidos, telefono, email, fecha_nacimiento, eps.'
            });
        }

        Paciente.create(req.body, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        success: false,
                        message: 'Conflicto: Ya existe un paciente con esa cédula o correo electrónico.',
                        error: err.message
                    });
                }
                return res.status(500).json({ success: false, message: 'Error al registrar paciente', error: err.message });
            }
            res.status(201).json({
                success: true,
                message: 'Paciente registrado exitosamente',
                data: result
            });
        });
    },

    updatePaciente: (req, res) => {
        const { id } = req.params;
        const { cedula, nombres, apellidos, telefono, email, fecha_nacimiento, eps } = req.body;

        if (!cedula || !nombres || !apellidos || !telefono || !email || !fecha_nacimiento || !eps) {
            return res.status(400).json({
                success: false,
                message: 'Campos obligatorios faltantes para actualizar el paciente.'
            });
        }

        Paciente.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar paciente', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede actualizar: paciente con ID ${id} no encontrado` });
            }

            Paciente.update(id, req.body, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ success: false, message: 'Conflicto: Cédula o correo duplicado en otro paciente', error: err.message });
                    }
                    return res.status(500).json({ success: false, message: 'Error al actualizar paciente', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Paciente con ID ${id} actualizado exitosamente`,
                    data: { id_paciente: Number(id), ...req.body }
                });
            });
        });
    },

    deletePaciente: (req, res) => {
        const { id } = req.params;
        Paciente.getById(id, (checkErr, existing) => {
            if (checkErr) {
                return res.status(500).json({ success: false, message: 'Error al verificar paciente', error: checkErr.message });
            }
            if (!existing) {
                return res.status(404).json({ success: false, message: `No se puede eliminar: paciente con ID ${id} no encontrado` });
            }

            Paciente.delete(id, (err) => {
                if (err) {
                    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                        return res.status(409).json({
                            success: false,
                            message: 'Restricción de integridad: No se puede eliminar el paciente porque tiene historias clínicas o sesiones asociadas.',
                            error: err.message
                        });
                    }
                    return res.status(500).json({ success: false, message: 'Error al eliminar paciente', error: err.message });
                }
                res.status(200).json({
                    success: true,
                    message: `Paciente con ID ${id} eliminado exitosamente`
                });
            });
        });
    }
};

module.exports = pacienteController;
