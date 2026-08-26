# Proyecto Gestion Academica

Aplicacion full stack para administrar informacion academica: usuarios, sedes, carreras, planes de estudio, asignaturas, periodos, matriculas, secciones, bloques horarios e inscripciones.

## Tecnologias

- React + Vite para el frontend.
- Express para la API REST.
- MongoDB + Mongoose para persistencia.

## Estructura

```text
Proyecto_GestionAcademica/
|-- backend/
|   |-- models/       # Esquemas de Mongoose
|   |-- routes/       # Rutas de la API
|   `-- server.js     # Entrada del servidor Express
|-- frontend/
|   |-- public/       # Recursos estaticos
|   `-- src/          # Frontend React
|-- docs/             # Guias de trabajo del equipo
|-- .github/          # Plantillas para Issues y Pull Requests
|-- .env.example      # Variables de entorno requeridas
|-- index.html        # Entrada HTML de Vite
|-- package.json      # Scripts y dependencias
`-- README.md
```

## Configuracion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo `.env` a partir de `.env.example`:

```bash
# Linux/macOS
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

3. Ajustar `MONGO_URI` si se usa una instancia distinta de MongoDB.

## Comandos

```bash
npm run dev      # Levanta el frontend Vite
npm run server   # Levanta la API Express
npm run build    # Genera build de produccion del frontend
npm run lint     # Ejecuta ESLint
```

Para ejecutar el backend y el frontend al mismo tiempo, abre dos terminales.
El backend requiere una instancia de MongoDB disponible en `MONGO_URI`.

## Trabajo en equipo

El proyecto usa un flujo Git simple, pensado para aprendizaje:

- `main` se mantiene como rama estable.
- Cada tarea se trabaja en una rama propia.
- Las tareas se registran como Issues.
- Los cambios se integran mediante Pull Request.

Guias del equipo:

- [Estructura del proyecto](docs/ESTRUCTURA_PROYECTO.md)
- [Gobierno del proyecto](docs/GOBIERNO_PROYECTO.md)
- [Flujo Git simple](docs/FLUJO_GIT_SIMPLE.md)

## API principal

La API se monta en `http://localhost:3000/api`.

- `/api/usuarios`
- `/api/sedes`
- `/api/carreras`
- `/api/planes-estudio`
- `/api/asignaturas`
- `/api/periodos-academicos`
- `/api/matriculas`
- `/api/secciones`
- `/api/bloques-horarios`
- `/api/inscripciones`
- `/api/historial-academico`
- `/api/estudiantes`
- `/api/docentes`

## Pendientes antes de produccion

- Hashear contrasenas y no exponerlas en respuestas de usuario.
- Agregar autenticacion y autorizacion por rol.
- Separar `App.jsx` en componentes mas pequenos.
- Reemplazar URLs fijas del frontend por una variable de entorno.
- Agregar pruebas para validaciones criticas de inscripciones y horarios.
