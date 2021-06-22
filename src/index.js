require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const process = require('process');
const { routerApi, routerMain } = require('./router');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);

app.use(express.json(
  {
    type: 'application/json',
  },
));

app.use('/', routerMain);
app.use('/api', routerApi);
app.get('/api', (req, res) => res.send('api part'));

server.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});
