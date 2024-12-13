# Ciclo de Vida y Hooks

Con la llegada de los Hooks, el manejo del ciclo de vida en componentes funcionales ha cambiado de forma significativa. Antes, en los componentes de clase, teníamos métodos de ciclo de vida como `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`. Ahora, con componentes funcionales, utilizamos el Hook `useEffect` para manejar efectos secundarios y simular estos ciclos de vida.

---

### ¿Qué es el Ciclo de Vida?

El **ciclo de vida** de un componente se refiere a las diferentes etapas por las que pasa un componente desde que se monta en el DOM, se actualiza cuando cambian sus props o estado, hasta que se desmonta del DOM. En componentes funcionales, no existen métodos explícitos de ciclo de vida, sino que todo se maneja mediante **Hooks**, principalmente con `useEffect`.

---

### ¿Qué son los Hooks y por qué usarlos?

**Hooks** son funciones especiales de React que permiten utilizar estado y otras características de React sin escribir componentes de clase. Antes de los Hooks, era necesario usar componentes de clase para tener estado y ciclo de vida. Con Hooks:

- **Menos código y más legibilidad**: Reducen la complejidad que tenían los componentes de clase.
- **Reutilización de lógica de estado**: Puedes compartir lógica entre componentes sin cambiar su jerarquía.
- **Transición sencilla a componentes funcionales**: Ya no necesitas clases para manejar estado o efectos secundarios.

Los Hooks más comunes son:

- **`useState`**: Para manejar el estado local en componentes funcionales.
- **`useEffect`**: Para manejar efectos secundarios (ciclo de vida).
- **`useContext`**: Para consumir contextos sin necesidad de prop drilling.
  
Y hay otros Hooks nativos como `useReducer`, `useCallback`, `useMemo`, así como la posibilidad de crear tus propios Hooks personalizados.

---

### Reglas de los Hooks

1. **Usar Hooks solo en el nivel superior del componente**: No los llames dentro de bucles, condicionales o funciones anidadas. Deben estar siempre en la raíz de la función del componente.
  
2. **Usar Hooks solo en componentes funcionales**: No los llames en clases o fuera de componentes de React. Puedes llamarlos en tus propios Hooks personalizados, que también son funciones.

3. **Respetar el orden de llamadas a Hooks**: Cada render del componente debe llamar a los Hooks en el mismo orden para que React pueda preservar el estado adecuadamente.

Estas reglas aseguran que React pueda seguir el estado de manera confiable entre renderizados.

---

### `useEffect`: El Hook para efectos secundarios

`useEffect` nos permite ejecutar efectos secundarios en componentes funcionales. Los efectos secundarios son cualquier operación que no se limite al cálculo o renderizado puro, por ejemplo:

- Llamadas a APIs (fetching de datos)
- Suscripciones a eventos del navegador o WebSockets
- Manipulaciones directas del DOM
- Temporizadores o intervalos

**Sintaxis básica:**

```jsx
import { useEffect } from 'react';

function MiComponente() {
  useEffect(() => {
    // Código del efecto
  });

  return <div>Hola</div>;
}
```

**¿Cuándo se ejecuta el efecto?**  
Por defecto, el efecto se ejecuta después de cada renderizado del componente (incluyendo el montaje y cada actualización).

---

### Controlando Cuándo se Ejecuta el Efecto

Podemos controlar cuándo se ejecuta el efecto pasando un segundo parámetro a `useEffect`: un array de dependencias.

**Array de dependencias vacío (`[]`):**  
Si pasas un array vacío, el efecto se ejecutará **solo una vez** cuando el componente se monte.

```jsx
useEffect(() => {
  console.log('Componente montado');
}, []);
```

**Dependencias específicas:**  
Si pasas variables en el array, el efecto se ejecutará cada vez que alguna de esas variables cambie.

```jsx
const [contador, setContador] = useState(0);

useEffect(() => {
  console.log('El contador cambió:', contador);
}, [contador]);
```

- Este efecto se ejecuta al montar el componente y cada vez que `contador` cambie.

---

### Limpiar los Efectos

Algunos efectos, como suscripciones o intervalos, deben limpiarse (cancelarse) cuando el componente se desmonte o antes de ejecutar el efecto siguiente. Para ello, `useEffect` puede retornar una función de limpieza.

**Ejemplo: Temporizador con limpieza**

```jsx
function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Retorna una función de limpieza que se ejecuta al desmontar o antes de re-renderizar
    return () => clearInterval(intervalId);
  }, []);

  return <div>Hora actual: {hora.toLocaleTimeString()}</div>;
}
```

