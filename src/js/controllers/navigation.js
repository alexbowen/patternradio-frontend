import { Controller } from '@hotwired/stimulus';
import Route from '../models/Route';

const NavigationController = class extends Controller {
  static values = {
    route: String
  };

  navigate(e) {
    e.preventDefault();
    const route = new Route(this.element.href.split(`${window.location.host}/`)[1]);
    route.content();
  }
};

export default NavigationController;
