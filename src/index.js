import 'core-js/stable';
import 'regenerator-runtime/runtime';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import enforce from 'express-sslify';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import http from 'http';
import helmet from 'helmet';
import Logger from './logger/winston';
import v1Router from './routes';
import { NODE, MESSAGES, STATUS_CODES } from './constants';
import Response from './helpers/response.helper';
import configs from './configs';
import subscribers from './subscribers';

const app = express();

const { PORT, ENV } = NODE;
const { publishNewEvent } = subscribers;

const {
  REQUEST_OVERLOAD, ROUTE_NOT_FOUND, SERVER_ERROR, SERVER_IS_RUNNING
} = MESSAGES;

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = STATUS_CODES;
const { redis } = configs;

const apiLimiter = new RateLimit({
  store: new RedisStore({
    client: redis,
  }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayMs: 0,
  max: 500,
  message: REQUEST_OVERLOAD,
});

// enforce SSL connections in production
ENV === 'production' && app.use(enforce.HTTPS({
  trustProtoHeader: true,
  trustAzureHeader: true,
  trustXForwardedHostHeader: true,
}));
ENV === 'development' && app.use(cors());
app.use(helmet());
app.use(apiLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', v1Router);

// Error handling
app.use((req, res, next) => {
  const err = new Error(ROUTE_NOT_FOUND);
  err.status = NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  Logger.error(
    `${err.status || INTERNAL_SERVER_ERROR} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  Response.send(res, err.status || INTERNAL_SERVER_ERROR, undefined, { message: err.message || SERVER_ERROR }, 'error');
  next();
});

process.send = process.send || (() => {});

// kick-start the subscribers
publishNewEvent();

const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(SERVER_IS_RUNNING.replace('%ADDRESS%', `http://localhost:${PORT}/api/v1`));
  process.send('ready');
});
