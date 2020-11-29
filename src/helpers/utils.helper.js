import { isEmpty } from 'lodash';
import amqp from 'amqplib';
import Logger from '../logger/winston';
import { MESSAGES, AMQP } from '../constants';

const { CONNECTION_URI } = AMQP;
const {
  AMQP_CONNECTION_FAILED,
  DISPATCHED_TO_BROKER,
} = MESSAGES;

/**
 * Trim form inputs
 * @param {Object} form request object
 * @returns {Object} trimmed data
 */
export const trimInputs = (form) => {
  // replace every value with trimmed content, except arrays
  const arr = Object.keys(form);

  for (let i = 0; i < arr.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(form, arr[i])) {
      if (Array.isArray(form[arr[i]]) || form[arr[i]] instanceof Object || isEmpty(form[arr[i]])) {
        continue;
      }

      form[arr[i]] = form[arr[i]].trim();
    }
  }

  return form;
};

/**
 * Creates a new AMQP connection
 * @return {Promise<boolean>} true of false with connection data
 */
export const createAMQPConnection = async () => {
  const connection = await amqp.connect(CONNECTION_URI);
  return connection || false;
};

/**
 * Makes a thread sleep for a while, intentional delay.
 * @param {Number} ms time to sleep in milliseconds
 * @returns {Promise<Function>} will resolve function if slept
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Dispatches a job to a worker thread
 * @param {Object} info - information sent to queue
 * @param {number} ms - how long to delay for
 * @returns {Boolean} true or false
 */
export const sendToWorkerThread = async (info, ms) => {
  // intentional delay to reduce overhead
  await sleep(ms);

  const {
    queue,
    data
  } = info;

  try {
    const connection = await createAMQPConnection();

    if (!connection) {
      Logger.error(AMQP_CONNECTION_FAILED);
      return false;
    }

    process.once('SIGINT', connection.close.bind(connection));

    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    Logger.info(DISPATCHED_TO_BROKER.replace('%DATA%', JSON.stringify(data)));
    return channel.sendToQueue(queue, new Buffer.from(JSON.stringify(data)), { persistent: true });
  } catch (e) {
    Logger.error(e.stack);
    return false;
  }
};
