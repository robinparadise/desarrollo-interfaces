# 03 - Pages 2

En este archivo profundizaremos en la creación de páginas más avanzadas, como un **blog** con rutas dinámicas. Veremos cómo Astro permite manejar slugs (identificadores de página) de forma sencilla, cómo aprovechar funcionalidades como `Astro.params`, el uso de archivos Markdown para manejar contenido y, muy importante, cómo usar **`getStaticPaths`** para generar múltiples rutas estáticas automáticamente. Además, veremos brevemente cómo organizar un pequeño blog y permitir que cada entrada tenga su propia ruta, incluyendo el uso de **rutas comodín** con `[...slug].astro`.

---

## 1. Rutas Dinámicas con Slugs

Una de las grandes ventajas de Astro es que puedes crear rutas dinámicas de forma declarativa. Para ello, se emplean archivos con el patrón `[slug].astro` dentro de `src/pages/`. Por ejemplo:

```
src/
  pages/
    blog/
      [slug].astro
      index.astro
```

- **`blog/[slug].astro`** definirá una ruta de la forma `/blog/lo-que-sea`.
- `slug` se convierte en un parámetro que podrás leer dentro del archivo `.astro` usando `Astro.params`.

### Ejemplo Básico de `[slug].astro`

```html
---
const { slug } = Astro.params;

// Podrías usar esta variable para buscar contenido, por ejemplo, de un CMS o de un archivo Markdown.
// const postData = await obtenerPostPorSlug(slug);

const postData = {
  titulo: `Título para el slug: ${slug}`,
  contenido: `Contenido simulado para el slug "${slug}".`,
};
---

<html>
  <head>
    <title>{postData.titulo}</title>
  </head>
  <body>
    <h1>{postData.titulo}</h1>
    <p>{postData.contenido}</p>
  </body>
</html>
```

**Explicación:**

- `Astro.params.slug` te devuelve la parte de la URL que aparece después de `/blog/`.
- En este ejemplo, simulamos que `obtenerPostPorSlug(slug)` retorna la información del post.  
- Puedes crear tantas rutas dinámicas como quieras, por ejemplo: `/blog/mi-post`, `/blog/otro-post`, etc.

---

### Rutas Comodín: `[...slug].astro`

Cuando quieras capturar **uno o varios segmentos** en la ruta, puedes usar un **archivo comodín** `[...slug].astro`. Por ejemplo:

```
src/
  pages/
    blog/
      [...slug].astro
```

- **`blog/[...slug].astro`** definirá rutas como:
  - `/blog/mi-post` → `Astro.params.slug = ["mi-post"]`
  - `/blog/2023/mayo/nuevo-post` → `Astro.params.slug = ["2023","mayo","nuevo-post"]`
- Esto te permite tener múltiples niveles de anidación sin crear varias subcarpetas.

**Ejemplo básico de `[...slug].astro`:**

```html
---
const { slug } = Astro.params; // slug será un array, ej. ["2023","mayo","mi-post"]

let titulo = "Página Dinámica con Slug";
let contenido = `Ruta capturada: ${slug.join("/")}`;

// Podrías parsear slug[0] como el año, slug[1] como el mes, etc.
---

<html>
  <head>
    <title>{titulo}</title>
  </head>
  <body>
    <h1>{titulo}</h1>
    <p>{contenido}</p>
  </body>
</html>
```

---

## 2. Organización de un Blog

Para un blog básico, puedes combinar **páginas estáticas** y **rutas dinámicas**:

1. **Página de Listado de Posts** (`blog/index.astro`):  
   Muestra enlaces a cada post dinámico. Este archivo se renderiza en `/blog/`.

2. **Páginas de Posts** (`blog/[slug].astro` o `blog/[...slug].astro`):  
   Contenido individual de cada post, basado en el slug.

### Ejemplo de `blog/index.astro`

```html
---
const posts = [
  { slug: 'post-1', titulo: 'Primer Post' },
  { slug: 'post-2', titulo: 'Segundo Post' },
];
---

<html>
  <body>
    <h1>Blog</h1>
    <ul>
      {posts.map(({ slug, titulo }) => (
        <li>
          <a href={`/blog/${slug}`}>{titulo}</a>
        </li>
      ))}
    </ul>
  </body>
</html>
```

**Explicación:**

- Declaramos un array de posts con `slug` y `titulo`.
- Generamos un `<ul>` que enlaza a cada post mediante `<a href={`/blog/${slug}`}>`.

---

## 3. Uso de `getStaticPaths` para Generar Múltiples Páginas

Cuando desees compilar múltiples rutas dinámicas a HTML estático sin crearlas manualmente, Astro ofrece el **`getStaticPaths`**. Esto permite definir qué slugs se van a generar durante la etapa de construcción (_build_).

