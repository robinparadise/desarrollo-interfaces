const articles = [
  {
    "id": 1,
    "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
    "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
    "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
    "date": "2023-10-17T11:00:16Z",
    "category": "Climate"
  },
  {
    "id": 2,
    "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
    "title": "Musk’s empire risks being targeted by EU for potential X fines",
    "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
    "date": "2024-09-17T10:32:45Z",
    "category": "Business"
  },
  {
    "id": 3,
    "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
    "title": "Omoda E5 in Noble trim - pictures",
    "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
    "date": "2024-10-15T10:30:56Z",
    "category": "Automobile"
  },
  {
    "id": 4,
    "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
    "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
    "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
    "date": "2024-10-13T10:25:24Z",
    "category": "Automobile"
  },
  {
    "id": 5,
    "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
    "title": "Chinese cybersecurity association urges review of Intel products",
    "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
    "date": "2024-10-01T10:22:56Z",
    "category": "Technology"
  },
  {
    "id": 6,
    "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
    "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
    "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
    "date": "2023-10-17T11:00:16Z",
    "category": "Climate"
  },
  {
    "id": 7,
    "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
    "title": "Musk’s empire risks being targeted by EU for potential X fines",
    "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
    "date": "2024-09-17T10:32:45Z",
    "category": "Business"
  },
  {
    "id": 8,
    "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
    "title": "Omoda E5 in Noble trim - pictures",
    "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
    "date": "2024-10-15T10:30:56Z",
    "category": "Automobile"
  },
  {
    "id": 9,
    "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
    "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
    "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
    "date": "2024-10-13T10:25:24Z",
    "category": "Automobile"
  },
  {
    "id": 10,
    "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
    "title": "Chinese cybersecurity association urges review of Intel products",
    "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
    "date": "2024-10-01T10:22:56Z",
    "category": "Technology"
  },
  {
    "id": 11,
    "image": "https://cdn.kqed.org/wp-content/uploads/sites/35/2024/10/GettyImages-1347890261-1020x680.jpg",
    "title": "Climate Activists Push for Carbon Tax With Measure GG, But Critics Warn it Could Backfire",
    "description": "Grassroots climate activists argue a tax on gas use in large buildings will help all of Berkeley kick fossil fuels. But many politicians, businesses, and nonprofits, even those that work on climate, don’t think Measure GG is the policy to get there.",
    "date": "2023-10-17T11:00:16Z",
    "category": "Climate"
  },
  {
    "id": 12,
    "image": "https://fortune.com/img-assets/wp-content/uploads/2024/10/GettyImages-2170862982_413c33-e1729160290535.jpg?resize=1200,600",
    "title": "Musk’s empire risks being targeted by EU for potential X fines",
    "description": "The EU may target Elon Musk’s broader business empire for X fines, potentially including revenue from SpaceX and Neuralink to increase penalties.",
    "date": "2024-09-17T10:32:45Z",
    "category": "Business"
  },
  {
    "id": 13,
    "image": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729160267/autoexpress/2024/10/Omode E5 first UK drive.jpg",
    "title": "Omoda E5 in Noble trim - pictures",
    "description": "Pictures of the electric Omode E5 SUV being driven on UK roads. Pictures taken by Auto Express senior photographer Pete Gibson",
    "date": "2024-10-15T10:30:56Z",
    "category": "Automobile"
  },
  {
    "id": 14,
    "image": "https://cdn.mos.cms.futurecdn.net/6xqynicLzH6sSskfiNyWoT-1200-80.jpg",
    "title": "Renault, Alpine and Citroën help the 2024 Paris Motor Show return to form",
    "description": "Explore the most delectable debuts at the Paris Motor Show 2024 – or Mondial de l'Auto – including designs from France's big car makers and niche machines from around the world",
    "date": "2024-10-13T10:25:24Z",
    "category": "Automobile"
  },
  {
    "id": 15,
    "image": "https://www.computerworld.com/wp-content/uploads/2024/10/3567767-0-90640600-1729160617-IDG-Germany-Intel-September-News.jpg?quality=50&strip=all&w=1024",
    "title": "Chinese cybersecurity association urges review of Intel products",
    "description": "The Cybersecurity Association of China (CSAC) has urged a security review of Intel products sold in the country, claiming the US semiconductor firm poses ongoing threats to China’s national security and interests.",
    "date": "2024-10-01T10:22:56Z",
    "category": "Technology"
  }
]

