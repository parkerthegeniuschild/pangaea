import mongoose from 'mongoose';
import Logger from '../logger/winston';
import {
  MONGODB,
  NODE,
  MESSAGES,
} from '../constants';

const {
  DEVELOPMENT_URI,
  TEST_URI,
  PRODUCTION_URI,
} = MONGODB;

const { ENV } = NODE;
const { CONNECTION_SUCCESSFUL } = MESSAGES;

const databaseURL = (ENV === 'development') ? DEVELOPMENT_URI : (ENV === 'test')
  ? TEST_URI : PRODUCTION_URI;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', Logger.error.bind(console, 'connection error:'));
db.once('open', () => Logger.info(CONNECTION_SUCCESSFUL.replace('%SERVICE%', 'MongoDB')));

export default db;
