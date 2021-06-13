const express = require('express');
const http = require('http');
const { routerApi, routerMain } = require('./router');

const app = express();
const port = 8080;
const server = http.createServer(app);

app.use('/api', routerApi);

app.use('/', routerMain);

server.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});
