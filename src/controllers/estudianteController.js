const estudianteModel = require('../models/estudianteModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe un estudiante con ese documento o correo.`,
            error: err.message
        });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: `El programa_id especificado no existe en la tabla programas.`,
            error: err.message
        });
    }
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
            success: false,
            message: `No se puede eliminar el estudiante: tiene practicas registradas.`,
            error: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: `Error interno al procesar la operacion en ${entityName}.`,
        error: err.message
    });
}

module.exports = {
    getEstudiantes: (req, res) => {
        estudianteModel.getEstudiantes((err, result) => {
            if (err) return handleDbError(res, err, 'Estudiantes');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getEstudianteById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        estudianteModel.getEstudianteById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Estudiantes');
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: 'Estudiante no encontrado.' });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postEstudiante: (req, res) => {
        const { documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado } = req.body;

        if (!documento || !nombres || !apellidos || !correo || !telefono || !semestre || !programa_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: documento, nombres, apellidos, correo, telefono, semestre, programa_id.'
            });
        }

        estudianteModel.postEstudiante(documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado, (err, result) => {
            if (err) return handleDbError(res, err, 'Estudiantes');
            res.status(201).json({
                success: true,
                message: 'Estudiante creado correctamente.',
                data: { idInsertado: result }
            });
        });
    },

    putEstudiante: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        const { documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado } = req.body;
        if (!documento || !nombres || !apellidos || !correo || !telefono || !semestre || !programa_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: documento, nombres, apellidos, correo, telefono, semestre, programa_id.'
            });
        }

        estudianteModel.putEstudiante(id, documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado || 'Activo', (err, result) => {
            if (err) return handleDbError(res, err, 'Estudiantes');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Estudiante no encontrado para actualizar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Estudiante actualizado correctamente.'
            });
        });
    },

    deleteEstudiante: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        estudianteModel.deleteEstudiante(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Estudiantes');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Estudiante no encontrado para eliminar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Estudiante eliminado correctamente.'
            });
        });
    }
};
