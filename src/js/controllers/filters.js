import { Controller } from '@hotwired/stimulus';
import Storage from '../models/Storage';

export const FILTERS_KEY = 'patternradio-filters';

const FiltersController = class extends Controller {
  static targets = ['nav', 'selected', 'groups', 'status', 'panel', 'indicator'];

  static values = {
    target: String
  };

  static filters = {
    'genre' : [
      'Blues',
      'Broken Beat',
      'Disco',
      'Dub',
      'Electro',
      'Electronica',
      'Funk',
      'Hip Hop',
      'Jazz',
      'House',
      'Punk',
      'Reggae',
      'Rock',
      'Soul',
      'Techno',
      'World'
    ].sort(),
    'style': [
      'Afro',
      'Latin',
      'Fusion',
      'Modern',
      'Progressive',
      'Balearic',
      'Retro',
      'Deep',
      'Downtempo',
      'Psychedelic',
      'Funky',
      'Club',
      'Roots'
    ].sort()
  };

  selected = [];

  storage = new Storage;

  connect() {
    Object.entries(FiltersController.filters).forEach(a => {

      let tab = document.createElement('li');
      tab.classList.add('nav-item');

      let link = document.createElement('a');
      link.classList.add('nav-link');
      link.setAttribute('data-target', a[0]);
      link.innerHTML = a[0];
      link.addEventListener('click', this.selectGroup);
      tab.appendChild(link);

      this.navTarget.appendChild(tab);

      this.createGroup(a[1], a[0]);
    });

    const initialGroup = document.querySelector('.filters .nav-link:first-child');

    initialGroup.classList.add('active');

    FiltersController.showGroup(initialGroup.dataset.target);

    this.updateFilters();
  }

  createGroup(filters, name) {
    const templateId = this.data.get('tagItemTemplateId');

    const template = document.getElementById(templateId);

    filters.forEach(a => {
      let clone = template.content.cloneNode(true);

      let el = clone.querySelector('li');
      el.dataset.group = name;
      el.dataset.filter = a.toLowerCase();

      let button = clone.querySelector('button');
      button.classList.add('badge');
      button.innerHTML = a;
    
      this.groupsTarget.appendChild(clone);
    });
  }

  selectGroup(e) {
    Array.from(document.querySelectorAll('.filters .nav-link')).forEach(el => {
      el.classList.remove('active');
    });

    e.target.classList.add('active');

    FiltersController.showGroup(e.target.dataset.target);
  }

  static showGroup(name) {
    Array.from(document.querySelectorAll('.tag')).forEach(el => {
      el.style.display = 'none';
    });

    document.querySelectorAll(`.groups ul li[data-group='${name}']`).forEach(el => {
      el.style.display = 'inline';
    });
  }

  clear() {
    this.selected = [];
    this.storage.setItem(FILTERS_KEY, '');
    this.updateFilters();
    this.filter();
  }

  updateFilters() {   
    if (!this.storage.getItem(FILTERS_KEY)) {
      this.storage.setItem(FILTERS_KEY, '');
    }
    
    this.selected = this.storage.getItem(FILTERS_KEY).length ? this.storage.getItem(FILTERS_KEY).split(',') : [];

    document.querySelectorAll('.groups ul li').forEach(el => {
      el.classList.remove('selected');
    });

    let selectedEl;

    this.selected.forEach(a => {
      selectedEl = document.querySelector(`.groups ul li[data-filter='${a}']`);

      if (selectedEl) {
        selectedEl.classList.add('selected');
      }
    });

    this.statusTarget.innerHTML = this.selected.length ? `(${this.selected.length})` : '';
  }

  updateSelected(e) {
    if (this.selected.includes(e.target.innerHTML.toLowerCase())) {
      const index = this.selected.indexOf(e.target.innerHTML.toLowerCase());
      this.selected.splice(index, 1);
    } else {
      this.selected.push(e.target.innerHTML.toLowerCase());
    }

    this.storage.setItem(FILTERS_KEY, this.selected.join(','));

    this.filter();

    this.updateFilters();
  }

  filter() {
    const targets = document.querySelectorAll('[data-filtered="true"]');
    if (targets) {
      let targetController;
      Array.from(targets).forEach((t) => {
        targetController = this.application.getControllerForElementAndIdentifier(t, 'episodes');
        targetController.filter();
      });
    }
  }
};

export default FiltersController;
