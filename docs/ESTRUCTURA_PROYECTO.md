# Estructura del proyecto

Esta guia explica donde vive cada parte del sistema y que reglas simples seguiremos para mantener el repositorio facil de entender.

## Objetivo

El proyecto debe ser simple de navegar para personas que estan aprendiendo Git, GitHub, React, Express y MongoDB. La prioridad es que cualquier integrante pueda ubicar archivos, hacer cambios pequenos y revisar Pull Requests sin perderse.

## Estructura actual

```text
Proyecto_GestionAcademica/
|-- backend/
|   |-- models/                 # Modelos de datos de Mongoose
|   |-- routes/                 # Endpoints de la API REST
|   `-- server.js               # Configuracion principal del servidor
|-- src/                        # Aplicacion React
|   |-- App.jsx                 # Componente principal actual
|   |-- App.css                 # Estilos del componente principal
|   |-- index.css               # Estilos globales
|   `-- main.jsx                # Entrada del frontend
|-- public/                     # Archivos estaticos publicos
|-- docs/                       # Documentacion del equipo
|-- .github/
|   |-- ISSUE_TEMPLATE/         # Plantillas de Issues
|   `-- PULL_REQUEST_TEMPLATE.md
|-- .env.example                # Ejemplo de variables de entorno
|-- .gitignore                  # Archivos que no se suben a Git
|-- package.json                # Scripts y dependencias
`-- README.md                   # Punto de entrada del proyecto
```

## Reglas de organizacion

- `backend/models`: solo esquemas y modelos de datos.
- `backend/routes`: solo rutas HTTP y validaciones cercanas a la ruta.
- `src`: todo lo visible del frontend.
- `public`: imagenes, iconos y archivos estaticos que se sirven directamente.
- `docs`: acuerdos del equipo, guias de uso y decisiones importantes.
- `.github`: plantillas y configuraciones propias de GitHub.

## Convenciones recomendadas

- Usar nombres claros y consistentes: `Usuario.js`, `Carrera.js`, `matriculas.js`.
- Mantener una responsabilidad principal por archivo.
- Evitar archivos muy grandes. Cuando `App.jsx` crezca, separar en componentes.
- Documentar en `README.md` solo lo necesario para instalar, ejecutar y entender el proyecto.
- Documentar procesos internos en `docs/`.

## Estructura futura sugerida

Cuando el proyecto crezca, se recomienda evolucionar hacia esta estructura:

```text
src/
|-- components/       # Componentes reutilizables
|-- pages/            # Pantallas principales
|-- services/         # Funciones para consumir la API
|-- styles/           # Estilos compartidos
`-- utils/            # Funciones auxiliares

backend/
|-- models/
|-- routes/
|-- controllers/      # Logica de cada recurso, si las rutas crecen
|-- middleware/       # Autenticacion, manejo de errores, etc.
`-- server.js
```

No hace falta crear todas estas carpetas ahora. Se deben crear solo cuando exista una necesidad real.

## Criterio para agregar carpetas

Antes de crear una carpeta nueva, responder:

- Hay al menos 2 o 3 archivos que pertenecen a esa categoria?
- El nombre ayuda a encontrar el codigo mas rapido?
- La carpeta evita que un archivo crezca demasiado?

Si la respuesta es no, mantener la estructura simple.
