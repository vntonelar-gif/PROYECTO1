# Flujo Git simple

Esta guia resume el camino recomendado para trabajar sin perderse.

## Regla principal

No trabajar codigo directamente en `main`. Primero crear una rama, hacer cambios ahi y luego abrir un Pull Request.

## 1. Actualizar main

```bash
git checkout main
git pull
```

## 2. Crear una rama

```bash
git checkout -b feature/nombre-corto
```

Usa nombres cortos y claros:

- `feature/login`
- `fix/error-matricula`
- `docs/guia-instalacion`

## 3. Trabajar y revisar cambios

```bash
git status
git diff
```

Antes de cambiar de tarea, revisar que no queden archivos modificados sin entender.

## 4. Guardar cambios en un commit

```bash
git add .
git commit -m "feat: agregar login"
```

## 5. Subir la rama

```bash
git push -u origin feature/nombre-corto
```

## 6. Crear Pull Request

En GitHub:

1. Entrar al repositorio.
2. Abrir la pestana Pull requests.
3. Crear PR desde la rama hacia `main`.
4. Completar la plantilla.
5. Pedir revision.

El PR debe ser corto. Si toca muchas cosas distintas, dividirlo en mas de una tarea.

## 7. Despues de aprobar

Una vez mezclado el PR:

```bash
git checkout main
git pull
```

Si ya no necesitas la rama local:

```bash
git branch -d feature/nombre-corto
```

## Si aparece un conflicto

No adivinar. El conflicto significa que dos personas cambiaron una misma zona del codigo.

Proceso recomendado:

1. Avisar al equipo.
2. Revisar que archivo tiene conflicto.
3. Comparar ambas versiones.
4. Conservar lo correcto de cada una.
5. Ejecutar `npm run lint` y `npm run build`.
6. Hacer commit de la resolucion.

## Comandos utiles

```bash
git status              # Ver archivos modificados
git diff                # Ver cambios antes de guardar
git branch              # Ver ramas locales
git branch -a           # Ver ramas locales y remotas
git log --oneline       # Ver historial resumido
```
