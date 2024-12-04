# useState

**Clase 5: Estado en Componentes**

En esta clase, exploraremos el concepto de **estado (state)** en React, centrándonos en cómo manejarlo en **componentes funcionales** utilizando el Hook `useState`. Aprenderemos qué es el estado, cómo actualizarlo y cómo utilizarlo para crear componentes interactivos y dinámicos.

---

### **Introducción al estado (`state`)**

**Estado** es un objeto que representa información interna y dinámica de un componente que puede cambiar a lo largo del tiempo. A diferencia de las **props**, que son inmutables y se utilizan para pasar datos de un componente padre a un hijo, el **estado** es mutable y se utiliza para manejar datos que pueden cambiar en respuesta a acciones del usuario, eventos del sistema o cualquier otra interacción.

**Características del estado:**

- **Interno al componente**: Cada componente puede tener su propio estado.
- **Mutable**: Puede cambiar usando funciones específicas.
- **Reactividad**: Cuando el estado cambia, React vuelve a renderizar el componente para reflejar el nuevo estado.

---

### **Manejo del estado en componentes funcionales**

Con la introducción de los **Hooks** en React 16.8, es posible manejar el estado en componentes funcionales utilizando el Hook `useState`.

#### **Uso básico de `useState`**

El Hook `useState` permite agregar estado a componentes funcionales. Se importa desde React y se utiliza de la siguiente manera:

```jsx
import { useState } from 'react';

function MiComponente() {
  const [estado, setEstado] = useState(valorInicial);

  // ...

  return (
    // ...
  );
}
```

- **`estado`**: Es la variable que contiene el valor actual del estado.
- **`setEstado`**: Es una función que actualiza el valor del estado.
- **`useState(valorInicial)`**: Inicializa el estado con `valorInicial`.

