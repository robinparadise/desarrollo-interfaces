# 05 - React

En este capítulo, aprenderás a **integrar React** en tu proyecto de Astro para añadir interactividad y componentes dinámicos. Veremos cómo instalar las dependencias de React, cómo “hidratar” componentes en Astro y ejemplos prácticos de uso.

---

## 1. ¿Por Qué Integrar React en Astro?

Astro genera contenido estático para optimizar el rendimiento, pero a veces necesitas **interactividad** (formularios dinámicos, contadores, etc.). Aquí entra React, que puede convivir con Astro sin convertir todo el sitio en una Single-Page App. Podrás:

- **Hidratar** solo los componentes que requieran comportamiento en el navegador.
- Mantener el resto de la página como HTML estático.

---

## 2. Instalar y Configurar React

1. **Instalar React y React DOM**  
   Desde la carpeta raíz de tu proyecto Astro:
   ```bash
   npm install react react-dom
   ```
   (O `yarn add react react-dom` si usas Yarn.)

2. **Integración con Astro**  
   Si creaste tu proyecto con la plantilla básica de Astro (o sin React preconfigurado), no necesitas un plugin extra: Astro sabe manejar archivos `.jsx` o `.tsx`.  
   - Asegúrate de que tu `astro.config.*` no excluya `.jsx`/.tsx de los lugares a buscar.

3. **Estructura de Archivos**  
   Una forma común es:  
   ```
   src/
     components/
       BotonInteractivo.jsx
     pages/
       index.astro
   ```
   - `BotonInteractivo.jsx` será un componente React.
   - `index.astro` (o cualquier `.astro`) podrá importar y usar `BotonInteractivo`.

---

## 3. Añadir un Componente React

### Ejemplo: Contador Interactivo

1. **Crea el Componente en React**  
   `src/components/Contador.jsx`:

   ```jsx
   import { useState } from 'react';

   export default function Contador() {
     const [cuenta, setCuenta] = useState(0);

     return (
       <div className="p-4 border rounded bg-gray-50">
         <p className="font-bold">Cuenta: {cuenta}</p>
         <button
           className="px-2 py-1 bg-blue-500 text-white rounded"
           onClick={() => setCuenta(cuenta + 1)}
         >
           Incrementar
         </button>
       </div>
     );
   }
   ```

2. **Importar y Hidratar en Astro**  
   `src/pages/index.astro`:

   ```astro
   ---
   import Contador from '../components/Contador.jsx';
   ---

   <html>
     <head>
       <title>Mi Sitio con Astro + React</title>
     </head>
     <body class="p-8">
       <h1 class="text-2xl font-bold mb-4">Página Principal</h1>

       <!-- Para que React funcione en el cliente, agregamos el directive 'client:load' -->
       <Contador client:load />
     </body>
   </html>
   ```

**Explicación**:

- **`import Contador from …`**: Cargamos el componente React.
- **`<Contador client:load />`**: La directiva `client:load` le dice a Astro que cargue e hidrate el componente en el **lado del cliente** apenas se cargue la página. Esto convierte el HTML estático en un componente interactivo de React.

### Otras Directivas de Hidratación

- **`client:idle`**: Hidrata el componente cuando la página está inactiva (ideal para performance).
- **`client:visible`**: Hidrata cuando el elemento entra en el viewport.
- **`client:media="(min-width: 768px)"`**: Hidrata según una media query.
- **`client:only="react"`**: Exclusivo para componentes que no se renderizan como HTML estático, sino que se cargarán completamente en el navegador.

---

## 4. Ejemplo Práctico: Botón de Cambio de Tema

Supón que quieres un botón que cambie de “modo claro” a “modo oscuro” en tu sitio:

