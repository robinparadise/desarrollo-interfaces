# Router

Ahora nos adentraremos en el enrutamiento en aplicaciones React, utilizando **React Router**, una de las librerías más populares y flexibles para gestionar navegación y rutas en aplicaciones de una sola página (SPA). Veremos cómo instalar y configurar React Router, cómo definir rutas y componentes de ruta, cómo crear enlaces de navegación entre páginas y cómo trabajar con parámetros dinámicos y rutas anidadas.

---

### ¿Por Qué React Router?

En una aplicación React normal, tenemos un archivo `index.html` estático que sirve como punto de entrada. React utiliza el Virtual DOM para actualizar la vista, pero si necesitamos múltiples "pantallas" o "vistas" sin recargar la página, necesitamos un sistema de rutas. **React Router** nos permite:

- Definir diferentes "páginas" o vistas asociadas a determinadas URL.
- Navegar entre esas páginas sin recargar el navegador.
- Mantener una buena organización del código, separando lógicamente cada vista.

---

### Instalación y Configuración de React Router

React Router se distribuye en múltiples paquetes, el más común para aplicaciones web es `react-router-dom`:

**Instalación:**

```bash
npm install react-router-dom
```

o con Yarn:

```bash
yarn add react-router-dom
```

Una vez instalado, podemos importar sus componentes y funciones en nuestros archivos. En React Router v6, la configuración es más directa.

**Configuración Básica:**

1. En el punto de entrada de tu aplicación, normalmente en `App.jsx` o en un componente contenedor, envuelve tu aplicación con `<BrowserRouter>`:

   ```jsx
   import { BrowserRouter } from 'react-router-dom';

   function App() {
     return (
       <BrowserRouter>
         {/* Aquí van las rutas y componentes */}
       </BrowserRouter>
     );
   }

   export default App;
   ```

2. Dentro de `<BrowserRouter>`, utilizaremos `<Routes>` y `<Route>` para definir las distintas rutas.

---

### Definición de Rutas y Componentes de Ruta

React Router trabaja con el concepto de "routing declarativo". Definimos las rutas y qué componente se renderizará para cada una.

**Ejemplo básico de rutas:**

```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Explicación:**

- `<Routes>`: Contenedor para todas las rutas de la aplicación.
- `<Route path="/" element={<Home />} />`: Define que la URL raíz (`/`) mostrará el componente `Home`.
- `<Route path="/about" element={<About />} />`: Define que la URL `/about` mostrará el componente `About`.

**Comportamiento:**

- Cuando el usuario accede a `http://localhost:3000/`, verá `<Home />`.
- Cuando accede a `http://localhost:3000/about`, verá `<About />`.

---

### Navegación entre Páginas con Link y NavLink

Para navegar entre rutas sin recargar la página, utilizamos el componente `<Link>` proporcionado por React Router.

**Ejemplo con `<Link>`:**

```jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca</Link>
    </nav>
  );
}
```

- `to` especifica la ruta a la que queremos navegar.
- Al hacer clic en los enlaces, la aplicación cambia de vista sin recargar el navegador.

**`<NavLink>` para enlaces activos:**

`<NavLink>` es similar a `<Link>`, pero permite estilos o clases especiales cuando la ruta está activa.

```jsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'link-activo' : ''}
      >
        Acerca
      </NavLink>
    </nav>
  );
}
```

- `NavLink` recibe una función para `style` o `className` que entrega un objeto `{ isActive: boolean }` para determinar si la ruta actual coincide con el `to`.
- Esto facilita indicar visualmente al usuario la página en la que se encuentra.

---

### Parámetros en las Rutas

A menudo necesitamos rutas dinámicas, por ejemplo, `/users/123` para mostrar el perfil del usuario con ID 123.

**Definición de ruta con parámetro:**

```jsx
import { Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- `:id` define un parámetro dinámico llamado `id`.

**Acceder al parámetro en el componente:**

En `UserProfile`, podemos obtener el valor del parámetro usando `useParams()`:

```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  // 'id' contendrá el valor pasado en la URL, p. ej. '123'
  
  return <div>Perfil de usuario con ID: {id}</div>;
}

export default UserProfile;
```

- Si navegamos a `http://localhost:3000/users/123`, `id` será `'123'`.

**Uso múltiple de parámetros:**

```jsx
<Route path="/products/:category/:id" element={<ProductDetail />} />
```

En `ProductDetail`, podríamos hacer:

```jsx
const { category, id } = useParams();
// category e id contendrán los valores de la URL.
```

---

