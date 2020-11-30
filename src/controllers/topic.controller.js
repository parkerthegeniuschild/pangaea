import { STATUS_CODES, MESSAGES, AMQP } from '../constants';
import Logger from '../logger/winston';
import Services from '../services';
import Response from '../helpers/response.helper';
import { sendToWorkerThread } from '../helpers/utils.helper';

const {
  OK,
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} = STATUS_CODES;

const {
  SERVER_ERROR, SUBSCRIPTION_SUCCESSFUL,
  PUBLISH_EVENT_FAILED,
  PUBLISH_EVENT_SUCCESSFUL,
} = MESSAGES;

const { SubscriptionService } = Services;

const {
  SUBSCRIBERS: { PUBLISH_NEW_EVENT }
} = AMQP;

/**
 * Handles topic pub/sub events
 */
export default class TopicController {
  /**
     * Creates a new subscription to a topic
     * @param {Object} req
     * @param {Object} res
     * @return {Promise<Object>}
     */
  static async subscribe(req, res) {
    const {
      body: { url },
      params: { topic }
    } = req;

    try {
      const result = await SubscriptionService.create({ url, topic });

      return !result
        ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, { message: SERVER_ERROR }, 'error')
        : Response.send(res, CREATED, result, { message: SUBSCRIPTION_SUCCESSFUL.replace('%TOPIC%', topic) });
    } catch (e) {
      Logger.error(e.stack);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, { message: SERVER_ERROR }, 'error');
    }
  }

  /**
   * Publishes an event to a topic
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<Object>}
   */
  static async publish(req, res) {
    const {
      body: { message },
      params: { topic }
    } = req;

    try {
      // send event to the worker thread after 100ms
      const result = await sendToWorkerThread({
        queue: PUBLISH_NEW_EVENT,
        data: {
          topic,
          message,
        }
      }, 100);

      return !result
        ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, { message: PUBLISH_EVENT_FAILED.replace('%TOPIC%', topic) }, 'error')
        : Response.send(res, CREATED, { topic, message }, { message: PUBLISH_EVENT_SUCCESSFUL.replace('%TOPIC%', topic) });
    } catch (e) {
      Logger.error(e.stack);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, { message: SERVER_ERROR }, 'error');
    }
  }

  /**
   * Listens to messages published to a subscribed topic
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<void>}
   */
  static async listen(req, res) {
    const {
      topic,
      message,
    } = req.body;

    try {
      Logger.info({ topic, message });

      // A simple 200 acknowledgement
      return Response.send(res, OK, undefined);
    } catch (e) {
      Logger.error(e.stack);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, { message: SERVER_ERROR }, 'error');
    }
  }
}
