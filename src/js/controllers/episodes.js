import { Controller } from '@hotwired/stimulus';
import Storage from '../storage';

const EpisodesController = class extends Controller {
  static targets = ['tags', 'items', 'item', 'heading', 'count'];

  static values = {
    search: Boolean,
    items: Number,
    offset: Number,
    showTags: Boolean,
    types: Boolean,
    filters: Boolean,
    query: String,
    title: String,
    template: String
  }

  static types = [
    "show",
    "mix",
    "discovery"
  ];

  static typesView = {
    "show": "shows",
    "mix": "DJ Mixes",
    "discovery": "discovery"
  };

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

    fetch(`/partial/episodes?${new URLSearchParams(params)}`, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((response) => response.text())
    .then((data) => {
      if (this.searchValue === true || query) {
        this.itemsTarget.innerHTML = '';
        if (data.length && query.length && query.length === 0) {
          this.headingTarget.querySelector('h3').innerHTML = `Results Matching "${query}"`;
          this.headingTarget.querySelector('button').classList.add('d-none');
        } else if (data.length && query.length) {
          this.headingTarget.querySelector('h3').innerHTML = `No Results Matching "${query}"`;
          this.headingTarget.querySelector('button').classList.add('d-none');
        } else {

          this.headingTarget.querySelector('h3').innerHTML = 'Shows Available For Playback';
          filters && !query.length ? this.headingTarget.querySelector('span').classList.remove('d-none') : this.headingTarget.querySelector('span').classList.add('d-none');
        }

        if (this.titleValue) {
          this.headingTarget.querySelector('h3').innerHTML = this.titleValue;
          this.headingTarget.querySelector('button').classList.add('d-none');
        }
      }

      this.render(data);

      this.dispatch('loaded', { detail: { limit: limit, offset: offset, total: this.countTarget.dataset.count } });
    });
  }

  render(html) {
    let content = this.element.querySelector('.episodes')
    content.insertAdjacentHTML("afterbegin", html);
    this.element.style.display = 'block';
  }

  tagSearch(e) {
    if (e.target.dataset.name) {
      this.request(this.itemsValue, 0, e.target.dataset.name);
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
