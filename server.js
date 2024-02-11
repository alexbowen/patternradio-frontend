const fallback = require('express-history-api-fallback');
const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3000;

const nunjucks = require('nunjucks');

const shows = require('./src/data/shows');

const app = express();

const env = nunjucks.configure(__dirname + '/src/views', {
    autoescape: true,
    noCache: true,
    express: app
});

env.addGlobal('timeToMinutes', (d) => Math.floor(d * 1000 / 60000));



// const ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');

// ws.on('error', console.error);

// ws.on('open', function open() {

// });

// ws.on('message', function message(data) {
  
//   console.log('received: %s', data);
//   const json = JSON.parse(data);

  

//   const test = {
//     "type": "stream.online",
//     "version": "1",
//     "condition": {
//         "broadcaster_user_id": "1025729262"
//     },
//     "transport": {
//         "method": "websocket",
//         "session_id": json.payload.session.id
//     }
// };

//   ws.send(JSON.stringify(test));
// });

/* next two functions temporary till look at rails app api */
env.addGlobal('showData', (name) => {
  const parts = name.split('-');
  return {
    title: parts[0],
    host: parts[1],
    detail: parts[2]
  }
});

env.addGlobal('showTitleId', (title) => title.toLowerCase().replace(/ /g, '-'));

const root = path.join(__dirname, 'public');

app.use(express.static(root));

// const host = 'http://localhost:5000';
const host = 'https://patternradio-api-e873df4d91a5.herokuapp.com';

app
.get('/page', (req, res) => {
  let  data = {
    page: 'home',
    layout:  'layout.njk',
    title: 'Home'
  }
  res.render('page/home.njk', data)
})
.get('/page/home', (req, res) => {
  let  data = {
    page: 'home',
    layout:  'layout.njk',
    title: 'Home'
  }
  res.render('page/home.njk', data)
})
.get('/page/live', (req, res) => {
  let  data = {
    page: 'live',
    layout:  'layout.njk',
    title: 'Live'
  }
  res.render('page/live.njk', data)
})
.get('/page/shows', (req, res) => {
  let  data = {
    page: 'shows',
    layout:  'layout.njk',
    title: 'Regular Shows',
    data: shows
  }
  res.render('page/shows.njk', data)
})
.get('/page/show/:id', (req, res) => {
  let  data = {
    page: 'show',
    layout:  'layout.njk',
    title: 'Show',
    item: shows.find(s => s.id === req.params.id)
  }
  res.render('page/show.njk', data)
})
.get('/page/episode/:id', (req, res) => {
  let  data = {
    page: 'episode',
    layout:  'layout.njk',
    title: 'Broadcast Shows',
    item: req.params.id
  }
  res.render('page/episode.njk', data)
})
.get('/page/posts', (req, res) => {
  let  data = {
    page: 'posts',
    layout:  'layout.njk',
    title: 'Posts'
  }
  res.render('page/posts.njk', data)
})
.get('/page/about', (req, res) => {
  let  data = {
    page: 'about',
    layout:  'layout.njk',
    title: 'About'
  }
  res.render('page/about.njk', data)
})
.get('/page/browse', (req, res) => {
  let data = {
    page: 'browse',
    layout:  'layout.njk',
    title: 'Browse Shows'
  }
  res.render('page/browse.njk', data)
})
.get('/partial/episodes', (req, res) => {
  const template =  req.query.template ? req.query.template : 'list';

  fetch(`${host}/api/shows/?${new URLSearchParams(req.query)}`)
    .then((response) => response.json())
    .then((episodes) => {
      let  data = {
        layout: 'partial/list/_layout.njk',
        data: { list: episodes }
      }
      res.render(`partial/episode/_${template}.njk`, data);
  });
})
.get('/partial/episode/:id', (req, res) => {
  fetch(`https://api.mixcloud.com/patternradio/${req.params.id}`)
    .then((response) => response.json())
    .then((episode) => {
      res.render(`partial/episode/_detail.njk`, {
        data: { episode }
      });
  });
})
.get('/partial/posts', (req, res) => {
  fetch(`${host}/api/posts/?${new URLSearchParams(req.query)}`)
    .then((response) => response.json())
    .then((posts) => {
      let  data = {
        data: { list: posts }
      }
      res.render(`partial/post/_list.njk`, data);
  });
})
.use(fallback('index.html', { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${ PORT }`));