- El efecto crea un intervalo que actualiza la hora cada segundo.
- La función retornada por `useEffect` se encarga de limpiar el intervalo cuando el componente se desmonte, evitando fugas de memoria.

---

### Simulando Métodos del Ciclo de Vida de Clases con Hooks

- **`componentDidMount`**: Se simula utilizando `useEffect` con un array de dependencias vacío (`[]`). El código dentro del efecto se ejecuta una vez que el componente se monta.

  ```jsx
  useEffect(() => {
    console.log('Componente montado');
  }, []);
  ```

- **`componentDidUpdate`**: Se simula usando `useEffect` especificando las dependencias. Cada vez que alguna dependencia cambie, se ejecuta el efecto.

  ```jsx
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('Componente actualizado, contador:', contador);
  }, [contador]);
  ```

- **`componentWillUnmount`**: Se simula retornando una función de limpieza. Esta función se ejecuta cuando el componente se va a desmontar.

  ```jsx
  useEffect(() => {
    console.log('Componente montado');

    return () => {
      console.log('Componente desmontado');
    };
  }, []);
  ```

---

### Ejemplos Prácticos

#### 1. Fetching de datos

Cargar datos de una API al montar el componente.

```jsx
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error(error));
  }, []); // Se ejecuta una sola vez al montar

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
}
```

- Al montar el componente, se realiza la solicitud a la API y se guardan los usuarios en el estado.
- Cuando `usuarios` cambie, el componente se vuelve a renderizar mostrando los datos actualizados.

#### 2. Escuchar y limpiar eventos del navegador

Suscribirse a un evento del navegador al montar el componente y desuscribirse al desmontar.

```jsx
function VentanaResize() {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    const manejarResize = () => setAncho(window.innerWidth);
    window.addEventListener('resize', manejarResize);

    return () => {
      // Limpiar el evento al desmontar
      window.removeEventListener('resize', manejarResize);
    };
  }, []);

  return <p>El ancho de la ventana es: {ancho}px</p>;
}
```

- El efecto se suscribe al evento `resize` al montar.
- La función de limpieza se encarga de remover el evento al desmontar.

---

### Buenas Prácticas con `useEffect`

1. **Efectos específicos por tarea**: Intenta mantener los efectos enfocados a una sola tarea (fetch de datos, temporizador, etc.).
2. **Evitar hacer demasiadas cosas en un solo efecto**: Si el efecto se vuelve muy complejo, considera dividirlo en varios efectos.
3. **Dependencias correctas**: Asegúrate de incluir todas las variables que el efecto utiliza en el array de dependencias. Esto asegura que React sepa cuándo volver a ejecutarlo.
4. **Cuidado con los bucles infinitos**: Si olvidas agregar el array de dependencias, el efecto se ejecutará después de cada render, potencialmente creando bucles infinitos.

---

### Ejercicio Propuesto

Crea un componente `Buscador` que:

- Tenga un input para ingresar un término de búsqueda.
- Use `useEffect` para ejecutar una búsqueda (simulada con `setTimeout`) cada vez que el término cambie.
- Muestra un mensaje mientras se "cargan" los resultados y luego muestra el resultado simulado.

**Pista:**

```jsx
import { useState, useEffect } from 'react';

const products = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honey'
]

function Buscador() {
  const [termino, setTermino] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [items, setItems] = useState([])

  useEffect(() => {
    if (termino === '') {
      setResultado(null);
      return;
    }

    setResultado(`Resultados para "${termino}"`);
    setItems(products.filter(product => product.toLowerCase().includes(termino)))
  }, [termino]);

  return (
    <div>
      <input
        type="text"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Escribe algo para buscar"
      />
      {cargando && <p>Cargando...</p>}
      {resultado && <p>{resultado}</p>}
      <ul>
        {items.map(item => (
          <li><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default Buscador;

```

- Cuando el usuario escribe en el input, se actualiza `termino`.
- El efecto se vuelve a ejecutar, mostrando "Cargando..." y luego, tras 1 segundo, simula la entrega de resultados.
- Si se cambia el término durante la carga, la función de limpieza cancela el temporizador anterior antes de iniciar uno nuevo.

---

### Conclusión

- Cómo el ciclo de vida de los componentes se maneja en componentes funcionales a través de Hooks, principalmente con `useEffect`.
- Cómo `useEffect` puede simular `componentDidMount`, `componentDidUpdate` y `componentWillUnmount` dependiendo de cómo lo utilicemos.
- Cómo limpiar efectos y manejar dependencias para controlar cuándo se ejecutan.

Comprender el uso de `useEffect` es esencial para manejar efectos secundarios, suscripciones, temporizadores y cualquier operación que ocurra fuera del renderizado puro en React.

---

