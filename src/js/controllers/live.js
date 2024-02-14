import { Controller } from '@hotwired/stimulus';

const LiveController = class extends Controller {

  static targets = ['embed'];

  connect() {
    if (document.querySelector('.player-footer')) {
      document.querySelector('.player-footer').remove();
    }

    new Twitch.Embed(this.embedTarget, {
      width: '100%',
      height: 800,
      channel: 'patternradio',
    });
  }
};

export default LiveController;
