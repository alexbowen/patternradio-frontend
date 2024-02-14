import { Controller } from '@hotwired/stimulus';
import Api from '../../../models/Api';

const EpisodeController = class extends Controller {

  static targets = ['items'];

  static values = {
    id: String
  };

  connect() {
    this.request();
  }

  async request() {
    const api = new Api();
    const data = await api.request(`/partial/episode/${this.idValue}`, 'text');

    this.render(data);
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML('afterbegin', html);
    this.element.style.display = 'block';
  }
};

export default EpisodeController;
