import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';

config();

const {
  OK, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY, NOT_FOUND
} = StatusCodes;

export const NODE = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
};

export const REDIS = {
  DEVELOPMENT_URI: process.env.REDIS_DEVELOPMENT_URL,
  TEST_URI: process.env.REDIS_TEST_URL,
  PRODUCTION_URI: process.env.REDIS_PRODUCTION_URL,
};

export const MONGODB = {
  DEVELOPMENT_URI: process.env.MONGODB_DEVELOPMENT_URI,
  TEST_URI: process.env.MONGODB_TEST_URI,
  PRODUCTION_URI: process.env.MONGODB_PRODUCTION_URI,
};

export const AMQP = {
  CONNECTION_URI: process.env.AMQP_CONNECTION_URI,
  SUBSCRIBERS: {
    PUBLISH_NEW_EVENT: 'publish_new_event',
  },
};

export const MESSAGES = {
  WELCOME: 'Welcome to Pangaea!',
  REQUEST_OVERLOAD: 'Too many requests. Please try again after some time.',
  ROUTE_NOT_FOUND: 'Route not found.',
  SERVER_ERROR: 'An error has occurred. Please try again later.',
  SERVER_IS_RUNNING: 'Server is running on %ADDRESS%.',
  CONNECTION_SUCCESSFUL: 'Connection to %SERVICE% successful.',
  SUBSCRIPTION_SUCCESSFUL: 'Subscription to %TOPIC% successful.',
  PUBLISH_EVENT_FAILED: 'Failed to publish event to %TOPIC%.',
  BROADCAST_EVENT_SUCCESSFUL: 'Event has been broadcast to %TOPIC% subscribers successfully.',
  LISTENING_FOR_MESSAGES: 'Listening for messages in %QUEUE%',
  MESSAGE_RECEIVED: 'Received %MESSAGE%',
  AMQP_CONNECTION_FAILED: 'Could not connect to message broker.',
  DISPATCHED_TO_BROKER: 'Request sent to worker thread: %DATA%',
  NO_ACTIVE_SUBSCRIBERS_FOUND: 'No active subscribers found for %TOPIC%',
};

export const ROUTES = {
  HOME: '/',
  API_DOCS: '/docs',
  SUBSCRIPTION: {
    SUBSCRIBE: '/subscribe/:topic',
    PUBLISH_EVENT: '/publish/:topic',
  }
};

export const STATUS_CODES = {
  OK,
  CREATED,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
};
