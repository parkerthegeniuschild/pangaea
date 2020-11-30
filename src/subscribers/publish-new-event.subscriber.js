import { isEmpty } from 'lodash';
import {
  AMQP,
  MESSAGES,
} from '../constants';
import Logger from '../logger/winston';
import { createAMQPConnection, publicBroadcast } from '../helpers/utils.helper';
import Services from '../services';

const {
  BROADCAST_EVENT_SUCCESSFUL,
  LISTENING_FOR_MESSAGES,
  NO_ACTIVE_SUBSCRIBERS_FOUND,
} = MESSAGES;

const { SubscriptionService } = Services;

const {
  SUBSCRIBERS: {
    PUBLISH_NEW_EVENT: queue,
  }
} = AMQP;

const publishNewEvent = async () => {
  try {
    const connection = await createAMQPConnection();
    if (!connection) return false;

    process.once('SIGINT', connection.close.bind(connection));

    const channel = await connection.createChannel();
    const assert = await channel.assertQueue(queue, { durable: true });

    if (!assert) return false;

    Logger.info(LISTENING_FOR_MESSAGES.replace('%QUEUE%', queue));
    return channel.consume(queue, async (message) => {
      if (message !== null) {
        const { topic, message: body } = JSON.parse(message.content.toString());

        // find all active subscribers for the topic
        const subscribers = await SubscriptionService.findAll({
          topic,
          active: true
        });

        /* At this point, depending on the use case, we might choose to ACK the message or not.
           * I have chosen a positive acknowledgement. Take note, that I have not configured
           * a dead-letter exchange at the broker (as it is not within the scope of this exercise),
           * which will allow us to retry this job. The positive
           * side of a positive ACK, is that the message will be persisted,
           * at least for as long as the broker's default settings.
           * And whenever a new subscriber is found, they will get the message.
           * The only downside is that, it might not be relevant anymore i.e. outdated.
           * A simple acknowledgement will destroy the message
           * whether it has reached any subscribers or not. You may want to use this for one-time
           * deliveries ONLY such as bank credit/debit alerts, as they ONLY go out once.
           */
        if (isEmpty(subscribers)) {
          channel.ack(message);
          return Logger.info(NO_ACTIVE_SUBSCRIBERS_FOUND.replace('%TOPIC%', topic));
        }

        const result = await publicBroadcast(subscribers, topic, body);

        if (result) {
          Logger.info(BROADCAST_EVENT_SUCCESSFUL.replace('%TOPIC%', topic));

          // All's well that ends well
          channel.ack(message);
        }
      }
    });
  } catch (e) {
    Logger.error(e.stack);
    return false;
  }
};

export default publishNewEvent;
