import { Controller } from '@hotwired/stimulus';
import Storage from '../../../models/storage';
import api from '../../../models/api';

const EpisodesController = class extends Controller {

  static targets = ['tags', 'items', 'count'];

  static values = {
    search: Boolean,
    items: Number,
    offset: Number,
    filters: Boolean,
    query: String,
    title: String,
    template: String
  };

  // static MIXCLOUD_USERNAME = 'patternradio';

  static storage = new Storage;
  static api = api;
  // query = '';

  connect() {
    console.log('contect')
    // const query = this.queryValue ? this.queryValue : '';
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

    const filters = EpisodesController.storage.getItem('filters');

    if (filters && this.filtersValue === true) {
      this.params.filters = filters.split(',');
    }
  }

  async request() {
    // console.log('class request')
    // const params = { limit, offset };

    // if (this.searchValue === true && query.length) {
    //   params.q = query;
    // }

    // if (this.templateValue) {
    //   params.template = this.templateValue;
    // }

    // const filters = this.storage.getItem('filters');

    // if (filters && this.filtersValue === true) {
    //   params.filters = filters.split(',');
    // }

    // const api = new Api(params);
    // console.log('EpisodesController', EpisodesController)
    const data = await EpisodesController.api.request('/partial/episodes', this.params, 'text');

    console.log('data', data)

    if (this.searchValue === true || this.params.q) {
      this.itemsTarget.innerHTML = '';
    }

    this.render(data);

    this.dispatch('paginate', { detail: { limit: this.params.limit, offset: this.params.offset, total: parseInt(this.countTarget.dataset.count, 10) } });
    this.dispatch('heading', { detail: { total: parseInt(this.countTarget.dataset.count, 10), query: this.params.q, filters: !!this.params.filters } });
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
