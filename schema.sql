-- ============================================================
-- BASE DE DATOS: GESTION DE PRACTICAS PROFESIONALES
-- Taller Evaluativo 3er Corte - Base de datos MySQL en la Nube
-- ============================================================

-- Crear base de datos (si aplica en entorno local; en Railway se usa la asignada)
CREATE DATABASE IF NOT EXISTS gestion_practicas;
USE gestion_practicas;

-- Desactivar temporalmente verificacion de claves foraneas para creacion limpia
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS practicas;
DROP TABLE IF EXISTS convenios;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS tutores_academicos;
DROP TABLE IF EXISTS empresas;
DROP TABLE IF EXISTS programas;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- TABLA 1: PROGRAMAS ACADEMICOS
-- Finalidad: Registra las carreras y programas de educacion
-- superior a los que pertenecen los estudiantes y convenios.
-- ============================================================
CREATE TABLE programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(120) NOT NULL,
    facultad VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    duracion_semestres INT NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA 2: EMPRESAS
-- Finalidad: Almacena las organizaciones publicas o privadas
-- donde los estudiantes realizan sus practicas profesionales.
-- ============================================================
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(20) NOT NULL UNIQUE,
    razon_social VARCHAR(150) NOT NULL,
    sector_economico VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    estado ENUM('Activa', 'Inactiva') NOT NULL DEFAULT 'Activa',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA 3: TUTORES ACADEMICOS
