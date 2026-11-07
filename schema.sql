-- ============================================================================
-- PROYECTO: SISTEMA DE GESTION CLINICA Y TERAPÉUTICA - CENTRO DE FISIOTERAPIA "FISIOSALUD"
-- TALLER EVALUATIVO CORTE 3 - INGENIERÍA DE SOFTWARE / BASES DE DATOS
-- AUTOR: IVÁN CARRILLO
-- ============================================================================

-- Eliminar tablas si existen en orden inverso a las llaves foráneas para evitar conflictos
DROP TABLE IF EXISTS sesiones_terapia;
DROP TABLE IF EXISTS historias_clinicas;
DROP TABLE IF EXISTS servicios_terapia;
DROP TABLE IF EXISTS sedes;
DROP TABLE IF EXISTS fisioterapeutas;
DROP TABLE IF EXISTS pacientes;

-- También limpiar tablas del tema anterior si existieran en la base de datos
DROP TABLE IF EXISTS practicas;
DROP TABLE IF EXISTS convenios;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS tutores_academicos;
DROP TABLE IF EXISTS empresas;
DROP TABLE IF EXISTS programas;

-- ============================================================================
-- 1. TABLA: pacientes
-- ============================================================================
CREATE TABLE IF NOT EXISTS pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F', 'Otro') NOT NULL DEFAULT 'M',
    eps VARCHAR(60) NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. TABLA: fisioterapeutas
