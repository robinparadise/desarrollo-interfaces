# JSX

**Clase 3: JSX y Renderización de Elementos**

En esta clase, exploraremos **JSX** y cómo se utiliza para construir interfaces de usuario en React. Nos enfocaremos en ejemplos prácticos para ilustrar cada concepto.

---

### **¿Qué es JSX?**

**JSX** (JavaScript XML) es una extensión de la sintaxis de JavaScript que permite escribir código similar a HTML dentro de archivos JavaScript. Facilita la creación de componentes de React al permitirnos combinar lógica y presentación en una sintaxis familiar.

**Ejemplo básico de JSX:**

```jsx
const elemento = <h1>¡Hola, mundo!</h1>;
```

---

### **Sintaxis básica de JSX**

#### **1. Elementos JSX**

Los elementos JSX pueden ser etiquetas HTML o componentes personalizados.

**Ejemplo con etiquetas HTML:**

```jsx
const titulo = <h1>Bienvenido a mi sitio web</h1>;
```

**Ejemplo con componentes personalizados:**

```jsx
function Saludo() {
  return <p>¡Hola a todos!</p>;
}

const elemento = <Saludo />;
```

#### **2. Atributos en JSX**

Los atributos en JSX se escriben de forma similar a HTML, pero algunas palabras clave cambian.

- **class** se convierte en **className**
- **for** se convierte en **htmlFor**

**Ejemplo:**

```jsx
const enlace = <a href="https://www.ejemplo.com">Visitar sitio</a>;
const boton = <button className="btn btn-primary">Clic aquí</button>;
```

#### **3. Cerrar todas las etiquetas**

En JSX, todas las etiquetas deben cerrarse, incluso las que en HTML son auto-cerradas.

**Ejemplo:**

```jsx
// Correcto
const imagen = <img src="ruta/imagen.jpg" alt="Descripción" />;

// Incorrecto (falta cerrar la etiqueta)
const imagen = <img src="ruta/imagen.jpg" alt="Descripción">;
```

#### **4. Fragmentos**

Los fragmentos te permiten devolver múltiples elementos sin agregar nodos extra al DOM.

**Ejemplo:**

```jsx
function Lista() {
  return (
    <>
      <li>Elemento 1</li>
      <li>Elemento 2</li>
      <li>Elemento 3</li>
    </>
  );
}
```

---

### **Renderización de elementos en el DOM**

Para renderizar elementos en el DOM con React, necesitas un archivo HTML que actúe como punto de entrada y un archivo JavaScript donde definirás tus componentes.

**Paso 1: Crear el archivo HTML**

Crea un archivo `index.html` con la siguiente estructura:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Aplicación React</title>
</head>
<body>
  <!-- Elemento raíz donde React montará la aplicación -->
  <div id="root"></div>

  <!-- Importar el script principal de React -->
  <script type="module" src="main.jsx"></script>
</body>
</html>
```

- **`<div id="root"></div>`**: Es el contenedor donde React renderizará tu aplicación.
- **`<script type="module" src="main.jsx"></script>`**: Importa tu código React escrito en `main.jsx`.

**Paso 2: Crear el archivo JavaScript**

Crea un archivo `main.jsx` con el siguiente contenido:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>¡Hola, React!</h1>;
}

const contenedor = document.getElementById('root');
const root = createRoot(contenedor);
root.render(<App />);
```

- **Importaciones**:
  - `import React from 'react';`: Importa la biblioteca React.
  - `import { createRoot } from 'react-dom/client';`: Importa la función para renderizar en el DOM.
- **Definir un componente**:
  - `function App() { return <h1>¡Hola, React!</h1>; }`: Crea un componente que retorna un elemento JSX.
- **Renderizar en el DOM**:
  - `const contenedor = document.getElementById('root');`: Obtiene el elemento donde se montará la aplicación.
  - `const root = createRoot(contenedor);`: Crea una raíz de React.
  - `root.render(<App />);`: Renderiza el componente `App` dentro del contenedor.

