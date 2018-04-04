import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.use('/*', (req, res) => res.status(200).send({
  success: true,
  message: 'Api up and running'
}));

export default router;
