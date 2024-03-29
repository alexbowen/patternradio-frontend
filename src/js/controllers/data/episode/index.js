import { Controller } from '@hotwired/stimulus';
import Storage from '../../../models/Storage';
import Api from '../../../models/Api';
import { FILTERS_KEY } from '../../filters';

const EpisodesController = class extends Controller {

  static targets = ['tags', 'items', 'count'];

  static values = {
    search: Boolean,
    items: Number,
    offset: Number,
    filters: Boolean,
    query: String,
    title: String,
    template: String,
    creator: String,
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

    if (this.element.hasAttribute('data-filtered') && this.getFilters()) {
      this.params.filters = this.getFilters().split(',');
    }

    if (this.creatorValue) {
      this.params.creator = this.creatorValue;
    }
  }

  getFilters() {
    return EpisodesController.storage.getItem(FILTERS_KEY);
  }

  async request() {
    const data = await this.getData();

    // if (this.searchValue === true || this.params.q) {
      this.itemsTarget.innerHTML = '';
    // }

    this.render(data);

    this.dispatch('paginate', { detail: { limit: this.params.limit, offset: this.params.offset, total: parseInt(this.countTarget.dataset.count, 10) } });
    this.dispatch('heading', { detail: { total: parseInt(this.countTarget.dataset.count, 10), query: this.params.q, filters: !!this.params.filters, title: this.titleValue } });
  }

  async getData() {
    const api = new Api(this.params);
    return await api.request('/partial/episodes', 'text');
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML('afterbegin', html);
    this.element.style.display = 'block';
  }

  tagSearch(e) {
    if (e.target.dataset.name) {
      this.setParams(this.itemsValue, 0, e.target.dataset.name.toLowerCase());
      this.request();
    }
  }

  clearSearch() {
    this.setParams(this.itemsValue, 0, '');
    this.request();
  }

  clearFilters() {
    const targetController = this.application.getControllerForElementAndIdentifier(document.getElementById('filters'), 'filters');
    targetController.clear();
  }

  search(query) {
    this.queryValue = query;
    this.setParams(this.itemsValue, 0, query);
    this.request();
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

export default EpisodesController;
