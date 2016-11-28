// Burger model
// (created on the command line)
// =============================

// Note: We can designate associations within the classMethods
// option that the sequelize CLI generates.


'use strict';

module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    customer: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return Customer;
};