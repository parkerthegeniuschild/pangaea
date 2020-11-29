import { Router } from 'express';
import SubscriptionController from '../../controllers/subscription.controller';
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
  SubscriptionController.create
);

export default router;