### Rutas Anidadas

React Router permite crear rutas "hijas" o anidadas, útiles para secciones de la app con subpáginas. Por ejemplo, una sección de administración con múltiples subrutas.

**Definición de rutas anidadas:**

```jsx
import AdminHome from './pages/AdminHome';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**Explicación:**

- `<Route path="/admin" element={<LayoutAdmin />}>`: Define una ruta padre `/admin`.  
- Rutas hijas:
  - `<Route index element={<AdminHome />} />`: Sin especificar `path`, esta ruta será `/admin` y mostrará `AdminHome`. La ruta `index` indica la ruta predeterminada del padre.
  - `<Route path="users" element={<AdminUsers />} />`: Equivale a `/admin/users`.
  - `<Route path="settings" element={<AdminSettings />} />`: Equivale a `/admin/settings`.

**Componente Padre (LayoutAdmin):**

```jsx
import { Outlet, Link } from 'react-router-dom';

function LayoutAdmin() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <nav>
        <Link to="/admin">Inicio</Link>
        <Link to="/admin/users">Usuarios</Link>
        <Link to="/admin/settings">Configuración</Link>
      </nav>
      <hr />
      {/* Outlet es el "placeholder" donde se renderizan las rutas hijas */}
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;
```

- `<Outlet>` renderiza el componente de la ruta hija que coincida con la URL actual.
- Si la URL es `/admin`, se mostrará `AdminHome`.
- Si la URL es `/admin/users`, se mostrará `AdminUsers` en el `<Outlet>`.

---

### Navegación Programática

Además de `<Link>` y `<NavLink>`, puedes navegar programáticamente usando el Hook `useNavigate()`.

```jsx
import { useNavigate } from 'react-router-dom';

function MiComponente() {
  const navigate = useNavigate();

  const irAAbout = () => {
    navigate('/about');
  };

  return <button onClick={irAAbout}>Ir a About</button>;
}
```

- `useNavigate` devuelve una función que permite cambiar la ruta imperativamente.
- Esto es útil, por ejemplo, después de guardar datos en un formulario, se puede redirigir al usuario a otra página.

---

### Redirecciones y Rutas Inexistentes

**Redirecciones:**  
Para redirigir se puede usar `navigate` dentro de un efecto (`useEffect`) o como respuesta a una acción del usuario.

**Rutas inexistentes (404):**  
Es común definir una ruta "catch-all" para manejar URLs desconocidas:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} /> 
</Routes>
```

- `path="*"` atrapa cualquier ruta no definida, mostrando `NotFound`.

---

### Buenas Prácticas con React Router

1. **Organizar las rutas en un solo archivo**: Muchos proyectos separan la definición de rutas en un archivo dedicado para facilitar el mantenimiento.
2. **Cargas Dinámicas (Code Splitting)**: Puedes usar `React.lazy` y `Suspense` para cargar componentes de rutas bajo demanda, mejorando el performance.
3. **Protección de Rutas**: Para restringir acceso a ciertas páginas (por ejemplo, panel de administración solo para usuarios logueados), puedes crear rutas protegidas que verifiquen la autenticación antes de renderizar el componente.
4. **Usar `NavLink` para mejorar la navegación**: Mostrar enlaces activos ayuda a la usabilidad.

---

### Ejercicio Propuesto

1. Crea una aplicación con las siguientes rutas:
   - `/`: Muestra un componente `Home`.
   - `/about`: Muestra un componente `About`.
   - `/users/:id`: Muestra un componente `UserDetail` que cargue datos de un usuario basado en el ID de la URL y los muestre.

2. Añade un menú de navegación con `<NavLink>` para ir a Home y About.

3. Añade un botón en `Home` que use `useNavigate` para redirigir a `/about`.

4. Implementa una ruta por defecto con `path="*"` que muestre un componente `NotFound`.

Este ejercicio te ayudará a poner en práctica la definición de rutas, parámetros, enlaces y navegación programática.

---

### Conclusión

- Cómo instalar y configurar React Router.
- Cómo definir rutas y renderizar componentes según la URL.
- Cómo crear enlaces de navegación con `<Link>` y `<NavLink>`.
- Cómo manejar parámetros dinámicos en las rutas con `useParams()`.
- Cómo crear rutas anidadas y usar `<Outlet>` para componentes de layout.
- Cómo navegar programáticamente con `useNavigate()`.

React Router proporciona una infraestructura sólida para construir aplicaciones React complejas con navegación intuitiva y sin recargas de página, aportando una excelente experiencia de usuario.

