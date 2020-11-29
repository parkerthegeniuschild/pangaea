import Joi from '@hapi/joi';

export default Joi.object({
  url: Joi.string().required()
});
