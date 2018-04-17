import socketIO from 'socket.io';
import dispatcherController from './controllers/dispatcherController';
import requesterController from './controllers/requesterController';

import utils from './utils';

export default (server, app) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    const { token, role, id } = socket.handshake.query;

    utils.verifyToken(token, (err, decoded) => {
      const { phone } = decoded;
      if (err) {
        socket.disconnect();
      }

      if (role === 'driver') {
        console.log('DRIVER ID: ', id);
        socket.join(id);
      }

      if (role === 'rider') {
        socket.join(id);
        console.log('Riding With: ', id);
      }

      dispatcherController.saveDriverLocation({
        phone,
        lastLocation: {
          long: 2.35123545,
          lat: 5.1234134
        },
        name: 'Sample Driver',
        rating: 5,
        plate: 'XA123MX'
      });
    });

    socket.on('hi', () => {
      console.log('Hi is said');
    });

    socket.on('chat message', (data) => {
      const { to, msg } = data;
      io.in(to).emit('chat message', { msg });
      console.log('Message received', msg, to);
    });

    socket.on('requestDispatcher', (data) => {
      requesterController.requestDispatcher(data, (err, dispatcher) => {
        if (err) {
          console.log('Error: ', err.message);
        }
        const { phone } = dispatcher;
        if (phone) {
          socket.join(phone);
        }
      });
    });

    socket.on('currentLocation', (data) => {
      const { location, phone } = data;
      io.in(phone).emit('dispatcherLocation', { location });
    });

    socket.on('confirmPickup', (data) => {
      const { dispatcherId } = data;
      if (data && dispatcherId) {
        socket.join(dispatcherId);
      }
    });
  });
};
