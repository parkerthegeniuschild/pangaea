import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';

config();

const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

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
  SUBSCRIBERS: {},
};

export const MESSAGES = {
  WELCOME: 'Welcome to Pangaea!',
  ROUTE_NOT_FOUND: 'Route not found.',
  SERVER_ERROR: 'An error has occurred. Please try again later.',
  SERVER_IS_RUNNING: 'Server is running on %ADDRESS%.',
};

export const ROUTES = {
  HOME: '/',
  API_DOCS: '/docs',
};

export const STATUS_CODES = {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
};
