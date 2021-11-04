import { Sequelize } from 'sequelize-typescript'
const config = require('../config/dbconfig.json');

const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  host: config.host,
  models: [__dirname + '/tables']
});

export default sequelize;