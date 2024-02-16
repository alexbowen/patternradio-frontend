import { Controller } from '@hotwired/stimulus';

const HeadingController = class extends Controller {
  static targets = ['title', 'reset', 'preferences'];

  current = 1;

  connect() {}

  update({detail: { total, query, filters, title }}) {
    if (total > 0 && query) {
      this.titleTarget.innerHTML = `Results Matching "${query}"`;
      this.preferencesTarget.classList.add('d-none');
    } else if (total === 0 && query) {
      this.titleTarget.innerHTML = `No Results Matching "${query}"`;
      this.preferencesTarget.classList.add('d-none');
    } else {
      this.titleTarget.innerHTML = title;
      filters && !query ? this.preferencesTarget.classList.remove('d-none') : this.preferencesTarget.classList.add('d-none');
    }
  }
};

export default HeadingController;
