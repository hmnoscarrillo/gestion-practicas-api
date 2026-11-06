-- ============================================================
-- BASE DE DATOS LOCAL DE WORDPRESS: wordpress_practicas
-- Taller Evaluativo 3er Corte - Entrega de Fase 4
-- ============================================================

CREATE DATABASE IF NOT EXISTS `wordpress_practicas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `wordpress_practicas`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `wp_commentmeta`;
DROP TABLE IF EXISTS `wp_comments`;
DROP TABLE IF EXISTS `wp_links`;
DROP TABLE IF EXISTS `wp_options`;
DROP TABLE IF EXISTS `wp_postmeta`;
DROP TABLE IF EXISTS `wp_posts`;
DROP TABLE IF EXISTS `wp_term_relationships`;
DROP TABLE IF EXISTS `wp_term_taxonomy`;
DROP TABLE IF EXISTS `wp_termmeta`;
DROP TABLE IF EXISTS `wp_terms`;
DROP TABLE IF EXISTS `wp_usermeta`;
DROP TABLE IF EXISTS `wp_users`;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Tabla de usuarios (Administrador: admin / Password: admin)
CREATE TABLE `wp_users` (
  `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_registered`, `display_name`) VALUES
(1, 'admin', '$P$B7Qo3zZ9d1W0qf4zYk8zK8sK4.o/10.', 'admin', 'admin@practicas.edu.co', NOW(), 'Administrador Practicas');

-- 2. Tabla de opciones basicas de WordPress
CREATE TABLE `wp_options` (
  `option_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wp_options` (`option_name`, `option_value`) VALUES
('siteurl', 'http://localhost/practicas'),
('home', 'http://localhost/practicas'),
('blogname', 'Portal de Gestion de Practicas Profesionales'),
('blogdescription', 'Plataforma Academica e Institucional de Practicas y Convenios'),
('users_can_register', '0'),
('admin_email', 'admin@practicas.edu.co'),
('active_plugins', 'a:1:{i:0;s:27:\"practicas-api/practicas-api.php\";}'),
('show_on_front', 'page'),
('page_on_front', '101');

-- 3. Tabla de posts (con las 4 paginas requeridas)
CREATE TABLE `wp_posts` (
  `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_date_gmt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'closed',
  `ping_status` varchar(20) NOT NULL DEFAULT 'closed',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_modified_gmt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'page',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- PAGINA 1: INICIO
