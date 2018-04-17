import express from 'express';
import requesterController from '../controllers/requesterController';
import generalController from '../controllers/general';

const router = express.Router();

router.post('/request', requesterController.requestDispatcherREST);
router.post('/signin', generalController.signIn);
router.post('/verifycode', generalController.verifyCode);
router.use('/*', (req, res) => res.status(200).send({
  success: true,
  message: 'Api up and running'
}));

export default router;
