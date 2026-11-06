const practicaModel = require('../models/practicaModel');

function handleDbError(res, err, entityName) {
    console.error(`Error en ${entityName}:`, err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: `Violacion de clave unica: Ya existe una practica con el codigo '${err.sqlMessage ? err.sqlMessage.match(/'([^']+)'/)?.[1] : ''}'.`,
            error: err.message
        });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: `Error de integridad referencial: Uno de los IDs relacionados (estudiante_id, empresa_id, programa_id, convenio_id o tutor_academico_id) no existe en la base de datos.`,
            error: err.message
        });
    }
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
            success: false,
            message: `No se puede eliminar la practica: tiene registros dependientes en otras tablas del sistema.`,
            error: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: `Error interno del servidor al procesar la solicitud en ${entityName}.`,
        error: err.message
    });
}

module.exports = {
    getPracticas: (req, res) => {
        practicaModel.getPracticas((err, result) => {
            if (err) return handleDbError(res, err, 'Practicas');
            res.status(200).json({
                success: true,
                total: result.length,
                data: result
            });
        });
    },

    getPracticaById: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID proporcionado debe ser un numero entero valido.'
            });
        }

        practicaModel.getPracticaById(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Practicas');
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Practica con ID ${id} no encontrada en el sistema.`
                });
            }
            res.status(200).json({
                success: true,
                data: result[0]
            });
        });
    },

    postPractica: (req, res) => {
        const {
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad,
            horas_totales,
            estado
        } = req.body;

        // Validacion de datos de entrada (Requisito 6 de Fase 2)
        if (!codigo_practica || !estudiante_id || !empresa_id || !programa_id || !convenio_id || !tutor_academico_id || !cargo_practicante || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios para registrar la practica: codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin.'
            });
        }

        practicaModel.postPractica(
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad,
            horas_totales,
            estado,
            (err, result) => {
                if (err) return handleDbError(res, err, 'Practicas');
                res.status(201).json({
                    success: true,
                    message: 'Practica profesional creada correctamente.',
                    data: {
                        idInsertado: result,
                        codigo_practica
                    }
                });
            }
        );
    },

    putPractica: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID proporcionado debe ser un numero entero valido.'
            });
        }

        const {
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad,
            horas_totales,
            estado
        } = req.body;

        if (!codigo_practica || !estudiante_id || !empresa_id || !programa_id || !convenio_id || !tutor_academico_id || !cargo_practicante || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios para actualizar la practica: codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin.'
            });
        }

        practicaModel.putPractica(
            id,
            codigo_practica,
            estudiante_id,
            empresa_id,
            programa_id,
            convenio_id,
            tutor_academico_id,
            cargo_practicante,
            fecha_inicio,
            fecha_fin,
            modalidad || 'Presencial',
            horas_totales || 320,
            estado || 'En curso',
            (err, result) => {
                if (err) return handleDbError(res, err, 'Practicas');
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: `Practica con ID ${id} no encontrada para actualizar.`
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Practica profesional actualizada correctamente.'
                });
            }
        );
    },

    deletePractica: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'El ID proporcionado debe ser un numero entero valido.'
            });
        }

        practicaModel.deletePractica(id, (err, result) => {
            if (err) return handleDbError(res, err, 'Practicas');
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Practica con ID ${id} no encontrada para eliminar.`
                });
            }
            res.status(200).json({
                success: true,
                message: 'Practica profesional eliminada correctamente.'
            });
        });
    }
};
