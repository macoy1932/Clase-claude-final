# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

- `npm run dev` — inicia el servidor de desarrollo de Vite (http://localhost:5173).
- `npm run build` — build de producción.
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — corre oxlint (config en `.oxlintrc.json`).
- `npm test` — corre las pruebas unitarias con Vitest + React Testing Library.

## Reglas del proyecto

- Todo lo que se agregue al proyecto debe hacerse usando OpenSpec.

## Arquitectura

Proyecto React scaffolded con Vite (plantilla `react`, JavaScript sin TypeScript).

- `src/main.jsx` — entry point, monta `<App />` en `#root` (definido en `index.html`).
- `src/App.jsx` — componente raíz.
- `src/assets/` — imágenes estáticas importadas por componentes.
- `public/` — archivos servidos tal cual (favicon, iconos).
- `vite.config.js` — configuración de Vite con el plugin `@vitejs/plugin-react`.

Aún no hay routing, gestión de estado global, ni llamadas a APIs; la app es el scaffold inicial de Vite.
