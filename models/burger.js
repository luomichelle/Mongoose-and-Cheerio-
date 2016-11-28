// Burger model
// (created on the command line)
// =============================

// Note: Since sequelize-cli lacks the option 
// to designate default values for our attributes,
// we still need to add in a line to give devoured
// a default value of false.
// We need to do the same on the associated migration file
// that the cli created in tandem with this model.

'use strict';


module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define('Burger', {
    burger_name: DataTypes.STRING,
    devoured: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: false // only line we needed to add.
    }
  }, {
    classMethods: {
      associate: function(models) {
        Burger.hasOne(models.Customer);
      }
    }
  });
  return Burger;
};