# Sistema de Gestion de Practicas Profesionales - API REST

API REST construida con **Node.js**, **Express.js** y **MySQL**, desplegada en la plataforma cloud **Railway**, diseñada bajo la arquitectura en capas requerida por el docente (configuracion, modelos, controladores y rutas).

---

## 📌 Informacion del Proyecto
- **Autor:** Ivan Carrillo
- **Asignatura:** Taller Evaluativo 3er Corte (40%)
- **Base de Datos Cloud:** MySQL en Railway (`trolley.proxy.rlwy.net:19091`)
- **Despliegue de API:** Railway Cloud Platform
- **URL Publica de la API:** https://api-gestion-practicas-production-4cb7.up.railway.app *(generada en Railway)*

---

## 🗄️ Modelo de Base de Datos (MySQL)

El modelo cuenta con 6 tablas relacionadas, normalizadas en Tercera Forma Normal (3FN), con integridad referencial, claves primarias y restricciones UNIQUE:

1. **`programas`**: Programas academicos de educacion superior (codigo, nombre, facultad, nivel, duracion).
2. **`empresas`**: Organizaciones vinculadas donde se ejecutan las practicas (nit, razon social, sector, ciudad, contacto).
3. **`tutores_academicos`**: Docentes asignados para el seguimiento academico (documento, nombres, correo, programa).
4. **`estudiantes`**: Alumnos habilitados para realizar practica (documento, nombres, correo, semestre, programa).
5. **`convenios`**: Acuerdos marco entre programas academicos y empresas (numero, vigencia, cupos).
6. **`practicas`** *(Tabla Principal)*: Gestion centralizada de la practica asignada a un estudiante en una empresa con tutor y convenio.

Cada tabla contiene **10 registros de prueba reales y consistentes** (insertados mediante `schema.sql`).

---

## 📂 Estructura del Proyecto

Organizada estrictamente segun la estructura provista por el docente:

```text
c:\taller 3 corte\
├── .env.example               # Plantilla de variables de entorno
├── .gitignore                  # Exclusion de node_modules y credenciales
├── index.js                    # Punto de entrada de la aplicacion Express
├── package.json                # Definicion de dependencias y scripts
├── schema.sql                  # Script DDL/DML completo con datos de ejemplo
├── src/
│   ├── config/
│   │   ├── dbConfig.js         # Conexion y pool MySQL con mysql2 y dotenv
│   │   └── initDb.js           # Auto-inicializacion de tablas y datos
│   ├── controllers/
│   │   ├── programaController.js
│   │   ├── empresaController.js
│   │   ├── tutorController.js
│   │   ├── estudianteController.js
│   │   ├── convenioController.js
│   │   └── practicaController.js
│   ├── models/
│   │   ├── programaModel.js
│   │   ├── empresaModel.js
│   │   ├── tutorModel.js
│   │   ├── estudianteModel.js
│   │   ├── convenioModel.js
│   │   └── practicaModel.js
│   └── routes/
│       ├── programaRoutes.js
│       ├── empresaRoutes.js
│       ├── tutorRoutes.js
│       ├── estudianteRoutes.js
│       ├── convenioRoutes.js
│       └── practicaRoutes.js
```

---

## ⚙️ Variables de Entorno Requeridas

Crea un archivo `.env` en la raiz del proyecto basado en `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=gestion_practicas
```

> **Nota para Railway:** En produccion, Railway inyecta automaticamente las variables `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD` y `MYSQLDATABASE`. El archivo `dbConfig.js` esta configurado con fallback automatico para detectar ambas fuentes sin requerir cambios manuales.

---

## 🚀 Instalacion y Ejecucion Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/hmnoscarrillo/gestion-practicas-api.git
   cd gestion-practicas-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el entorno:**
   Copia `.env.example` a `.env` y ajusta los valores segun tu servidor MySQL local o la instancia remota de Railway.

