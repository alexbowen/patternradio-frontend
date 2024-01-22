import { Controller } from '@hotwired/stimulus';
import Storage from '../storage';

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
  }

  // static MIXCLOUD_USERNAME = 'patternradio';

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

    fetch(`/partial/episodes?${new URLSearchParams(params)}`)
    .then((response) => response.text())
    .then((data) => {
      if (this.searchValue === true || query) {
        this.itemsTarget.innerHTML = '';
      }

      this.render(data);

      this.dispatch('paginate', { detail: { limit: limit, offset: offset, total: this.countTarget.dataset.count } });
      this.dispatch('heading', { detail: { total: parseInt(this.countTarget.dataset.count), query: query, filters: !!filters } });
    });
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML("afterbegin", html);
    this.element.style.display = 'block';
  }

  tagSearch(e) {
    if (e.target.dataset.name) {
      this.request(this.itemsValue, 0, e.target.dataset.name.toLowerCase());
    }
  }

  clearSearch() {
    this.request(this.itemsValue, 0, '');
  }

  clearFilters() {
    const targetController = this.application.getControllerForElementAndIdentifier(document.getElementById('filters'), 'filters');
    targetController.clear();
  }

  search(query) {
    this.queryValue = query;
    this.request(this.itemsValue, 0, query);
  }

  filter() {
    this.request(this.itemsValue, 0);
  }

  paginate({detail: { limit, offset }}) {
    this.request(limit, offset, this.queryValue);
  }

  formatTime(d) {
    return Math.floor(d / 60000);
  }
}

export default EpisodesController;
