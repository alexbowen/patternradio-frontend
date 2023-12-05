import { Controller } from '@hotwired/stimulus';

const EpisodeController = class extends Controller {

  static values = {
    id: String
  }

  static host = 'https://api.mixcloud.com/patternradio/';

  connect() {
    this.request();
  }

  request() {
    fetch(EpisodeController.host + this.idValue)
      .then((response) => response.json())
      .then((data) => {
        this.add(data);
      });
  }

  add(a) {
    const templateId = this.data.get('showItemTemplateId');
    const template = document.getElementById(templateId);

    let clone = template.content.cloneNode(true);

    let parts = a.name.split(' - ');
    let title = clone.querySelector('.title');
    title.innerHTML = parts[0];
    title.href = `/show/${parts[0].toLowerCase().replace(/ /g, '-')}`;

    let host = clone.querySelector('.host');
    host.innerHTML = parts[1];

    let description = clone.querySelector('.description');
    let pre = document.createElement('pre');
    pre.innerHTML = a.description;
    description.appendChild(pre);

    if (parts[2]) {
      let detail = clone.querySelector('.detail');
      detail.innerHTML = parts[2];
      detail.href = `/episode/${a.slug}`;
    }

    let likes = clone.querySelector('.likes');

    let count = a.favorite_count === 0 ? a.favorite_count : a.favorite_count + 1;
    if (count > 0) {
      likes.querySelector('.count').innerHTML = count;
    } else {
      likes.classList.add('d-none');
    }

    let time = clone.querySelector('.time');
    time.innerHTML = `${this.formatTime(a.audio_length * 1000)} min`;

    let img = clone.querySelector('img');
    img.alt = a.name;
    img.src = a.pictures.large;

    let button = clone.querySelector('.playable');
    button.dataset.url = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=${a.key}`;

    let tags = clone.querySelector('.tags');
    tags.classList.add('mt-1');

    a.tags.forEach(t => {
      const tag = document.createElement("li");
      const button = document.createElement("button");

      button.innerHTML = t.name;
      button.classList.add('me-2');

      if (this.showTagsValue === true) {
        button.dataset.name = t.name.toLowerCase();
      }

      button.classList.add('badge');
      tag.appendChild(button);
      tags.appendChild(tag);
    });

    this.element.appendChild(clone);
  }

  formatTime(d) {
    return Math.floor(d / 60000);
  }
}

export default EpisodeController;
