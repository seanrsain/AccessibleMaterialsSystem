'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('order', {
    ItemID: { type: DataTypes.INTEGER},
    StudentID: { type: DataTypes.INTEGER},
    Quantity: { type: DataTypes.INTEGER},
    StatusID: { type: DataTypes.INTEGER},
    DateOfOrder: { type: DataTypes.DATE},
    PatronID: { type: DataTypes.INTEGER}
  });

  return Order;
};
