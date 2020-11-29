import Joi from '@hapi/joi';

export default Joi.object({
  message: Joi.string().required()
});
