# Gobierno del proyecto

Este documento define una forma simple de trabajar en equipo usando GitHub. La prioridad es aprender, mantener el proyecto ordenado y reducir errores al integrar cambios.

## Nivel de madurez actual

El equipo esta en una etapa inicial:

- El objetivo principal es aprender Git, GitHub y trabajo colaborativo.
- Se priorizan cambios pequenos y faciles de revisar.
- No se requiere un proceso formal pesado.
- Las reglas deben ayudar a ordenar, no bloquear el avance.

## Principios de gobierno

- Simple primero: usar pocas reglas, pero cumplirlas.
- Cambios pequenos: una rama y un Pull Request deben resolver una sola tarea.
- Main estable: `main` debe poder instalarse, levantarse y compilar.
- Transparencia: toda decision importante debe quedar en una Issue, PR o documento.
- Aprendizaje: los errores se corrigen con explicacion, no con culpa.

## Roles

### Responsable del repositorio

Mantiene el orden general del repositorio.

Responsabilidades:

- Crear o revisar la estructura de carpetas.
- Aprobar cambios importantes antes de mezclarlos a `main`.
- Resolver dudas sobre ramas, commits e Issues.
- Cuidar que el proyecto siga pudiendo instalarse y ejecutarse.

### Facilitador/a GitHub

Ayuda al equipo a usar Git y GitHub sin bloquear el avance.

Responsabilidades:

- Ayudar a crear ramas, Issues y Pull Requests.
- Apoyar en conflictos de merge.
- Recordar el flujo simple cuando el equipo se desordene.
- Proponer mejoras al proceso si algo se repite mucho.

### Desarrollador/a

Implementa cambios concretos.

Responsabilidades:

- Crear una rama por tarea.
- Trabajar sobre una Issue.
- Hacer commits claros.
- Abrir Pull Request cuando el cambio este listo.
- Corregir observaciones de revision.

### Revisor/a

Revisa cambios antes de que entren a `main`.

Responsabilidades:

- Leer el Pull Request.
- Probar o revisar que el cambio tenga sentido.
- Pedir ajustes con comentarios claros y respetuosos.
- Aprobar si el cambio cumple el objetivo.

En equipos pequenos, una persona puede cumplir mas de un rol, pero quien hizo el cambio no deberia ser la unica persona que lo aprueba.

## Ramas

Usaremos un flujo simple:

- `main`: rama estable del proyecto.
- `feature/nombre-corto`: nuevas funcionalidades.
- `fix/nombre-corto`: correcciones de errores.
- `docs/nombre-corto`: documentacion.
- `chore/nombre-corto`: limpieza, configuracion o tareas internas.

Ejemplo:

```bash
git checkout main
git pull
git checkout -b feature/registro-usuarios
```

## Commits

Los commits deben ser pequenos y explicar que cambio se hizo.

Formato recomendado:

```text
tipo: descripcion breve
```

Tipos sugeridos:

- `feat`: nueva funcionalidad.
- `fix`: correccion de error.
- `docs`: cambios en documentacion.
- `style`: cambios visuales o formato.
- `refactor`: reorganizacion sin cambiar comportamiento.
- `chore`: configuracion o mantenimiento.

Ejemplos:

```text
feat: agregar formulario de carreras
fix: corregir validacion de cupos
docs: documentar flujo de trabajo con Git
refactor: mover rutas al backend
```

## Issues

Toda tarea debe partir como Issue. Una Issue debe tener:

- Que se quiere lograr.
- Por que es necesario.
- Criterios simples para saber si esta lista.

Tipos de Issues:

- Funcionalidad.
- Error.
- Documentacion.
- Mejora tecnica.

Tamano recomendado:

- Pequena: se puede terminar en una sesion corta.
- Mediana: requiere varios cambios, pero sigue siendo una sola responsabilidad.
- Grande: debe dividirse antes de iniciar.

## Pull Requests

Un Pull Request debe abrirse desde una rama hacia `main`.

Antes de pedir revision:

- El cambio debe estar relacionado con una Issue.
- El codigo debe estar ordenado.
- Se debe ejecutar al menos:

```bash
npm run lint
npm run build
```

Si alguno falla, el PR debe decirlo claramente.

## Reglas para mezclar cambios a main

Para mantener `main` estable:

- No trabajar directo en `main`, salvo cambios muy pequenos de documentacion.
- Todo cambio de codigo debe pasar por Pull Request.
- Un PR debe tener al menos una revision.
- No mezclar si `npm run lint` o `npm run build` fallan sin explicacion.
- No subir `.env`, `node_modules/` ni `dist/`.

## Reglas de proteccion sugeridas en GitHub

Cuando el equipo ya se sienta comodo con Pull Requests, configurar en GitHub:

- Proteger la rama `main`.
- Requerir Pull Request antes de mezclar.
- Requerir al menos 1 aprobacion.
- No permitir force push sobre `main`.

Al inicio se puede aplicar manualmente, pero estas reglas ayudan a evitar errores comunes.

## Proceso recomendado

1. Crear una Issue.
2. Asignar responsable.
3. Crear rama desde `main`.
4. Hacer cambios y commits.
5. Ejecutar verificaciones locales.
6. Subir la rama.
7. Abrir Pull Request.
8. Recibir revision.
9. Corregir si hace falta.
10. Mezclar a `main`.
11. Borrar la rama si ya no se necesita.

## Definicion de listo

Una tarea esta lista cuando:

- Cumple el objetivo de la Issue.
- El codigo se entiende.
- No rompe funcionalidades existentes conocidas.
- `npm run lint` pasa.
- `npm run build` pasa.
- El README o docs se actualizaron si el cambio afecta el uso del proyecto.

## Buenas practicas para principiantes

- Hacer `git pull` antes de crear una rama.
- Hacer commits frecuentes, pero con sentido.
- Preguntar antes de resolver conflictos si no se entiende el cambio.
- Revisar `git status` antes de hacer commit.
- Leer el diff antes de subir:

```bash
git diff
git status
```

## Comandos basicos

```bash
git status
git checkout main
git pull
git checkout -b feature/mi-cambio
git add .
git commit -m "feat: describir cambio"
git push -u origin feature/mi-cambio
```

## Reunion corta de seguimiento

Una vez por semana, revisar:

- Issues abiertas.
- PR pendientes.
- Bloqueos del equipo.
- Tareas demasiado grandes que conviene dividir.

Duracion sugerida: 15 a 20 minutos.
