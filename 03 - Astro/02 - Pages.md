# 02 - Pages

En este segundo capítulo, profundizaremos en el sistema de **páginas** y **componentes** de Astro, centrándonos en los archivos `.astro` y cómo se genera contenido estático. Al finalizar, veremos cómo compilar el proyecto, obtener su salida estática y las ventajas de este enfoque.

---

## 1. Estructura de Páginas en Astro

Astro utiliza un sistema de **routes** basado en archivos, lo que significa que cada archivo `.astro` dentro de `src/pages/` se convierte automáticamente en una ruta. Por ejemplo:

```
src/
  pages/
    index.astro        -> Ruta: /
    about.astro        -> Ruta: /about
    blog/
      index.astro      -> Ruta: /blog
      post1.astro      -> Ruta: /blog/post1
```

- **`index.astro`** en la raíz de `pages` corresponde a la página principal (`/`).
- Cualquier archivo `.astro` dentro de una subcarpeta (por ejemplo, `blog/post1.astro`) se corresponde con esa ruta anidada (`/blog/post1`).

### Ejemplo básico: `index.astro`

```astro
---
const title = "Bienvenido a Astro";
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>Esta es la página de inicio generada con Astro.</p>
  </body>
</html>
```

1. **Sección Frontmatter (`---`)**: Aquí puedes incluir lógica en JavaScript o TypeScript, como variables (`title`) o datos traídos de un fetch.
2. **HTML + sintaxis de interpolación** (`{title}`): Astro te permite usar expresiones de JavaScript dentro de llaves.
3. **Salida en HTML**: Tras la compilación, este archivo generará una página estática con todo el HTML resultante.

---

## 2. Componentes de Astro

Además de las páginas, Astro te permite crear **componentes** en archivos `.astro` dentro de la carpeta `src/components/`. Esto sirve para reutilizar partes comunes (por ejemplo, un header o footer).

**Ejemplo: `Header.astro`**

```astro
---
const siteTitle = "Mi Sitio en Astro";
---

<header style="background: #ddd; padding: 1rem;">
  <h2>{siteTitle}</h2>
</header>
```

Para usar este componente en una página, simplemente lo importas y lo incluyes en el HTML de otro archivo `.astro`:

```astro
---
import Header from '../components/Header.astro';
---

<html>
  <body>
    <Header />
    <main>
      <h1>Contenido principal</h1>
    </main>
  </body>
</html>
```

**Ventajas de los componentes `.astro`:**
- **Reutilizables**: Puedes tener un header, footer, sidebar, etc.
- **Livianos**: Se compilan a HTML estático, sin JavaScript adicional en el cliente (a menos que tú lo requieras).

---

## 3. Compilar y Comprobar la Salida Estática

Para ver el resultado estático final que genera Astro, debes ejecutar el proceso de compilación (_build_):

1. **Ejecutar el build**  
   Desde la terminal, en la carpeta del proyecto, usa:
   ```bash
   npm run build
   ```
   Esto creará una carpeta `dist/` (por defecto) con todos los archivos HTML, CSS y demás recursos listos para producción.

2. **Vista previa local**  
   Después de compilar, puedes hacer:
   ```bash
   npm run preview
   ```
   Esto inicia un servidor local que sirve el contenido de `dist/`. Ingresa a la URL que te indique (por defecto, `http://localhost:4173` u otro puerto) para ver cómo lucen tus páginas generadas.

3. **Revisar la carpeta `dist`**  
   Verás que cada archivo `.astro` se ha convertido en un archivo HTML:
   ```
   dist/
   ├─ index.html      (de index.astro)
   ├─ about/index.html (si había about.astro)
   └─ assets/...
   ```
   También se incluyen estilos, imágenes y otros recursos en subcarpetas correspondientes.

---

## 4. Ventajas del Enfoque Estático

1. **Rendimiento Mejorado**: Las páginas se sirven como HTML puro, sin necesidad de JavaScript adicional para mostrar contenido estático. Esto se traduce en un _Time to First Byte (TTFB)_ más rápido.
2. **Coste de Hospedaje Reducido**: Como es una web estática, puedes desplegarla en servicios de hosting estático (Netlify, GitHub Pages, Vercel, etc.) sin complejas configuraciones de servidor.
3. **Menor Complejidad**: No necesitas un backend para servir contenido dinámico básico, y Astro se encarga de la estructura final de los archivos.
4. **Mejor SEO**: Los motores de búsqueda pueden rastrear el contenido HTML directamente, sin esperar a la ejecución de JavaScript.

---
