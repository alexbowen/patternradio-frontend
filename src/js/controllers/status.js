import { Controller } from '@hotwired/stimulus';

const StatusController = class extends Controller {
  static targets = ['track'];

  connect() {
    fetch('https://public.radio.co/stations/s3ad39def4/next?v=1687467845917')
    .then((response) => response.json())
    .then((data) => {
      this.panel(data);
    });

    window.setInterval(() => {
      fetch('https://public.radio.co/stations/s3ad39def4/next?v=1687467845917')
      .then((response) => response.json())
      .then((data) => {
          this.panel(data);
        });
    }, 10000);
  }

  panel(next) {
    this.trackTarget.innerHTML = next.next_track.title;
  }
};

export default StatusController;
