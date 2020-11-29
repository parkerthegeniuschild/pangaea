import { Router } from 'express';
import TopicController from '../../controllers/topic.controller';
import { ROUTES } from '../../constants';
import Validators from '../../validators';

const router = Router();

const {
  createSubscriptionValidator,
  publishEventValidator,
} = Validators;

const {
  SUBSCRIPTION: { SUBSCRIBE, PUBLISH_EVENT }
} = ROUTES;

router.post(
  SUBSCRIBE,
  createSubscriptionValidator,
  TopicController.subscribe
);

router.post(
  PUBLISH_EVENT,
  publishEventValidator,
  TopicController.publish
);

export default router;
