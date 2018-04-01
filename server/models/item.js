'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('item', {
    ISBN: { type: DataTypes.STRING},
    Name: { type: DataTypes.STRING},
    //escription: { type: DataTypes.STRING}
  });

  return Item;
};
