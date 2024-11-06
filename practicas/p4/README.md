Desarrolla una página web de noticias que consuma noticias de una API utilizando **Fetch API**. El endpoint base para obtener las noticias es:

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

1. **Menú de navegación**: En la parte superior de la página, agrega un **header** con un menú que utilice **Popover CSS**. El menú debe tener enlaces a cada una de las secciones de noticias mencionadas anteriormente, utilizando las URL correspondientes.

2. **Vista de noticias**: Crea un diseño **responsive** usando un **grid** para mostrar las noticias de cada sección. Las noticias deben adaptarse a diferentes tamaños de pantalla.

3. **Detalle del artículo**: Crea una página adicional `article.html` que se encargue de mostrar los detalles de un artículo al hacer clic sobre él. Utiliza un componente reutilizable (puedes usar el `article.html` de la prática 3).

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visor de Noticias Falsas</title>
</head>
<body>

  <h1>Artículos de Noticias Falsas</h1>
  <!-- Componente personalizado -->
  <news-viewer></news-viewer>

  <!-- Plantilla para un artículo -->
  <template id="article-template">
    <div class="article">
      <h3 class="title"></h3>
      <p><strong>Autor:</strong> <span class="author"></span></p>
      <p class="description"></p>
      <hr>
    </div>
  </template>

  <script src="news-viewer.js"></script>

</body>
</html>
```

```js
// news-viewer.js

class NewsViewer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.loadArticles();
  }

  async loadArticles() {
    try {
      const response = await fetch('https://news-foniuhqsba-uc.a.run.app');
      if (!response.ok) {
        throw new Error('Error al obtener los artículos');
      }
      const articles = await response.json();
      this.renderArticles(articles);
    } catch (error) {
      console.error('Error:', error);
      this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
    }
  }

  renderArticles(articles) {
    const template = document.getElementById('article-template');
    
    // Limpiar contenido existente
    this.innerHTML = '';

    articles.forEach(article => {
      // Clonar el contenido de la plantilla
      const articleContent = document.importNode(template.content, true);
      
      // Rellenar la plantilla con los datos del artículo
      articleContent.querySelector('.title').textContent = article.headline;
      articleContent.querySelector('.author').textContent = article.author;
      articleContent.querySelector('.description').innerHTML = article.body;
      
      // Añadir el artículo al componente
      this.appendChild(articleContent);
    });
  }
}

// Definir el elemento personalizado
customElements.define('news-viewer', NewsViewer);
``