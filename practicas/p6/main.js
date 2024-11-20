class ProductsItems extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const data = await this.fetchData();
    this.render(data);
  }

  async fetchData() {
    try {
      const response = await fetch('https://products-foniuhqsba-uc.a.run.app/Games');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      return [];
    }
  }

  render(data) {
    const template = document.getElementById('card-template');
    const container = this

    this.innerHTML = '';
    data.forEach(item => {
      if (!template) return null
      const card = template.content.cloneNode(true);

      // Imagen
      const img = card.querySelector('img');
      img.src = item.image || '';
      img.alt = item.title || '';

      // Título
      const title = card.querySelector('.font-bold');
      title.textContent = item.title || '';

      // Descripción corta
      const description = card.querySelector('.text-gray-700');
      description.textContent = item.short_description || '';

      // Tags
      const tagsContainer = card.querySelector('.px-6.pt-4.pb-2');
      item.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2';
        span.textContent = `#${tag}`;
        tagsContainer.appendChild(span);
      });

      container.appendChild(card);
    });

  }
}

customElements.define('products-items', ProductsItems);