INSERT INTO `wp_posts` (`ID`, `post_title`, `post_name`, `post_content`, `menu_order`, `guid`) VALUES
(101, 'Inicio', 'inicio', '<!-- wp:group {\"layout\":{\"type\":\"constrained\"}} -->
<div class=\"wp-block-group\">
  <div style=\"background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: white; padding: 45px 35px; border-radius: 14px; margin-bottom: 30px;\">
    <h1 style=\"color: white; margin-bottom: 12px; font-size: 32px;\">Sistema de Gestion de Practicas Profesionales</h1>
    <p style=\"font-size: 18px; line-height: 1.6; max-width: 800px; opacity: 0.95;\">
      Bienvenido al portal institucional de vinculacion laboral y academica. Nuestra plataforma integra una base de datos relacional MySQL desplegada en la nube con Railway, un backend de microservicios con Node.js y Express, y este portal de difusion e interoperabilidad en WordPress.
    </p>
  </div>

  <h2>Presentacion General del Proyecto</h2>
  <p>
    El proposito fundamental de esta iniciativa es optimizar y digitalizar el ciclo de vida completo de las practicas formativas universitarias, articulando en tiempo real las necesidades de los estudiantes, los requerimientos de las empresas aliadas y la supervision de los docentes tutores.
  </p>

  <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 25px 0;\">
    <div style=\"background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;\">
      <h3 style=\"color: #1e3a8a; margin-top: 0;\">1. Base de Datos Cloud</h3>
      <p style=\"font-size: 14px; color: #475569;\">Instancia MySQL 8 en Railway con 6 tablas normalizadas en 3FN, claves foraneas estrictas y 10 registros verificados por tabla.</p>
    </div>
    <div style=\"background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;\">
      <h3 style=\"color: #1e3a8a; margin-top: 0;\">2. API REST Node.js</h3>
      <p style=\"font-size: 14px; color: #475569;\">Arquitectura en capas (rutas, controladores, modelos, conexion) con soporte CRUD completo y endpoints estandarizados.</p>
    </div>
    <div style=\"background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;\">
      <h3 style=\"color: #1e3a8a; margin-top: 0;\">3. Portal WordPress</h3>
      <p style=\"font-size: 14px; color: #475569;\">Consumo de la API publica en vivo mediante plugin propio y visualizacion responsive en tarjetas y tablas estructuradas.</p>
    </div>
  </div>

  <h2>Video Explicativo del Proyecto</h2>
  <div style=\"background: #0f172a; border-radius: 12px; padding: 40px 20px; text-align: center; color: white; margin: 25px 0;\">
    <p style=\"font-size: 16px; margin-bottom: 8px;\"><strong>Espacio reservado para el video de sustentacion academica (Fase 5)</strong></p>
    <p style=\"color: #94a3b8; font-size: 14px;\">Demostracion paso a paso: Base de datos en la nube, pruebas CRUD en Postman, arquitectura Node.js y consumo en WordPress.</p>
  </div>
</div>
<!-- /wp:group -->', 1, 'http://localhost/practicas/?page_id=101');

-- PAGINA 2: CONTENIDOS - PROGRAMAS Y EMPRESAS
INSERT INTO `wp_posts` (`ID`, `post_title`, `post_name`, `post_content`, `menu_order`, `guid`) VALUES
(102, 'Programas y Empresas', 'programas-y-empresas', '<!-- wp:group {\"layout\":{\"type\":\"constrained\"}} -->
<div class=\"wp-block-group\">
  <h1>Programas Academicos y Red Empresarial</h1>
  <p>
    Nuestra institucion cuenta con una amplia oferta de programas de pregrado y tecnologia, respaldados por alianzas estrategicas con las corporaciones lideres de Colombia en sectores financieros, energeticos, tecnologicos y de manufactura.
  </p>

  <h2>Programas Habilitados para Practica Profesional</h2>
  <ul>
    <li><strong>Ingenieria de Sistemas:</strong> Enfoque en desarrollo cloud, inteligencia artificial, arquitectura de software y ciberseguridad.</li>
    <li><strong>Ingenieria Industrial:</strong> Optimizacion de cadenas de suministro, gestion de calidad y mejora continua de procesos.</li>
    <li><strong>Administracion de Empresas:</strong> Direccion estrategica, gestion del talento y planeacion financiera corporativa.</li>
    <li><strong>Contaduria Publica:</strong> Auditoria integral, normas NIIF y control fiscal tributario.</li>
    <li><strong>Psicologia Organizacional:</strong> Bienestar laboral, atraccion de talento y cultura institucional.</li>
    <li><strong>Derecho:</strong> Derecho contractual, laboral y regulatorio corporativo.</li>
    <li><strong>Comunicacion Social y Periodismo:</strong> Comunicacion estrategica y gestion de medios corporativos.</li>
    <li><strong>Diseno Grafico Digital:</strong> Experiencia de usuario (UI/UX) y creacion de contenido digital.</li>
    <li><strong>Tecnologia en Desarrollo de Software:</strong> Programacion frontend/backend y gestion de bases de datos.</li>
    <li><strong>Mercadeo y Publicidad:</strong> Estrategia digital, analitica de mercados y growth marketing.</li>
  </ul>

  <h2>Red de Empresas con Convenio Vigente</h2>
  <p>
    Entre las organizaciones activas en nuestro sistema que acogen a nuestros practicantes destacan:
  </p>
  <ul>
    <li><strong>Bancolombia S.A.:</strong> Sector bancario y transformacion digital financiera.</li>
    <li><strong>Ecopetrol S.A.:</strong> Energia, hidrocarburos y transicion energetica.</li>
    <li><strong>Grupo Nutresa S.A.:</strong> Produccion y distribucion masiva de alimentos.</li>
    <li><strong>Claro Colombia S.A.S.:</strong> Infraestructura de telecomunicaciones y redes moviles.</li>
    <li><strong>Rappi Colombia S.A.S.:</strong> Plataformas tecnologicas y logistica urbana.</li>
    <li><strong>Globant Colombia S.A.S.:</strong> Ingenieria de software de clase mundial.</li>
    <li><strong>Mercado Libre Colombia:</strong> E-commerce y pasarelas de pago digitales.</li>
  </ul>
</div>
<!-- /wp:group -->', 2, 'http://localhost/practicas/?page_id=102');

-- PAGINA 3: CONTENIDOS - REGLAMENTO Y PROCESO
INSERT INTO `wp_posts` (`ID`, `post_title`, `post_name`, `post_content`, `menu_order`, `guid`) VALUES
(103, 'Reglamento y Proceso', 'reglamento-y-proceso', '<!-- wp:group {\"layout\":{\"type\":\"constrained\"}} -->
<div class=\"wp-block-group\">
  <h1>Reglamento y Proceso de Practicas Profesionales</h1>
  <p>
    La practica profesional constituye una actividad academica de caracter obligatorio, disenada para consolidar las competencias disciplinares de los estudiantes en un entorno real de trabajo.
  </p>

  <h2>Fases del Proceso</h2>
  <ol>
    <li>
      <strong>Fase 1: Pre-inscripcion y Verificacion Academica</strong><br>
      El estudiante valida el cumplimiento de requisitos previos (haber aprobado minimo el 80% de los creditos de su plan de estudios) y registra su postulacion en el sistema.
    </li>
    <li>
      <strong>Fase 2: Asignacion y Legalizacion de Convenio</strong><br>
      Formalizacion del acuerdo entre la universidad y la empresa receptora. Registro del plan de trabajo y asignacion oficial del tutor academico.
    </li>
    <li>
      <strong>Fase 3: Ejecucion y Seguimiento Periodico</strong><br>
      Cumplimiento de 320 horas minimas bajo las modalidades Presencial, Hibrida o Remota. El tutor academico realiza visitas y consolida seguimientos bimensuales.
    </li>
    <li>
      <strong>Fase 4: Evaluacion y Cierre</strong><br>
      Consolidacion de la nota academica (40%), la calificacion emitida por la empresa (40%) y el informe final de sustentacion (20%).
    </li>
  </ol>

  <h2>Deberes del Practicante</h2>
  <ul>
    <li>Cumplir con el horario, reglamento interno y politicas de confidencialidad de la organizacion.</li>
    <li>Mantener comunicacion constante con su tutor institucional asignado.</li>
    <li>Entregar los informes y evidencias de avance en los plazos estipulados por la coordinacion de practicas.</li>
  </ul>
</div>
<!-- /wp:group -->', 3, 'http://localhost/practicas/?page_id=103');

-- PAGINA 4: CONSUMO DE API (REQUISITO FUNDAMENTAL)
INSERT INTO `wp_posts` (`ID`, `post_title`, `post_name`, `post_content`, `menu_order`, `guid`) VALUES
(104, 'Consumo de API', 'consumo-de-api', '<!-- wp:group {\"layout\":{\"type\":\"constrained\"}} -->
<div class=\"wp-block-group\">
  <h1>Consumo de API - Seguimiento en Vivo</h1>
  <p>
    Esta seccion consume en tiempo real los datos proporcionados por nuestra API REST construida con <strong>Node.js y Express</strong>, la cual se encuentra desplegada y operando sobre la infraestructura en la nube de <strong>Railway</strong> con base de datos <strong>MySQL</strong>.
  </p>
  <p style=\"font-size: 14px; color: #475569;\">
    <strong>Endpoint consultado:</strong> <code>GET https://api-gestion-practicas-production.up.railway.app/api/practicas/getPracticas</code>
  </p>

  <!-- SHORTCODE DEL PLUGIN PRACTICAS API CLIENT -->
  [practicas_api]

</div>
<!-- /wp:group -->', 4, 'http://localhost/practicas/?page_id=104');

-- 4. Menu de Navegacion enlazando las 4 paginas
INSERT INTO `wp_terms` (`term_id`, `name`, `slug`) VALUES
(1, 'Menu Principal', 'menu-principal');

INSERT INTO `wp_term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `count`) VALUES
(1, 1, 'nav_menu', 4);

-- Items de menu en wp_posts
INSERT INTO `wp_posts` (`ID`, `post_title`, `post_name`, `post_content`, `post_type`, `menu_order`, `guid`) VALUES
(201, 'Inicio', 'item-inicio', '', 'nav_menu_item', 1, 'http://localhost/practicas/?p=201'),
(202, 'Programas y Empresas', 'item-programas', '', 'nav_menu_item', 2, 'http://localhost/practicas/?p=202'),
(203, 'Reglamento y Proceso', 'item-reglamento', '', 'nav_menu_item', 3, 'http://localhost/practicas/?p=203'),
(204, 'Consumo de API', 'item-consumo-api', '', 'nav_menu_item', 4, 'http://localhost/practicas/?p=204');

-- Metadatos para relacionar items con las paginas correspondientes
CREATE TABLE IF NOT EXISTS `wp_postmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(201, '_menu_item_type', 'post_type'),
(201, '_menu_item_object', 'page'),
(201, '_menu_item_object_id', '101'),
(202, '_menu_item_type', 'post_type'),
(202, '_menu_item_object', 'page'),
(202, '_menu_item_object_id', '102'),
(203, '_menu_item_type', 'post_type'),
(203, '_menu_item_object', 'page'),
(203, '_menu_item_object_id', '103'),
(204, '_menu_item_type', 'post_type'),
(204, '_menu_item_object', 'page'),
(204, '_menu_item_object_id', '104');

CREATE TABLE IF NOT EXISTS `wp_term_relationships` (
  `object_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`object_id`,`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES
(201, 1, 1),
(202, 1, 2),
(203, 1, 3),
(204, 1, 4);
