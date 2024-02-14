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
    overidden: Boolean,
    template: String
  };

  static storage = new Storage;

  connect() {
    this.setParams(this.itemsValue, this.offsetValue || 0, this.queryValue);
    this.request();
  }

  setParams(limit, offset, query = '') {
    this.params = { limit, offset };

    if (this.searchValue === true) {
      this.params.q = query;
    }

    if (this.templateValue) {
      this.params.template = this.templateValue;
    }

    if (this.filtersValue === true) {
      this.params.filters = this.getFilters().split(',');
    }
  }

  getFilters() {
    return PostsController.storage.getItem('filters');
  }

  async request() {
    const data = await this.getData();

    if (this.searchValue === true || this.params.q) {
      this.itemsTarget.innerHTML = '';
    }

    this.render(data);

    this.dispatch('paginate', { detail: { limit: this.params.limit, offset: this.params.offset, total: parseInt(this.countTarget.dataset.count, 10) } });
  }

  async getData() {
    const api = new Api(this.params);
    return await api.request('/partial/posts', 'text');
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML('afterbegin', html);
    this.element.style.display = 'block';
  }

  filter() {
    this.setParams(this.itemsValue, 0);
    this.request();
  }

  paginate({detail: { limit, offset }}) {
    this.setParams(limit, offset, this.queryValue);
    this.request();
  }
};

export default PostsController;
