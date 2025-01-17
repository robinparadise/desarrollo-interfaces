# **Práctica P8: Creación de un Blog con Astro, TailwindCSS, React y Base de Datos en Firebase**

En esta práctica, el objetivo es desarrollar un **blog** completamente funcional aprovechando las ventajas de **Astro** para el renderizado estático, la **estilización con TailwindCSS**, la **interactividad de componentes React** y el **almacenamiento de datos** (por ejemplo, usando Realtime Database de Firebase o alguna otra base de datos similar).

### **Requisitos Generales**

1. **Tema y Diseño:**
   - Elige una **temática** para tu blog (por ejemplo, viajes, gastronomía, tecnología, etc.).
   - Emplea **imágenes acordes** al tema seleccionado para ilustrar tus posts (pueden ser imágenes propias o de stock).
   - Aplica **TailwindCSS** para el estilo y consistencia de tu interfaz.

2. **Estructura del Blog:**
   - Crea una **página de inicio** o `index.astro` que sirva de portada.
   - Genera un apartado `/blog` que muestre un **listado de posts**.
   - Permite la navegación a rutas dinámicas (por ejemplo, `/blog/slug-del-post`) para cada entrada.

3. **Uso de TailwindCSS:**
   - Integra TailwindCSS y crea tus páginas y componentes siguiendo las clases

4. **Componentes React:**
   - Crea al menos **un componente interactivo** de React para tu blog.
   - Sugerencia: Un **contador de “likes”** o un **componente de comentarios** que muestre en tiempo real cuántas personas han reaccionado a cada post.
   - Importa estos componentes en tus archivos y usa las directivas de hidratación (`client:load`, `client:idle`, etc.).

5. **Firebase:**
   - Utiliza alguna **base de datos** (como Firebase Realtime Database, Supabase, u otra).
   - Almacena la **lista de posts** o algunos datos (por ejemplo, título, contenido o número de “likes”).
   - Cada post debe guardar su **contenido** o **referencia** en esa base de datos.
   - El componente React debe conectarse a la base de datos en tiempo real para mostrar o actualizar datos (por ejemplo, el contador de “likes” que se actualiza al instante sin refrescar la página).

6. **Temática e Imágenes:**
   - Elige la temática que más te guste (ej. anime, deportes, música, recetas, libros, etc.).
   - Integra al menos una **imagen principal** en la portada y en cada post.
   - Asegúrate de que las imágenes aporten valor estético y sean coherentes con el contenido.

### **Detalles Específicos de la Entrega**

- **Estructura de Carpetas**:  
  - `src/pages/` para tus páginas de Astro (por ejemplo, `index.astro`, `blog/index.astro`, `blog/[slug].astro`).  
  - `src/components/` para tus componentes de React (`.jsx` o `.tsx`).  
  - Una carpeta o sección para almacenar tus estilos globales si lo consideras necesario (Tailwind puede manejar la mayoría, pero podrías tener un `global.css` si gustas).  

- **Configuración**:  
  - Archivo `astro.config.*` con la integración de Tailwind configurada.  
  - Dependencias en `package.json` (React, react-dom, etc.).  

- **Funcionalidades Mínimas**:  
  - Visualización de un listado de posts, obtenidos en tiempo real de la base de datos.  
  - Acceso a un detalle de post en `/blog/slug-del-post`.  
  - Un componente React que interactúe con la base de datos en tiempo real (por ejemplo, sumando o restando un “like”, mostrando la cantidad actualizada de “likes” al instante).  


