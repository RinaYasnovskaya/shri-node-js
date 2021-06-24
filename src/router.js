const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');
const {
  getSettings,
  postSettings,
  getBuilds,
  getBuildInformation,
  getBuildLogs,
  postBuildWithCommitHash,
} = require('./controllers');

// create Routers
const routerApi = new express.Router();
const routerMain = new express.Router();

// handlers for /api
routerApi.get('/settings', getSettings); // GET /api/settings  — получение сохраненных настроек
routerApi.post('/settings', postSettings); // POST /api/settings  - cохранение настроек
routerApi.get('/builds', getBuilds); // GET  /api/builds  - получение списка сборок
routerApi.post('/builds/:commitHash', postBuildWithCommitHash); // POST /api/builds/:commitHash  - добавление сборки в очередь
routerApi.get('/builds/:buildId', getBuildInformation);// GET  /api/builds/:buildId  - получение информации о конкретной сборке
routerApi.get('/builds/:buildId/logs', getBuildLogs);// GET  /api/builds/:buildId/logs  - получение логов билда (сплошной текст)

// handler for /
// routerMain.get('/', (req, res) => res.render('index.html'));
// routerMain.use(
//   '/',
//   process.env.NODE_ENV === 'production'
//     ? express.static(path.resolve(__dirname, '..', 'client', 'dist'))
//     : createProxyMiddleware({
//       target: 'http://localhost:3000',
//       secure: false,
//       changeOrigin: true,
//     }),
// );

// exports routers
exports.routerApi = routerApi;
exports.routerMain = routerMain;
