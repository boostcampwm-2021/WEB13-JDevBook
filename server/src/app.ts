import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, './config/.env.development') });

import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createServer } from 'http';

import socketIO from './sockets/socketIO';
import dbManager from './service/dbManager';

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');
const apiRouter = require('./routes/api');
const FileStore = sessionFileStore(session);

const app = express();
const port = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build') /*, { maxAge: 10 }*/));
app.set('port', port);

dbManager.sync();

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24000 * 60 * 60
    },
    store: new FileStore({
      path: path.resolve(__dirname, './sessions/'),
      ttl: 24 * 60 * 60,
      //retries: 0
      logFn: function () {}
    })
  })
);

const server = createServer(app);
socketIO(server);

server.listen(port, () => {
  console.log(`✅ Server Listening on : http://localhost:${port}`);
});

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

module.exports = app;
