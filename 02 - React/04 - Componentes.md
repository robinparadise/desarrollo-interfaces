# Componentes

**Clase 4: Componentes Funcionales en React**

En esta clase, nos centraremos en los **componentes funcionales** de React, que son la forma moderna y recomendada de crear componentes. Aprenderemos qué son, cómo crearlos, cómo pasarles propiedades (props) y cómo componer y reutilizar componentes para construir aplicaciones más complejas.

---

### **Definición de Componentes en React**

Un **componente** en React es una pieza reutilizable de la interfaz de usuario que puede manejar su propio estado y lógica. Los componentes permiten dividir la interfaz en partes independientes, facilitando su desarrollo y mantenimiento.

Existen dos tipos principales de componentes en React:

- **Componentes Funcionales**: Son funciones de JavaScript que pueden recibir propiedades (props) y retornan elementos JSX que representan la interfaz de usuario.
- **Componentes de Clase** (No los usaremos en este curso): Eran la forma tradicional de crear componentes con estado antes de la introducción de los Hooks en React 16.8. Ahora, los componentes funcionales son la opción preferida.

```jsx
// Componente funcional
function Saludo() {
  return <h1>¡Hola, mundo!</h1>;
}
// Componente de clase
class Saludo extends React.Component {
  render() {
    return <h1>¡Hola, mundo!</h1>;
  }
}
```

---

### **Creación de Componentes Funcionales**

Un **componente funcional** es simplemente una función de JavaScript que retorna JSX.

**Ejemplo básico:**

```jsx
function Saludo() {
  return <h1>¡Hola, mundo!</h1>;
}

export default Saludo;
```

Puedes también utilizar una **función flecha**:

```jsx
const Saludo = () => {
  return <h1>¡Hola, mundo!</h1>;
};

export default Saludo;
```

**Uso del componente en tu aplicación:**

```jsx
import Saludo from './Saludo';

function App() {
  return (
    <div>
      <Saludo />
    </div>
  );
}

export default App;
```

---

### **Props y cómo pasarlas a los componentes**

Las **props** (propiedades) son una forma de pasar datos de un componente padre a un componente hijo. Son similares a los parámetros de una función.

**Paso 1: Definir props en el componente hijo**

```jsx
function Saludo(props) {
  return <h1>¡Hola, {props.nombre}!</h1>;
}
```

Alternativamente, puedes usar **desestructuración** para acceder directamente a las props:

```jsx
function Saludo({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>;
}
```

**Paso 2: Pasar props desde el componente padre**

```jsx
function App() {
  return (
    <div>
      <Saludo nombre="María" />
    </div>
  );
}
```

**Ejemplo completo:**

```jsx
// Saludo.jsx
function Saludo({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>;
}

export default Saludo;

// App.jsx
import Saludo from './Saludo';

function App() {
  return (
    <div>
      <Saludo nombre="Carlos" />
      <Saludo nombre="Ana" />
      <Saludo nombre="Luis" />
    </div>
  );
}

export default App;
```

**Pasar múltiples props:**

```jsx
function Usuario({ nombre, edad }) {
  return (
    <div>
      <p>Nombre: {nombre}</p>
      <p>Edad: {edad}</p>
    </div>
  );
}

// Uso en App.jsx
<Usuario nombre="Laura" edad={25} />
```

---

### **Composición y reutilización de componentes**

La **composición** es una técnica que permite construir componentes complejos a partir de componentes más simples. Esto promueve la reutilización de código y una estructura más organizada.

**Ejemplo: Componentes anidados**

Supongamos que queremos crear una tarjeta de perfil de usuario.

**Paso 1: Crear componentes simples**

```jsx
// Avatar.jsx
function Avatar({ urlImagen, alt }) {
  return <img src={urlImagen} alt={alt} />;
}

// InformacionUsuario.jsx
function InformacionUsuario({ nombre, bio }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>{bio}</p>
    </div>
  );
}
```

**Paso 2: Componer componentes en uno más complejo**

```jsx
// TarjetaPerfil.jsx
import Avatar from './Avatar';
import InformacionUsuario from './InformacionUsuario';

function TarjetaPerfil({ usuario }) {
  return (
    <div className="tarjeta-perfil">
      <Avatar urlImagen={usuario.imagen} alt={usuario.nombre} />
      <InformacionUsuario nombre={usuario.nombre} bio={usuario.bio} />
    </div>
  );
}

export default TarjetaPerfil;
```

