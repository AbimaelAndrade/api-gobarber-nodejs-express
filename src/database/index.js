import Sequelize from 'sequelize';
import mongo from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConfig = mongo.connect(
      'mongodb://andrade:a1b220com@ds255917.mlab.com:55917/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      }
    );
  }
}

export default new Database();
