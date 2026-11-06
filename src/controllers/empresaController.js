const empresaModel = require('../models/empresaModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe una empresa con ese NIT o correo registrado.`,
            error: err.message
        });
    }
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
            success: false,
            message: `No se puede eliminar la empresa: tiene convenios o practicas asociadas.`,
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
    getEmpresas: (req, res) => {
        empresaModel.getEmpresas((err, result) => {
            if (err) return handleDbError(res, err, 'Empresas');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getEmpresaById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        empresaModel.getEmpresaById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Empresas');
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: 'Empresa no encontrada.' });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postEmpresa: (req, res) => {
        const { nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado } = req.body;

        if (!nit || !razon_social || !sector_economico || !ciudad || !direccion || !telefono || !correo) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nit, razon_social, sector_economico, ciudad, direccion, telefono, correo.'
            });
        }

        empresaModel.postEmpresa(nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado, (err, result) => {
            if (err) return handleDbError(res, err, 'Empresas');
            res.status(201).json({
                success: true,
                message: 'Empresa creada correctamente.',
                data: { idInsertado: result }
            });
        });
    },

    putEmpresa: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        const { nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado } = req.body;
        if (!nit || !razon_social || !sector_economico || !ciudad || !direccion || !telefono || !correo) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nit, razon_social, sector_economico, ciudad, direccion, telefono, correo.'
            });
        }

        empresaModel.putEmpresa(id, nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado || 'Activa', (err, result) => {
            if (err) return handleDbError(res, err, 'Empresas');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Empresa no encontrada para actualizar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Empresa actualizada correctamente.'
            });
        });
    },

    deleteEmpresa: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un numero entero valido.' });
        }

        empresaModel.deleteEmpresa(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Empresas');
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Empresa no encontrada para eliminar.' });
            }
            res.status(200).json({
                success: true,
                message: 'Empresa eliminada correctamente.'
            });
        });
    }
};
