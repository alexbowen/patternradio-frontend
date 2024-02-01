import { Application } from '@hotwired/stimulus';

import FiltersController from './filters';
import HeaderController from './header';
import LiveController from './live';
import NavigationController from './navigation';
import RadioController from './radio';
import ScheduleController from './schedule';
import StatusController from './status';
import StreamController from './stream';

import EpisodesController from './data/episode/index';
import EpisodeController from './data/episode/show';
import PostsController from './data/post/index';

import PaginationController from './list/pagination';
import HeadingController from './list/heading';
import SearchController from './list/search';

const application = Application.start();

application.warnings = false;
application.debug = false;
window.Stimulus = application;

application.register('filters', FiltersController);
application.register('header', HeaderController);
application.register('live', LiveController);
application.register('navigation', NavigationController);
application.register('radio', RadioController);
application.register('schedule', ScheduleController);
application.register('status', StatusController);
application.register('stream', StreamController);

application.register('episodes', EpisodesController);
application.register('episode', EpisodeController);
application.register('posts', PostsController);

application.register('pagination', PaginationController);
application.register('heading', HeadingController);
application.register('search', SearchController);
