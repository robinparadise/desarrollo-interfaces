# Context API

La **Context API** de React, una herramienta muy útil para compartir datos entre componentes sin tener que pasar props manualmente a través de múltiples niveles de la jerarquía de componentes (lo que se conoce como *prop drilling*). Aprenderemos qué problemas resuelve la Context API, cómo crear y usar contextos, y cómo consumirlos tanto con el patrón tradicional de `Provider`/`Consumer` como con el Hook `useContext`.

---

### Prop Drilling y sus Problemas

**Prop Drilling** ocurre cuando necesitas pasar datos de un componente padre a uno muy "profundo" en la jerarquía, y terminas pasando props intermedias a muchos componentes que realmente no las necesitan. Esto genera:

- Código más difícil de mantener.
- Componentes innecesariamente dependientes de datos que no utilizan.
- Dificultad para refactorizar la estructura del árbol de componentes.

**Ejemplo de Prop Drilling:**

```jsx
// Queremos pasar un valor desde App hasta ComponenteC

function App() {
  const valorCompartido = 'Hola desde App';
  
  return (
    <div>
      <ComponenteA valor={valorCompartido} />
    </div>
  );
}

function ComponenteA({ valor }) {
  return <ComponenteB valor={valor} />;
}

function ComponenteB({ valor }) {
  return <ComponenteC valor={valor} />;
}

function ComponenteC({ valor }) {
  return <p>Recibí: {valor}</p>;
}
```

Aquí, `valor` se pasa por `ComponenteA` y `ComponenteB` sin que ellos realmente lo utilicen. Esto es prop drilling.

---

### Context API: ¿Qué es y por Qué Usarla?

La **Context API** permite compartir datos de manera más directa, sin necesidad de pasar props manualmente en cada nivel. Con la Context API, podemos:

- Crear un contexto que contenga los datos o funciones que queremos compartir.
- Usar un `Provider` que envuelve a la parte de la aplicación que necesita acceder a esos datos.
- Consumir el contexto desde cualquier componente hijo usando `useContext` (o el patrón `Consumer`).

Esto elimina la necesidad de pasar props a componentes intermedios que no las necesitan.

---

### Creación y Uso de Contextos

Para crear un contexto, utilizamos `React.createContext()`. Esto nos da un objeto con dos componentes principales: `Provider` y `Consumer` (aunque con Hooks, el `Consumer` explícito suele reemplazarse por `useContext`).

**Ejemplo de creación de un contexto:**

```jsx
import React from 'react';

const MiContexto = React.createContext();

export default MiContexto;
```

**Nota:** Por convención, el contexto se coloca en un archivo separado para reutilizarlo fácilmente.

---

### Proveedores (Provider) y Consumidores (Consumer)

**Provider:** Es un componente que envuelve a tu aplicación (o parte de ella) y proporciona un valor al contexto. Todos los componentes dentro del `Provider` pueden acceder a ese valor.

**Consumer:** Es un componente que accede al contexto. Antes de Hooks, era común usar la sintaxis `<MiContexto.Consumer>` para acceder a los valores. Con Hooks, es más común usar `useContext`.

**Ejemplo usando Provider/Consumer sin Hooks:**

```jsx
import React from 'react';
import MiContexto from './MiContexto';

function App() {
  const valorCompartido = { usuario: 'Juan', rol: 'admin' };

  return (
    <MiContexto.Provider value={valorCompartido}>
      <ComponenteA />
    </MiContexto.Provider>
  );
}

function ComponenteA() {
  return (
    <MiContexto.Consumer>
      {(contextValue) => (
        <div>
          <p>Usuario: {contextValue.usuario}</p>
          <p>Rol: {contextValue.rol}</p>
          <ComponenteB />
        </div>
      )}
    </MiContexto.Consumer>
  );
}

function ComponenteB() {
  return (
    <MiContexto.Consumer>
      {(contextValue) => <p>Rol desde B: {contextValue.rol}</p>}
    </MiContexto.Consumer>
  );
}
```

