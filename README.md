# Nodepop Redux - Práctica React Avanzado

Este proyecto forma parte de la práctica final del módulo **React Avanzado**, donde se implementa una app completa de anuncios (**Nodepop**) utilizando **React + Redux Toolkit**, **Thunk**, **TypeScript**, y más herramientas modernas del ecosistema React.

Repo original: [https://github.com/JohaDiaz/practica-react-avanzado](https://github.com/JohaDiaz/practica-react-avanzado)

## Objetivos cumplidos

1.  Configuración del store de Redux:

- Manejo de sesión del usuario.
- Gestión de anuncios (listado, detalle, creación, borrado).
- Gestión de tags.
- Lectura y persistencia del token desde LocalStorage.

2.  Acciones y reducers creados para manejar:

- Login / Logout.
- Carga de anuncios y tags.
- Creación y eliminación de anuncios.

3.  Componentes conectados al store usando `useAppDispatch` y `useAppSelector`.

4.  Configuración de **Redux DevTools**.

5.  Tests implementados:

- Acción síncrona: `authLoginPending`
- Acción asíncrona: `authLogin` (mock de API + dispatch)
- Reducer: `adverts` (creación y carga)
- Selector: `getAdvertDetail`
- Snapshot: `LoginPage`
- Componente que ejecuta una acción del store, mockeando la acción (`authLogin`)

## Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/JohaDiaz/practica-react-avanzado.git
cd practica-react-avanzado
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo .env en la raíz del proyecto con la siguiente variable:

VITE_API_URL=http://localhost:3000/api

### 4. Ejecuta la app en modo desarrollo

```bash
npm run dev
```

Accede a la app en: http://localhost:5173

### Ejecutar tests

```bash
npm run test
```

Los tests se encuentran en la carpeta **tests**, y se usa Vitest + Testing Library.

### Tecnologías usadas

- React 18+
- TypeScript
- Redux Toolkit + Redux Thunk
- React Router 6+
- Tailwind CSS
- Vitest + React Testing Library
- Vite
- Sonner (notificaciones)
- Lucide-react (iconos)
- ESLint + Prettier

### Estructura del proyecto

```bash
📦 src
 ┣ 📂 api               # Cliente HTTP y manejo de errores
 ┣ 📂 components        # UI y componentes compartidos
 ┣ 📂 pages
 ┃ ┣ 📂 auth            # Login
 ┃ ┣ 📂 adverts         # Listado, detalle, creación
 ┃ ┗ 📄 app.tsx
 ┣ 📂 store             # Redux: actions, reducers, selectors
 ┣ 📂 __tests__         # Pruebas unitarias
 ┣ 📄 main.tsx
 ┗ 📄 index.css

```

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
