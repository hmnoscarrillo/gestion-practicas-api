const tutorModel = require('../models/tutorModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe un tutor con ese documento o correo.`,
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
            message: `No se puede eliminar el tutor academico: tiene practicas asignadas.`,
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
    getTutores: (req, res) => {
        tutorModel.getTutores((err, result) => {
            if (err) return handleDbError(res, err, 'Tutores Academicos');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getTutorById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        tutorModel.getTutorById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Tutores Academicos');
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: 'Tutor academico no encontrado.' });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postTutor: (req, res) => {
        const { documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado } = req.body;

        if (!documento || !nombres || !apellidos || !correo || !telefono || !cargo || !programa_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: documento, nombres, apellidos, correo, telefono, cargo, programa_id.'
            });
        }

        tutorModel.postTutor(documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado, (err, result) => {
            if (err) return handleDbError(res, err, 'Tutores Academicos');
            res.status(201).json({
                success: true,
                message: 'Tutor academico creado correctamente.',
                data: { idInsertado: result }
            });
        });
    },

    putTutor: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        const { documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado } = req.body;
        if (!documento || !nombres || !apellidos || !correo || !telefono || !cargo || !programa_id) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: documento, nombres, apellidos, correo, telefono, cargo, programa_id.'
            });
        }

        tutorModel.putTutor(id, documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado || 'Activo', (err, result) => {
            if (err) return handleDbError(res, err, 'Tutores Academicos');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Tutor academico no encontrado para actualizar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Tutor academico actualizado correctamente.'
            });
        });
    },

    deleteTutor: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        tutorModel.deleteTutor(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Tutores Academicos');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Tutor academico no encontrado para eliminar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Tutor academico eliminado correctamente.'
            });
        });
    }
};
