# **📚 Proyecto p9.2:** Librería (con “Lista de deseos”)

## **ℹ️ Descripción:**
Desarrollar la interfaz de una librería online que venda diferentes tipos de libros, **añadiendo** la funcionalidad de una **“Lista de deseos”** (wishlist). Esta nueva característica permitirá al usuario guardar libros que le interesen y revisarlos más tarde, implicando **persistencia** de la información en el navegador.

La base del proyecto se nutre de la API con categorías de libros:
[https://books-foniuhqsba-uc.a.run.app/](https://books-foniuhqsba-uc.a.run.app/)

Categorías:

```js
[
  "Ficción", "No ficción", "Cómics y novelas gráficas", "Libros infantiles", "Autoayuda y desarrollo personal", "Gastronomía y recetas", "Ciencia ficción", "Misterio y suspense", "Biografías", "Historia", "Filosofía", "Psicología", "Terror", "Poesía", "Drama", "Crimen", "Viajes", "Arte", "Cultura", "Educación", "Religión", "Tecnología", "Economía", "Política", "Deportes", "Música", "Superación personal", "Sociología"
]
``

---

## **⚙️ Tecnologías y conceptos que debes utilizar:**
1. **Grid y Flexbox**  
2. **CSS Popovers + Anchors**  
3. **Dialog (HTML element)**  
4. **Web Components**  
5. **Tailwind CSS**  
6. **Local Storage** (u otra forma de persistencia en el navegador) para la funcionalidad de la “Lista de deseos”.

---

## **Funcionalidades a implementar:**

### 1. Página de inicio (2pts)
- **Header**: Con el logo de la librería y un ícono representando el carrito.  
- **Banner principal**: Sección destacada con el nombre de la librería y una imagen de fondo, utilizando **Flexbox** (con Tailwind).  
- **Catálogo de libros (Grid)**: Mostrando múltiples libros (por ejemplo, en 3 columnas en desktop).  
- **Cambio de vista (Grid/Flex)**: Añadir un botón para alternar entre disposición Grid y Flex.  
- **Tarjetas de libro (Web Component)**: Que incluyan:
  - `cover de la imágen` de portada,  
  - `título`,  
  - `autor`,  
  - `rating`,  
  - `publisher`,
  - `fecha de publicación`,  
  - `precio`,  
  - botón “Agregar al carrito”,  
  - **(Nuevo)** botón “Agregar a la lista de deseos”.  
  - Estilización con **Tailwind CSS**.

### 2. Detalle del producto (1pts)
- **Página de detalle**: Con la información completa del libro (portada, sinopsis, características, precio).  
- **Botón de compra**: Para añadir al carrito.  
- **Botón de wishlist**: Para añadir a la lista de deseos desde la misma página de detalle si se desea.

### 3. Carrito de compras (2pts)
- **Resumen del carrito**: Panel fijo o desplegable mostrando los libros añadidos (usando **Flexbox**).  
- **Carrito vacío**: Mensaje indicando que no hay productos aún.  
- **Total y compra**: Mostrar el total y un botón para proceder a comprar.  
- **Proceso de compra**: Al clicar en comprar, usar un **Dialog** con mensaje de confirmación y vaciar el carrito.  
- **Ícono animado**: Actualizar el ícono de carrito y su contador cada vez que se agregue un libro.

### 4. Popup informativo (2pts)
- **CSS Popovers + Anchors**: Para mostrar información adicional (reseñas, premios, tags) en un popover al hacer clic en un enlace o botón en la tarjeta.

### 5. Menú de características (1pts)
- **Menú Popover + Anchors**: Para filtrar o agrupar libros por género, autor, idioma, etc.  
- Deber ser **responsive** y accesible.

### 6. **Lista de deseos (2pts)**
- **Wishlist**: Un apartado visible desde el header o menú donde el usuario pueda ver los libros que ha marcado como “deseados”.  
- **Persistencia en Local Storage**:  
  - Cada vez que el usuario marque “Agregar a la lista de deseos” en una tarjeta o página de detalle, se guardará en el Local Storage.  
  - Al recargar la página, deben mantenerse los libros en la lista de deseos.  
- **Retirada de libros**: Permitir al usuario quitar un libro de la lista de deseos, actualizando el Local Storage.  
- **Visualización**:  
  - Puedes usar un diálogo, un panel deslizable o una página independiente para la wishlist.  
  - Muestra al menos el título y la portada de cada libro, además de un botón para remover de la lista de deseos.

---

## **⚠️ Importante:**
- ❌ No usar frameworks de CSS (Bootstrap, Foundation...).  
- ❌ No usar frameworks de JavaScript (React, Vue, etc.).  
- ✅ Debe ser 100% **responsiva**.  
- ✅ Usa **Web Components**, **Grid**, **Flexbox**, **CSS Popovers + Anchors**, **Dialog**, **Tailwind CSS** y ahora **Local Storage** para la nueva funcionalidad.  

---

## **👀 Temas a considerar:**
- **Diseño personalizado**: Colores y tipografía adecuados a la temática de la librería.  
- **Web Components**: Crea componentes reutilizables y estilizados con Tailwind.  
- **Wishlist**: La interacción debe ser clara e intuitiva; el usuario debe entender cuándo un libro está en la lista de deseos y cómo quitarlo.  
- **Responsive**: Garantiza que menú, carrito y lista de deseos funcionen bien en móvil y escritorio.

---

## **👌 Adicionales (opcionales):**
- **Buscador**: Filtrar por título, autor, editorial.  
- **Ordenar libros**: Por precio, rating o fecha de publicación.  
- **Slider**: Para libros recomendados o destacados.  
- **Formulario de contacto**: Para que los usuarios dejen sugerencias o consultas.  
- **Modo oscuro**: Un toggle para alternar Dark/Light mode, guardando preferencia en Local Storage.
