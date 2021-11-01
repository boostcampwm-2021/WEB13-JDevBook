const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');

const debug = require('debug')('server:server');
const http = require('http');
const app = express();
const port = 4000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`✅ Server Listening on : http://localhost:${port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);

module.exports = app;
