'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('order', {
    itemId: { type: DataTypes.INTEGER},
    studentId: { type: DataTypes.INTEGER},
    Quantity: { type: DataTypes.INTEGER},
    Status: { type: DataTypes.STRING},
    DateOfOrder: { type: DataTypes.DATE},
    PatronID: { type: DataTypes.INTEGER}
  });

  return Order;
};
