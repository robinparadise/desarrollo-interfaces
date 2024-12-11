# Formularios y Componentes Controlados

Aprenderemos a manejar el input del usuario en React, comprenderemos la diferencia entre **componentes controlados** y **no controlados**, y veremos cómo implementar validaciones básicas. Además, exploraremos cómo manejar múltiples inputs en un mismo formulario.

---

### Manejo de Entradas de Usuario

En React, las entradas de usuario (inputs, selects, textareas) generalmente se manejan mediante el estado. De esta forma, la interfaz refleja el estado interno del componente, asegurando un flujo de datos unidireccional y predecible.

**Ejemplo básico:**

```jsx
import { useState } from 'react';

function FormularioSimple() {
  const [texto, setTexto] = useState('');

  const manejarCambio = (e) => {
    setTexto(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    alert(`Has escrito: ${texto}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" value={texto} onChange={manejarCambio} />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

- Cada cambio en el input dispara `onChange`, actualiza el estado y el valor del input se sincroniza con el estado.
- Este patrón convierte al input en un **componente controlado**.

---

### Componentes Controlados vs No Controlados

**Componentes Controlados:**  
Son aquellos cuyo valor se gestiona completamente a través del estado de React. El valor del input se establece desde el estado, y cualquier cambio se refleja actualizando el estado.

- Ventajas:  
  - Fuente de la verdad única: El estado determina el valor del input.  
  - Fácil validación y transformación de datos.  
  - Fácil de depurar y razonar sobre el flujo de datos.
  
**Ejemplo:**
```jsx
function InputControlado() {
  const [valor, setValor] = useState('');

  return <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />;
}
```

**Componentes No Controlados:**  
Son aquellos en los que no se gestiona el valor del input mediante el estado de React, sino que se accede al valor directamente desde el DOM cuando es necesario (por ejemplo, usando `ref`).

- Ventajas:  
  - Menos código y sobrecarga para inputs muy simples.  
- Desventajas:  
  - Puede ser más difícil mantener sincronizados los valores.  
  - Menos control sobre el flujo de datos y validación.

**Ejemplo:**
```jsx
import { useRef } from 'react';

function InputNoControlado() {
  const inputRef = useRef(null);

  const manejarSubmit = (e) => {
    e.preventDefault();
    alert(`Has escrito: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

- Aquí, `value` no depende del estado de React, sino directamente del DOM.

---

### Validación Básica de Formularios

La validación se puede manejar fácilmente cuando usamos componentes controlados, ya que el estado refleja el valor actual del input y podemos verificar su validez en cada cambio o al enviar el formulario.

**Ejemplo: Validar que un campo no esté vacío**

```jsx
import { useState } from 'react';

function FormularioValidado() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setError('El email no puede estar vacío');
      return;
    }
    setError('');
    alert(`Email enviado: ${email}`);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        placeholder="Ingresa tu email"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Enviar</button>
    </form>
  );
}
```

- Cada vez que el usuario escribe, actualizamos el estado `email`.
- Al enviar, validamos si el campo está vacío. Si lo está, mostramos un error.
- Si no hay errores, procedemos con la acción deseada.

**Mejoras en la validación:**

- Podemos validar otros criterios (formato de email, longitud mínima, etc.).
- Podemos validar en tiempo real o solo al enviar.
- Podemos mostrar errores específicos bajo cada input.

---

### Manejo de Múltiples Inputs

Para formularios con múltiples campos, podemos mantener todos los valores en un solo estado como un objeto, o tener estados separados por cada input. Manejar un objeto es una estrategia común, ya que facilita agregar y eliminar campos.

**Ejemplo con objeto de estado:**

```jsx
function FormularioMultiple() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={manejarCambio}
        placeholder="Nombre"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={manejarCambio}
        placeholder="Email"
      />
      <input
        type="number"
        name="edad"
        value={formData.edad}
        onChange={manejarCambio}
        placeholder="Edad"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Explicación:**

- Cada input tiene un `name` coincidiendo con una propiedad en el objeto `formData`.
- En `manejarCambio`, actualizamos el campo específico usando `[name]: value`.
- Esto permite escalar fácilmente cuando el formulario crece.

---

### Ejemplo de Validación Múltiple

Podemos integrar validación a cada campo en un formulario con múltiples inputs:

```jsx
function FormularioConValidacion() {
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    if (formData.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre no puede estar vacío';
    }
    if (formData.email.trim() === '') {
      nuevosErrores.email = 'El email no puede estar vacío';
    } else if (!formData.email.includes('@')) {
      nuevosErrores.email = 'El email debe contener @';
    }
    return nuevosErrores;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    alert('Formulario enviado correctamente');
    setErrores({});
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrores({
      ...errores,
      [name]: '',
    });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          placeholder="Nombre"
        />
        {errores.nombre && <span style={{ color: 'red' }}>{errores.nombre}</span>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={manejarCambio}
          placeholder="Email"
        />
        {errores.email && <span style={{ color: 'red' }}>{errores.email}</span>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

- La función `validar` verifica cada campo y genera un objeto `nuevosErrores` con mensajes por cada campo inválido.
- Si hay errores, se establecen en el estado `errores` y se muestran debajo de cada input.
- Si no hay errores, se procede con la lógica de envío (por ejemplo, guardar datos o llamar a una API).

---

### Ejercicio Propuesto

Crea un formulario de registro con los siguientes campos: `usuario`, `email`, `password`. Al enviar:

- Validar que todos los campos estén completos.
- Validar que `email` tenga un formato correcto (puedes usar una validación simple, como que contenga un `@`).
- Validar que `password` tenga al menos 6 caracteres.
- Si hay errores, mostrarlos debajo de cada campo.
- Si no hay errores, mostrar un mensaje de éxito.

Este ejercicio te ayudará a practicar el manejo de múltiples inputs, componentes controlados y validaciones básicas.

---

