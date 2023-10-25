import { Controller } from '@hotwired/stimulus';
import Storage from '../storage';

const BlogsController = class extends Controller {
  static targets = ['title', 'content', 'published', 'items'];

  static values = {
    search: Boolean,
    limit: Number,
    items: Number,
    offset: Number,
    showTags: Boolean,
    filters: Boolean,
    query: String,
    overidden: Boolean
  }

  storage = new Storage

  // static host = 'http://localhost:5000';
  static host = 'https://patternradio-api-e873df4d91a5.herokuapp.com';

  connect() {
    const query = this.queryValue ? this.queryValue : '';
    this.request(this.itemsValue, this.offsetValue, query);
  }

  request(limit, offset, query = '') {
    let url = `${BlogsController.host}/api/`;

    if (this.searchValue === true && query.length) {
      url += `search/posts/?limit=${limit}&offset=${offset}&q=${query}`;
    } else {
      url += `posts/?limit=${limit}&offset=${offset}`;
    }

    const filters = this.storage.getItem('filters');

    if (filters && this.filtersValue === true && !this.overiddenValue) {
      url += `&filters=${filters.split(',')}`;
    }

    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.dispatch("loaded", { detail: { limit: limit, offset: offset, total: data.count } })
        this.items = [];
        data.items.forEach(d => {
          this.items.push(d)
        })
  
        this.items.sort(function (a, b) {
          return new Date(b.published_at) - new Date(a.published_at);
        });
        this.add();
      });
  }

  add() {
    const templateId = this.data.get('showItemTemplateId');
    const template = document.getElementById(templateId);

    this.itemsTarget.innerHTML = '';
    
    this.items.forEach(a => {
      let clone = template.content.cloneNode(true);

      let content = clone.querySelector('.content');
      content.innerHTML = a.content;

      Array.from(clone.querySelectorAll('a')).forEach((l) => {
        l.target = '_blank';
      });

      if (this.showTagsValue) {
        let tags = clone.querySelector('.tags');

        a.tags.forEach(t => {
          const tag = document.createElement("li");
          tag.innerHTML = t;

          tag.classList.add('badge');
          tag.classList.add('me-2');
          tags.appendChild(tag);
          tags.style.display = 'block';
        });
      }

      this.itemsTarget.appendChild(clone);
    });
  }

  paginate({detail: { limit, offset }}) {
    this.request(limit, offset);
  }

  filter() {
    this.request(this.itemsValue, 0);
  }

  formatDate(d) {
    const date = new Date(d);
    const parts = [
      date.toLocaleString('en-us', {  weekday: 'short' }),
      date.getDate(),
      date.toLocaleString('en-us', { month: "short" }),
    ];
    return parts.join(' ');
  }
};

export default BlogsController;
