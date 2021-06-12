const express = require('express');
const http = require('http');

const app = express();
const port = 8080;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log('Server has been started');
});
