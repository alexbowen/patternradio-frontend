const routes = ['', 'home', 'browse', 'shows', 'show', 'posts', 'about', 'episode'];
const APP_CONTAINER_ELEMENT = document.getElementById('spa-content-container');

const Route = class {
  constructor(path) {
    const parts = path.split('/');
    const page = routes.indexOf(parts[0]) >= 0 ? parts[0] : routes[0];
    const id = parts[1] ? parts[1] : null;
    this.route = id ? `/${page}/${id}` : `/${page}`;
  }

  content() {
    const xhr = new XMLHttpRequest();

    //this scoping needs sorting out
    const route = this.route;

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        APP_CONTAINER_ELEMENT.innerHTML = xhr.responseText;
        const title = `Pattern Radio - Online Music Broadcasting`;
        window.history.pushState(
          { 'content': xhr.responseText, 'title': title },
          title,
          route
        );
      }
    };
    
    xhr.open('GET', `/page${this.route}`, true);
    xhr.send();
  }
}

export default Route;