Con estos pasos, has creado una aplicación React básica que renderiza un componente en el DOM utilizando JSX. Este ejemplo muestra cómo JSX facilita la combinación de JavaScript y HTML para construir interfaces de usuario de manera eficiente.

---

### **Expresiones y lógica en JSX**

Puedes incorporar expresiones de JavaScript dentro de JSX usando llaves `{}`.

#### **1. Insertar variables**

**Ejemplo:**

```jsx
const nombre = 'María';

function Saludo() {
  return <h1>Hola, {nombre}!</h1>;
}
```

#### **2. Operaciones y funciones**

**Ejemplo:**

```jsx
function obtenerHora() {
  return new Date().toLocaleTimeString();
}

function Reloj() {
  return <p>La hora es: {obtenerHora()}</p>;
}
```

#### **3. Renderizado condicional**

Puedes usar operadores ternarios o el operador lógico `&&` para mostrar contenido condicionalmente.

**Ejemplo con operador ternario:**

```jsx
function Mensaje({ esUsuario }) {
  return (
    <div>
      {esUsuario ? <p>Bienvenido de nuevo!</p> : <p>Por favor, regístrate.</p>}
    </div>
  );
}
```

**Ejemplo con operador lógico `&&`:**

```jsx
function Notificacion({ nueva }) {
  return <div>{nueva && <p>Tienes una nueva notificación.</p>}</div>;
}
```

#### **4. Listas y keys**

Al renderizar listas, es importante asignar una key única a cada elemento para ayudar a React a identificar cambios.

**Ejemplo:**

```jsx
const frutas = ['Manzana', 'Banana', 'Cereza'];

function ListaFrutas() {
  return (
    <ul>
      {frutas.map((fruta, index) => (
        <li key={index}>{fruta}</li>
      ))}
    </ul>
  );
}
```

#### **5. Estilos en línea y clases**

Puedes aplicar estilos en línea usando objetos y asignar clases con `className`.

**Ejemplo de estilos en línea:**

```jsx
const estilo = {
  color: 'blue',
  fontSize: '20px',
};

function TextoEstilizado() {
  return <p style={estilo}>Este texto está estilizado.</p>;
}
```

**Ejemplo de clases CSS:**

```jsx
function Boton() {
  return <button className="btn btn-success">Aceptar</button>;
}
```

---

### **Ejemplos prácticos**

#### **Ejemplo 1: Contador simple**

```jsx
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

#### **Ejemplo 2: Lista de tareas**

```jsx
const tareas = [
  { id: 1, texto: 'Aprender React', completada: true },
  { id: 2, texto: 'Practicar ejercicios', completada: false },
  { id: 3, texto: 'Leer documentación', completada: false },
];

function ListaTareas() {
  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
          {tarea.texto}
        </li>
      ))}
    </ul>
  );
}
```

---

### **Buenas prácticas con JSX**

- **Siempre cierra las etiquetas**: Tanto las etiquetas que contienen contenido como las auto-cerradas (`<img />`, `<br />`).
- **Usa `className` en lugar de `class`**: Para asignar clases CSS.
- **Envuelve múltiples elementos en un solo elemento padre**: Puede ser un `<div>` o un fragmento `<> </>`.
- **Asigna keys únicas al renderizar listas**: Idealmente, utiliza un identificador único como `id`.

---

### **Ejercicio propuesto**

Crea un componente `PerfilUsuario` que reciba props con la información del usuario y muestre:

- Su nombre y apellido.
- Su edad.
- Una lista de hobbies.
- Si es mayor de edad, muestra un mensaje adicional.

**Ejemplo de uso:**

```jsx
function App() {
  const usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 20,
    hobbies: ['Fútbol', 'Lectura', 'Programación'],
  };

  return <PerfilUsuario {...usuario} />;
}
```

**Pista para el componente `PerfilUsuario`:**

```jsx
function PerfilUsuario({ nombre, apellido, edad, hobbies }) {
  return (
    <div>
      <h2>
        {nombre} {apellido}
      </h2>
      <p>Edad: {edad}</p>
      {edad >= 18 && <p>Eres mayor de edad.</p>}
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobbie, index) => (
          <li key={index}>{hobbie}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

