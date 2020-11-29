import {
  AMQP,
  MESSAGES,
} from '../constants';
import Logger from '../logger/winston';
import { createAMQPConnection } from '../helpers/utils.helper';

const {
  PUBLISH_EVENT_SUCCESSFUL,
  LISTENING_FOR_MESSAGES,
  MESSAGE_RECEIVED,
} = MESSAGES;

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
        Logger.info(MESSAGE_RECEIVED.replace('%MESSAGE%', message.content.toString()));

        // const data = JSON.parse(message.content.toString());

        // TODO: Do something with the message e.g. broadcast it
      }
    });
  } catch (e) {
    Logger.error(e.stack);
    return false;
  }
};

export default publishNewEvent;