**Paso 3: Usar el componente compuesto en la aplicación**

```jsx
// App.jsx
import TarjetaPerfil from './TarjetaPerfil';

function App() {
  const usuario = {
    nombre: 'Sofia',
    bio: 'Desarrolladora web entusiasta.',
    imagen: 'https://ejemplo.com/sofia.jpg',
  };

  return (
    <div>
      <TarjetaPerfil usuario={usuario} />
    </div>
  );
}

export default App;
```

---

### **Ejemplo práctico: Lista de productos**

Vamos a crear una lista de productos utilizando componentes funcionales y props.

**Paso 1: Definir el componente `Producto`**

```jsx
function Producto({ nombre, precio, descripcion }) {
  return (
    <div className="producto">
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p>Precio: ${precio}</p>
    </div>
  );
}

export default Producto;
```

**Paso 2: Crear el componente `ListaProductos`**

```jsx
import Producto from './Producto';

function ListaProductos({ productos }) {
  return (
    <div>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          descripcion={producto.descripcion}
        />
      ))}
    </div>
  );
}

export default ListaProductos;
```

**Paso 3: Usar `ListaProductos` en `App`**

```jsx
import ListaProductos from './ListaProductos';

function App() {
  const productos = [
    {
      id: 1,
      nombre: 'Camiseta',
      precio: 20,
      descripcion: 'Camiseta 100% algodón.',
    },
    {
      id: 2,
      nombre: 'Pantalones',
      precio: 40,
      descripcion: 'Pantalones cómodos y elegantes.',
    },
    {
      id: 3,
      nombre: 'Zapatos',
      precio: 60,
      descripcion: 'Zapatos de cuero genuino.',
    },
  ];

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ListaProductos productos={productos} />
    </div>
  );
}

export default App;
```

---

### **Buenas prácticas con componentes funcionales**

- **Nombrar componentes con PascalCase**: Por convención, los componentes se nombran con la primera letra en mayúscula.

  ```jsx
  function MiComponente() {
    return <div>Contenido</div>;
  }
  ```

- **Usar desestructuración en las props**: Facilita el acceso a las propiedades y hace el código más legible.

  ```jsx
  function Saludo({ nombre }) {
    return <h1>Hola, {nombre}</h1>;
  }
  ```

- **Evitar la mutación de props**: Las props son de solo lectura. No intentes modificar sus valores dentro del componente.

- **Dividir componentes grandes en más pequeños**: Si un componente crece demasiado, considera dividirlo en componentes más pequeños y manejables.

---

### **Uso de props.children**

`props.children` es una propiedad especial que representa los elementos hijos que se pasan a un componente.

**Ejemplo: Componente de cuadro**

```jsx
function Cuadro({ titulo, children }) {
  return (
    <div className="cuadro">
      <h2>{titulo}</h2>
      <div>{children}</div>
    </div>
  );
}

export default Cuadro;
```

**Uso en `App`**

```jsx
function App() {
  return (
    <div>
      <Cuadro titulo="Información importante">
        <p>Este es el contenido del cuadro.</p>
      </Cuadro>
    </div>
  );
}

export default App;
```

---

### **Hooks en componentes funcionales**

Los **Hooks** permiten agregar estado y otras características a los componentes funcionales.

**Uso de `useState` para manejar estado**

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}

export default Contador;
```

---

### **Ejercicio**

Crea una aplicación de lista de tareas donde puedas agregar y mostrar tareas utilizando componentes funcionales.

**Paso 1: Crear el componente `FormularioTarea` para agregar nuevas tareas**

```jsx
import { useState } from 'react';

function FormularioTarea({ agregarTarea }) {
  const [texto, setTexto] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    agregarTarea(texto);
    setTexto('');
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;
```

**Paso 2: Crear el componente `ListaTareas` para mostrar las tareas**

```jsx
function ListaTareas({ tareas }) {
  return (
    <ul>
      {tareas.map((tarea, index) => (
        <li key={index}>{tarea}</li>
      ))}
    </ul>
  );
}

export default ListaTareas;
```

**Paso 3: Integrar en `App`**

```jsx
import { useState } from 'react';
import FormularioTarea from './FormularioTarea';
import ListaTareas from './ListaTareas';

function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (tarea) => {
    setTareas([...tareas, tarea]);
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <FormularioTarea agregarTarea={agregarTarea} />
      <ListaTareas tareas={tareas} />
    </div>
  );
}

export default App;
```

---

