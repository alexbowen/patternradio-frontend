import { Controller } from '@hotwired/stimulus';

const RadioController = class extends Controller {
  static targets = ['player'];

  connect() {
    // this.broadcastPlayer('https://embed.radio.co/player/b84cf70.html');
  }

  play(e) {
    const target = e.target.closest('.playable');
    this.broadcastPlayer(target.dataset.url);
  }

  broadcastPlayer(src) {
    this.playerTarget.innerHTML = '';
    const player = document.createElement('iframe');
    player.height = '120';
    player.width = '100%';
    player.allow = 'autoplay';
    player.src = src;
    this.playerTarget.insertAdjacentElement('beforeend', player);
  }
};

export default RadioController;