**Ejemplo sencillo: Contador**

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;
```

**Explicación:**

- Iniciamos el estado `contador` en `0`.
- Al hacer clic en el botón, llamamos a `setContador` para actualizar el estado incrementándolo en `1`.
- Al cambiar el estado, el componente se vuelve a renderizar y muestra el nuevo valor de `contador`.

---

### **Actualización y mutación del estado**

#### **Reglas importantes al actualizar el estado:**

1. **No mutar directamente el estado**: Siempre usar la función de actualización proporcionada por `useState`.
2. **Las actualizaciones de estado pueden ser asincrónicas**: No dependa del valor actual del estado inmediatamente después de llamarlo.
3. **Las actualizaciones de estado son reemplazos, no fusiones**: Al actualizar objetos o arrays, asegúrese de copiar y actualizar correctamente.

#### **Ejemplo: No mutar directamente el estado**

**Incorrecto:**

```jsx
function Lista() {
  const [items, setItems] = useState([1, 2, 3]);

  const agregarItem = () => {
    items.push(4); // No hacer esto
    setItems(items);
  };

  // ...
}
```

**Correcto:**

```jsx
function Lista() {
  const [items, setItems] = useState([1, 2, 3]);

  const agregarItem = () => {
    setItems([...items, 4]);
  };

  // ...
}
```

- Usamos el operador **spread (`...`)** para crear una nueva copia del array con el nuevo elemento.

#### **Actualización basada en el estado anterior**

Cuando la actualización del estado depende del valor anterior, es recomendable utilizar la función de actualización que recibe el estado previo.

**Ejemplo:**

```jsx
function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(prevContador => prevContador + 1);
  };

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}
```

- `setContador(prevContador => prevContador + 1);`: Recibe el valor previo de `contador` y devuelve el nuevo valor.

---

### **Ejemplos prácticos con estado local**

#### **Ejemplo 1: Formulario controlado**

Crear un formulario donde el valor del input se maneja con el estado.

```jsx
import { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');

  const manejarCambio = (e) => {
    setNombre(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    alert(`Hola, ${nombre}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={manejarCambio} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
```

**Explicación:**

- El estado `nombre` almacena el valor del input.
- Al cambiar el valor del input, se actualiza el estado con `setNombre`.
- Al enviar el formulario, se muestra un mensaje de saludo con el nombre ingresado.

#### **Ejemplo 2: Mostrar/Ocultar elemento**

Crear un botón que muestre u oculte un elemento en la interfaz.

```jsx
import { useState } from 'react';

function MostrarOcultar() {
  const [visible, setVisible] = useState(true);

  const alternarVisibilidad = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={alternarVisibilidad}>
        {visible ? 'Ocultar' : 'Mostrar'} Mensaje
      </button>
      {visible && <p>Este es un mensaje que puede ser ocultado.</p>}
    </div>
  );
}

export default MostrarOcultar;
```

**Explicación:**

- El estado `visible` determina si el mensaje se muestra o no.
- Al hacer clic en el botón, se alterna el valor de `visible`.
- Se utiliza renderizado condicional para mostrar u ocultar el mensaje.

#### **Ejemplo 3: Lista dinámica de tareas**

Crear una aplicación simple de lista de tareas donde puedas agregar y eliminar tareas.

```jsx
import { useState } from 'react';

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (texto.trim() !== '') {
      setTareas([...tareas, texto]);
      setTexto('');
    }
  };

  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}{' '}
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
```

**Explicación:**

- **Estados utilizados:**
  - `tareas`: Array que almacena las tareas.
  - `texto`: Almacena el texto ingresado en el input.
- **Funciones:**
  - `agregarTarea`: Añade una nueva tarea al array `tareas`.
  - `eliminarTarea`: Elimina una tarea específica del array.
- **Renderizado:**
  - Se muestra una lista (`ul`) con las tareas actuales.
  - Cada tarea tiene un botón para eliminarla.

---

### **Manejo de estado con objetos y arrays**

Cuando el estado es un objeto o array, es importante actualizarlo correctamente para mantener la inmutabilidad.

#### **Actualizando objetos en el estado**

**Ejemplo:**

```jsx
function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: 'Ana',
    edad: 28,
    ciudad: 'Madrid',
  });

  const actualizarCiudad = () => {
    setUsuario({ ...usuario, ciudad: 'Barcelona' });
  };

  return (
    <div>
      <p>Nombre: {usuario.nombre}</p>
      <p>Edad: {usuario.edad}</p>
      <p>Ciudad: {usuario.ciudad}</p>
      <button onClick={actualizarCiudad}>Cambiar Ciudad</button>
    </div>
  );
}
```

**Explicación:**

- Usamos el operador **spread** para copiar el objeto `usuario` y actualizar solo la propiedad `ciudad`.
- Esto evita mutar directamente el estado y asegura que React detecte el cambio.

#### **Actualizando arrays en el estado**

**Ejemplo:**

```jsx
function ListaFrutas() {
  const [frutas, setFrutas] = useState(['Manzana', 'Banana']);

  const agregarFruta = () => {
    setFrutas([...frutas, 'Naranja']);
  };

  return (
    <div>
      <ul>
        {frutas.map((fruta, index) => (
          <li key={index}>{fruta}</li>
        ))}
      </ul>
      <button onClick={agregarFruta}>Agregar Naranja</button>
    </div>
  );
}
```

**Explicación:**

- Al agregar una nueva fruta, creamos un nuevo array con el operador **spread**.
- Esto mantiene la inmutabilidad del estado.

---

### **Buenas prácticas al manejar el estado**

1. **No mutar directamente el estado**: Siempre crear nuevas copias de objetos o arrays al actualizar el estado.
2. **Usar funciones de actualización basadas en el estado anterior cuando sea necesario**: Especialmente en actualizaciones concurrentes.
3. **Mantener el estado lo más simple posible**: Evita tener estados innecesariamente complejos.
4. **Evitar efectos secundarios en las funciones de actualización del estado**: Las funciones de actualización deben ser puras.

---

### **Ejercicio propuesto**

Crea un componente `Calculadora` que permita sumar, restar, multiplicar y dividir dos números ingresados por el usuario.

**Paso 1: Crear el componente**

```jsx
import { useState } from 'react';

function Calculadora() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);

  const manejarCambio1 = (e) => setNumero1(e.target.value);
  const manejarCambio2 = (e) => setNumero2(e.target.value);

  const sumar = () => setResultado(Number(numero1) + Number(numero2));
  const restar = () => setResultado(Number(numero1) - Number(numero2));
  const multiplicar = () => setResultado(Number(numero1) * Number(numero2));
  const dividir = () => setResultado(Number(numero1) / Number(numero2));

  return (
    <div>
      <h2>Calculadora Simple</h2>
      <input type="number" value={numero1} onChange={manejarCambio1} />
      <input type="number" value={numero2} onChange={manejarCambio2} />
      <div>
        <button onClick={sumar}>Sumar</button>
        <button onClick={restar}>Restar</button>
        <button onClick={multiplicar}>Multiplicar</button>
        <button onClick={dividir}>Dividir</button>
      </div>
      {resultado !== null && <p>Resultado: {resultado}</p>}
    </div>
  );
}

export default Calculadora;
```

**Explicación:**

- **Estados utilizados:**
  - `numero1` y `numero2`: Almacenan los números ingresados.
  - `resultado`: Almacena el resultado de la operación.
- **Funciones:**
  - `sumar`, `restar`, `multiplicar`, `dividir`: Actualizan el estado `resultado` con la operación correspondiente.
- **Renderizado:**
  - Inputs para ingresar números.
  - Botones para seleccionar la operación.
  - Muestra el resultado si está disponible.

---
