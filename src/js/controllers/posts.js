import { Controller } from '@hotwired/stimulus';
import Storage from '../storage';

const PostsController = class extends Controller {
  static targets = ['title', 'content', 'published', 'items', 'count'];

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

  connect() {
    const query = this.queryValue ? this.queryValue : '';
    this.request(this.itemsValue, this.offsetValue || 0, query);
  }

  request(limit, offset, query = '') {
    const params = {
      limit: limit,
      offset: offset
    };

    if (this.searchValue === true && query.length) {
      params.q = query;
    }

    if (this.templateValue) {
      params.template = this.templateValue;
    }

    const filters = this.storage.getItem('filters');

    if (filters && this.filtersValue === true) {
      params.filters = filters.split(',');
    }

    fetch(`/partial/posts?${new URLSearchParams(params)}`)
      .then((response) => response.text())
      .then((data) => {
        
        this.render(data);

        this.dispatch('paginate', { detail: { limit: limit, offset: offset, total: this.countTarget.dataset.count } });
      });
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML("afterbegin", html);
    this.element.style.display = 'block';
  }

  paginate({detail: { limit, offset }}) {
    this.request(limit, offset);
  }

  filter() {
    this.request(this.itemsValue, 0);
  }
};

export default PostsController;
