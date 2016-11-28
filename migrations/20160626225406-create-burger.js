// Migration 0: Create the burgers table
// =====================================

// Burger's zero-state migration.
// Running this will create the Burger table.
// Undoing this will delete it.

// NOTE: this file is auto-generated with the Sequelize CLI
// Since the cli doesn't let us give fields default values
// we have to designate devoured as false here and in the model

'use strict';

module.exports = {
  // on migration, create the table based on our model
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Burgers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      burger_name: {
        type: Sequelize.STRING
      },
      devoured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // this is the only line we needed to add manually
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // on migrate:undo, drop the table
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Burgers');
  }
};