const getId = () => {
  const searchParams = new URLSearchParams(location.search.slice(1));
  return Number(searchParams.get('id'));
}

class RelativeTime extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    setInterval(() => this.render(), 1000);
  }
  render() {
    const timeValue = this.getAttribute('time')
    const time = timeValue ? new Date(Number(timeValue)).getTime() : Date.now();
    const now = Date.now();

    const diff = now - time;
    const seconds = Math.floor(diff / 1000) || 1;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let aux = '...';
    if (months >= 12) {
      aux = `Hace ${years} año${years > 1 ? 's' : ''}`
    } else if (days > 30 && months >= 1) {
      aux = `Hace ${months} mes${months > 1 ? 'es' : ''}`
    } else if (days >= 1) {
      aux = `Hace ${days} día${days > 1 ? 's' : ''}`
    } else if (hours >= 1) {
      aux = `Hace ${hours} hora${hours > 1 ? 's' : ''}`
    } else if (minutes >= 1) {
      aux = `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
    } else if (seconds >= 1) {
      aux = `Hace ${seconds} segundo${seconds > 1 ? 's' : ''}`
    }

    this.textContent = aux;
  } 
}
customElements.define('relative-time', RelativeTime);

class CustomSearch extends HTMLElement {
  constructor() {
    super();
    this.articles = articles;
  }

  connectedCallback() {
    const dialogBtn = this.querySelector('.dialog-search');
    const closeBtn = this.querySelector('.close-btn');
    const dialog = this.querySelector('dialog');

    dialogBtn.addEventListener('click', () => {
      dialog.showModal();
    });
    closeBtn.addEventListener('click', () => {
      dialog.close();
    });
    const siteSearch = this.querySelector('#site-search');
    siteSearch.addEventListener('input', (event) => this.search(event));

    this.renderResults('')
  }

  search(event) {
    event.preventDefault();
    const siteSearch = this.querySelector('#site-search');
    const term = siteSearch.value
    // console.log({term});
    this.renderResults(term)
  }

  renderResults(term = '') {
    // Implement your search logic here
    const searchResults = this.querySelector('#search-results');
    searchResults.innerHTML = '';
    const _articles = this.articles
      .filter(article => article.title.toLowerCase().includes(term.toLowerCase()))

    // mode 3 using <template>
    const template = this.querySelector('template').content;
    // loop
    _articles.map(article => {
      const li = template.querySelector('li').cloneNode(true);
      // item-image, item-title, item-description
      li.querySelector('.card .item-image').src = article.image;
      li.querySelector('.card .item-description').textContent = article.description;
      // replate relative-time time
      li.querySelector('relative-time').setAttribute('time', article.date)
      li.querySelector('.card .item-title a').textContent = article.title;

      const enlace = li.querySelector('.card .item-title a')
      const href = enlace.href
      enlace.href = href.replace('{id}', article.id)

      searchResults.appendChild(li);
    })
  }
}
customElements.define('custom-search', CustomSearch);


class CustomArticle extends HTMLElement {
  constructor() {
    super();
    this.articleId = getId();
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const article = articles.find(article => article.id === this.articleId)
    if (article) {
      // reemplazos de los contenidos del article
      const h1 = this.querySelector('h1');
      h1.textContent = article.title;

      // reemplazar image
      const img = this.querySelector('img');
      img.src = article.image;
    }
  }
}
customElements.define('custom-article', CustomArticle);

