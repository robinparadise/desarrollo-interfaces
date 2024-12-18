# Store Zustand

A diferencia de otros enfoques más complejos, como Redux, Zustand se destaca por su sencillez, flexibilidad y una curva de aprendizaje suave. Esta clase cubrirá los fundamentos de Zustand, cómo configurarlo y cómo integrarlo en tus componentes, además de algunos ejemplos prácticos.

---

### ¿Qué es Zustand?

**Zustand** es una librería de estado global para React que proporciona una API simple basada en funciones y Hooks, sin la complejidad de acciones, reducers o middlewares que se encuentran en soluciones más pesadas. Con Zustand, puedes:

- Crear un **store** de estado global usando una función.
- Acceder a ese estado desde cualquier componente mediante el Hook `useStore`.
- Actualizar el estado llamando a funciones directamente, sin acciones ni dispatchers.

### ¿Por qué usar Zustand?

- **Simplicidad**: Su API es más directa que la de Redux u otras librerías. No necesitas crear reducers ni tipos de acciones.
- **Rendimiento**: Zustand suscribe de forma fina a las partes del estado que cada componente necesita, minimizando re-renderizados innecesarios.
- **Flexibilidad**: Puedes definir el estado en una sola función, mezclar Hooks de React y lógica dentro de tu store, y estructurarlo a tu gusto.
- **Integración fácil**: No requiere una configuración compleja. Se instala y se usa rápidamente.

### Instalación

Para agregar Zustand a tu proyecto, ejecuta en la terminal:

```bash
npm install zustand
```

o con Yarn:

```bash
yarn add zustand
```

### Creación de un Store

En Zustand, creas el store definiendo una función que retorna un objeto con el estado y las funciones para actualizarlo. Luego, pasas esta función a `create` (importada de `zustand`) y obtienes un Hook que puedes utilizar en tus componentes.

**Ejemplo básico:**

```jsx
import create from 'zustand';

const useStore = create((set) => ({
  contador: 0,
  incrementar: () => set((state) => ({ contador: state.contador + 1 })),
  decrementar: () => set((state) => ({ contador: state.contador - 1 })),
}));

export default useStore;
```

**Explicación:**

- `create((set) => ({}))`: `set` es una función para actualizar el estado.
- Definimos `contador` con valor inicial `0`.
- Definimos `incrementar` y `decrementar`, que usan `set` para actualizar el estado.
- Esta función `create` devuelve el Hook `useStore`, que utilizaremos en los componentes para leer y actualizar el estado global.

### Uso del Store en los Componentes

Para leer o actualizar el estado en tus componentes, importas el Hook `useStore` y seleccionas las partes del estado que necesitas.

**Ejemplo en un componente:**

```jsx
import useStore from './store';

function Contador() {
  const { contador, incrementar, decrementar } = useStore((state) => ({
    contador: state.contador,
    incrementar: state.incrementar,
    decrementar: state.decrementar,
  }));

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={decrementar}>Decrementar</button>
    </div>
  );
}

export default Contador;
```

**Explicación:**

- `useStore((state) => ({}))`: Pasamos una función que recibe el estado completo y devuelve un objeto con las propiedades que queremos extraer.
- Obtenemos `contador`, `incrementar` y `decrementar` del estado global.
- Al presionar los botones, llamamos a las funciones para actualizar el estado global, y el componente se re-renderiza con el nuevo valor.

### Selección de Estado y Minimización de Renderizados

Zustand recomienda seleccionar solo las partes del estado que necesitas, evitando renderizados innecesarios.

Ejemplo: Si tu estado es más grande y el componente solo necesita `contador`, haz:

```jsx
import useStore from './store';

function SoloContador() {
  const contador = useStore((state) => state.contador);

  return <p>Valor: {contador}</p>;
}
```

De esta forma, el componente se actualizará solo cuando `contador` cambie.

### Ejemplo con Múltiples Componentes y Estado Compartido

Imagina un sistema de carrito de compras:

