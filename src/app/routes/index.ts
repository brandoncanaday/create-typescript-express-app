import express from 'express';
import { serve, setup } from 'swagger-ui-express';
// import { swaggerDoc } from '../swagger';

const router = express.Router();

// redirect root route to docs
router.get('/', (_, res) => res.redirect('/api/docs'));

// <routes go here>

router.use('/docs', serve);
// router.get('/docs', setup(swaggerDoc));

export { router as routes };
