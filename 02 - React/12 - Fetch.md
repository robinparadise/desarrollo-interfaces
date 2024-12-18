# Fetch

**Clase 13: Fetching de Datos**

Aprenderemos a obtener datos desde APIs u otros recursos externos dentro de React. Utilizarás funciones como `fetch` (nativo del navegador) o librerías como `axios` para hacer solicitudes HTTP, manejarás estados de carga y error, y mostrarás los resultados en tu interfaz. Además, aprenderás a usar `useEffect` para realizar el fetching al montar el componente, y a mostrar mensajes de "Cargando..." o errores dependiendo del estado de la petición.

**Ejemplo:**

```jsx
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/usuarios')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener usuarios');
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.nombre}</li>
      ))}
    </ul>
  );
}

export default ListaUsuarios;
```

