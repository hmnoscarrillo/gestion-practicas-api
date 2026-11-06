const convenioModel = require('../models/convenioModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe un convenio con ese numero de convenio.`,
            error: err.message
        });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: `La empresa_id o programa_id especificado no existe en la base de datos.`,
            error: err.message
        });
    }
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
            success: false,
            message: `No se puede eliminar el convenio: tiene practicas asociadas.`,
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
    getConvenios: (req, res) => {
        convenioModel.getConvenios((err, result) => {
            if (err) return handleDbError(res, err, 'Convenios');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getConvenioById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        convenioModel.getConvenioById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Convenios');
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: 'Convenio no encontrado.' });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postConvenio: (req, res) => {
        const { numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado } = req.body;

        if (!numero_convenio || !empresa_id || !programa_id || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin.'
            });
        }

        convenioModel.postConvenio(numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado, (err, result) => {
            if (err) return handleDbError(res, err, 'Convenios');
            res.status(201).json({
                success: true,
                message: 'Convenio creado correctamente.',
                data: { idInsertado: result }
            });
        });
    },

    putConvenio: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        const { numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado } = req.body;
        if (!numero_convenio || !empresa_id || !programa_id || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin.'
            });
        }

        convenioModel.putConvenio(id, numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles || 5, estado || 'Vigente', (err, result) => {
            if (err) return handleDbError(res, err, 'Convenios');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Convenio no encontrado para actualizar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Convenio actualizado correctamente.'
            });
        });
    },

    deleteConvenio: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        convenioModel.deleteConvenio(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Convenios');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Convenio no encontrado para eliminar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Convenio eliminado correctamente.'
            });
        });
    }
};
