import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.warnings = false;
application.debug = false;
window.Stimulus = application;

import NavigationController from './controllers/navigation';
import RadioController from './controllers/radio';
import EpisodesController from './controllers/episodes';
import EpisodeController from './controllers/episode';
import ScheduleController from './controllers/schedule';
import SearchController from './controllers/search';
import StatusController from './controllers/status';
import StreamController from './controllers/stream';
import FiltersController from './controllers/filters';
import PostsController from './controllers/posts';

import PaginationController from './controllers/list/pagination';
import HeadingController from './controllers/list/heading';

application.register('navigation', NavigationController);
application.register('radio', RadioController);
application.register('episodes', EpisodesController);
application.register('episode', EpisodeController);
application.register('schedule', ScheduleController);
application.register('search', SearchController);
application.register('status', StatusController);
application.register('stream', StreamController);
application.register('filters', FiltersController);
application.register('posts', PostsController);

application.register('pagination', PaginationController);
application.register('heading', HeadingController);

const useHash = false;
const routes = ['', 'home', 'browse', 'shows', 'show', 'posts', 'about', 'episode'];
const content = document.getElementById("spa-content-container");

function get(page, id) {
  const xhr = new XMLHttpRequest();

  const route = id ? `/${page}/${id}` : `/${page}`;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      content.innerHTML = xhr.responseText;
      const title = `Pattern Radio - Online Music Broadcasting`;
      window.history.pushState(
        { 'content': xhr.responseText, 'title': title },
        title,
        useHash ?
          `${route}` :
          route
      );
    }
  };
  xhr.open('GET', `/pages${route}`, true);
  xhr.send();
}

window.addEventListener("popstate", function(e) {
  const state = e.state;
  content.innerHTML = state.content;
});

(function(fn = function() {
  const page = useHash ?
    window.location.hash.split('#').pop() :
    window.location.href.split('/').pop();

    const route = window.location.href.split(`${window.location.host}/`)
    const parts = route[1].split('/');
    
  get(routes.indexOf(parts[0]) >= 0 ? parts[0] : routes[0], parts[1] ? parts[1] : null);
}) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})();
