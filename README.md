# Proyecto Gestion Academica

Aplicacion full stack para administrar informacion academica: usuarios, sedes, carreras, planes de estudio, asignaturas, periodos, matriculas, secciones, bloques horarios e inscripciones.

## Tecnologias

- React + Vite para el frontend.
- Express para la API REST.
- MongoDB + Mongoose para persistencia.

## Estructura

```text
Proyecto_GestionAcademica/
├── backend/
│   ├── models/       # Esquemas de Mongoose
│   ├── routes/       # Rutas de la API
│   └── server.js     # Entrada del servidor Express
├── public/           # Recursos estaticos
├── src/              # Frontend React
├── .env.example      # Variables de entorno requeridas
├── index.html        # Entrada HTML de Vite
├── package.json      # Scripts y dependencias
└── README.md
```

## Configuracion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

3. Ajustar `MONGO_URI` si se usa una instancia distinta de MongoDB.

## Comandos

```bash
npm run dev      # Levanta el frontend Vite
npm run server   # Levanta la API Express
npm run build    # Genera build de produccion del frontend
npm run lint     # Ejecuta ESLint
```

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
