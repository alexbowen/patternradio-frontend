import { Controller } from '@hotwired/stimulus';

const SearchController = class extends Controller {
  static targets = ['query'];

  connect() {

  }

  request(e) {
    e.preventDefault();
    const archivesController = this.application.getControllerForElementAndIdentifier(document.getElementById('archives'), 'archives');
    archivesController.search(this.queryTarget.value);
  }
};

export default SearchController;
