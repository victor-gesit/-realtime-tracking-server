import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;

export default {
  verifyToken: (token, done) => {
    if (token) {
      done(null, { phone: '07069749945' });
      // jwt.verify(token, jwtSecret, (err, decoded) => {
      //   if (err) {
      //     console.log('Verifying token', jwtSecret, err, jwtSecret);
      //     return done({ message: 'Could not authenticate token' }, null);
      //   }
      //   done(null, { decoded });
      // });
    } else {
      done({ message: 'No token provided' }, null);
    }
  }
};
