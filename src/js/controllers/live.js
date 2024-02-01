import { Controller } from '@hotwired/stimulus';

const LiveController = class extends Controller {

  static targets = ['embed'];

  connect() {
    new Twitch.Embed(this.embedTarget, {
      width: '100%',
      height: 800,
      channel: "patternradio",
    });
  }
};

export default LiveController;