4. **Inicializar la base de datos (opcional si la API auto-inicializa):**
   ```bash
   npm run init-db
   ```

5. **Iniciar el servidor:**
   ```bash
   npm start
   # o para modo desarrollo con recarga automatica:
   npm run dev
   ```

El servidor quedara escuchando en `http://localhost:3000`.

---

## 📡 Listado Completo de Endpoints de la API

La API responde tanto a la convencion del docente (`/get...`, `/post...`, `/put...`, `/delete...`) como a la convencion REST estandar (`/`, `/:id`).

### 1. Practicas Profesionales (Tabla Principal)
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/practicas/getPracticas` | Obtener todas las practicas (con JOINs completos) |
| `GET` | `/api/practicas/getPracticaById/:id` | Consultar practica por ID individual |
| `POST` | `/api/practicas/postPractica` | Registrar nueva practica profesional |
| `PUT` | `/api/practicas/putPractica/:id` | Actualizar datos de una practica existente |
| `DELETE` | `/api/practicas/deletePractica/:id` | Eliminar registro de una practica |

### 2. Programas Academicos
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/programas/getProgramas` | Listado de programas academicos |
| `GET` | `/api/programas/getProgramaById/:id` | Consultar programa por ID |
| `POST` | `/api/programas/postPrograma` | Registrar nuevo programa |
| `PUT` | `/api/programas/putPrograma/:id` | Actualizar programa existente |
| `DELETE` | `/api/programas/deletePrograma/:id` | Eliminar programa academico |

### 3. Empresas
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/empresas/getEmpresas` | Listado de empresas vinculadas |
| `GET` | `/api/empresas/getEmpresaById/:id` | Consultar empresa por ID |
| `POST` | `/api/empresas/postEmpresa` | Registrar nueva empresa |
| `PUT` | `/api/empresas/putEmpresa/:id` | Actualizar datos de empresa |
| `DELETE` | `/api/empresas/deleteEmpresa/:id` | Eliminar empresa |

### 4. Tutores Academicos
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/tutores/getTutores` | Listado de docentes tutores |
| `GET` | `/api/tutores/getTutorById/:id` | Consultar tutor por ID |
| `POST` | `/api/tutores/postTutor` | Registrar nuevo tutor |
| `PUT` | `/api/tutores/putTutor/:id` | Actualizar tutor existente |
| `DELETE` | `/api/tutores/deleteTutor/:id` | Eliminar tutor academico |

### 5. Estudiantes
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/estudiantes/getEstudiantes` | Listado de estudiantes |
| `GET` | `/api/estudiantes/getEstudianteById/:id` | Consultar estudiante por ID |
| `POST` | `/api/estudiantes/postEstudiante` | Registrar nuevo estudiante |
| `PUT` | `/api/estudiantes/putEstudiante/:id` | Actualizar estudiante |
| `DELETE` | `/api/estudiantes/deleteEstudiante/:id` | Eliminar estudiante |

### 6. Convenios
| Metodo | Endpoint | Descripcion |
|---|---|---|
| `GET` | `/api/convenios/getConvenios` | Listado de convenios vigentes |
| `GET` | `/api/convenios/getConvenioById/:id` | Consultar convenio por ID |
| `POST` | `/api/convenios/postConvenio` | Registrar nuevo convenio |
| `PUT` | `/api/convenios/putConvenio/:id` | Actualizar convenio |
| `DELETE` | `/api/convenios/deleteConvenio/:id` | Eliminar convenio |

---

## 🧪 Pruebas con Postman
Se adjunta en la raiz del proyecto la coleccion `Coleccion_Postman_Practicas.json` para importar en Postman o Insomnia con la suite de pruebas completa:
- CRUD completo sobre `practicas` (Create -> Read List -> Read Id -> Update -> Delete -> Verify 404).
- Pruebas de casos de error (ID inexistente 404, omision de campos 400, conflicto de clave unica 409).
