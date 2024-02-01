import { Controller } from '@hotwired/stimulus';

const LiveController = class extends Controller {

  static targets = ['embed'];

  connect() {
    new Twitch.Embed(this.embedTarget, {
      width: '100%',
      height: 600,
      channel: "patternradio",
    });
  }
};

export default LiveController;
