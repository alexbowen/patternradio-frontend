import { Controller } from '@hotwired/stimulus';

const EpisodeController = class extends Controller {

  static values = {
    id: String
  }

  static host = 'https://api.mixcloud.com/patternradio/';

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
    let content = this.element.querySelector('.episodes');
    content.insertAdjacentHTML("afterbegin", html);
    this.element.style.display = 'block';
  }
}

export default EpisodeController;
