# 01 - Astro Setup

Instalar y configurar Astro en tu entorno local

---

## 1. Requisitos Previos

1. **Node.js**  
   - Asegúrate de tener instalada la versión LTS (a partir de la 16 o superior) de [Node.js](https://nodejs.org/).  
   - Para comprobarlo, en tu terminal ejecuta:  
     ```bash
     node -v
     npm -v
     ```
   - Si no tienes la versión adecuada, dirígete a la página de descargas de Node.js y actualiza.

---

## 2. Instalar Astro

Astro es un framework de “static site generation” (SSG) que te permite crear sitios web altamente optimizados, aprovechando diferentes librerías y frameworks (como React) sin sobrecargar tu aplicación.

Para instalar y crear un proyecto de Astro, sigue estos pasos:

1. **Crear un proyecto usando `npm create astro@latest`**  
   En la terminal, navega hasta la carpeta donde quieras alojar tu proyecto y ejecuta:

   ```bash
   npm create astro@latest
   ```
   - Es posible que te pida confirmar la creación del proyecto con “Yes” o “No”.
   - También puedes utilizar `yarn create astro` o `pnpm create astro` si usas Yarn o PNPM.

2. **Seleccionar Plantilla**  
   - El asistente te preguntará si deseas iniciar con un _template_. Puedes elegir:
     - **Basic**: Proyecto sencillo con la estructura mínima.
     - **Blog**: Una plantilla enfocada a un blog, con estilos y páginas preconfiguradas.
     - **Portfolio**: Para un portafolio inicial.
     - Entre otras opciones.  
   - Para un tutorial desde cero, elige “**Basic**”.

3. **Instalar Dependencias**  
   - Una vez creado el proyecto, ubícate en el directorio generado. Por ejemplo, si nombraste tu proyecto `astro-react`, haz:
     ```bash
     cd astro-react
     ```
   - Ejecuta la instalación:
     ```bash
     npm install
     ```
     Esto descargará todas las dependencias iniciales de Astro y dejará listo el entorno.

---

## 3. Configurar Soporte para React

Si elegiste una plantilla “Basic” de Astro, ya tendrás la opción de usar componentes de React, pero es buena práctica asegurarte de que el paquete de integración está presente.

1. **Instalar la integración oficial de React**  
   Desde el directorio de tu proyecto, ejecuta:

   ```bash
   npm install @astrojs/react
   ```

2. **Agregar la integración en el archivo de configuración (`astro.config.mjs` o `astro.config.js`)**  
   Abre tu archivo de configuración y localiza la sección `integrations`. Agrega la integración de React de la siguiente manera:

   ```js
   import { defineConfig } from 'astro/config';
   import react from '@astrojs/react';

   export default defineConfig({
     integrations: [
       react()
       // Agrega otras integraciones si las necesitas, como sitemap(), etc.
     ],
   });
   ```

3. **Configurar el Modo ESM (si es necesario)**  
   - Normalmente, Astro usa ESM por defecto (módulos de ES).  
   - Asegúrate de que tu `package.json` tenga `"type": "module"` si usas archivos `.mjs` o `"type": "commonjs"` si estás usando archivos `.cjs`.  
   - Revisa la documentación oficial si tienes dudas sobre compatibilidades.

---

## 4. Ejecutar el Entorno de Desarrollo

1. **Iniciar Astro**  
   - En la terminal (ubicado en el directorio del proyecto):
     ```bash
     npm run dev
     ```
   - Si todo está correcto, verás un mensaje indicando que Astro está corriendo, por ejemplo:
     ```
     Local:   http://localhost:3000
     Network: use --host to expose
     ```

2. **Abrir en el Navegador**  
   - Ingresa a [http://localhost:3000](http://localhost:3000) (o el puerto que indique la terminal) para ver tu proyecto funcionando.
   - Deberías ver la página inicial de Astro.  

---

## 5. Estructura Básica de Archivos

Dependiendo de la plantilla que elegiste, verás algo así:

```
astro-react/
├─ public/
│   └─ favicon.svg
├─ src/
│   ├─ pages/
│   │   └─ index.astro
│   ├─ components/
│   │   └─ EjemploReact.jsx
│   └─ layouts/
│       └─ ...
├─ astro.config.mjs
├─ package.json
└─ tsconfig.json (si usaste TypeScript)
```

- **`public/`**: Archivos estáticos (imágenes, fuentes, íconos, etc.) que se copiarán tal cual en el _build_ final.
- **`src/pages/`**: Aquí van tus páginas. Por ejemplo, `index.astro` será tu página principal.
- **`src/components/`**: Componentes reutilizables, tanto en `.astro` como en `.jsx/.tsx` (si usas React/TypeScript).
- **`astro.config.mjs`**: Configuración principal de Astro y sus integraciones.

---
