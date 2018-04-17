import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import {} from 'dotenv/config';

import routes from './routes';
import socketServer from './socketServer';

const mongoDB = process.env.DB_URL;

mongoose.connect(mongoDB).then(() => {
  console.log('Database connection successful');
})
  .catch((err) => {
    console.log('Database connection failed.', err);
  });

const db = mongoose.connection;
db.on('error', () => {
  console.log('Error occured');
});

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.Server(app);

socketServer(httpServer, app);
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use('/api', routes);

app.get('/home', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));

app.get('/server', (req, res) =>
  res.status(200).send({
    message: 'Server up and running',
    success: true
  }));


httpServer.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
