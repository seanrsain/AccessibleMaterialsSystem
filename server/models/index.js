'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    console.log('Model', model)
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    console.log('ModelNAme', modelName);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('../models/user.js')(sequelize, Sequelize);
db.order = require('../models/order.js')(sequelize, Sequelize);
db.item = require('../models/item.js')(sequelize, Sequelize);
db.student = require('../models/student.js')(sequelize, Sequelize);

db.item.hasMany(db.order, {foreignKey: 'itemId'});
db.order.belongsTo(db.item, {foreignKey: 'itemId'});

db.student.hasMany(db.order, {foreignKey: 'studentId'});
db.order.belongsTo(db.student, {foreignKey: 'studentId'});

//db.order


module.exports = db;
