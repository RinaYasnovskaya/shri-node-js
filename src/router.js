const express = require('express');
const { getSettings, postSettings } = require('./controllers');

// create Routers
const routerApi = new express.Router();
const routerMain = new express.Router();

// handlers for /api
routerApi.get('/settings', getSettings); // GET /api/settings  — получение сохраненных настроек
routerApi.post('/settings', postSettings); // POST /api/settings  - cохранение настроек
routerApi.get('/builds', (req, res) => res.send('get builds')); // GET  /api/builds  - получение списка сборок
routerApi.post('/builds/:commitHash', (req, res) => res.send('commitHash')); // POST /api/builds/:commitHash  - добавление сборки в очередь
routerApi.get('/builds/:buildId', (req, res) => res.send('buildId'));// GET  /api/builds/:buildId  - получение информации о конкретной сборке
routerApi.get('/builds/:buildId/logs', (req, res) => res.send('logs'));// GET  /api/builds/:buildId/logs  - получение логов билда (сплошной текст)

// handler for /
routerMain.get('/', (req, res) => res.render('index.html'));

// exports routers
exports.routerApi = routerApi;
exports.routerMain = routerMain;