Aquí no pasamos las props manualmente por A y B. Cada uno simplemente consume el valor desde el contexto.

---

### Uso de `useContext` Hook

El `useContext` Hook simplifica mucho el consumo del contexto. Ya no necesitamos `<Consumer>` ni funciones render prop. Simplemente importamos el contexto y lo pasamos a `useContext`.

**Ejemplo con `useContext`:**

```jsx
import { useContext } from 'react';
import MiContexto from './MiContexto';

function App() {
  const valorCompartido = { usuario: 'María', rol: 'editor' };
  
  return (
    <MiContexto.Provider value={valorCompartido}>
      <SeccionPrincipal />
    </MiContexto.Provider>
  );
}

function SeccionPrincipal() {
  const { usuario, rol } = useContext(MiContexto);

  return (
    <div>
      <h1>Bienvenida {usuario}</h1>
      <p>Tu rol es: {rol}</p>
      <Menu />
    </div>
  );
}

function Menu() {
  const { rol } = useContext(MiContexto);

  return (
    <nav>
      <p>Menú para rol: {rol}</p>
      {/* Opciones basadas en rol */}
    </nav>
  );
}
```

Con `useContext`, el código es más limpio y directo.

---

### Ejemplos Prácticos

1. **Tema (dark/light) compartido entre componentes:**

```jsx
// temaContext.js
import React from 'react';
const TemaContext = React.createContext('light'); // 'light' valor por defecto
export default TemaContext;

// App.jsx
import TemaContext from './temaContext';

function App() {
  const [tema, setTema] = React.useState('light');

  return (
    <TemaContext.Provider value={tema}>
      <button onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}>
        Cambiar Tema
      </button>
      <Seccion />
    </TemaContext.Provider>
  );
}

function Seccion() {
  return (
    <div>
      <Caja />
    </div>
  );
}

function Caja() {
  const tema = React.useContext(TemaContext);
  const estilo = {
    background: tema === 'light' ? '#fff' : '#333',
    color: tema === 'light' ? '#000' : '#fff',
    padding: '20px',
    marginTop: '10px',
  };
  
  return <div style={estilo}>Soy una caja con el tema {tema}</div>;
}
```

- La caja obtiene el tema directamente del contexto, sin recibirlo como prop desde `App`.

2. **Autenticación simple:**

```jsx
// authContext.js
import React from 'react';
const AuthContext = React.createContext();
export default AuthContext;

// App.jsx
import { useState } from 'react';
import AuthContext from './authContext';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  const login = () => setAutenticado(true);
  const logout = () => setAutenticado(false);

  const valor = {
    autenticado,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valor}>
      <Pagina />
    </AuthContext.Provider>
  );
}

function Pagina() {
  const { autenticado, login, logout } = React.useContext(AuthContext);
  
  return (
    <div>
      <h1>Página Principal</h1>
      {autenticado ? (
        <>
          <p>Estás autenticado</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <p>No estás autenticado</p>
          <button onClick={login}>Iniciar sesión</button>
        </>
      )}
      <Perfil />
    </div>
  );
}

function Perfil() {
  const { autenticado } = React.useContext(AuthContext);
  return <p>Perfil: {autenticado ? 'Usuario registrado' : 'Invitado'}</p>;
}
```

Aquí no necesitamos pasar el estado de `autenticado` y las funciones `login/logout` a través de props, se obtienen directamente desde el contexto.

3. **Manejo de configuración global:**

```jsx
// configContext.js
import React from 'react';
const ConfigContext = React.createContext({});
export default ConfigContext;

// App.jsx
import ConfigContext from './configContext';

function App() {
  const configGlobal = {
    apiEndpoint: 'https://api.ejemplo.com',
    idioma: 'es',
  };

  return (
    <ConfigContext.Provider value={configGlobal}>
      <Dashboard />
    </ConfigContext.Provider>
  );
}

function Dashboard() {
  const { apiEndpoint, idioma } = React.useContext(ConfigContext);
  
  return (
    <div>
      <p>Conectando a: {apiEndpoint}</p>
      <p>Idioma actual: {idioma}</p>
      <ModuloEstadisticas />
    </div>
  );
}

function ModuloEstadisticas() {
  const { apiEndpoint } = React.useContext(ConfigContext);

  // Aquí podríamos hacer fetch a apiEndpoint + '/estadisticas'
  return <p>Estadísticas cargadas desde {apiEndpoint}/estadisticas</p>;
}
```