1. **Componente React**: `src/components/TemaToggler.jsx`  
   ```jsx
   import { useState, useEffect } from 'react';

   export default function TemaToggler() {
     const [modoOscuro, setModoOscuro] = useState(false);

     useEffect(() => {
       if (modoOscuro) {
         document.documentElement.classList.add('dark');
       } else {
         document.documentElement.classList.remove('dark');
       }
     }, [modoOscuro]);

     return (
       <button
         onClick={() => setModoOscuro(!modoOscuro)}
         className="px-3 py-1 bg-gray-700 text-white rounded"
       >
         {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
       </button>
     );
   }
   ```

   **Explicación**:
   - `useState` mantiene un boolean para saber si estamos en modo oscuro.
   - `useEffect` aplica/remueve la clase `dark` en `<html>` cada vez que cambie `modoOscuro`.

2. **Astro File**: `src/pages/index.astro`  
   ```astro
   ---
   import TemaToggler from '../components/TemaToggler.jsx';
   ---

   <html>
     <head>
       <meta charset="UTF-8" />
       <title>Tema con React</title>
       <!-- Ejemplo de uso de Tailwind con modo oscuro. -->
       <script>
         // Si quieres, detecta preferencia del usuario al cargar la página
       </script>
     </head>
     <body class="p-4 dark:bg-gray-900 dark:text-white">
       <h1 class="text-2xl font-bold mb-4">Modo Oscuro/Claro</h1>
       <TemaToggler client:load />
     </body>
   </html>
   ```

   - **`client:load`**: Hidrata en cuanto la página cargue.
   - **Tailwind**: Asumiendo que tienes configurada la opción `darkMode: 'class'` en `tailwind.config.js`. Así, cuando `.dark` está en `<html>`, se activan estilos oscuros.

Resultado: El botón alterna el `modo oscuro` del sitio.

---

## 5. Compilación y Build

Astro compilará tu sitio estático y los componentes React que hayas marcado con `client:*` se empaquetarán y cargarán en el cliente. Para ver esto:

1. **Modo Desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000). Al hacer clic en tu componente React, verás la interactividad.

2. **Build para Producción**:
   ```bash
   npm run build
   npm run preview
   ```
   - En la carpeta `dist/`, Astro generará HTML estático. 
   - Incluye tus scripts empacados de React para la parte interactiva.

---

## 6. Más Ejemplos Prácticos

- **Formulario de Contacto**:  
  Crea un componente React con validaciones en tiempo real.  
  ```jsx
  import { useState } from 'react';

  export default function FormularioContacto() {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarSubmit = (e) => {
      e.preventDefault();
      alert(`Enviando mensaje de ${nombre}`);
    };

    return (
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Tu Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Escribe tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    );
  }
  ```
  Luego en `.astro`:
  ```astro
  ---
  import FormularioContacto from '../components/FormularioContacto.jsx';
  ---

  <FormularioContacto client:load />
  ```
- **Carousel**:  
  Un carrusel con React que maneje estados de la imagen actual, flechas de siguiente/anterior, etc.

---

## 7. Buenas Prácticas

1. **Usar Directivas de Hidratación con Cautela**  
   - Solo aplica `client:load` o `client:idle` a los componentes que necesiten interactividad real.
   - El resto puede ser HTML estático, para mantener tu sitio rápido.

2. **Mantén Pequeños tus Componentes de React**  
   - Astro te permite separar la interactividad en pequeñas partes, en vez de un gran bundle global. Así optimizas la carga.

3. **Combina con MD/MDX si Quieres**  
   - Si deseas contenido en Markdown con secciones interactivas de React, podrías instalar la integración [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/).

4. **Refactoriza Lógica**  
   - Para componentes React muy grandes, considera extraerlos a su propia carpeta `components/` y reusarlos en múltiples `.astro` o `.mdx`.

---

## 8. Conclusión

Agregar **React** a Astro te brinda lo mejor de ambos mundos:

- **Velocidad** y _build_ estático de Astro.
- **Interactividad** en componentes específicos con React.

Pasos Clave:

1. **Instalar** `react` y `react-dom`.  
2. **Crear** componentes React en `.jsx` o `.tsx`.  
3. **Importar** en tu archivo `.astro` con la directiva `client:*`.  
4. **Disfrutar** de un sitio rápido con solo las partes interactivas necesarias.
