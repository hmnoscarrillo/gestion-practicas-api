const programaModel = require('../models/programaModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe un registro con ese codigo o valor unico en ${entityName}.`,
            error: err.message
        });
    }
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
            success: false,
            message: `No se puede eliminar ${entityName}: tiene registros dependientes en otras tablas (restriccion de clave foranea).`,
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
    getProgramas: (req, res) => {
        programaModel.getProgramas((err, result) => {
            if (err) return handleDbError(res, err, 'Programas');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getProgramaById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        programaModel.getProgramaById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Programas');
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: 'Programa academico no encontrado.' });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postPrograma: (req, res) => {
        const { codigo, nombre, facultad, nivel, duracion_semestres, estado } = req.body;

        if (!codigo || !nombre || !facultad || !nivel || !duracion_semestres) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: codigo, nombre, facultad, nivel, duracion_semestres.'
            });
        }

        programaModel.postPrograma(codigo, nombre, facultad, nivel, duracion_semestres, estado, (err, result) => {
            if (err) return handleDbError(res, err, 'Programas');
            res.status(201).json({
                success: true,
                message: 'Programa academico creado correctamente.',
                data: { idInsertado: result }
            });
        });
    },

    putPrograma: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        const { codigo, nombre, facultad, nivel, duracion_semestres, estado } = req.body;
        if (!codigo || !nombre || !facultad || !nivel || !duracion_semestres) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: codigo, nombre, facultad, nivel, duracion_semestres.'
            });
        }

        programaModel.putPrograma(id, codigo, nombre, facultad, nivel, duracion_semestres, estado || 'Activo', (err, result) => {
            if (err) return handleDbError(res, err, 'Programas');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Programa academico no encontrado para actualizar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Programa academico actualizado correctamente.'
            });
        });
    },

    deletePrograma: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        programaModel.deletePrograma(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Programas');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Programa academico no encontrado para eliminar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Programa academico eliminado correctamente.'
            });
        });
    }
};
