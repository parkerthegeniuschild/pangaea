import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import HomeController from '../../controllers/home.controller';
import swaggerDocument from '../../api-docs/swagger.json';
import { ROUTES } from '../../constants';

const { API_DOCS, HOME } = ROUTES;

const router = Router();

const options = {
  explorer: true,
};

router.get(HOME, HomeController.helloWorld);
router.use(API_DOCS, serve);
router.get(API_DOCS, setup(swaggerDocument, options));

export default router;
