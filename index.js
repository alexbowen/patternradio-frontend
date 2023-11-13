const fallback = require('express-history-api-fallback');
const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3000;

const nunjucks = require('nunjucks');

const shows = require('./src/data/shows');
const filters = require('./src/data/filters');

const app = express();

nunjucks.configure(__dirname + '/src/views', {
    autoescape: true,
    noCache: false,
    express: app
});

const root = path.join(__dirname, 'public');

app.use(express.static(root))

app
.get('/pages', (req, res) => {
  let  data = {
    page: 'home',
    layout:  'layout.njk',
    title: 'Home',
    data: { filters }
  }
  res.render('home.njk', data)
})
.get('/pages/home', (req, res) => {
  let  data = {
    page: 'home',
    layout:  'layout.njk',
    title: 'Home',
    data: { filters }
  }
  res.render('home.njk', data)
})
.get('/pages/shows', (req, res) => {
  let  data = {
    page: 'shows',
    layout:  'layout.njk',
    title: 'Broadcast Shows',
    data: shows
  }
  res.render('shows.njk', data)
})
.get('/pages/show/:id', (req, res) => {
  let  data = {
    page: 'show',
    layout:  'layout.njk',
    title: 'Broadcast Shows',
    item: shows.find(s => s.id === req.params.id)
  }
  res.render('show.njk', data)
})
.get('/pages/blog', (req, res) => {
  let  data = {
    page: 'blog',
    layout:  'layout.njk',
    title: 'Blog'
  }
  res.render('blog.njk', data)
})
.get('/pages/about', (req, res) => {
  let  data = {
    page: 'about',
    layout:  'layout.njk',
    title: 'About'
  }
  res.render('about.njk', data)
})
.get('/pages/browse', (req, res) => {
  let data = {
    page: 'browse',
    layout:  'layout.njk',
    title: 'Broadcast Archives',
    data: { filters }
  }
  res.render('browse.njk', data)
})
.use(fallback('index.html', { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${ PORT }`));
