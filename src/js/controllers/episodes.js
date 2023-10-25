import { Controller } from '@hotwired/stimulus';
import Storage from '../storage';

const EpisodesController = class extends Controller {
  static targets = ['tags', 'items', 'item', 'heading'];

  static values = {
    search: Boolean,
    items: Number,
    showTags: Boolean,
    types: Boolean,
    filters: Boolean,
    query: String
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

  // static host = 'http://localhost:5000';
  static host = 'https://patternradio-api-e873df4d91a5.herokuapp.com';

  storage = new Storage

  connect() {
    const query = this.queryValue ? this.queryValue : '';
    this.request(this.itemsValue, 0, query);
  }

  request(limit, offset, query = '') {
    let url = `${EpisodesController.host}/api/`;

    if (this.searchValue === true && query.length) {
      url += `search/shows/?limit=${limit}&offset=${offset}&q=${query}`;
    } else {
      url += `shows/?limit=${limit}&offset=${offset}`;
    }

    const filters = this.storage.getItem('filters');

    if (filters && this.filtersValue === true) {
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
      if (this.searchValue === true || this.queryValue) {
        this.itemsTarget.innerHTML = '';
        if (data.items.length && query.length && this.queryValue.length === 0) {
          this.headingTarget.querySelector('h2').innerHTML = `Results Matching "${query}"`;
          this.headingTarget.querySelector('button').classList.remove('d-none');
        } else if (data.items.length === 0 && query.length) {
          this.headingTarget.querySelector('h2').innerHTML = `No Results Matching "${query}"`;
          this.headingTarget.querySelector('button').classList.remove('d-none');
        } else {
          const applied = filters ? '<span>(preferences applied)</span>' : '';
          this.headingTarget.querySelector('h2').innerHTML = `Shows Available For Playback ${applied} `;
          this.headingTarget.querySelector('button').classList.add('d-none');
        }
      }

      this.items = [];
      data.items.forEach(d => {
        this.items.push(d)
      })

      this.items.sort(function (a, b) {
        return new Date(b.created_time) - new Date(a.created_time);
      });

      this.add();
    }); 
  }

  add() {
    const templateId = this.data.get('showItemTemplateId');
    const template = document.getElementById(templateId);

    this.items.forEach(a => {
      let clone = template.content.cloneNode(true);

      let parts = a.name.split(' - ');
      let title = clone.querySelector('.title');
      title.innerHTML = parts[0];
      title.href = `/show/${parts[0].toLowerCase().replace(/ /g, '-')}`;

      let host = clone.querySelector('.host');
      host.innerHTML = parts[1];

      if (parts[2]) {
        let detail = clone.querySelector('.detail');
        detail.innerHTML = parts[2];
      }

      let likes = clone.querySelector('.likes');

      let count = a.favorite_count === 0 ? a.favorite_count : a.favorite_count + 1;
      if (count > 0) {
        likes.querySelector('.count').innerHTML = count;
      } else {
        likes.classList.add('d-none');
      }

      let time = clone.querySelector('.time');
      time.innerHTML = `${this.formatTime(a.audio_length * 1000)} min`;

      let img = clone.querySelector('img');
      img.alt = a.name;
      img.src = a.pictures.large;

      let button = clone.querySelector('.playable');
      button.dataset.url = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=${a.key}`;

      let tags = clone.querySelector('.tags');
      tags.classList.add('mt-1');

      a.tags.forEach(t => {
        const tag = document.createElement("li");
        const button = document.createElement("button");

        button.innerHTML = t.name;
        button.classList.add('me-2');

        if (this.showTagsValue === true) {
          button.dataset.name = t.name.toLowerCase();
        }

        button.classList.add('badge');
        tag.appendChild(button);
        tags.appendChild(tag);
      });

      let content = this.element.querySelector('.row')
      content.appendChild(clone);
      this.element.style.display = 'block';
    });
  }

  tagSearch(e) {
    if (e.target.dataset.name) {
      this.request(this.itemsValue, 0, e.target.dataset.name);
    }
  }

  clearSearch() {
    this.request(this.itemsValue, 0, '');
  }

  search(query) {
    this.request(this.itemsValue, 0, query);
  }

  filter() {
    this.request(this.itemsValue, 0);
  }

  paginate({detail: { limit, offset }}) {
    this.request(limit, offset);
  }

  formatTime(d) {
    return Math.floor(d / 60000);
  }
}

export default EpisodesController;
