import { Controller } from '@hotwired/stimulus';

const StatusController = class extends Controller {
  static targets = ['title', 'artwork', 'currentimage', 'currentelapsed', 'currenttitle', 'nextimage', 'nexttitle'];

  detail() {
    fetch('https://public.radio.co/stations/s3ad39def4/next?v=1687467845917')
    .then((response) => response.json())
    .then((data) => {
      this.panel(data);
    });
  }

  update({detail: { status }}) {
    this.status = status;

    if (!this.status.current_track.title.includes('Off Air')) {
      this.titleTarget.innerHTML = "<span class=\"live\"> Live Now <span class=\"pulsating-circle\"></span></span>";
    } else {
      this.titleTarget.innerHTML = "Currently offline";
    }
  }

  panel(next) {
    if (!this.status.current_track.title.includes('Off Air')) {
      this.currentimageTarget.src = this.status.current_track.artwork_url;
      this.currenttitleTarget.innerHTML = this.status.current_track.title
      const timestamp = Date.now() - Date.parse(this.status.current_track.start_time) - 3600000;
      const h = new Date(timestamp).getHours();
      const m = new Date(timestamp).getMinutes();
      this.currentelapsedTarget.innerHTML = h > 0 ? `Started ${h} hour ${m} mins ago` : `Started ${m} mins ago`;
      this.nextimageTarget.src = next.next_track.artwork_url;
      this.nexttitleTarget.innerHTML = next.next_track.title.replace(' - ', '<br />');
    }
  }

  formatTime(d) {
    return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
};

export default StatusController;
