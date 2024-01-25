import { Controller } from '@hotwired/stimulus';

const NavigationController = class extends Controller {
  static values = {
    route: String
  }

  navigate(e) {
    e.preventDefault();
    const route = this.element.href.split(`${window.location.host}/`)
    const parts = route[1].split('/');
    this.get(parts[0], parts[1]);
  }

  get(page, id) {
    const route = id ? `/${page}/${id}` : `/${page}`;
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  
        document.getElementById("spa-content-container").innerHTML = xhr.responseText;
        const title = `Pattern Radio - Online Music Broadcasting`;
        window.history.pushState(
          { 'content': xhr.responseText, 'title': title },
          title,
          route
        );
      }
    };
    
    xhr.open('GET', `/page${route}`, true);
    xhr.send();
  }
};

export default NavigationController;
