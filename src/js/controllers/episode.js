import { Controller } from '@hotwired/stimulus';
const shows = require('../../data/shows');

const EpisodeController = class extends Controller {
  // static targets = ['data'];

  static values = {
    id: String
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

  connect() {
    // console.log('show connect', shows.find(s => s.id === this.idValue));
    // const query = this.queryValue ? this.queryValue : '';
    // this.request(this.itemsValue, 0, query);
  }
}

export default EpisodeController;