```jsx
import create from 'zustand';

const useCarritoStore = create((set) => ({
  items: [],
  agregarItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removerItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export default useCarritoStore;
```

Un componente `ListaProductos` que agrega productos al carrito:

```jsx
import useCarritoStore from './carritoStore';

function ListaProductos() {
  const agregarItem = useCarritoStore((state) => state.agregarItem);

  const productos = [
    { id: 1, nombre: 'Camiseta', precio: 20 },
    { id: 2, nombre: 'Pantalón', precio: 40 },
  ];

  return (
    <div>
      <h2>Productos</h2>
      {productos.map((prod) => (
        <div key={prod.id}>
          <span>{prod.nombre} - ${prod.precio}</span>
          <button onClick={() => agregarItem(prod)}>Agregar</button>
        </div>
      ))}
    </div>
  );
}
```

Y un componente `Carrito` para mostrar y manipular el estado global:

```jsx
import useCarritoStore from './carritoStore';

function Carrito() {
  const items = useCarritoStore((state) => state.items);
  const removerItem = useCarritoStore((state) => state.removerItem);

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nombre} - ${item.precio}
            <button onClick={() => removerItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Aquí `ListaProductos` y `Carrito` comparten el mismo estado global. `ListaProductos` modifica el estado agregando ítems, `Carrito` muestra el estado actual y permite eliminarlos. No es necesario pasar props entre ellos.

### Middleware y Persistencia del Estado

Zustand soporta middleware para ampliar sus funcionalidades. Por ejemplo, `zustand/middleware` incluye persistencia en `localStorage`:

```jsx
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    contador: 0,
    incrementar: () => set((state) => ({ contador: state.contador + 1 })),
  }),
  { name: 'mi-app' } // Clave en localStorage
));
```

El contador ahora se guardará en `localStorage` y al recargar la página se mantendrá su valor.

### Comparación con Otras Soluciones

- **Context + useReducer**: Zustand simplifica la lógica, evitando que pases Contextos por todos lados. Menos re-renderizados.
- **Redux**: Zustand es más ligero y requiere menos boilerplate. Redux, aunque más complejo, provee una estructura más estricta para apps grandes.
- **MobX, Recoil, Jotai**: Todas son buenas opciones. Zustand destaca por su sencillez y mínima infraestructura.

### Buenas Prácticas con Zustand

1. **Mantener el store claro y pequeño**: Define el estado según las necesidades. Evita crear un store gigante.
2. **Separar por funcionalidad**: Para proyectos grandes, múltiples stores especializados (auth, carrito, config) pueden ser útiles.
3. **Inmutabilidad**: Aunque Zustand no lo exige estrictamente, mantener el estado inmutable es buena práctica.
4. **Uso de selectores**: Seleccionar solo las partes del estado necesarias evita renderizados excesivos.

### Ejercicio Propuesto

Crea un store para manejar una lista de tareas (todos):

- Estado inicial: `todos = []`.
- Funciones:
  - `agregarTarea(tarea)` para agregar una nueva tarea.
  - `toggleTarea(id)` para alternar completada/no completada.
  
Crea dos componentes:
1. `ListaTareas`: Muestra las tareas y un botón para alternar su estado.
2. `AgregarTarea`: Contiene un input y un botón para agregar una tarea nueva.

Observa cómo ambos componentes pueden acceder y actualizar el mismo estado global sin pasar props entre sí.

---

### Conclusión

En esta clase aprendimos:

- Qué es Zustand y por qué puede ser más sencillo que otras herramientas.
- Cómo crear un store y usarlo en componentes.
- Cómo actualizar y leer el estado global de forma sencilla.
- Ejemplos prácticos que muestran su uso en escenarios reales.

Zustand es una gran opción cuando quieres un estado global simple, sin la complejidad ni el boilerplate de Redux u otras soluciones más complejas. Así, tu código será más conciso, claro y fácil de mantener.

---

¡Experimenta con Zustand en tus proyectos y descubre cómo simplifica la gestión de estado global en React!