class ProductsItems extends HTMLElement {
  constructor() {
    super();
    this.templateElement = document.querySelector('#product-item');
    this.url = 'https://products-foniuhqsba-uc.a.run.app/Games'
  }

  async load() {
    return fetch(this.url).then(response => response.json())
  }

  async connectedCallback() {
    this.products = await this.load()
    this.render()
  }

  render() {
    this.products.map(product => {
      if (!this.templateElement) return null
      const card = this.templateElement.content.cloneNode(true)

      const img = card.querySelector('img')
      img.src = product.image

      const add2Cart = card.querySelector('.add2cart')
      add2Cart.addEventListener('click', () => {
        const products = JSON.parse(localStorage.getItem('products') || '[]')
        products.push(product)
        localStorage.setItem('products', JSON.stringify(products))

        const customCart = document.querySelector('custom-cart')
        customCart.render()
      })

      this.appendChild(card)
    })
  }
}

class CustomCart extends HTMLElement {
  constructor() {
    super();
    this.templateElement = document.querySelector('#product-item');
    this.url = 'https://products-foniuhqsba-uc.a.run.app/Games'
  }

  load() {
    return JSON.parse(localStorage.getItem('products') || '[]')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.products = this.load()
    this.innerHTML = ''
    this.products.map(product => {
      this.innerHTML += product.title
    })
  }
}

customElements.define('custom-cart', CustomCart);
customElements.define('products-items', ProductsItems);