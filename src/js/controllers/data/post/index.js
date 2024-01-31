import { Controller } from '@hotwired/stimulus';
import Storage from '../../../models/Storage';
import Api from '../../../models/Api';

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
  };

  storage = new Storage;

  connect() {
    const query = this.queryValue ? this.queryValue : '';
    this.request(this.itemsValue, this.offsetValue || 0, query);
  }

  async request(limit, offset, query = '') {

    const params = { limit, offset };

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

    const api = new Api(params);
    const data = await api.request('/partial/posts', 'text');

    this.render(data);

    this.dispatch('paginate', { detail: { limit: limit, offset: offset, total: parseInt(this.countTarget.dataset.count, 10) } });
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML('afterbegin', html);
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
