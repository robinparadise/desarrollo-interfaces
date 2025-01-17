# Blog con Astro y Tailwind CSS

En este tutorial aprenderás a combinar **Astro** con **Tailwind CSS** para crear un blog sencillo. Nos basaremos en la [guía oficial de Tailwind para Astro](https://docs.astro.build/en/guides/integrations-guide/tailwind/), añadiendo pasos para configurar un blog estático y aplicar estilos con Tailwind.

---

## 1. Crear un Nuevo Proyecto Astro

1. **Instala o actualiza Node.js**  
   Asegúrate de tener Node.js 16+ instalado. Puedes verificar con:
   ```bash
   node -v
   ```
2. **Crea el proyecto con `npm create astro@latest`**  
   En la carpeta donde quieras tu proyecto, ejecuta:
   ```bash
   npm create astro@latest
   ```
   - El asistente te pedirá nombre de proyecto y tipo de plantilla.  
   - Elige “**Basic**” para comenzar con lo mínimo.

3. **Instala dependencias**  
   Entra al directorio generado y ejecuta:
   ```bash
   cd mi-blog-astro
   npm install
   ```

4. **Verifica la instalación**  
   Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 2. Agregar la Integración de Tailwind

Astro ofrece una integración oficial para Tailwind que facilita la configuración. Sigue estos pasos basados en la [guía oficial](https://docs.astro.build/en/guides/integrations-guide/tailwind/):

1. **Instala el paquete de integración de Tailwind**  
   Desde el directorio del proyecto, ejecuta:
   ```bash
   npx astro add tailwind
   npm install @astrojs/tailwind tailwindcss
   ```
   Esto incluye tanto la integración (`@astrojs/tailwind`) como la dependencia `tailwindcss` en tu proyecto.

2. **Configura la integración en tu `astro.config.*`**  
   Abre o crea el archivo `astro.config.mjs` (o `.js`) y añade:

   ```js
   import { defineConfig } from 'astro/config';
   import tailwind from '@astrojs/tailwind';

   export default defineConfig({
     integrations: [
       tailwind({
         // Configuración opcional (ej. aplicar la transform de tailwind)
         // Example:
         // config: { applyBaseStyles: false },
       }),
     ],
   });
   ```

3. **Crear archivos de configuración de Tailwind**  
   En la terminal, genera el archivo tailwind.config.js (opcionalmente, si deseas personalizarlo):
   ```bash
   npx tailwindcss init # SOLO si no tienes creado el archivo
   ```
   Esto creará `tailwind.config.js` donde podrás especificar tus rutas, colores, plugins, etc.

4. **Asegúrate de que Astro procese el CSS**  
   Si la integración está activa, Astro inyecta automáticamente Tailwind en tu build. Por defecto, la guía de Astro te sugiere crear o editar un archivo `src/styles/global.css` donde se importen las directivas de Tailwind:

   ```css
   /* src/styles/global.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   Y luego, este archivo será inyectado por la integración sin que necesites importarlo manualmente en cada página.

5. **Inicia el servidor**  
   ```bash
   npm run dev
   ```
   Astro y Tailwind CSS ya están funcionando juntos. Para verificarlo, ve a tus archivos `.astro` y aplica clases de Tailwind (por ejemplo, `class="text-red-500"`).

---

## 3. Estructura del Blog

Crearemos un blog con:

- **Página de listado** de posts (`src/pages/blog/index.astro`).
- **Rutas dinámicas** para cada post (`src/pages/blog/[slug].astro`).

La idea es simular que tenemos varios posts, ya sea en un array o en un sistema de archivos.

### 3.1 Crear la Página de Listado

Crea `src/pages/blog/index.astro`:

```astro
---
const posts = [
  { slug: 'hola-astro', title: 'Hola Astro', date: '2023-07-15' },
  { slug: 'otro-post', title: 'Mi Otro Post', date: '2023-07-16' },
];
---

<html>
  <head>
    <title>Blog - Mi Astro + Tailwind</title>
  </head>
  <body class="bg-gray-100 text-gray-800">
    <main class="max-w-screen-md mx-auto p-4">
      <h1 class="text-3xl font-bold mb-8">Blog</h1>
      <ul class="space-y-4">
        {posts.map(({ slug, title, date }) => (
          <li class="bg-white shadow p-4 rounded">
            <h2 class="text-xl font-semibold">
              <a href={`/blog/${slug}`} class="text-blue-600 hover:text-blue-800">
                {title}
              </a>
            </h2>
            <p class="text-gray-600 text-sm">{date}</p>
          </li>
        ))}
      </ul>
    </main>
  </body>
</html>
```

- **Clases de Tailwind**:  
  - `bg-gray-100`, `text-gray-800`, `text-3xl`, etc.
  - Observa cómo añaden estilos sin escribir CSS manual.
- **Listamos** los posts (simulados en un array) y creamos enlaces a cada slug.

### 3.2 Crear Rutas Dinámicas

Para mostrar el contenido de cada post, crea `src/pages/blog/[slug].astro`:

```astro
---
const { slug } = Astro.params;

// Simulación de datos: en producción podrías fetch de un CMS o un archivo .md
const postData = {
  hola-astro: {
    title: 'Hola Astro',
    date: '2023-07-15',
    content: 'Este es mi primer post en Astro con Tailwind.',
  },
  'otro-post': {
    title: 'Mi Otro Post',
    date: '2023-07-16',
    content: 'Contenido genial de mi segundo post.',
  },
};

const post = postData[slug] ?? { title: 'No Encontrado', date: '', content: '' };
---

<html>
  <head>
    <title>{post.title}</title>
  </head>
  <body class="bg-gray-100 text-gray-800">
    <main class="max-w-screen-md mx-auto p-4">
      <article class="bg-white p-4 rounded shadow">
        <h1 class="text-3xl font-bold mb-2">{post.title}</h1>
        <p class="text-gray-600 mb-4">{post.date}</p>
        <div class="prose">
          {post.content}
        </div>
      </article>
      <div class="mt-8">
        <a href="/blog" class="text-blue-600 hover:text-blue-800">« Volver al Blog</a>
      </div>
    </main>
  </body>
</html>
```

- **`Astro.params.slug`** obtiene la parte de la URL que viene después de `/blog/`.
- **Clases de Tailwind** añaden padding, fondos, tipografías, etc.

---

## 4. Estilizar con Tailwind

En los ejemplos anteriores, ya se usan clases de Tailwind (`bg-gray-100`, `text-blue-600`, etc.). Para personalizar más, edita tu `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Ajusta rutas a tu proyecto Astro
    "./src/**/*.astro",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      // Puedes añadir colores, tipografías personalizadas, etc.
    },
  },
  plugins: [
    // Si quieres plugins como @tailwindcss/typography
  ],
};
```

Si deseas un mejor estilo para el contenido del post (texto, títulos, etc.), instala **@tailwindcss/typography**:

```bash
npm install @tailwindcss/typography
```

Agrega en `tailwind.config.js`:

```js
plugins: [
  require('@tailwindcss/typography'),
],
```

Ahora en tus archivos `.astro`, asigna la clase `prose` para generar un aspecto agradable:

```astro
<div class="prose">
  {post.content}
</div>
```

---

## 5. Ejecución y Build Final

1. **Ejecutar en modo dev**:
   ```bash
   npm run dev
   ```
   Visita [http://localhost:3000/blog](http://localhost:3000/blog) para ver la lista de posts y acceder a cada slug.

2. **Build para Producción**:
   ```bash
   npm run build
   npm run preview
   ```
   - Se generará la carpeta `dist/` con un sitio estático de alto rendimiento.
   - `preview` es solo para probar localmente; al desplegar a un hosting (Netlify, Vercel, etc.) sube la carpeta `dist/`.

---

## Conclusión

- **Astro** te ofrece la generación estática y rutas dinámicas, facilitando que tu sitio sea rápido y fácil de desplegar.  
- **Tailwind** te da un sistema de utilidades CSS que evita escribir CSS manual y te permite prototipar y dar estilo rápidamente.  
- **Sigue explorando**: Usa Content Collections, archivos Markdown, o integraciones con React/Vue para enriquecer más el blog.
