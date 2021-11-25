import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import socketIO from './sockets/socketIO';
dotenv.config({ path: path.resolve(__dirname, './config/.env.development') });

import dbManager from './service/dbManager';

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');
const apiRouter = require('./routes/api');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build') /*, { maxAge: 10 }*/));

const port = 4000;
app.set('port', port);
const FileStore = sessionFileStore(session);

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
      reapInterval: 24 * 60 * 60,
      ttl: 24 * 60 * 60
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
