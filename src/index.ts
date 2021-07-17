import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import process from 'process';
import cors from 'cors';
import { routerApi, routerMain } from './router';

dotenv.config();
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use(cors());
app.use(express.json(
  {
    type: 'application/json',
  },
));

app.use('/', routerMain);
app.use('/api', routerApi);
app.get('/api', (req: Request, res: Response) => res.send('api part'));

server.listen(port, () => {
  console.log(`Server has been started on ${port}`);
});
