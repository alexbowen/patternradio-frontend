import { Controller } from '@hotwired/stimulus';
import Route from '../models/Route';

const NavigationController = class extends Controller {

  navigate(e) {
    if (!e.target.dataset.external && document.querySelector('.player-footer') === null) {
      return;
    }

    if (e.target.dataset.external) {
      document.querySelector('.player-footer').remove();
    }

    e.preventDefault();
    const route = new Route(e.target.href.split(`${window.location.host}/`)[1]);
    route.content();
  }
};

export default NavigationController;
