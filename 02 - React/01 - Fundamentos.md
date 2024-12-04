# Fundamentos de React

**Clase 1: Fundamentos de React**

---

### **¿Qué es React y por qué usarlo?**

**React** es una biblioteca de JavaScript de código abierto desarrollada por Facebook para construir interfaces de usuario de manera eficiente y declarativa. Permite crear aplicaciones web rápidas y escalables mediante el uso de componentes reutilizables.

**¿Por qué usar React?**

- **Eficiencia**: Gracias al Virtual DOM, React actualiza y renderiza solo los componentes necesarios cuando los datos cambian.
- **Reutilización de Componentes**: Fomenta la creación de componentes reutilizables, lo que acelera el desarrollo y facilita el mantenimiento.
- **Comunidad Activa**: Cuenta con una gran comunidad que contribuye con herramientas, bibliotecas y soporte.
- **Aprendizaje Único**: Una vez que entiendes los conceptos básicos, puedes aplicarlos en diferentes plataformas como web, móvil (React Native) y realidad virtual (React VR).

---

### **Historia y evolución de React**

- **2011**: React fue desarrollado internamente en Facebook para manejar el creciente tráfico y complejidad de su aplicación.
- **2013**: Facebook lanza React como proyecto de código abierto en la conferencia JSConf US.
- **2015**: Introducción de React Native, permitiendo desarrollar aplicaciones móviles nativas con React.
- **2016**: Lanzamiento de la versión 15, mejoras en el rendimiento y manejo de errores.
- **2017**: Presentación de Fiber, una reescritura del core de React para mejorar la reconciliación.
- **2019**: Introducción de los Hooks en la versión 16.8, permitiendo manejar estado y efectos en componentes funcionales.
- **2020 en adelante**: Mejoras continuas en rendimiento, desarrollo de Concurrent Mode y Suspense para manejar carga asincrónica.

---

### **Ventajas y características clave**

- **Virtual DOM**: React utiliza un DOM virtual para minimizar manipulaciones directas del DOM real, mejorando el rendimiento.
- **JSX**: Una extensión de sintaxis que permite escribir código similar a HTML dentro de JavaScript.
- **Unidirectional Data Flow**: El flujo de datos en una sola dirección hace que la aplicación sea más predecible y fácil de depurar.
- **Ecosistema Rico**: Amplia gama de bibliotecas y herramientas para manejo de rutas, estado, pruebas y más.
- **SEO Amigable**: Con herramientas como Next.js o Astro, es posible renderizar React en el servidor para mejorar el SEO.
- **Aprendizaje Transferible**: Los conocimientos adquiridos en React pueden aplicarse en otras bibliotecas y frameworks que utilizan conceptos similares.

---

### **Instalación del entorno de desarrollo (Node.js, npm, Vite)**

#### **1. Instalación de Node.js y npm**

- **Descarga Node.js**: Visita la [página oficial de Node.js](https://nodejs.org/) y descarga la versión LTS (Long Term Support) para tu sistema operativo.
- **Instalación**: Sigue las instrucciones del instalador para completar la instalación.
- **Verificación**: Abre una terminal y ejecuta:
  ```bash
  node -v
  npm -v
  ```
  Deberías ver los números de versión instalados.

#### **2. Crear una nueva aplicación React con Vite**

**¿Qué es Vite?**

Vite es una herramienta de construcción rápida y ligera para proyectos web modernos. Ofrece un entorno de desarrollo ultrarrápido y un bundle de producción altamente optimizado.

**Pasos para crear una aplicación React con Vite:**

1. **Crear el proyecto**

   Abre la terminal y ejecuta:

   ```bash
   npm create vite@latest my-react-app -- --template react
   ```

   - `my-react-app` es el nombre de tu proyecto.
   - El flag `--template react` indica que usarás el template de React.

2. **Ingresar al directorio del proyecto**

   ```bash
   cd my-react-app
   ```

3. **Instalar las dependencias**

   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   - Verás una salida similar a:

     ```
     VITE vX.X.X  ready in X ms

     ➜  Local:   http://localhost:5173/
     ➜  Network: use --host to expose
     ```

   - Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador para ver la aplicación en funcionamiento.

5. **Explorar el proyecto**

   - Abre el proyecto en tu editor de código preferido (por ejemplo, Visual Studio Code).
   - Observa la estructura de archivos:

     ```
     my-react-app/
     ├── index.html
     ├── package.json
     ├── vite.config.js
     └── src/
         ├── App.jsx
         ├── main.jsx
         └── assets/
     ```

   - `App.jsx`: Componente principal de tu aplicación.
   - `main.jsx`: Punto de entrada donde React renderiza `App` en el DOM.

6. **Beneficios de usar Vite**

   - **Velocidad**: Vite utiliza ESM (Módulos de JavaScript Nativos) para ofrecer un arranque del servidor de desarrollo y actualizaciones en caliente extremadamente rápidas.
   - **Configuración mínima**: Funciona fuera de la caja sin necesidad de configuraciones complejas.
   - **Soporte para React y JSX**: Incluye soporte para JSX y otros estándares modernos.

---

**Nota:** A diferencia de `create-react-app`, Vite es más ligero y ofrece un mejor rendimiento durante el desarrollo. Además, es muy flexible y permite configuraciones avanzadas si es necesario.

---

