import Response from '../helpers/response.helper';
import Schemas from './schemas';
import { STATUS_CODES } from '../constants';
import { trimInputs } from '../helpers/utils.helper';

const {
  createSubscriptionSchema,
  publishEventSchema,
} = Schemas;

const { BAD_REQUEST } = STATUS_CODES;

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};

export default {
  async createSubscriptionValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await createSubscriptionSchema.validateAsync(req.body, options);

      return next();
    } catch (e) {
      return Response.send(res, BAD_REQUEST, undefined, { message: e.message }, 'error');
    }
  },

  async publishEventValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await publishEventSchema.validateAsync(req.body, options);

      return next();
    } catch (e) {
      return Response.send(res, BAD_REQUEST, undefined, { message: e.message }, 'error');
    }
  },
};
