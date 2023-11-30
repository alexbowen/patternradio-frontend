import { Controller } from '@hotwired/stimulus';

const StreamController = class extends Controller {
  static targets = ['track', 'play'];

  connect() {
    fetch('https://public.radio.co/stations/s3ad39def4/status')
      .then((response) => response.json())
      .then((data) => {
        this.status = data;
        this.update();
      });

    window.setInterval(() => {
      fetch('https://public.radio.co/stations/s3ad39def4/status')
        .then((response) => response.json())
        .then((data) => {
          this.status = data;
          this.update();
        });
    }, 10000);
  }

  update() {
    this.dispatch("update", { detail: { status: this.status } })
    this.trackTarget.innerHTML = this.status.current_track.title;
  }
};

export default StreamController;