---

### Combinando Context y Hooks Personalizados

A menudo, crearás un **Hook personalizado** para encapsular la lógica del contexto y así no repetir `useContext` por todos lados.

**Ejemplo:**

```jsx
// authContext.js (igual que antes)
import React from 'react';
const AuthContext = React.createContext();
export default AuthContext;

// useAuth.js
import { useContext } from 'react';
import AuthContext from './authContext';

export function useAuth() {
  return useContext(AuthContext);
}

// App.jsx
import { useState } from 'react';
import AuthContext from './authContext';
import { useAuth } from './useAuth';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <AuthContext.Provider value={{ autenticado, login: () => setAutenticado(true), logout: () => setAutenticado(false) }}>
      <Pagina />
    </AuthContext.Provider>
  );
}

function Pagina() {
  const { autenticado, login, logout } = useAuth();

  return (
    <div>
      {autenticado ? (
        <button onClick={logout}>Cerrar sesión</button>
      ) : (
        <button onClick={login}>Iniciar sesión</button>
      )}
    </div>
  );
}
```

Esto hace que consumir el contexto sea aún más fácil.

---

### Buenas Prácticas con Context

1. **Usar Context con moderación**: Evita crear un solo contexto global para toda la app. Es mejor tener contextos más específicos (por ejemplo, uno para autenticación, otro para el tema, etc.).

2. **Evitar sobre-uso del contexto**: No lo uses para datos que cambian constantemente y podrían causar renders excesivos. Para eso, considera librerías específicas de manejo de estado global.

3. **Documentar lo que provee cada contexto**: Resulta útil para que otros desarrolladores entiendan qué pueden extraer.

4. **Usar Hooks personalizados**: Crea un Hook por cada contexto para simplificar su consumo.

---

### Ejercicio Propuesto

Crea una aplicación con un contexto de "idioma":

- Define un contexto `IdiomaContext` con `idioma: 'es'` por defecto.
- En `App`, provee `idioma` y una función `cambiarIdioma` que alterne entre 'es' y 'en'.
- Crea un componente `Encabezado` que muestre el título en el idioma actual (por ejemplo, 'Hola Mundo' en español y 'Hello World' en inglés).
- Crea un botón en `App` para cambiar el idioma desde `Encabezado`, invocando `cambiarIdioma` a través del contexto.

---

### Ejemplo de Autenticación con Context API y Router

Combinamos la **Context API** para manejar un estado de autenticación simulado con **React Router** para la navegación entre páginas públicas y protegidas. Este ejemplo demuestra:

- Una **Context API** para manejar el estado de autenticación (si el usuario está autenticado y sus datos).
- **React Router** para definir rutas públicas (como `/login`) y rutas protegidas (como `/dashboard`).
- Un componente `RutaProtegida` que verifica si el usuario está autenticado antes de permitir el acceso a determinadas rutas. Si no lo está, redirige al usuario a la página de inicio de sesión (`/login`).

### Descripción

- En `/login` puedes simular una acción de inicio de sesión. Al hacer clic en "Iniciar sesión" se establece que el usuario está autenticado.
- Una vez autenticado, puedes ir a `/dashboard`, que es una ruta protegida. Si intentas acceder a `/dashboard` sin estar autenticado, serás redirigido a `/login`.
- Desde el panel (`/dashboard`) puedes cerrar sesión para volver al estado público.

### Archivos y Código

**authContext.js**  
Creación y exportación del contexto para autenticación.

```jsx
import React from 'react';

const AuthContext = React.createContext(null);

export default AuthContext;
```

**AuthProvider.jsx**  
Un componente proveedor que envuelve tu aplicación y gestiona el estado de autenticación.