### Ejemplo: Generar varios posts con `getStaticPaths`

Supongamos que queremos compilar estáticamente tres posts: `post-1`, `post-2` y `post-3`. Creamos `blog/[slug].astro` con la siguiente estructura:

```html
---
export async function getStaticPaths() {
  // Retorna un array con los slugs que queremos generar
  return [
    { params: { slug: 'post-1' } },
    { params: { slug: 'post-2' } },
    { params: { slug: 'post-3' } },
  ];
}

const { slug } = Astro.params;

// En un caso real, aquí podrías hacer un fetch de una API o leer un archivo Markdown:
const postData = {
  titulo: `Título para slug: ${slug}`,
  contenido: `Contenido para ${slug}`,
};
---

<html>
  <head>
    <title>{postData.titulo}</title>
  </head>
  <body>
    <h1>{postData.titulo}</h1>
    <p>{postData.contenido}</p>
  </body>
</html>
```

**¿Qué ocurre aquí?**

- **`getStaticPaths`**: Se ejecuta en la etapa de build y retorna un array de objetos. Cada objeto contiene un `params` con las variables (en este caso, `{ slug: 'post-1' }`, etc.).  
- Astro crea estáticamente las rutas `/blog/post-1`, `/blog/post-2` y `/blog/post-3`.
- Durante la compilación, cada `params.slug` se inyecta en `Astro.params.slug`, permitiendo que tu archivo `.astro` renderice el contenido apropiado.

### ¿Y si los slugs vienen de un archivo Markdown o un CMS?

```js
export async function getStaticPaths() {
  // Imagina que tenemos un array de posts [{ slug: 'post-1' }, { slug: 'post-2' }, ...]
  const posts = await fetchPostsFromCMS(); 
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}
```

- Aquí cada ruta se generará según la lista que obtengas de un CMS, de archivos `.md`, etc. Esto hace que el sitio se compile con todas las páginas necesarias.

---

## 4. Uso de Markdown y Astro para Contenido

Además de manejar datos simulados o un CMS, Astro te permite usar archivos Markdown (`.md`) y Markdown con frontmatter (`.mdx`). Cada archivo se puede **importar** y **renderizar** directamente en tu página Astro, haciendo muy fácil la creación de blogs basados en contenido estático.

**Ejemplo:**

```html
---
import PostMD from '../../content/posts/mi-post.md';
---

<html>
  <body>
    <PostMD />
  </body>
</html>
```

- Aquí, `mi-post.md` podría tener un frontmatter con título, fecha, etc.
- Astro lo convertirá a HTML en tiempo de compilación, generando una salida estática.

Para un flujo más avanzado, Astro provee un sistema de _collections_ (usando `content/config.*`).

---

## 5. Compilar y Ver la Salida

Como en el capítulo anterior, al ejecutar:

```bash
npm run build
```

Astro generará una carpeta `dist/` que incluirá:

- Una carpeta `blog/` con:
  - `index.html` (listado del blog).
  - `[slug]/index.html` para cada slug solicitado en `getStaticPaths`.
- Además de los recursos estáticos y otros archivos HTML.

Con `npm run preview`, podrás comprobar cómo se han creado estáticamente las páginas `/blog/post-1`, `/blog/post-2`, etc., sin requerir un servidor dinámico.

---

## 6. Ventajas de las Rutas Dinámicas en Astro

1. **Flexibilidad**: Permite manejar muchos posts o productos sin crear manualmente cada archivo `.astro`.
2. **Rendimiento Estático**: En modo SSG (Static Site Generation), Astro crea un HTML estático por cada ruta especificada, ofreciendo cargas rápidas y excelente SEO.
3. **SEO Mejorado**: Cada página dinámica se convierte en un archivo HTML con URL propia, en lugar de depender de un sistema SPA que cargue dinámicamente el contenido desde el navegador.
4. **Integración de Contenido**: Fácil de combinar con archivos Markdown, bases de datos o APIs externas sin necesidad de un backend complejo.
5. **Rutas Comodín**: Con `[...slug].astro`, puedes capturar múltiples segmentos en una sola página, ideal para URLs de estructura variable.
6. **Automatización con `getStaticPaths`**: Astro genera automáticamente las rutas que definas, simplificando el mantenimiento y escalado de tu sitio.

---

## 7. Conclusión

Has aprendido cómo:

- Crear rutas dinámicas con `[slug].astro` y `[...slug].astro`.
- Utilizar `getStaticPaths` para generar múltiples rutas de forma automática, lo cual es ideal para blogs o sitios con numerosos posts.
- Combinar contenido de un CMS, archivos Markdown o datos simulados para crear páginas en Astro.
- Compilar todo a un sitio estático y disfrutar de un rendimiento y SEO sobresalientes.

