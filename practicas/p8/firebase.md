# Fetch (GET) desde Realtime Database Firebase en Astro

A continuación, se muestra un **ejemplo mínimo** de cómo usar la **API REST** de Firebase Realtime Database para **obtener datos** (método **GET**) y mostrarlos en una página de Astro sin usar la SDK oficial de Firebase.

---

## 1. Configurar la Realtime Database

1. **Crear Proyecto**: Ve a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto.
2. **Habilitar Realtime Database**: En “Build → Realtime Database”, crea la base de datos en modo de prueba (o ajusta reglas según tus necesidades).
3. **Copiar la URL**: Obtendrás algo como `https://TU-PROYECTO-default-rtdb.firebaseio.com`.

---

## 2. Estructura de la Base (Ejemplo)

Supongamos que en tu base tienes un nodo `posts`:

```json
"posts": {
  "id1": { "title": "Hola", "content": "Mi primer post" },
  "id2": { "title": "Otro Post", "content": "Contenido..." }
}
```

---

## 3. Ejemplo en un Archivo `.astro`

Creamos una página Astro (`src/pages/blog/index.astro`) que, **en el lado del servidor** (frontmatter) hace un `fetch` para obtener los posts y los muestra en el HTML.

```astro
---
const BASE_URL = 'https://TU-PROYECTO-default-rtdb.firebaseio.com';

// Hacemos una petición GET a /posts.json
const resp = await fetch(`${BASE_URL}/posts.json`);
if (!resp.ok) {
  throw new Error('Error al obtener los posts');
}
const data = await resp.json();
// data será un objeto tipo { "id1": { title, content }, "id2": { ... } }

const posts = data || {};
---

<html>
  <head>
    <title>Blog con Astro y Realtime DB (GET)</title>
  </head>
  <body>
    <h1>Mis Posts</h1>
    <ul>
      {Object.entries(posts).map(([id, post]) => (
        <li key={id}>
          <strong>{post.title}</strong>: {post.content}
        </li>
      ))}
    </ul>
  </body>
</html>
```

### Explicación:

1. **Frontmatter de Astro**:  
   Dentro de los `---`, se ejecuta JavaScript **en el lado del servidor**, antes de renderizar la página.
2. **Petición GET**:  
   `fetch(`${BASE_URL}/posts.json`)` obtiene todo el nodo `posts` en formato JSON.  
3. **data o `{}`**:  
   Si no hay datos, `data` será `null`, por lo que lo asignamos a un objeto vacío `{}` por seguridad.
4. **Renderizado**:  
   En el body, usamos `{Object.entries(posts).map(...)}` para listar cada post.
5. **Salida Estática**:  
   Durante el **build** de Astro, esa petición se ejecuta y se genera un HTML con el contenido resultante. Al desplegar, tendrás una página estática que muestra los posts.

---

### Conclusión

Con estos **pocos pasos**, logras que Astro haga una **petición GET** a tu Realtime Database, obtenga los datos en tiempo de build o al renderizar la página en el servidor y los muestre estáticamente. Así combinas la **rapidez de Astro** con la **simplicidad de la API REST de Firebase**. 
