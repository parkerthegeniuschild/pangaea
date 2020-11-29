import Redis from 'redis';
import {
  REDIS,
  NODE,
} from '../constants';
import Logger from '../logger/winston';

const {
  DEVELOPMENT_URI,
  TEST_URI,
  PRODUCTION_URI,
} = REDIS;

const { ENV } = NODE;

const connection = (uri) => Redis.createClient(uri);

const client = (ENV === 'development') ? connection(DEVELOPMENT_URI) : (ENV === 'test')
  ? connection(TEST_URI) : connection(PRODUCTION_URI);

client.on('connect', () => Logger.info('>>>>> Connection to in-memory datastore successful'));
client.on('error', () => Logger.error.bind(console, 'connection error:'));

export default client;
