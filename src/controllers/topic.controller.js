import { STATUS_CODES, MESSAGES } from '../constants';
import Logger from '../logger/winston';
import Services from '../services';
import Response from '../helpers/response.helper';

const { CREATED, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = STATUS_CODES;
const { SERVER_ERROR, SUBSCRIPTION_SUCCESSFUL, } = MESSAGES;
const { SubscriptionService } = Services;

/**
 * Handles topic pub/sub events
 */
export default class TopicController {
  /**
     * Creates a new subscription to a topic
     * @param {Object} req
     * @param {Object} res
     * @return {Promise<void>}
     */
  static async subscribe(req, res) {
    const {
      body: { url },
      params: { topic }
    } = req;

    try {
      const result = await SubscriptionService.create({ url, topic });

      return !result
        ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, { message: SERVER_ERROR })
        : Response.send(res, CREATED, result, { message: SUBSCRIPTION_SUCCESSFUL.replace('%TOPIC%', topic) });
    } catch (e) {
      Logger.error(e.stack);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, { message: SERVER_ERROR }, 'error');
    }
  }
}
