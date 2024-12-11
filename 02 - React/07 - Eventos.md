# Manejo de Eventos

Nos centraremos en cómo manejar eventos en React, entendiendo la diferencia entre los **eventos sintéticos** proporcionados por React y los eventos nativos del navegador, así como las formas de prevenir comportamientos por defecto y detener la propagación de eventos.

---

### Eventos Sintéticos en React

React utiliza un sistema interno para manejar eventos conocido como **"eventos sintéticos"**. Estos eventos sintéticos son objetos que se construyen en base a los eventos nativos del navegador, pero con compatibilidad asegurada entre diferentes navegadores y una API consistente.

- Los eventos sintéticos funcionan de manera similar a los eventos nativos del DOM.
- Sus nombres siguen la convención **camelCase**: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, etc.
- Los eventos se asocian a componentes de React como atributos.

**Ejemplo básico:**

```jsx
function Boton() {
  const manejarClick = () => {
    console.log('Botón clickeado');
  };

  return <button onClick={manejarClick}>Clic aquí</button>;
}
```

- El evento `onClick` recibe una función, no el resultado de una función. Por eso se pasa `manejarClick` sin paréntesis.
- Cuando el botón se hace clic, se ejecuta la función `manejarClick`.

---

### Enlace y Manejo de Eventos en Componentes

En React, el manejo de eventos se hace con funciones. Puedes definir las funciones para manejar eventos dentro del mismo componente o importarlas de otro lugar.

**1. Manejadores inline vs externos:**

```jsx
// Manejador inline
<button onClick={() => console.log('Clic inline!')}>Clic Inline</button>

// Manejador en función
function manejarClick() {
  console.log('Clic en función!');
}

<button onClick={manejarClick}>Clic Función</button>
```

**2. Pasando parámetros a eventos:**

```jsx
function Lista({ items }) {
  const manejarClick = (item) => {
    console.log('Item clickeado:', item);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {/* Usar una función flecha para pasar parámetros */}
          <button onClick={() => manejarClick(item)}>Seleccionar {item}</button>
        </li>
      ))}
    </ul>
  );
}
```

- Al usar una función flecha dentro del evento, puedes pasar argumentos al manejador.
- Evita definir funciones inline muy complejas, ya que se crean en cada render. Sin embargo, para casos simples, está bien.

---

### Prevención del Comportamiento por Defecto y Propagación de Eventos

Algunos elementos HTML tienen comportamientos por defecto que puede que desees prevenir. Por ejemplo, los enlaces recargan la página y los formularios envían datos al servidor.

**1. Prevenir comportamiento por defecto (`preventDefault`)**

```jsx
function Formulario() {
  const manejarSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página
    console.log('Formulario enviado lógicamente');
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" placeholder="Nombre" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

- El objeto del evento sintético se pasa automáticamente a la función manejadora, por lo que `e.preventDefault()` funciona como en los eventos nativos.
- `e` es un **SyntheticEvent** de React, con una interfaz similar al evento nativo.

**2. Detener la propagación del evento (`stopPropagation`)**

A veces, querrás evitar que un evento que ocurre en un elemento hijo se propague a su elemento padre.

```jsx
function CajaPadre() {
  const manejarClickPadre = () => {
    console.log('Clic en el padre');
  };

  return (
    <div onClick={manejarClickPadre} style={{ border: '1px solid blue', padding: '20px' }}>
      Padre
      <CajaHija />
    </div>
  );
}

function CajaHija() {
  const manejarClickHija = (e) => {
    e.stopPropagation(); // Evita que el evento llegue al padre
    console.log('Clic en la hija');
  };

  return (
    <div onClick={manejarClickHija} style={{ border: '1px solid red', margin: '10px' }}>
      Hija
    </div>
  );
}
```

- Al hacer clic en la caja hija, sin `stopPropagation`, el evento se propagaría hasta la caja padre, ejecutando ambos manejadores.
- Con `stopPropagation()`, el clic se detiene en la hija, no llegando al padre.

---

### Ejemplos Prácticos

#### 1. Lista de tareas con eliminación

```jsx
function ListaTareas({ tareas, eliminarTarea }) {
  return (
    <ul>
      {tareas.map((tarea, index) => (
        <li key={index}>
          {tarea} 
          <button onClick={() => eliminarTarea(index)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
```

- Cada botón "Eliminar" llama a una función que recibe el índice de la tarea a eliminar.

#### 2. Navegación personalizada

```jsx
function LinkPersonalizado({ href, children }) {
  const manejarClick = (e) => {
    e.preventDefault();
    console.log(`Navegando a ${href} sin refrescar la página`);
    // Aquí podrías utilizar, por ejemplo, react-router para cambiar de ruta
  };

  return <a href={href} onClick={manejarClick}>{children}</a>;
}
```

- Se evita la navegación tradicional y se controla manualmente la acción en el manejador de eventos.

---

### Buenas Prácticas

1. **Nombrar las funciones manejadoras descriptivamente**:  
   Por ejemplo, `manejarSubmit`, `manejarClick`, `manejarCambioInput`.  
   Esto mejora la legibilidad del código.

2. **Evitar lógica compleja inline**:  
   Es mejor definir las funciones fuera del JSX, mejorando la claridad.

3. **Evitar el uso excesivo de `stopPropagation()`**:  
   Intenta diseñar tus componentes para no necesitar interrumpir la propagación a menudo.  
   Usa este método solo cuando realmente se requiera.

4. **Manejo de eventos compatible con accesibilidad**:  
   Considera la accesibilidad (por ejemplo, usando `onKeyDown` además de `onClick` para permitir interacción con el teclado).

---

### Ejercicio Propuesto

Crea un componente `MenuDesplegable` que:

- Renderice un botón "Abrir Menú".
- Al hacer clic en el botón, muestre una lista de opciones.
- Al hacer clic en una opción, se ejecute una función que reciba la opción elegida.
- Si se hace clic fuera del menú (fuera del botón y de la lista), el menú se cierra.

**Pistas:**

- Usa el estado para mostrar/ocultar el menú.
- Usa eventos como `onClick` en el `document` para detectar clics fuera del menú.
- Usa `e.stopPropagation()` para evitar que el clic en el menú se propague al documento.

```jsx
import { useState, useEffect, useRef } from 'react';

function MenuDesplegable({ opciones, onOpcionSeleccionada }) {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener('click', manejarClickFuera);
    return () => {
      document.removeEventListener('click', manejarClickFuera);
    };
  }, []);

  const manejarClickBoton = (e) => {
    e.stopPropagation();
    setAbierto(!abierto);
  };

  const manejarOpcionClick = (opcion) => {
    onOpcionSeleccionada(opcion);
    setAbierto(false);
  };

  return (
    <div ref={menuRef}>
      <button onClick={manejarClickBoton}>Abrir Menú</button>
      {abierto && (
        <ul onClick={(e) => e.stopPropagation()}>
          {opciones.map((opcion, index) => (
            <li key={index} onClick={() => manejarOpcionClick(opcion)}>
              {opcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuDesplegable;
```

---