-- Finalidad: Registra los docentes responsables del acompanamiento,
-- supervision y evaluacion academica de las practicas.
-- ============================================================
CREATE TABLE tutores_academicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    programa_id INT NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tutor_programa FOREIGN KEY (programa_id) 
        REFERENCES programas(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA 4: ESTUDIANTES
-- Finalidad: Registra a los alumnos que han cumplido con los creditos
-- necesarios para optar por su modalidad de practica profesional.
-- ============================================================
CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    semestre INT NOT NULL,
    programa_id INT NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Graduado') NOT NULL DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_estudiante_programa FOREIGN KEY (programa_id) 
        REFERENCES programas(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA 5: CONVENIOS
-- Finalidad: Modela los acuerdos institucionales formalizados
-- entre la institucion educativa (segun programa) y la empresa.
-- ============================================================
CREATE TABLE convenios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_convenio VARCHAR(30) NOT NULL UNIQUE,
    empresa_id INT NOT NULL,
    programa_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cupos_disponibles INT NOT NULL DEFAULT 5,
    estado ENUM('Vigente', 'Vencido', 'Cancelado') NOT NULL DEFAULT 'Vigente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_convenio_empresa FOREIGN KEY (empresa_id) 
        REFERENCES empresas(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_convenio_programa FOREIGN KEY (programa_id) 
        REFERENCES programas(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA 6: PRACTICAS (TABLA PRINCIPAL CON MAYOR NUMERO DE RELACIONES)
-- Finalidad: Integra y materializa la ejecucion de la practica
-- profesional asignando un estudiante a una empresa bajo un convenio,
-- con la supervision de un tutor academico y en su respectivo programa.
-- ============================================================
CREATE TABLE practicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_practica VARCHAR(30) NOT NULL UNIQUE,
    estudiante_id INT NOT NULL,
    empresa_id INT NOT NULL,
    programa_id INT NOT NULL,
    convenio_id INT NOT NULL,
    tutor_academico_id INT NOT NULL,
    cargo_practicante VARCHAR(120) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    modalidad ENUM('Presencial', 'Remoto', 'Hibrido') NOT NULL DEFAULT 'Presencial',
    horas_totales INT NOT NULL DEFAULT 320,
    estado ENUM('En curso', 'Finalizada', 'Cancelada', 'Pendiente') NOT NULL DEFAULT 'En curso',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_practica_estudiante FOREIGN KEY (estudiante_id) 
        REFERENCES estudiantes(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_practica_empresa FOREIGN KEY (empresa_id) 
        REFERENCES empresas(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_practica_programa FOREIGN KEY (programa_id) 
        REFERENCES programas(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_practica_convenio FOREIGN KEY (convenio_id) 
        REFERENCES convenios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_practica_tutor FOREIGN KEY (tutor_academico_id) 
        REFERENCES tutores_academicos(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- INSERCION DE DATOS DE EJEMPLO (MINIMO 10 REGISTROS POR TABLA)
-- ============================================================

-- 1. Insertar en PROGRAMAS (10 registros)
INSERT INTO programas (id, codigo, nombre, facultad, nivel, duracion_semestres, estado) VALUES
(1, 'PRG-SIS-01', 'Ingenieria de Sistemas', 'Facultad de Ingenieria', 'Pregrado', 10, 'Activo'),
(2, 'PRG-IND-02', 'Ingenieria Industrial', 'Facultad de Ingenieria', 'Pregrado', 10, 'Activo'),
(3, 'PRG-ADM-03', 'Administracion de Empresas', 'Facultad de Ciencias Economicas', 'Pregrado', 9, 'Activo'),
(4, 'PRG-CON-04', 'Contaduria Publica', 'Facultad de Ciencias Economicas', 'Pregrado', 9, 'Activo'),
(5, 'PRG-PSI-05', 'Psicologia Organizacional', 'Facultad de Ciencias Humanas', 'Pregrado', 10, 'Activo'),
(6, 'PRG-DER-06', 'Derecho', 'Facultad de Ciencias Juridicas', 'Pregrado', 10, 'Activo'),
(7, 'PRG-COM-07', 'Comunicacion Social y Periodismo', 'Facultad de Ciencias Humanas', 'Pregrado', 8, 'Activo'),
(8, 'PRG-DIS-08', 'Diseno Grafico Digital', 'Facultad de Artes y Comunicacion', 'Pregrado', 8, 'Activo'),
(9, 'PRG-TEC-09', 'Tecnologia en Desarrollo de Software', 'Facultad de Ingenieria', 'Tecnologia', 6, 'Activo'),
(10, 'PRG-MKT-10', 'Mercadeo y Publicidad', 'Facultad de Ciencias Economicas', 'Pregrado', 8, 'Activo');

-- 2. Insertar en EMPRESAS (10 registros)
INSERT INTO empresas (id, nit, razon_social, sector_economico, ciudad, direccion, telefono, correo, estado) VALUES
(1, '900123456-1', 'Bancolombia S.A.', 'Financiero y Bancario', 'Medellin', 'Carrera 48 # 26-85', '6044040000', 'talento@bancolombia.com.co', 'Activa'),
(2, '860001002-3', 'Ecopetrol S.A.', 'Energia y Petroleos', 'Bogota', 'Carrera 13 # 36-24', '6012345000', 'practicas@ecopetrol.com.co', 'Activa'),
(3, '890900608-9', 'Grupo Nutresa S.A.', 'Alimentos y Consumo', 'Medellin', 'Calle 8 Sur # 52-67', '6043655600', 'seleccion@gruponutresa.com', 'Activa'),
(4, '800153993-7', 'Claro Colombia S.A.S.', 'Telecomunicaciones', 'Bogota', 'Carrera 68A # 24B-10', '6017420000', 'rrhh@claro.com.co', 'Activa'),
(5, '901234567-2', 'Rappi Colombia S.A.S.', 'Tecnologia y Logistica', 'Bogota', 'Calle 93 # 13-45', '6013145678', 'talent@rappi.com', 'Activa'),
(6, '890101790-4', 'Cementos Argos S.A.', 'Construccion y Materiales', 'Barranquilla', 'Via 40 # 73-290', '6053614000', 'contacto@argos.com.co', 'Activa'),
(7, '900876543-5', 'Globant Colombia S.A.S.', 'Tecnologia y Software', 'Bogota', 'Carrera 11 # 86-53', '6017462000', 'recruiting-co@globant.com', 'Activa'),
(8, '860005224-8', 'Carvajal Tecnologia y Servicios S.A.S.', 'Servicios Empresariales', 'Cali', 'Calle 29 Norte # 6A-40', '6026678000', 'talento@carvajal.com', 'Activa'),
(9, '890903938-8', 'Almacenes Exito S.A.', 'Comercio al por Menor', 'Envigado', 'Carrera 48 # 32B Sur-139', '6046049696', 'rrhh@grupo-exito.com', 'Activa'),
(10, '900543210-9', 'Mercado Libre Colombia LTDA', 'Comercio Electronico', 'Bogota', 'Carrera 17 # 93-09', '6014238000', 'jobs-co@mercadolibre.com', 'Activa');

-- 3. Insertar en TUTORES ACADEMICOS (10 registros)
INSERT INTO tutores_academicos (id, documento, nombres, apellidos, correo, telefono, cargo, programa_id, estado) VALUES
(1, '71234567', 'Carlos Alberto', 'Gomez Perez', 'carlos.gomez@universidad.edu.co', '3104567890', 'Docente Titular Investigador', 1, 'Activo'),
(2, '43567890', 'Marta Lucia', 'Restrepo Ospina', 'marta.restrepo@universidad.edu.co', '3116543210', 'Coordinadora de Practicas', 2, 'Activo'),
(3, '98765432', 'Andres Felipe', 'Jaramillo Mejia', 'andres.jaramillo@universidad.edu.co', '3127894561', 'Docente Asociado', 3, 'Activo'),
(4, '32456789', 'Gloria Elena', 'Cardona Morales', 'gloria.cardona@universidad.edu.co', '3139871234', 'Docente de Planta', 4, 'Activo'),
(5, '10345678', 'Jorge Ivan', 'Cano Henao', 'jorge.cano@universidad.edu.co', '3141237890', 'Tutor Academico Senior', 5, 'Activo'),
(6, '70987654', 'Beatriz Eugenia', 'Munoz Zapata', 'beatriz.munoz@universidad.edu.co', '3152345678', 'Docente Titular', 6, 'Activo'),
(7, '80123456', 'Mauricio', 'Ochoa Londono', 'mauricio.ochoa@universidad.edu.co', '3163456789', 'Director de Departamento', 7, 'Activo'),
(8, '42876543', 'Sandra Milena', 'Alvarez Rios', 'sandra.alvarez@universidad.edu.co', '3174567890', 'Docente de Catedra', 8, 'Activo'),
(9, '15987654', 'Hernan Dario', 'Velez Castrillon', 'hernan.velez@universidad.edu.co', '3185678901', 'Tutor de Software', 9, 'Activo'),
(10, '10482910', 'Diana Marcela', 'Sanchez Duque', 'diana.sanchez@universidad.edu.co', '3196789012', 'Coordinadora de Proyectos', 10, 'Activo');

-- 4. Insertar en ESTUDIANTES (10 registros)
INSERT INTO estudiantes (id, documento, nombres, apellidos, correo, telefono, semestre, programa_id, estado) VALUES
(1, '1048270562', 'Mateo', 'Salazar Montoya', 'mateo.salazar@estudiante.edu.co', '3001234567', 9, 1, 'Activo'),
(2, '1042625625', 'Valentina', 'Herrera Torres', 'valentina.herrera@estudiante.edu.co', '3012345678', 8, 2, 'Activo'),
(3, '1129543582', 'Santiago', 'Valencia Ramirez', 'santiago.valencia@estudiante.edu.co', '3023456789', 9, 3, 'Activo'),
(4, '1037654321', 'Camila', 'Giraldo Ortiz', 'camila.giraldo@estudiante.edu.co', '3034567890', 8, 4, 'Activo'),
(5, '1017234567', 'Daniel', 'Marquez Castro', 'daniel.marquez@estudiante.edu.co', '3045678901', 9, 5, 'Activo'),
(6, '1020456789', 'Mariana', 'Londoño Bedoya', 'mariana.londono@estudiante.edu.co', '3056789012', 10, 6, 'Activo'),
(7, '1035678901', 'Alejandro', 'Bedoya Guzman', 'alejandro.bedoya@estudiante.edu.co', '3067890123', 8, 7, 'Activo'),
(8, '1040789012', 'Isabella', 'Quintero Yepes', 'isabella.quintero@estudiante.edu.co', '3078901234', 7, 8, 'Activo'),
(9, '1025890123', 'Sebastian', 'Perez Arboleda', 'sebastian.perez@estudiante.edu.co', '3089012345', 6, 9, 'Activo'),
(10, '1019901234', 'Sofia', 'Echeverri Marin', 'sofia.echeverri@estudiante.edu.co', '3090123456', 8, 10, 'Activo');

-- 5. Insertar en CONVENIOS (10 registros)
INSERT INTO convenios (id, numero_convenio, empresa_id, programa_id, fecha_inicio, fecha_fin, cupos_disponibles, estado) VALUES
(1, 'CONV-2026-001', 1, 1, '2026-01-15', '2027-01-15', 5, 'Vigente'),
(2, 'CONV-2026-002', 2, 2, '2026-02-01', '2027-02-01', 4, 'Vigente'),
(3, 'CONV-2026-003', 3, 3, '2026-01-20', '2027-01-20', 6, 'Vigente'),
(4, 'CONV-2026-004', 4, 4, '2026-03-01', '2027-03-01', 3, 'Vigente'),
(5, 'CONV-2026-005', 5, 5, '2026-02-15', '2027-02-15', 4, 'Vigente'),
(6, 'CONV-2026-006', 6, 6, '2026-01-10', '2027-01-10', 2, 'Vigente'),
(7, 'CONV-2026-007', 7, 1, '2026-02-10', '2027-02-10', 8, 'Vigente'),
(8, 'CONV-2026-008', 8, 8, '2026-03-15', '2027-03-15', 3, 'Vigente'),
(9, 'CONV-2026-009', 9, 9, '2026-01-25', '2027-01-25', 5, 'Vigente'),
(10, 'CONV-2026-010', 10, 10, '2026-02-20', '2027-02-20', 4, 'Vigente');

-- 6. Insertar en PRACTICAS (10 registros)
INSERT INTO practicas (id, codigo_practica, estudiante_id, empresa_id, programa_id, convenio_id, tutor_academico_id, cargo_practicante, fecha_inicio, fecha_fin, modalidad, horas_totales, estado) VALUES
(1, 'PRAC-2026-001', 1, 1, 1, 1, 1, 'Desarrollador Full Stack Junior', '2026-02-01', '2026-07-31', 'Hibrido', 320, 'En curso'),
(2, 'PRAC-2026-002', 2, 2, 2, 2, 2, 'Analista de Procesos y Operaciones', '2026-02-15', '2026-08-15', 'Presencial', 350, 'En curso'),
(3, 'PRAC-2026-003', 3, 3, 3, 3, 3, 'Asistente de Planeacion Financiera', '2026-02-01', '2026-07-31', 'Presencial', 320, 'En curso'),
(4, 'PRAC-2026-004', 4, 4, 4, 4, 4, 'Auxiliar de Auditoria y Costos', '2026-03-01', '2026-08-31', 'Hibrido', 320, 'En curso'),
(5, 'PRAC-2026-005', 5, 5, 5, 5, 5, 'Practicante de Talento Humano', '2026-02-15', '2026-08-15', 'Remoto', 320, 'En curso'),
(6, 'PRAC-2026-006', 6, 6, 6, 6, 6, 'Asistente Juridico Contractual', '2026-02-01', '2026-07-31', 'Presencial', 360, 'En curso'),
(7, 'PRAC-2026-007', 7, 7, 1, 7, 1, 'Desarrollador Cloud Backend', '2026-02-15', '2026-08-15', 'Remoto', 320, 'En curso'),
(8, 'PRAC-2026-008', 8, 8, 8, 8, 8, 'Disenador UI/UX y Multimedia', '2026-03-15', '2026-09-15', 'Hibrido', 300, 'En curso'),
(9, 'PRAC-2026-009', 9, 9, 9, 9, 9, 'Programador Web Frontend', '2026-02-01', '2026-07-31', 'Hibrido', 320, 'En curso'),
(10, 'PRAC-2026-010', 10, 10, 10, 10, 10, 'Analista de Mercadeo Digital', '2026-02-20', '2026-08-20', 'Presencial', 320, 'En curso');

-- ============================================================
-- CONSULTAS DE VALIDACION (REQUISITO DE LA FASE 1)
-- ============================================================
-- 1. Conteo de registros por tabla:
-- SELECT 'programas' AS tabla, COUNT(*) AS total FROM programas
-- UNION ALL
-- SELECT 'empresas', COUNT(*) FROM empresas
-- UNION ALL
-- SELECT 'tutores_academicos', COUNT(*) FROM tutores_academicos
-- UNION ALL
-- SELECT 'estudiantes', COUNT(*) FROM estudiantes
-- UNION ALL
-- SELECT 'convenios', COUNT(*) FROM convenios
-- UNION ALL
-- SELECT 'practicas', COUNT(*) FROM practicas;

-- 2. Consulta con JOIN: Listado completo de practicas con nombres reales
-- SELECT 
--     p.codigo_practica,
--     CONCAT(e.nombres, ' ', e.apellidos) AS estudiante,
--     em.razon_social AS empresa,
--     pr.nombre AS programa,
--     c.numero_convenio AS convenio,
--     CONCAT(t.nombres, ' ', t.apellidos) AS tutor,
--     p.cargo_practicante,
--     p.modalidad,
--     p.estado
-- FROM practicas p
-- INNER JOIN estudiantes e ON p.estudiante_id = e.id
-- INNER JOIN empresas em ON p.empresa_id = em.id
-- INNER JOIN programas pr ON p.programa_id = pr.id
-- INNER JOIN convenios c ON p.convenio_id = c.id
-- INNER JOIN tutores_academicos t ON p.tutor_academico_id = t.id;
