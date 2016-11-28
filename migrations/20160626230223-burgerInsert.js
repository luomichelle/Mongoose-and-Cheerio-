// Migration 1: Bulk Insert into Burgers
// =====================================

// This file will populate our Burger table with dummy data.
// Great for testing out our site without having to 
// manually enter every burger entry. 

'use strict';

// take in our burger model, so we can edit our table
var Burger = require('../models').Burger;

// bring in our sequelize connection so we can reset our index on undo
var sequelize = require('../models').sequelize;

module.exports = {

  // on migrate, run this command
  up: function (queryInterface, Sequelize) {
    // bulk insert five burgers, using Burger model
    return Burger.bulkCreate([
      {burger_name: "Cheesburger"},
      {burger_name: "Double Cheesburger"},
      {burger_name: "Triple Cheesburger"},
      {burger_name: "Quadruple Cheesburger"},
      {burger_name: "Quintuple Cheesburger"}
    ])
  },

  // on migrate:undo, delete these burgers
  down: function (queryInterface, Sequelize) {
    // bulk delete five burgers
    return Burger.destroy({where:{ burger_name:
      [
        "Cheesburger",
        "Double Cheesburger",
        "Triple Cheesburger",
        "Quadruple Cheesburger",
        "Quintuple Cheesburger"
      ]
    }})
    // after we destroy the burger entries, 
    .then(function(){
      // set auto-increment back to the earliest int.
      // Otherwise we'll have 5 burgers unaccounted for, which would throw off
      // the number system that our site uses (and would frankly be confusing to
      // to look at).
      return sequelize.query('ALTER TABLE Burgers AUTO_INCREMENT=1')
    })
  }
};
