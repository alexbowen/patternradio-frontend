import { Controller } from '@hotwired/stimulus';

const EpisodeController = class extends Controller {

  static targets = ['items'];

  static values = {
    id: String
  }

  connect() {
    this.request();
  }

  request() {
    fetch(`/partial/episode/${this.idValue}`)
      .then((response) => response.text())
      .then((data) => {
        this.render(data);
      });
  }

  render(html) {
    this.itemsTarget.insertAdjacentHTML("afterbegin", html);
    this.element.style.display = 'block';
  }
}

export default EpisodeController;
