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
    }, 5000);
  }

  update() {
    this.dispatch("update", { detail: { status: this.status } })

    if (!this.status.current_track.title.includes('Off Air')) {
      this.playTarget.classList.remove('d-none');
      this.trackTarget.innerHTML = this.status.current_track.title;
    } else {
      this.trackTarget.innerHTML = "Back tomorrow at 12 midday (GMT)";
      this.playTarget.classList.add('d-none');
    }
  }

  formatTime(d) {
    return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
};

export default StreamController;
