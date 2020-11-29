import mongoose from 'mongoose';
import Logger from '../logger/winston';
import {
  MONGODB,
  NODE,
} from '../constants';

const {
  DEVELOPMENT_URI,
  TEST_URI,
  PRODUCTION_URI,
} = MONGODB;

const { ENV } = NODE;

const databaseURL = (ENV === 'development') ? DEVELOPMENT_URI : (ENV === 'test')
  ? TEST_URI : PRODUCTION_URI;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', Logger.error.bind(console, 'connection error:'));
db.once('open', () => Logger.info('>>>>> Connection to database successful'));

export default db;