-- ============================================================================
CREATE TABLE IF NOT EXISTS fisioterapeutas (
    id_fisioterapeuta INT AUTO_INCREMENT PRIMARY KEY,
    tarjeta_profesional VARCHAR(30) NOT NULL UNIQUE,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    anios_experiencia INT NOT NULL DEFAULT 1,
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. TABLA: servicios_terapia
-- ============================================================================
CREATE TABLE IF NOT EXISTS servicios_terapia (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    codigo_servicio VARCHAR(20) NOT NULL UNIQUE,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    duracion_minutos INT NOT NULL DEFAULT 45,
    costo DECIMAL(10,2) NOT NULL,
    modalidad ENUM('Presencial', 'Domiciliaria', 'Gimnasio Terapéutico') NOT NULL DEFAULT 'Presencial',
    estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. TABLA: sedes
-- ============================================================================
CREATE TABLE IF NOT EXISTS sedes (
    id_sede INT AUTO_INCREMENT PRIMARY KEY,
    codigo_sede VARCHAR(20) NOT NULL UNIQUE,
    nombre_sede VARCHAR(100) NOT NULL,
    ciudad VARCHAR(60) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    capacidad_boxes INT NOT NULL DEFAULT 6,
    estado ENUM('Operativa', 'En Mantenimiento', 'Cerrada') NOT NULL DEFAULT 'Operativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. TABLA: historias_clinicas
-- ============================================================================
CREATE TABLE IF NOT EXISTS historias_clinicas (
    id_historia INT AUTO_INCREMENT PRIMARY KEY,
    numero_expediente VARCHAR(30) NOT NULL UNIQUE,
    id_paciente INT NOT NULL,
    fecha_apertura DATE NOT NULL,
    diagnostico_cie VARCHAR(80) NOT NULL,
    motivo_consulta TEXT NOT NULL,
    antecedentes_medicos TEXT NOT NULL,
    total_sesiones_prescritas INT NOT NULL DEFAULT 10,
    estado ENUM('En Tratamiento', 'De Alta', 'Suspendido') NOT NULL DEFAULT 'En Tratamiento',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historia_paciente FOREIGN KEY (id_paciente) 
        REFERENCES pacientes(id_paciente) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. TABLA CENTRAL: sesiones_terapia
-- (Relaciona a Paciente, Fisioterapeuta, Servicio, Sede e Historia Clínica)
-- ============================================================================
CREATE TABLE IF NOT EXISTS sesiones_terapia (
    id_sesion INT AUTO_INCREMENT PRIMARY KEY,
    codigo_sesion VARCHAR(30) NOT NULL UNIQUE,
    id_paciente INT NOT NULL,
    id_fisioterapeuta INT NOT NULL,
    id_servicio INT NOT NULL,
    id_sede INT NOT NULL,
    id_historia INT NOT NULL,
    fecha_sesion DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    numero_sesion INT NOT NULL DEFAULT 1,
    escala_dolor_eva INT NOT NULL DEFAULT 5,
    observaciones_evolucion TEXT,
    estado_sesion ENUM('Programada', 'Realizada', 'Cancelada', 'Reprogramada') NOT NULL DEFAULT 'Programada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sesion_paciente FOREIGN KEY (id_paciente) 
        REFERENCES pacientes(id_paciente) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_sesion_fisioterapeuta FOREIGN KEY (id_fisioterapeuta) 
        REFERENCES fisioterapeutas(id_fisioterapeuta) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_sesion_servicio FOREIGN KEY (id_servicio) 
        REFERENCES servicios_terapia(id_servicio) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_sesion_sede FOREIGN KEY (id_sede) 
        REFERENCES sedes(id_sede) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_sesion_historia FOREIGN KEY (id_historia) 
        REFERENCES historias_clinicas(id_historia) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INSERCIÓN DE DATOS: 10 REGISTROS REALES POR CADA TABLA (60 REGISTROS)
-- ============================================================================

-- 1. Pacientes (10 registros)
INSERT INTO pacientes (id_paciente, cedula, nombres, apellidos, telefono, email, fecha_nacimiento, genero, eps, estado) VALUES
(1, '1098765432', 'Carlos Andrés', 'Gómez Peña', '3104567890', 'carlos.gomez@gmail.com', '1992-04-15', 'M', 'Sura', 'Activo'),
(2, '1098765433', 'Laura Marcela', 'Rojas Pinzón', '3115678901', 'laura.rojas@hotmail.com', '1995-08-22', 'F', 'Sanitas', 'Activo'),
(3, '1098765434', 'Diego Fernando', 'Martínez Silva', '3126789012', 'diego.martinez@yahoo.com', '1988-11-30', 'M', 'Compensar', 'Activo'),
(4, '1098765435', 'Valentina', 'Morales Vargas', '3137890123', 'valentina.morales@outlook.com', '2001-02-14', 'F', 'Salud Total', 'Activo'),
(5, '1098765436', 'Juan Sebastián', 'Ortiz Castro', '3148901234', 'juan.ortiz@gmail.com', '1990-07-09', 'M', 'Nueva EPS', 'Activo'),
(6, '1098765437', 'Mariana Lucía', 'Pardo Jiménez', '3159012345', 'mariana.pardo@gmail.com', '1997-12-03', 'F', 'Famisanar', 'Activo'),
(7, '1098765438', 'Andrés Felipe', 'Beltrán Hoyos', '3160123456', 'andres.beltran@hotmail.com', '1985-06-18', 'M', 'Sura', 'Activo'),
(8, '1098765439', 'Camila Andrea', 'Duarte Serrano', '3171234567', 'camila.duarte@gmail.com', '1999-09-25', 'F', 'Sanitas', 'Activo'),
(9, '1098765440', 'Mateo Alejandro', 'Ríos Navas', '3182345678', 'mateo.rios@gmail.com', '1993-03-11', 'M', 'Compensar', 'Activo'),
(10, '1098765441', 'Sofía Elena', 'Quiroga Mendoza', '3193456789', 'sofia.quiroga@outlook.com', '1996-10-29', 'F', 'Salud Total', 'Activo');

-- 2. Fisioterapeutas (10 registros)
INSERT INTO fisioterapeutas (id_fisioterapeuta, tarjeta_profesional, nombres, apellidos, especialidad, telefono, email, anios_experiencia, estado) VALUES
(1, 'TP-1001', 'Claudia Patricia', 'Suárez Méndez', 'Fisioterapia Deportiva y Readaptación', '3001234501', 'claudia.suarez@fisiosalud.com', 8, 'Activo'),
(2, 'TP-1002', 'Javier Esteban', 'Caicedo Ruiz', 'Fisioterapia Neurológica y Neurorehabilitación', '3001234502', 'javier.caicedo@fisiosalud.com', 10, 'Activo'),
(3, 'TP-1003', 'Mónica Liliana', 'Torres Vega', 'Terapia Manual Ortopédica', '3001234503', 'monica.torres@fisiosalud.com', 6, 'Activo'),
(4, 'TP-1004', 'Felipe Eduardo', 'Lozano Prieto', 'Fisioterapia Traumatológica y Postquirúrgica', '3001234504', 'felipe.lozano@fisiosalud.com', 12, 'Activo'),
(5, 'TP-1005', 'Natalia Andrea', 'Guzmán Ríos', 'Fisioterapia Pediátrica y Estimulación Temprana', '3001234505', 'natalia.guzman@fisiosalud.com', 7, 'Activo'),
(6, 'TP-1006', 'Camilo José', 'Bernal Montoya', 'Kinesiología y Biomecánica Clínica', '3001234506', 'camilo.bernal@fisiosalud.com', 5, 'Activo'),
(7, 'TP-1007', 'Paola Marcela', 'Rincón Henao', 'Fisioterapia Respiratoria y Cardiopulmonar', '3001234507', 'paola.rincon@fisiosalud.com', 9, 'Activo'),
(8, 'TP-1008', 'Gabriel Ricardo', 'Meza Forero', 'Punción Seca y Dolor Miofascial', '3001234508', 'gabriel.meza@fisiosalud.com', 4, 'Activo'),
(9, 'TP-1009', 'Sandra Viviana', 'Arévalo Cruz', 'Reeducación Postural Global (RPG)', '3001234509', 'sandra.arevalo@fisiosalud.com', 11, 'Activo'),
(10, 'TP-1010', 'Jorge Alberto', 'Niño Galvis', 'Fisioterapia Geriátrica y Mantenimiento Funcional', '3001234510', 'jorge.nino@fisiosalud.com', 14, 'Activo');

-- 3. Servicios de Terapia (10 registros)
INSERT INTO servicios_terapia (id_servicio, codigo_servicio, nombre_servicio, descripcion, duracion_minutos, costo, modalidad, estado) VALUES
(1, 'SRV-DEP01', 'Rehabilitación Funcional Deportiva', 'Terapia enfocada en lesiones de deportistas, desgarros musculares, esguinces y tendinopatías.', 60, 85000.00, 'Gimnasio Terapéutico', 'Activo'),
(2, 'SRV-ORT02', 'Terapia Manual y Movilización Articular', 'Descompresión articular, manipulación fascial y técnicas artrocinemáticas avanzadas.', 45, 75000.00, 'Presencial', 'Activo'),
(3, 'SRV-ELE03', 'Electroterapia y Ultrasonido Terapéutico', 'Modulación del dolor agudo con TENS, corrientes interferenciales y ultrasonido profundo.', 40, 60000.00, 'Presencial', 'Activo'),
(4, 'SRV-RPG04', 'Reeducación Postural Global (RPG)', 'Corrección biomecánica de escoliosis, cifosis, hiperlordosis y alineación estructural.', 50, 90000.00, 'Presencial', 'Activo'),
(5, 'SRV-PUN05', 'Punción Seca y Terapia Miofascial', 'Técnica invasiva neuromuscular para desactivar puntos gatillo y relajar contracturas severas.', 35, 80000.00, 'Presencial', 'Activo'),
(6, 'SRV-NEU06', 'Neurorehabilitación Bobath y Kabat', 'Facilitación neuromuscular propioceptiva para secuelas de ACV, lesiones medulares o parálisis.', 60, 95000.00, 'Presencial', 'Activo'),
(7, 'SRV-RES07', 'Fisioterapia Respiratoria', 'Maniobras de higiene bronquial, espirometría incentiva y fortalecimiento diafragmático.', 45, 70000.00, 'Presencial', 'Activo'),
(8, 'SRV-POS08', 'Rehabilitación Postquirúrgica Articular', 'Protocolos tempranos y tardíos de movilidad post-artroscopia, plastias de ligamentos o prótesis.', 50, 85000.00, 'Presencial', 'Activo'),
(9, 'SRV-DOM09', 'Fisioterapia Geriátrica a Domicilio', 'Terapia de mantenimiento motor, prevención de caídas y autonomía funcional en el hogar.', 60, 110000.00, 'Domiciliaria', 'Activo'),
(10, 'SRV-HID10', 'Hidroterapia en Piscina Terapéutica', 'Ejercicios de bajo impacto con flotabilidad para artrosis, fibromialgia y descarga axial.', 45, 95000.00, 'Presencial', 'Activo');

-- 4. Sedes (10 registros)
INSERT INTO sedes (id_sede, codigo_sede, nombre_sede, ciudad, direccion, telefono, capacidad_boxes, estado) VALUES
(1, 'SED-BOG01', 'Sede Principal Chapinero', 'Bogotá', 'Calle 67 # 11-45', '(601) 745-8901', 12, 'Operativa'),
(2, 'SED-BOG02', 'Sede Norte Santa Bárbara', 'Bogotá', 'Carrera 15 # 119-24', '(601) 745-8902', 10, 'Operativa'),
(3, 'SED-BOG03', 'Sede Salitre Deportivo', 'Bogotá', 'Av. La Esperanza # 68B-31', '(601) 745-8903', 8, 'Operativa'),
(4, 'SED-MED01', 'Sede El Poblado', 'Medellín', 'Calle 10 # 43E-12', '(604) 448-1201', 10, 'Operativa'),
(5, 'SED-MED02', 'Sede Laureles', 'Medellín', 'Circular 73B # 39B-08', '(604) 448-1202', 8, 'Operativa'),
(6, 'SED-CAL01', 'Sede Granada', 'Cali', 'Av. 9 Norte # 14-28', '(602) 661-3401', 8, 'Operativa'),
(7, 'SED-CAL02', 'Sede Ciudad Jardín', 'Cali', 'Calle 18 # 105-40', '(602) 661-3402', 6, 'Operativa'),
(8, 'SED-BAQ01', 'Sede Alto Prado', 'Barranquilla', 'Carrera 54 # 76-110', '(605) 385-6701', 8, 'Operativa'),
(9, 'SED-BUC01', 'Sede Cabecera del Llano', 'Bucaramanga', 'Carrera 33 # 48-19', '(607) 647-8901', 8, 'Operativa'),
(10, 'SED-CTG01', 'Sede Bocagrande', 'Cartagena', 'Carrera 3 # 6-77', '(605) 665-2301', 6, 'Operativa');

-- 5. Historias Clínicas (10 registros)
INSERT INTO historias_clinicas (id_historia, numero_expediente, id_paciente, fecha_apertura, diagnostico_cie, motivo_consulta, antecedentes_medicos, total_sesiones_prescritas, estado) VALUES
(1, 'EXP-2026-001', 1, '2026-10-15', 'M54.5 Lumbago agudo con radiculopatía', 'Dolor lumbar incapacitante post levantamiento de carga pesada', 'Sedentarismo laboral, lumbalgia recurrente', 12, 'En Tratamiento'),
(2, 'EXP-2026-002', 2, '2026-10-18', 'M75.1 Síndrome de manguito rotador hombro izq', 'Limitación severa de abducción y rotación externa con dolor nocturno', 'Tendinitis supraespinoso previa', 10, 'En Tratamiento'),
(3, 'EXP-2026-003', 3, '2026-10-20', 'S83.5 Rotura de ligamento cruzado anterior der', 'Inestabilidad articular y atrofia muscular post quirúrgica', 'Plastia de LCA hace 4 semanas, meniscectomía parcial', 15, 'En Tratamiento'),
(4, 'EXP-2026-004', 4, '2026-10-22', 'M22.2 Síndrome de compresión femororrotuliana', 'Dolor anterior de rodillas al bajar pendientes o escaleras', 'Condromalacia rotuliana bilateral grado II', 10, 'En Tratamiento'),
(5, 'EXP-2026-005', 5, '2026-10-25', 'M50.1 Hernia discal cervical C6-C7', 'Cervicobraquialgia derecha con hormigueo en dedos índice y medio', 'Rectificación lordótica cervical por postura mantenida', 12, 'En Tratamiento'),
(6, 'EXP-2026-006', 6, '2026-10-28', 'M77.1 Epicondilitis lateral codo derecho', 'Dolor punzante en codo al agarrar objetos o usar teclado', 'Tenista aficionada, digitación continua', 8, 'En Tratamiento'),
(7, 'EXP-2026-007', 7, '2026-10-30', 'S93.4 Esguince grado II peroneoastragalino izq', 'Edema peri-maleolar e inseguridad en apoyo durante la marcha', 'Esguinces repetitivos en el mismo tobillo', 10, 'En Tratamiento'),
(8, 'EXP-2026-008', 8, '2026-11-01', 'M41.2 Escoliosis idiopática dorso-lumbar', 'Asimetría en hombros y dolor dorsal persistente al estar de pie', 'Sin antecedentes quirúrgicos', 14, 'En Tratamiento'),
(9, 'EXP-2026-009', 9, '2026-11-02', 'G51.0 Parálisis de Bell hemicara derecha', 'Pérdida de movilidad mímica, lagoftalmos y debilidad orbicular', 'Episodio post cuadro gripal viral', 15, 'En Tratamiento'),
(10, 'EXP-2026-010', 10, '2026-11-03', 'M72.2 Fascitis plantar con espolón calcáneo', 'Dolor agudo en talón derecho durante los primeros pasos matinales', 'Sobrepeso leve, pie plano flexible', 8, 'En Tratamiento');

-- 6. Sesiones de Terapia (10 registros en la tabla central)
INSERT INTO sesiones_terapia (id_sesion, codigo_sesion, id_paciente, id_fisioterapeuta, id_servicio, id_sede, id_historia, fecha_sesion, hora_inicio, hora_fin, numero_sesion, escala_dolor_eva, observaciones_evolucion, estado_sesion) VALUES
(1, 'SES-2026-001', 1, 3, 2, 1, 1, '2026-11-01', '08:00:00', '08:45:00', 1, 8, 'Terapia manual lumbar, termoterapia y estiramientos suaves de psoas. Paciente toleró adecuadamente.', 'Realizada'),
(2, 'SES-2026-002', 2, 4, 3, 2, 2, '2026-11-02', '09:00:00', '09:40:00', 2, 6, 'Aplicación de ultrasonido continuo en supraespinoso y ejercicios de Codman. Dolor disminuyó a 5.', 'Realizada'),
(3, 'SES-2026-003', 3, 1, 1, 3, 3, '2026-11-03', '10:00:00', '11:00:00', 4, 4, 'Fortalecimiento de cuádriceps en cadena cerrada, propiocepción en bosu y crioterapia final.', 'Realizada'),
(4, 'SES-2026-004', 4, 6, 8, 4, 4, '2026-11-04', '11:00:00', '11:50:00', 3, 5, 'Reeducación de tracking patelar con kinesiotaping y fortalecimiento de vasto medial oblicuo.', 'Realizada'),
(5, 'SES-2026-005', 5, 8, 5, 5, 5, '2026-11-05', '14:00:00', '14:35:00', 1, 7, 'Punción seca en puntos gatillo de trapecio superior y angular escápula. Relajación miofascial notable.', 'Realizada'),
(6, 'SES-2026-006', 6, 3, 2, 6, 6, '2026-11-06', '15:00:00', '15:45:00', 2, 5, 'Masaje transverso profundo Cyriax en tendón extensor común y movilización neurodinámica radial.', 'Realizada'),
(7, 'SES-2026-007', 7, 1, 1, 7, 7, '2026-11-07', '16:00:00', '17:00:00', 5, 3, 'Ejercicios de equilibrio unipodal en plato de Freeman y fortalecimiento de peroneos laterales.', 'Programada'),
(8, 'SES-2026-008', 8, 9, 4, 8, 8, '2026-11-08', '08:30:00', '09:20:00', 3, 4, 'Postura RPG en rana al suelo con brazos abiertos. Corrección de rotación interna de hombros.', 'Programada'),
(9, 'SES-2026-009', 9, 2, 6, 9, 9, '2026-11-09', '10:30:00', '11:30:00', 6, 2, 'Facilitación neuromuscular propioceptiva facial, estímulo frío/calor y ejercicios frente a espejo.', 'Programada'),
(10, 'SES-2026-010', 10, 8, 5, 10, 10, '2026-11-10', '16:30:00', '17:05:00', 4, 3, 'Liberación miofascial plantar instrumentalizada y punción seca en gastrocnemio medial.', 'Programada');
