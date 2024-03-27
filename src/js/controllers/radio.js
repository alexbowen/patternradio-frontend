import { Controller } from '@hotwired/stimulus';

const RadioController = class extends Controller {
  static targets = ['player'];

  connect() {
    const d = new Date();
    const bdays = [5,6,7];
    
    let day = d.getDay();
  
    if ((d.getHours() >= 14 || d.getHours() <= 6) && bdays.includes(day)) {
      this.broadcastPlayer('https://embed.radio.co/player/b84cf70.html');
    }
  
    return false;
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


