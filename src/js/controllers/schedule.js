import { Controller } from '@hotwired/stimulus';

const ScheduleController = class extends Controller {
  static targets = ['episodes'];

  static exclude = ['Off Air', 'On Air Soon', 'On Air Electronic', 'On Air Eclectic', 'On Air Latest', 'On Air Organic', 'On Air Funky', 'On Air NYE'];

  connect() {
    fetch('https://public.radio.co/stations/s3ad39def4/embed/schedule')
      .then((response) => response.json())
      .then((data) => {
        this.schedule = data.data.filter(s => new Date(s.start) > Date.now()).filter(s => !ScheduleController.exclude.includes(s.playlist.title)).slice(0, 10);
        this.add();
      });
  }

  add() {
    const templateId = this.data.get('showItemTemplateId');
    const template = document.getElementById(templateId);

    this.schedule.forEach(a => {
      let clone = template.content.cloneNode(true);
      
      let title = clone.querySelector('.title');
      title.innerHTML = a.playlist.title;

      let host = clone.querySelector('.host');
      host.innerHTML = a.playlist.artist;

      let when = clone.querySelector('.when');
      when.innerHTML = `${this.formatDate(a.start)} ${this.formatTime(a.start)}`;

      let img = clone.querySelector('img');
      img.src = a.playlist.artwork;

      this.episodesTarget.appendChild(clone);
    });
  }

  formatDate(d) {
    const date = new Date(d);
    const parts = [
      date.toLocaleString('en-us', {  weekday: 'short' }),
      date.getDate(),
      date.toLocaleString('en-us', { month: 'short' }),
    ];
    return parts.join(' ');
  }

  formatTime(d) {
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
};

export default ScheduleController;
