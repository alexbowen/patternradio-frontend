const sass = require('sass');
const fs = require('fs');

const result = sass.compile('./src/css/style.scss', {style: "compressed"});

fs.writeFile('./public/css/style.min.css', result.css, (err) => {
  if (err) throw err;
  console.log('CSS written!');
});
