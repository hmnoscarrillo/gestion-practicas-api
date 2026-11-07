# Sistema de Gestión Clínica y Terapéutica "FisioSalud" - API REST

API REST construida con **Node.js**, **Express.js** y **MySQL Relacional**, desplegada en la plataforma cloud **Railway**, estructurada bajo la arquitectura MVC del docente (`config`, `models`, `controllers`, `routes`).

---

## 📌 Información del Proyecto
- **Temática Asignada:** Centro de Fisioterapia y Rehabilitación Integral ("FisioSalud")
- **Autor:** Iván Carrillo
- **Asignatura:** Taller Evaluativo 3er Corte (40%)
- **Base de Datos Cloud:** MySQL en Railway (`trolley.proxy.rlwy.net:19091`)
- **Despliegue de API:** Railway Cloud Platform
- **URL Pública de la API:** https://api-gestion-practicas-production.up.railway.app
- **Portal Web Interactivo:** https://api-gestion-practicas-production.up.railway.app/web/

---

## 🗄️ Modelo de Base de Datos (MySQL - 3FN)

El modelo cuenta con **6 tablas relacionadas**, normalizadas en **Tercera Forma Normal (3FN)**, con integridad referencial (`ON UPDATE CASCADE ON DELETE RESTRICT`), claves primarias y restricciones `UNIQUE`:

1. **`pacientes`**: Pacientes atendidos (cédula, nombres, apellidos, teléfono, email, EPS, fecha de nacimiento, estado).
2. **`fisioterapeutas`**: Especialistas en salud física y rehabilitación (tarjeta profesional, nombres, especialidad, experiencia, teléfono, correo).
3. **`servicios_terapia`**: Catálogo de tratamientos (código, nombre, descripción, duración en minutos, costo en COP, modalidad).
4. **`sedes`**: Sedes clínicas a nivel nacional (código, nombre, ciudad, dirección, teléfono, capacidad de boxes).
5. **`historias_clinicas`**: Expedientes clínicos vinculados a los pacientes (número de expediente, diagnóstico CIE-10, motivo, antecedentes, sesiones prescritas).
6. **`sesiones_terapia`** *(Tabla Central)*: Gestión de citas y sesiones clínicas individuales. Relaciona directamente a **Paciente**, **Fisioterapeuta**, **Servicio**, **Sede** e **Historia Clínica**.

Cada tabla contiene exactamente **10 registros de prueba clínicos reales y consistentes** (60 registros en total).

---

## 📂 Estructura Arquitectónica del Proyecto

```text
c:\taller 3 corte\
├── index.js                    # Punto de entrada de la aplicación Express
├── package.json                # Dependencias (express, mysql2, dotenv, cors)
├── schema.sql                  # DDL/DML con 6 tablas y 10 registros por tabla
├── Coleccion_Postman_Fisioterapia.json # Colección de pruebas automatizadas
├── public/
│   └── index.html              # Portal Web interactivo en tiempo real
└── src/
    ├── config/
    │   ├── dbConfig.js         # Pool de conexiones MySQL con fallback a Railway
    │   └── initDb.js           # Auto-inicialización de base de datos
    ├── models/
    │   ├── pacienteModel.js
    │   ├── fisioterapeutaModel.js
    │   ├── servicioModel.js
    │   ├── sedeModel.js
    │   ├── historiaModel.js
    │   └── sesionModel.js
    ├── controllers/
    │   ├── pacienteController.js
    │   ├── fisioterapeutaController.js
    │   ├── servicioController.js
    │   ├── sedeController.js
    │   ├── historiaController.js
    │   └── sesionController.js
    └── routes/
        ├── pacienteRoutes.js
        ├── fisioterapeutaRoutes.js
        ├── servicioRoutes.js
        ├── sedeRoutes.js
        ├── historiaRoutes.js
        └── sesionRoutes.js
```

---

## 🚀 Endpoints Principales del CRUD

| Módulo | Método | Endpoint | Descripción |
|---|:---:|---|---|
| **Sesiones (Central)** | GET | `/api/sesiones/getSesiones` | Listado completo con JOINs de todas las entidades |
| **Sesiones (Central)** | GET | `/api/sesiones/getSesionById/:id` | Detalle de una sesión específica por ID |
| **Sesiones (Central)** | POST | `/api/sesiones/createSesion` | Crear nueva sesión clínica |
| **Sesiones (Central)** | PUT | `/api/sesiones/updateSesion/:id` | Actualizar sesión (evolución, dolor EVA, estado) |
| **Sesiones (Central)** | DELETE | `/api/sesiones/deleteSesion/:id` | Eliminar registro de sesión |
| **Pacientes** | GET / POST / PUT / DELETE | `/api/pacientes/*` | CRUD completo de Pacientes |
| **Fisioterapeutas** | GET / POST / PUT / DELETE | `/api/fisioterapeutas/*` | CRUD completo de Especialistas |
| **Servicios** | GET / POST / PUT / DELETE | `/api/servicios/*` | CRUD completo de Tratamientos |
| **Sedes** | GET / POST / PUT / DELETE | `/api/sedes/*` | CRUD completo de Sedes |
| **Historias** | GET / POST / PUT / DELETE | `/api/historias/*` | CRUD completo de Expedientes |
