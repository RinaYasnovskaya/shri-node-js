const express = require('express');
const path = require('path');
const PORT = 8080;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static(path.join(__dirname, 'build')));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index.html', { title: 'home page' });
});

app.listen(PORT, () => {
  console.log('server has been started');
});