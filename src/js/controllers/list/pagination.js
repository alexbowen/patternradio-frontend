import { Controller } from '@hotwired/stimulus';

const PaginationController = class extends Controller {
  static targets = ['stats', 'control'];

  current = 1

  connect() {}

  update({detail: { limit, offset, total }}) {

    const to = (parseInt(offset, 10) + parseInt(limit, 10)) > total ? total : parseInt(offset, 10) + parseInt(limit, 10);
    
    this.statsTarget.innerHTML = `<p>Showing ${parseInt(offset, 10) + 1} to ${to} results of ${total}</p>`;
    const operand = total % limit;
    const complete = total - operand;
    const numberLinks = (complete/limit) + (operand > 0 ? 1 : 0);
    this.total = total;

    this.controlTarget.innerHTML = '';

    const control = document.createElement('ul');

    for (let step = 1; step < numberLinks + 1; step++) {
      
      let page = document.createElement('li');
      let link = document.createElement('button');
      link.dataset.limit = limit;
      link.dataset.offset = limit * (step - 1);
      link.dataset.page = step;
      link.innerHTML = step;
      page.appendChild(link);
      control.appendChild(page);
    }

    this.controlTarget.appendChild(control);

    const current = document.querySelector(`button[data-page="${this.current}"]`);

    if (current) {
      current.classList.add('current');
    }
  }

  paginate(e) {
    this.current = e.target.dataset.page;
    this.dispatch("paginate", { detail: { limit: e.target.dataset.limit, offset: e.target.dataset.offset } });
  }
};

export default PaginationController;
