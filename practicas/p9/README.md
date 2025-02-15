# **Práctica P9: Creación de una Plataforma de Venta de Cursos con Astro, TailwindCSS, React y Firebase**

En esta práctica, el objetivo es desarrollar una **página de venta de cursos** sobre temas de tecnología. Partiendo de la experiencia adquirida en la práctica anterior (**Práctica P8**), pondremos en marcha un **catálogo de cursos**, un **detalle de cada curso**, y un **proceso básico de compra** (con transacciones simuladas), todo ello utilizando **Astro** para el renderizado, **React** para la interactividad, **TailwindCSS** para el diseño, y **Firebase** para el almacenamiento de datos en tiempo real.

---

## **1. Requisitos Generales**

1. **Página de Venta de Cursos (2pts):**
   - Crea una **página principal** que muestre de forma destacada:
     - **Slider o carrusel** con cursos destacados (opcionalmente un “Hero” con alguna imagen o eslogan).
     - **Listado de cursos** con diseño de tarjetas (cards).
     - **Listado por categorías** o un **filtro** que permita ver los cursos según su categoría (p. ej. “Desarrollo Web”, “Bases de Datos”, “Inteligencia Artificial”, etc.).
   - Toma como inspiración sitios como [Udacity](https://www.udacity.com/), [Domestika](https://www.domestika.org/es), [Treehouse](https://teamtreehouse.com/library), etc.
   - Lee los datos de los cursos desde Firebase.

2. **Detalle de cada Curso (1pts):**
   - Cada curso debe contar con una página o sección propia que incluya:
     - **Título**, **precio**, **temario** y cualquier otro **metadato** relevante (instructor, duración, nivel, opiniones, etc.).
     - Un **botón de compra** en caso de que el usuario no esté suscrito al curso.
     - Un **botón** que muestre un **diálogo** (con un video o contenido extra) **solo si el usuario ya compró** el curso.

3. **Proceso de Compra (Mock / Simulado) (1pts):**
   - Al pulsar en el **botón de comprar**, debe abrirse un **diálogo** o, en su defecto, una **página de compra**.  
   - Muestra un **mensaje** confirmando la compra exitosa o un **mensaje de error** si algo falla.  
   - No se requiere un pago real: la **compra** debe ser simulada (mock).  
   - Agrega un botón de **cerrar** para el diálogo de confirmación/compra.
   - [opcional] guarda el estado de la compra en Firebase.

4. **Diálogo de Contenido (si el usuario ya compró el curso) (2pts):**
   - Mostrar un diálogo con el **contenido** del curso (video, temario, etc.) solo si el usuario ya lo ha comprado.  
   - Debe poder ver un **video** (YouTube, Vimeo o un archivo local `.mp4`).  
   - [tip] Utiliza directivas como `client:load` o `client:idle` para manejar la **hidratación** del componente React.  
   - Incluye un botón de **cerrar** para el diálogo de reproducción.

5. **Buscador Global y Filtros (2pts):**
   - Debe existir algún tipo de **buscador global** que filtre cursos por nombre.
   - Un **selector** (o varios checkboxes) para **filtrar** cursos por categoría.

---

## **2. Tecnología y Herramientas**

1. **Astro**:  
   - Estructura el proyecto con páginas en `src/pages` y componentes en `src/components`.  
   - Crea al menos un archivo o página para el **listado** principal de cursos y otro para el **detalle** del curso (p. ej. `courses/[id].astro` o similar).

2. **TailwindCSS**:  
   - Se utilizará para **estilizar** la plataforma.  
   - Aplica **clases utilitarias** para darle un aspecto moderno a sliders, hero, tarjetas (cards) y botones.  

3. **React**:  
   - Para la **interactividad** de los diálogos (compra, video) y el **manejo de estado**.  
   - Usa **React Hooks** (useState, useEffect, etc.) según lo necesites.  
   - Importa tus componentes en Astro usando directivas de hidratación (`client:load`, `client:idle`, etc.).

4. **Firebase (Realtime Database)**:  
   - Almacena la **información de los cursos** (id, nombre, precio, descripción, categoría, etc.).  
   - [opcional] Registra la **información de compras** (aunque sea simulado), para saber si un usuario ha adquirido un curso.  
   - [extra] El componente debe leer estos datos y actualizar la interfaz (por ejemplo, “likes” o "comprado").

5. **Mock de Compra**:  
   - No se requiere integración con **pasarelas de pago** reales.  
   - Basta con que se simule la **respuesta positiva** de la compra y opcionalmente [extra] que se registre ese estado en Firebase (p. ej. `purchased: true`).  
   - Si no puede “comprarse”, simula un **mensaje de error**.

---

## **3. Funcionalidades Específicas**

1. **Listado de Cursos (Cards)**:
   - Muestra cada curso con:
     - Imagen o banner.
     - Título y descripción resumida.
     - Precio.
     - Botón “Ver Detalle”.
   - Si lo deseas, añade una **barra de búsqueda** y **filtros por categoría** en la misma página para refinar la lista.

2. **Página de Detalle**:
   - Muestra información completa del curso:  
     - **Temario** (lista de lecciones o módulos).  
     - **Instructor**, **duración**, **nivel** (básico, intermedio, avanzado).  
     - **Precio** del curso.  
   - **Botón de comprar** (en caso de que el usuario no posea el curso).  
   - **Botón para abrir diálogo de reproducción** (solo si el usuario ya lo compró).

3. **Diálogo de Compra**:
   - Al dar clic en “Comprar”, muestra un **diálogo** con:
     - Mensaje de confirmación y/o resumen del pedido (título, precio).  
     - Botón de confirmar compra.  
     - Mensaje final de **éxito** o **error**.  
     - Botón de cerrar.

4. **Diálogo de Video**:
   - Al dar clic en “Ver Contenido” (si está comprado), muestra un **video** (puede estar embebido de YouTube/Vimeo o un archivo local).  
   - Botón de cerrar para volver a la página.
   - Muestra el video (con `autoplay` sería óptimo) con detalles del temario. 

5. **Extras para incrementar la nota (2pts)**:
   - **Reviews** o valoraciones de usuarios con estrellas (puede ser un mock).  
   - **Contador de “likes”** o “personas inscritas” que se actualice en **tiempo real** desde Firebase.  
   - **Hero principal** con un gran slider en la página de inicio. 
   - **Comentarios** para cada curso.
   - **Filtros avanzados** por precio, duración, nivel, etc.  
   - **Carrito de compra** para adquirir varios cursos a la vez.
   - Y cualquier otra funcionalidad que consideres relevante serán consideradas para la nota final.

---

## **4. Ejemplos de Cursos a Incluir**

Para tu **listado inicial**, puedes cargar en Firebase (manualmente o con un script) algunos cursos como:

- Introducción a HTML y CSS  
- Introducción a JavaScript  
- HTML y CSS avanzado  
- JavaScript avanzado  
- React  
- Vue  
- Angular  
- Firebase  
- Node.js  
- Git y GitHub  
- Astro  
- Python y Django  
- AI y Machine Learning  
- (Otras categorías y lenguajes que desees)

---

## **5. Estructura de Carpetas y Configuración**

- **`src/pages/`**:
  - `index.astro`: Página principal con slider o hero + listado de cursos.
  - `courses/[id].astro`: Detalle de curso (ruta dinámica).
- **`src/components/`**:
  - Componentes de React (p. ej. `PurchaseDialog.jsx`, `CourseCard.jsx`, etc.).
  - Componente de **VideoDialog**.
- **`tailwind.config.js`**:  
  - Configuración para Tailwind.
- **`astro.config.*`**:  
  - Integración con React y Tailwind.
- **Dependencias** en `package.json`:  
  - `react`, `react-dom`, etc.
  
---

## **6. Entrega y Consideraciones Finales**

- **Conexión a la Base de Datos**:  
  - Para las **pruebas locales**, puedes usar un proyecto de Firebase con Realtime Database o, si lo prefieres, Firestore.  
- **Diseño Responsivo**:  
  - Asegúrate de que la página se vea bien en dispositivos móviles, tablets y pantallas grandes usando TailwindCSS.  
- **Estilo e Imagen**:  
  - Usa imágenes de ejemplo para los cursos (unsplash, pexels, etc. si lo ves conveniente).
  - ejemplo: [pexels](https://www.pexels.com/search/videos/coding/)

---

## **7. Despliegue en Firebase Hosting**

- **Despliega tu aplicación** en Firebase Hosting para que pueda ser evaluada.
- Ejecuta el comando:
  ```cmd
  firebase init
  ```
- Sigue las instrucciones en el archivo `firebase.md`

---

## **8. Soporte para Múltiples Monedas e Internacionalización (i18n)**
Como parte de la ampliación de esta práctica, la plataforma debe ser accesible para usuarios de diferentes regiones, permitiendo cambiar el idioma y la moneda en los precios.

### **8.1 Soporte para Múltiples Monedas**
- Los precios de los cursos deben poder visualizarse en **euros (€)**, **dólares ($)** y **libras (£)**.
- Implementar un **selector de moneda** en la interfaz que permita a los usuarios cambiar la moneda de los precios mostrados.
- No es necesario implementar una conversión real de monedas, simplemente mostrar los precios en la moneda seleccionada.
- Guardar la selección de moneda del usuario en el **localStorage** para que se conserve entre sesiones.

### **8.2 Internacionalización (i18n)**
- La plataforma debe estar disponible en **español (es)** e **inglés (en)**.
- Implementar un **selector de idioma** en la interfaz que permita cambiar entre idiomas.
- Puedes utilizar una biblioteca de astro o manejar la traducción de los textos mediante archivos JSON.
- Guardar la selección del idioma en el **localStorage** para mantener la preferencia del usuario.
- Asegurar que los títulos, descripciones y textos principales de la plataforma se adapten al idioma seleccionado, no es necesario tenerlo al 100% traducido 👍.
