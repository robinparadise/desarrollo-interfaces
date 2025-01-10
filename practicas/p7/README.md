Desarrolla una página web (similar a [New york times](https://www.nytimes.com/international/)) de noticias que consuma noticias de una API utilizando **Fetch API**. El endpoint base para obtener las noticias es:

```
https://news-foniuhqsba-uc.a.run.app
```

Las noticias están organizadas en las siguientes secciones, y cada sección tiene su propia URL:

- **World News**: `https://news-foniuhqsba-uc.a.run.app/WorldNews`
- **Sport**: `https://news-foniuhqsba-uc.a.run.app/Sport`
- **Finance**: `https://news-foniuhqsba-uc.a.run.app/Finance`
- **Technology**: `https://news-foniuhqsba-uc.a.run.app/Technology`
- **Entertainment**: `https://news-foniuhqsba-uc.a.run.app/Entertainment`

La página debe cumplir con los siguientes requisitos:

1. **Menú de navegación**

2. **Vista de noticias** utilizando un grid 3x3 responsive

![nyt](../../assets/p7/nyt.avif)

---

3. **Detalle del artículo** crea un componente reutilizable para mostrar los detalles de un artículo. Usa el router de `react-router-dom` para mostrar dinámicamente los artículos.

  ```jsx
  <BrowserRouter>
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<Article />} />
  ...
  ```

  - Usa el hook `useParams` para obtener el id del artículo.

  ```jsx
    import { useParams } from 'react-router-dom';

    export default function Article() {
      const { id } = useParams();
  ```

  - Ten encuenta la categoría del artículo para mostrar los articulos relacionados.
  

  ```jsx
  <BrowserRouter>
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<Article />} />
      <Route path="/:category" element={<Category />} />
  ```
  - Usa el hook `useParams` para obtener la categoría del artículo.

  ```jsx
    import { useParams } from 'react-router-dom';

    export default function Category() {
      const { category } = useParams();
  ```


---
4. **Buscador** Crea un dialog para el buscador de la página.
---
5. Crea un **selector de idiomas** (en, es, ch, fr, pt, it):

  - usa el parámetro `translations` para mostrar los artículos en diferentes idiomas.
  El artículo debería de cambiar de idioma sin refrescar la página.

  - El endpoint te devuelve un objeto con la propiedad `translations` que contiene los artículos en diferentes idiomas.


  ```json
  [
      {
          "id": 0,
          "headline": "Customizable encompassing extranet",
          "abstract": "Truth part experience clear responsibility. Edge hot discover military other. It long sister.",
          "body": "<p>Standard can finish well... forward well.</p>",
          "author": "Jon Oliver",
          "section": "Sport",
          "date": "2021-02-08T07:32:40",
          "image_url": "https://picsum.photos/id/0/800/500",
          "translations": {
              "es": {
                  "headline": "Customizable encompassing extranet [es]",
                  "abstract": "Truth part experience clear responsibility. Edge hot discover military other... forward well.</p> [es]"
              },
              "ch": {
                  "headline": "Customizable encompassing extranet [ch]",
                  "abstract": "Truth part experience clear responsibility. Edge hot discover military other... well.</p> [ch]"
              },
              "fr": {
                  "headline": "Customizable encompassing extranet [fr]",
                  "abstract": "Truth part experience clear responsibility. Edge hot discover military other. It long sister. [fr]",
                  "body": "<p>Standard can finish ... forward well.</p> [fr]"
              },
              "pt": {
                  "headline": "Customizable encompassing extranet [pt]",
                  "abstract": "Truth part experience ... It long sister. [pt]",
                  "body": "<p>Standard can finish well ... forward well.</p> [pt]"
              },
              "it": {
                  "headline": "Customizable encompassing extranet [it]",
                  "abstract": "Truth part experience ... sister. [it]",
                  "body": "<p>Standard can finish ...forward well.</p> [it]"
              }
          }
      },
  ]
  ```

  Puedes usar el `navigator` para obtener el idioma del navegador.

  ```js
  const language = navigator.language;
  // "es-ES", "en-US", "fr-FR", "pt-PT", "it-IT", "zh-CN"
  // usarlo para onbtener el idioma del artículo
  ```

  - debes de usar el `useContext` para propagar el estado del `language`.

  ```jsx
  // LangProvider.jsx
  export const LangContext = createContext(null);

  export function LangProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const changeLanguage = (newLanguage) => {
      setLanguage(newLanguage);
    };

    return (
      <LangContext.Provider value={{ language, changeLanguage }}>
        {children}
      </LangContext.Provider>
    );
  }
  ```
---

6. Implementa ruta protegidas y el uso de `useContext` para implementar una de estas funcionalidades (po ejemplo):

  - **Bookmarks**: Crea una ruta protegida para mostrar los artículos guardados por el usuario.
  - **Subscriptions**: Crea una ruta protegida para mostrar solo los artículos a los que el usuario están suscrito en la app.
  - **Autenticación**: Implementa un formulario de autenticación para el login y registro de usuarios, solo los usuarios registrados pueden leer el articulo completo.

  **[Obligatorio]**:
  - **Perfil**: Crea una ruta protegida para mostrar una ruta en la que se muestre el perfil del usuario con la información `booksmarks`, `Autenticación` o `suscripciones`.
  
  ```jsx


7. [opcional] Despliega tu proyecto a github pages:

- [react to github pages](https://github.com/marketplace/actions/build-and-deploy-react-app-to-github-pages)
- [nodejs to github pages](https://github.com/robinparadise/desarrollo-interfaces/new/main?filename=.github%2Fworkflows%2Fnode.js.yml&workflow_template=ci%2Fnode.js)