```jsx
import { useState } from 'react';
import AuthContext from './authContext';

export function AuthProvider({ children }) {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = (nombreUsuario) => {
    // Simulación: En una app real, verificarías credenciales o token.
    setEstaAutenticado(true);
    setUsuario({ nombre: nombreUsuario });
  };

  const cerrarSesion = () => {
    setEstaAutenticado(false);
    setUsuario(null);
  };

  const valor = {
    estaAutenticado,
    usuario,
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
```

**RutaProtegida.jsx**  
Un componente que verifica la autenticación antes de permitir el acceso a la ruta.

```jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './authContext';

export function RutaProtegida() {
  const { estaAutenticado } = useContext(AuthContext);

  // Si no está autenticado, redirigir a /login
  return estaAutenticado ? <Outlet /> : <Navigate to="/login" />;
}
```

**Login.jsx**  
Una página de inicio de sesión simple.

```jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';

export default function Login() {
  const { iniciarSesion, estaAutenticado } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarLogin = () => {
    iniciarSesion('JuanPerez'); // usuario simulado
    navigate('/dashboard'); // navegar a una página protegida después de iniciar sesión
  };

  if (estaAutenticado) {
    return (
      <div>
        <p>Ya estás autenticado.</p>
        <button onClick={() => navigate('/dashboard')}>Ir al Panel</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Página de Inicio de Sesión</h1>
      <p>Haz clic en el botón para simular el inicio de sesión.</p>
      <button onClick={manejarLogin}>Iniciar sesión como JuanPerez</button>
    </div>
  );
}
```

**Dashboard.jsx**  
Una página protegida que solo se muestra si el usuario está autenticado.

```jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div>
      <h1>Panel (Dashboard)</h1>
      <p>¡Bienvenido, {usuario?.nombre}!</p>
      <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
    </div>
  );
}
```

**Home.jsx**  
Una página pública accesible por todos.

```jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';

export default function Home() {
  const { estaAutenticado } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página de Inicio (Home)</h1>
      {estaAutenticado ? (
        <p>
          ¡Estás autenticado!{' '}
          <button onClick={() => navigate('/dashboard')}>Ir al Panel</button>
        </p>
      ) : (
        <p>
          No estás autenticado.{' '}
          <button onClick={() => navigate('/login')}>Ir a Iniciar Sesión</button>
        </p>
      )}
    </div>
  );
}
```

**App.jsx**  
Configura el enrutador, envuelve la aplicación con `AuthProvider` y define las rutas.

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { RutaProtegida } from './RutaProtegida';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas */}
          <Route element={<RutaProtegida />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Ruta por defecto (404) */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

- `AuthProvider` a nivel superior proporciona `estaAutenticado`, `usuario`, `iniciarSesion` y `cerrarSesion` a toda la aplicación.
- Las páginas públicas (`/`, `/login`) se pueden acceder sin iniciar sesión.
- `RutaProtegida` usa `useContext` para verificar `estaAutenticado`. Si es `false`, redirige a `/login`. Si es `true`, muestra la ruta protegida (a través de `<Outlet />`).
- Después de iniciar sesión en `/login`, se redirige a `/dashboard`. Como `estaAutenticado` es `true`, `RutaProtegida` permite el acceso.
- En `Dashboard`, puedes cerrar sesión, lo que devuelve `estaAutenticado` a `false`. Si luego intentas volver a `/dashboard`, serás redirigido a `/login`.


## Conclusión

- Qué es el prop drilling y cómo la Context API lo soluciona.
- Cómo crear, proveer y consumir contextos.
- Cómo usar el Hook `useContext` para acceder más fácilmente al contexto.
- Ejemplos prácticos para comprender cómo el contexto facilita el intercambio de datos globales en la aplicación.

La Context API es una herramienta poderosa para evitar props innecesarias y centralizar datos compartidos. Usada junto con Hooks, simplifica el manejo de estado global para muchos casos, sin necesidad de librerías más complejas.

