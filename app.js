import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import SocketIO from 'socket.io';


import routes from './routes';
import utils from './utils';

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.Server(app);
const io = SocketIO(httpServer);

app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  utils.verifyToken(token, (err, decoded) => {
    if (err) {
      socket.disconnect();
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('hi', () => {
    console.log('Hi is said');
  });
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
    console.log('Message received', data);
  });
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
