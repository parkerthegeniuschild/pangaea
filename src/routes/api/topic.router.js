import { Router } from 'express';
import TopicController from '../../controllers/topic.controller';
import { ROUTES } from '../../constants';
import Validators from '../../validators';

const router = Router();

const { createSubscriptionValidator } = Validators;

const {
  SUBSCRIPTION: { CREATE }
} = ROUTES;

router.post(
  CREATE,
  createSubscriptionValidator,
  TopicController.subscribe
);

export default router;
