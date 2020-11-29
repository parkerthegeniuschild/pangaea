import 'core-js/stable';
import 'regenerator-runtime/runtime';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import Logger from './logger/winston';
import v1Router from './routes';
import { NODE, MESSAGES, STATUS_CODES } from './constants';
import Response from './helpers/response.helper';

const app = express();

const { PORT, ENV } = NODE;

const { ROUTE_NOT_FOUND, SERVER_ERROR, SERVER_IS_RUNNING } = MESSAGES;
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = STATUS_CODES;

// enforce SSL connections in production
ENV === 'production' && app.use(enforce.HTTPS({
  trustProtoHeader: true,
  trustAzureHeader: true,
  trustXForwardedHostHeader: true,
}));

app.use('/api/v1', v1Router);
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(SERVER_IS_RUNNING.replace('%ADDRESS%', `http://localhost:${PORT}/api/v1`));
  process.send('ready');
});
