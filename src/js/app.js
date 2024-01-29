import Route from './models/Route';
import './controllers';

const useHash = false;

window.addEventListener('popstate', (e) => {
  const state = e.state;
  document.getElementById('spa-content-container').innerHTML = state.content;
});

(function(content = () => {
  useHash ?
    window.location.hash.split('#').pop() :
    window.location.href.split('/').pop();

    const route = new Route(window.location.href.split(`${window.location.host}/`)[1]);
    route.content();
}) {
  if (document.readyState != 'loading') {
    content();
  } else {
    document.addEventListener('DOMContentLoaded', content);
  }
})();
