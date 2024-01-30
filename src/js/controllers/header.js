import { Controller } from '@hotwired/stimulus';

const HeaderController = class extends Controller {
  connect() {}

  scroll() {
    const collapseElementList = this.element.querySelectorAll('.scroll-collapse');
    const collapseList = [...collapseElementList].map(collapseEl => bootstrap.Collapse.getOrCreateInstance(collapseEl));
    Array.from(collapseList).forEach((el) => el.hide());
  }
};

export default HeaderController;
