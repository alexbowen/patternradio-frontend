import { Controller } from '@hotwired/stimulus';

const SearchController = class extends Controller {
  static targets = ['query'];

  connect() {

  }

  request(e) {
    e.preventDefault();
    const episodesController = this.application.getControllerForElementAndIdentifier(document.getElementById('episodes'), 'episodes');
    episodesController.search(this.queryTarget.value);
  }

  clear() {
    this.queryTarget.value = "";
  }
};

export default SearchController;
