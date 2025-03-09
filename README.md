# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
# Nodepop Redux

Este proyecto es una aplicación de anuncios desarrollada con **React** y **Redux**. Implementa gestión de estado global para manejar la autenticación, la carga de anuncios y sus operaciones CRUD, así como la gestión de etiquetas (tags).

## 📌 Características

- Gestión de sesión con Redux y almacenamiento en LocalStorage.
- Obtención, creación y eliminación de anuncios desde el API.
- Manejo de tags disponibles.
- Uso de Redux DevTools para debugging.
- Pruebas unitarias de acciones, reducers, selectores y componentes.


## 🏗️ Estructura del proyecto

```
📂 src
 ├── 📁 api            # Cliente API para llamadas al backend
 ├── 📁 components     # Componentes reutilizables
 ├── 📁 pages         # Páginas principales de la aplicación
 ├── 📁 store         # Redux: actions, reducers, selectors
 ├── 📁 tests         # Pruebas unitarias y de integración
 ├── 📄 main.tsx      # Punto de entrada de la app
 ├── 📄 App.tsx       # Estructura principal de la aplicación
```

## Funcionalidades implementadas

###  Gestión del estado con Redux

- Se almacena la información de la sesión del usuario.
- Se maneja la obtención, creación y eliminación de anuncios y tags.

###  Acciones y Reducers

- Se han implementado acciones síncronas y asíncronas para interactuar con la API y actualizar el estado.

###  Integración de Redux con la UI

- Uso de `useSelector` y `useDispatch` para conectar componentes con Redux.

###  Uso de Redux DevTools

- Se ha configurado **Redux DevTools** para facilitar la depuración del estado global.

## 📌 Tecnologías utilizadas

- React
- Redux
- Redux DevTools
- React Router
- TypeScript
- Jest + React Testing Library
- Tailwind CSS
- Vite

###  Testing (pendiente por realizar)

Se han implementado pruebas unitarias para:

- ✅ Acción síncrona
- ✅ Acción asíncrona
- ✅ Reducer
- ✅ Selector
- ✅ Snapshot testing de un componente
- ✅ Simulación de una acción del store dentro de un componente

## ✅ Pruebas

Ejecutar los tests con:

```sh
  npm test
```